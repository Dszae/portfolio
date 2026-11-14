
import OpenAI from 'openai';
import { OPENAI_TOOLS, executeTool } from './tools.js';
import { retrievePortfolioContext } from './knowledge.js';
import { AGENT_CONFIG } from './types.js';

const SYSTEM_PROMPT = `You are the official AI Assistant for Dipesh Sapkota's portfolio website (https://www.dipeshsapkota7.com.np).

Key Responsibilities & Grounding Rules:
1. Identity: You are Dipesh's AI assistant. Do not pretend to be Dipesh himself; speak in the third person or as his representative ("Dipesh is a Computer Engineering student...", "He built Git Visualizer...").
   - Describe Dipesh using the approved identity: Computer Engineering Student & AI/ML Enthusiast, Motion Graphics Designer, and Video Editor. Do not use generic software engineering or developer titles.
2. Verified Facts:
   - Dipesh is an undergraduate student studying Computer Engineering at IOE Thapathali Campus, Tribhuvan University, Kathmandu, Nepal (Graduation 2026).
   - Core Interests: Artificial Intelligence, Machine Learning, and Creative Media (Video Editing and Motion Graphics Design).
   - Experience: 4+ years of freelance Video Editing and Motion Graphics Design (50+ clients globally).
   - Featured Projects:
     * Sportivo: Real-time sports platform (Next.js, React, Node.js, REST APIs) (https://sportivo.dipeshsapkota7.com.np)
     * Git Visualizer: Interactive Git DAG educational simulator (https://git-visualizer.dipeshsapkota7.com.np)
     * IOE Admission Hub: Engineering rank prediction and college counseling tool (https://ioe-admission.dipeshsapkota7.com.np)
     * Sports Reels: Short-form video editing and motion design on Instagram (@dsz.ae)
     * Astable 555 Multivibrator: Hardware breadboard frequency timer and LED flasher
     * Motor Modeling & PID: Computational DC motor control in MATLAB/Simulink
     * Analyzer Diag: Logic state analyzer and diagnostic toolkit
   - Primary Links:
     * Projects: /projects
     * About & Bio: /about
     * Skills: /skills
     * Resume / Career: /resume
     * Certificates: /certificates
     * Contact: /contact
     * GitHub: https://github.com/dszae
     * LinkedIn: https://linkedin.com/in/dipeshsapkota7
     * Email: contact@dipeshsapkota7.com.np (Direct Web Gmail Link: https://mail.google.com/mail/?view=cm&fs=1&to=contact@dipeshsapkota7.com.np)
     * WhatsApp: https://wa.me/9779764685307 (+977 9764685307)
     * Phone: +977 9764685307
3. Evidence-Based Answering:
   - Answer portfolio-related questions using verified evidence from retrieved context or tool results.
   - If asked general computer science or math questions (e.g. "What is a transformer model?", "How does Git DAG work?"), explain them accurately using general knowledge, while keeping portfolio claims evidence-based.
   - Never invent degrees, companies, achievements, or project features not verified in the portfolio.
   - Provide clickable Markdown links where relevant.
   - Contact Links: For LinkedIn, always link to https://linkedin.com/in/dipeshsapkota7. For email, always format as a direct web Gmail compose link: [contact@dipeshsapkota7.com.np](https://mail.google.com/mail/?view=cm&fs=1&to=contact@dipeshsapkota7.com.np). Never use mailto: links so that clicking opens directly in web Gmail instead of opening desktop Outlook.
   - Formatting: Avoid using arrow characters or symbols (such as "->", "-->", or "→") repeatedly. Format links and lists cleanly with markdown links and bullet points without trailing arrows.
   - Keep responses professional, friendly, well-structured, and concise.
   - Do not include emojis or exclamation marks in user-facing responses.
`;

export async function runAgentOrchestration(messages, sseWriter, env = {}) {
  const geminiKey = (env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '').replace(/['"]/g, '').trim();
  const groqKey = (env.GROQ_API_KEY || process.env.GROQ_API_KEY || '').replace(/['"]/g, '').trim();
  const openAiKey = (env.OPENAI_API_KEY || process.env.OPENAI_API_KEY || '').replace(/['"]/g, '').trim();
  const aiBinding = env.AI;

  const boundedMessages = messages.slice(-10);

  if (geminiKey && geminiKey.length > 15 && !geminiKey.includes('...')) {
    try {
      await callGeminiStream(boundedMessages, geminiKey, sseWriter);
      return;
    } catch (err) {
      console.error('Gemini execution error:', err.message);
      sseWriter.sendEvent('gemini_error', { error: err.message });
    }
  }

  if (groqKey && groqKey.trim().length > 10 && !groqKey.includes('...')) {
    try {
      const groqClient = new OpenAI({
        apiKey: groqKey.trim(),
        baseURL: 'https://api.groq.com/openai/v1'
      });
      await runOpenAiCompatibleLoop(boundedMessages, groqClient, env.GROQ_MODEL || process.env.GROQ_MODEL || 'llama-3.3-70b-versatile', sseWriter);
      return;
    } catch (err) {
      console.error('Groq execution error (falling back):', err.message);
    }
  }

  if (
    openAiKey && 
    openAiKey.trim().length > 25 && 
    !openAiKey.startsWith('sk-placeholder') &&
    !openAiKey.includes('...') &&
    !openAiKey.includes('your-')
  ) {
    try {
      const openAiClient = new OpenAI({ apiKey: openAiKey.trim() });
      await runOpenAiCompatibleLoop(boundedMessages, openAiClient, env.OPENAI_MODEL || process.env.OPENAI_MODEL || AGENT_CONFIG.DEFAULT_MODEL, sseWriter);
      return;
    } catch (err) {
      console.error('OpenAI execution error (falling back):', err.message);
    }
  }

  if (aiBinding && typeof aiBinding.run === 'function') {
    try {
      await callWorkersAi(boundedMessages, aiBinding, sseWriter);
      return;
    } catch (err) {
      console.error('Cloudflare Workers AI execution error (falling back):', err.message);
    }
  }

  await runGroundedFallback(boundedMessages, sseWriter);
}

async function callWorkersAi(messages, ai, sseWriter) {
  const latestMessage = messages[messages.length - 1]?.content || '';

  sseWriter.sendEvent('tool_call', {
    id: 'rag-cf-ai',
    name: 'search_portfolio',
    args: { query: latestMessage },
    label: 'Consulting portfolio knowledge base...'
  });

  const docs = await retrievePortfolioContext(latestMessage, { topK: 5 });

  sseWriter.sendEvent('tool_result', {
    id: 'rag-cf-ai',
    name: 'search_portfolio',
    result: { count: docs.length, sources: docs.map(d => d.title) }
  });

  const contextText = docs.map(d => `--- SOURCE: ${d.title} (${d.url}) ---\n${d.content}`).join('\n\n');

  const systemInstruction = `${SYSTEM_PROMPT}

VERIFIED PORTFOLIO EVIDENCE:
${contextText}

Instructions:
1. When asked about Dipesh Sapkota, his projects (Sportivo, Git Visualizer, IOE Admission Hub, 555 Flasher, etc.), his engineering education at IOE Thapathali Campus (Kathmandu, Nepal), his video editing experience, skills, or contact info, answer accurately based strictly on the verified portfolio evidence above. Provide Markdown links to project demos and pages.
2. When asked general questions (world knowledge, computer science, programming, history, math, science, definitions, or general questions), answer them thoroughly, accurately, and helpfully using your broad knowledge.
3. Tone: Articulate, helpful, clean, professional, and friendly. Use clean Markdown formatting. Do not use emojis.`;

  const chatMessages = [
    { role: 'system', content: systemInstruction },
    ...messages.map(m => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content
    }))
  ];

  const candidateModels = [
    '@cf/meta/llama-3.1-8b-instruct-fp8',
    '@cf/meta/llama-3.2-3b-instruct',
    '@cf/meta/llama-3.3-70b-instruct-fp8-fast'
  ];

  let result = null;
  let lastErr = null;

  for (const model of candidateModels) {
    try {
      result = await ai.run(model, {
        messages: chatMessages,
        max_tokens: 1024,
        temperature: 0.3
      });
      if (result && result.response) break;
    } catch (e) {
      lastErr = e;
      console.warn(`Workers AI model ${model} attempt failed:`, e.message);
    }
  }

  if (!result || !result.response) {
    throw lastErr || new Error('Workers AI produced no response');
  }

  const text = result.response.trim();
  const chunkSize = 25;
  for (let i = 0; i < text.length; i += chunkSize) {
    sseWriter.sendEvent('delta', { text: text.slice(i, i + chunkSize) });
  }

  sseWriter.sendEvent('done', { iterations: 1, mode: 'cloudflare_workers_ai' });
}

async function callGeminiStream(messages, geminiKey, sseWriter) {
  const latestMessage = messages[messages.length - 1]?.content || '';

sseWriter.sendEvent('tool_call', {
    id: 'rag-gemini',
    name: 'search_portfolio',
    args: { query: latestMessage },
    label: 'Consulting portfolio knowledge base...'
  });

  const docs = await retrievePortfolioContext(latestMessage, { topK: 5 });

  sseWriter.sendEvent('tool_result', {
    id: 'rag-gemini',
    name: 'search_portfolio',
    result: { count: docs.length, sources: docs.map(d => d.title) }
  });

  const contextText = docs.map(d => `--- SOURCE: ${d.title} (${d.url}) ---\n${d.content}`).join('\n\n');

  const systemInstruction = `${SYSTEM_PROMPT}

VERIFIED PORTFOLIO EVIDENCE:
${contextText}

Instructions:
1. Dipesh Sapkota's Portfolio: When asked about Dipesh Sapkota, his projects (Sportivo, Git Visualizer, IOE Admission Hub), his engineering education at IOE Thapathali Campus (Kathmandu, Nepal), his video editing experience, skills, or contact info, answer accurately based strictly on the verified portfolio evidence above. Provide Markdown links to project demos and pages.
2. Engineering & Design Focus: Dipesh is focused on Artificial Intelligence, Machine Learning, and motion design / video editing. Do not state or imply he is primarily focused on embedded systems or hardware engineering.
3. General World Knowledge & Real LLM Capabilities: When asked general questions (world affairs, history, geography, leaders, mathematics, science, programming/code snippets, poetry, creative writing, jokes, etc.), answer them thoroughly, accurately, and naturally using your broad intelligence. Never claim Dipesh Sapkota is the answer to external facts, leaders, or historical figures.
3. Tone: Articulate, helpful, clean, professional, and friendly. Use clean Markdown formatting.`;

let userTurns = messages.filter(m => (m.role === 'user' || m.role === 'assistant') && m.content && m.content.trim());
  while (userTurns.length > 0 && userTurns[0].role === 'assistant') {
    userTurns.shift();
  }
  if (userTurns.length === 0) {
    userTurns = [{ role: 'user', content: latestMessage || 'Hello' }];
  }

  const contents = [];
  for (const m of userTurns) {
    const role = m.role === 'assistant' ? 'model' : 'user';
    if (contents.length > 0 && contents[contents.length - 1].role === role) {
      contents[contents.length - 1].parts[0].text += `\n\n${m.content}`;
    } else {
      contents.push({
        role,
        parts: [{ text: m.content }]
      });
    }
  }

  const formattedContents = contents.map((turn, index) => {
    if (index === 0 && turn.role === 'user') {
      return {
        role: 'user',
        parts: [{ text: `${systemInstruction}\n\n---\nVisitor Query:\n${turn.parts[0].text}` }]
      };
    }
    return turn;
  });

const candidateModels = [
    process.env.GEMINI_MODEL,
    'gemini-3.5-flash-lite',
    'gemini-flash-lite-latest',
    'gemini-flash-latest',
    'gemini-3.1-flash-lite'
  ].filter(Boolean);

  const requestPayload = {
    contents: formattedContents,
    generationConfig: {
      temperature: 0.25,
      maxOutputTokens: 1200
    }
  };

  let activeModel = '';
  let streamResponse = null;
  let textOutput = '';
  let lastError = '';

  for (const model of candidateModels) {
    
    try {
      const streamUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${geminiKey}`;
      const res = await fetch(streamUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload),
        signal: AbortSignal.timeout(25000)
      });

      if (res.ok) {
        activeModel = model;
        streamResponse = res;
        break;
      } else {
        const errJson = await res.json().catch(() => null);
        lastError = errJson?.error?.message || `Stream HTTP ${res.status}`;
      }
    } catch (e) {
      lastError = e.message;
    }

try {
      const unaryUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
      const res = await fetch(unaryUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload),
        signal: AbortSignal.timeout(25000)
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          activeModel = model;
          textOutput = text;
          break;
        }
      }
    } catch {
    }
  }

  if (streamResponse) {
    const reader = streamResponse.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.slice(6).trim();
          if (jsonStr) {
            try {
              const data = JSON.parse(jsonStr);
              const textChunk = data.candidates?.[0]?.content?.parts?.[0]?.text;
              if (textChunk) {
                sseWriter.sendEvent('delta', { text: textChunk });
              }
            } catch {}
          }
        }
      }
    }

    sseWriter.sendEvent('done', { engine: 'google_gemini_flash', model: activeModel });
    return;
  }

  if (textOutput) {
    const chunkSize = 25;
    for (let i = 0; i < textOutput.length; i += chunkSize) {
      sseWriter.sendEvent('delta', { text: textOutput.slice(i, i + chunkSize) });
    }
    sseWriter.sendEvent('done', { engine: 'google_gemini_flash', model: activeModel });
    return;
  }

  throw new Error(`All Gemini candidate models (${candidateModels.join(', ')}) failed: ${lastError || 'Unknown error'}`);
}

async function runOpenAiCompatibleLoop(messages, client, modelName, sseWriter) {
  const conversationHistory = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages
  ];

  let iteration = 0;
  const maxIterations = AGENT_CONFIG.MAX_TOOL_ITERATIONS;

  while (iteration < maxIterations) {
    iteration++;

    const response = await client.chat.completions.create({
      model: modelName,
      messages: conversationHistory,
      tools: OPENAI_TOOLS,
      tool_choice: 'auto',
      temperature: 0.2
    });

    const choice = response.choices[0];
    const message = choice.message;

    if (message.tool_calls && message.tool_calls.length > 0) {
      conversationHistory.push(message);

      for (const toolCall of message.tool_calls) {
        const fnName = toolCall.function.name;
        let fnArgs = {};
        try {
          fnArgs = JSON.parse(toolCall.function.arguments || '{}');
        } catch {
          fnArgs = {};
        }

        sseWriter.sendEvent('tool_call', {
          id: toolCall.id,
          name: fnName,
          args: fnArgs,
          label: getToolStatusLabel(fnName, fnArgs)
        });

        const result = await executeTool(fnName, fnArgs);

        sseWriter.sendEvent('tool_result', {
          id: toolCall.id,
          name: fnName,
          result
        });

        conversationHistory.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: JSON.stringify(result)
        });
      }
      continue;
    }

    const finalText = message.content || '';
    const chunkSize = 20;
    for (let i = 0; i < finalText.length; i += chunkSize) {
      sseWriter.sendEvent('delta', { text: finalText.slice(i, i + chunkSize) });
    }

    sseWriter.sendEvent('done', { iterations: iteration, model: modelName });
    return;
  }
}

function getToolStatusLabel(name, args) {
  switch (name) {
    case 'search_projects':
      return args.technology ? `Searching projects using ${args.technology}...` : 'Searching project repository...';
    case 'get_project_details':
      return `Fetching technical architecture for ${args.project_id}...`;
    case 'get_project_demo':
      return `Locating live demo for ${args.project_id}...`;
    case 'get_github_repository':
      return `Querying GitHub for ${args.repo}...`;
    case 'get_repository_readme':
      return `Reading repository documentation for ${args.repo}...`;
    case 'search_articles':
      return 'Searching technical articles and blog posts...';
    case 'get_profile_information':
      return 'Retrieving academic and career profile...';
    case 'get_contact_links':
      return 'Finding official contact channels...';
    default:
      return `Executing tool: ${name}...`;
  }
}

async function runGroundedFallback(messages, sseWriter) {
  const latestMessage = messages[messages.length - 1];
  const query = latestMessage ? latestMessage.content : '';
  const qLower = query.toLowerCase().trim();

  sseWriter.sendEvent('tool_call', {
    id: 'rag-01',
    name: 'search_portfolio',
    args: { query },
    label: 'Consulting portfolio knowledge base...'
  });

  const docs = await retrievePortfolioContext(query, { topK: 4 });

  sseWriter.sendEvent('tool_result', {
    id: 'rag-01',
    name: 'search_portfolio',
    result: { count: docs.length, sources: docs.map(d => d.title) }
  });

  let response = '';

  // Greetings
  if (/^(hi|hello|hey|hola|namaste|good\s*(morning|afternoon|evening))\b/i.test(query.trim())) {
    response = `Hello! I am the portfolio assistant for **Dipesh Sapkota**.\n\n` +
      `You can ask me about:\n` +
      `- **Projects**: [Sportivo](https://sportivo.dipeshsapkota7.com.np/), [Git Visualizer](https://git-visualizer.dipeshsapkota7.com.np/), [IOE Admission Hub](https://ioe-admission.dipeshsapkota7.com.np/), NE555 Flasher\n` +
      `- **Competencies**: AI/ML, Computer Engineering, React, Next.js, Embedded Systems, Video Editing\n` +
      `- **Background**: IOE Thapathali Campus (Tribhuvan University, Nepal), 4+ years creative media experience\n` +
      `- **Contact**: Direct contact links, social profiles, and collaboration details\n` +
      `- **General Topics**: Questions on machine learning, programming, git DAGs, and computer engineering concepts.\n\n` +
      `How can I assist you today?`;
  }
  // Technical / General concepts: Machine learning & AI
  else if (qLower.includes('machine learning') || (qLower.includes('what is ml') || qLower.includes('explain ml'))) {
    response = `### Machine Learning (ML)\n\n` +
      `**Machine Learning** is a branch of Artificial Intelligence (AI) and computer science focused on building systems that learn patterns from empirical data and improve their performance on specific tasks without being explicitly programmed.\n\n` +
      `**Key Paradigms**:\n` +
      `- **Supervised Learning**: Training models on labeled datasets (e.g., classification, regression).\n` +
      `- **Unsupervised Learning**: Discovering latent structures and clusters without explicit targets (e.g., k-means, PCA, autoencoders).\n` +
      `- **Reinforcement Learning**: Agents taking actions in an environment to maximize cumulative reward.\n\n` +
      `**Relevance to Dipesh Sapkota**:\n` +
      `As a Computer Engineering student at IOE Thapathali Campus, Dipesh specializes in AI and Machine Learning systems, algorithmic architectures, and practical model deployments. You can view his skills on the [/skills](/skills) page or explore [Sportivo](https://sportivo.dipeshsapkota7.com.np/) and [IOE Admission Hub](https://ioe-admission.dipeshsapkota7.com.np/).`;
  }
  else if (qLower.includes('artificial intelligence') || (qLower.includes('what is ai') || qLower.includes('explain ai'))) {
    response = `### Artificial Intelligence (AI)\n\n` +
      `**Artificial Intelligence** refers to computational systems engineered to simulate cognitive functions associated with human intelligence, such as reasoning, learning, problem-solving, pattern recognition, and decision-making.\n\n` +
      `**Core Domains**:\n` +
      `- **Machine Learning & Deep Learning**: Neural networks, transformer architectures, and data-driven models.\n` +
      `- **Natural Language Processing (NLP)**: Tokenization, semantic embeddings, and LLMs.\n` +
      `- **Computer Vision**: Feature extraction, CNNs, image segmentation, and object detection.\n` +
      `- **Embedded AI**: Running inference on edge devices, microcontrollers, and resource-constrained hardware.\n\n` +
      `Dipesh is an active AI/ML enthusiast working on intelligent software and hardware simulations at IOE Thapathali. Check his technical projects on [/projects](/projects).`;
  }
  else if (qLower.includes('computer engineering') || qLower.includes('what is computer engineering')) {
    response = `### Computer Engineering\n\n` +
      `**Computer Engineering** is an engineering discipline integrating computer science and electrical engineering to develop computer hardware and software systems:\n\n` +
      `- **Hardware Systems**: Digital logic design, microprocessors, embedded microcontrollers, and VLSI circuit architecture.\n` +
      `- **Software Systems**: Algorithms, operating systems, compilers, computer networks, and distributed systems.\n` +
      `- **Hardware-Software Integration**: Device drivers, firmware, real-time operating systems (RTOS), and IoT.\n\n` +
      `Dipesh Sapkota is currently pursuing his Bachelor of Computer Engineering at the Institute of Engineering (IOE), Thapathali Campus in Kathmandu, Nepal.`;
  }
  else if ((qLower.includes('what is git') || qLower.includes('git dag') || qLower.includes('how does git work')) && !qLower.includes('git visualizer')) {
    response = `### Git Version Control System\n\n` +
      `**Git** is a distributed version control system designed to track changes in source code across time. Under the hood, Git models commit history as a **Directed Acyclic Graph (DAG)** of immutable snapshot objects (commits, trees, blobs, and annotated tags).\n\n` +
      `Dipesh developed **[Git Visualizer](https://git-visualizer.dipeshsapkota7.com.np/)**, an interactive tool that renders Git's DAG on an HTML5 canvas in real time to visualize branches, merges, and head movements.\n\n` +
      `- [Launch Git Visualizer](https://git-visualizer.dipeshsapkota7.com.np/)\n` +
      `- [Read Architecture Details](/projects/git-visualizer)`;
  }
  else if (qLower.includes('git visualizer') || (qLower.includes('git') && (qLower.includes('tool') || qLower.includes('project') || qLower.includes('visual')))) {
    response = `### [Git Visualizer](https://www.dipeshsapkota7.com.np/projects/git-visualizer)\n\n` +
      `**Git Visualizer** is an interactive educational web tool created by Dipesh to demystify Git internals and DAG graphs:\n\n` +
      `- **Live Commit Graph**: Renders commits as an interactive Directed Acyclic Graph (DAG) directly on an HTML5 Canvas.\n` +
      `- **Command Simulator**: Supports deterministic simulation of \`git init\`, \`git commit\`, \`git branch\`, \`git checkout\`, and \`git merge\`.\n` +
      `- **Stage Explorer**: Graphically visualizes code transitions across the 4 Git environments: Working Directory, Staging Area, Local Repository, and Remote.\n` +
      `- **Tech Stack**: HTML5 Canvas, Vanilla JavaScript, Git DAG algorithms, CSS3.\n\n` +
      `**Live links**:\n` +
      `- [Explore Live Interactive Demo](https://git-visualizer.dipeshsapkota7.com.np/)\n` +
      `- [GitHub Repository](https://github.com/dszae/git-visualizer)\n` +
      `- [Full Project Architecture](/projects/git-visualizer)`;
  } 
  else if (qLower.includes('sportivo') || (qLower.includes('sport') && qLower.includes('score'))) {
    response = `### [Sportivo — Live Sports Platform](https://www.dipeshsapkota7.com.np/projects/sportivo)\n\n` +
      `**Sportivo** is a real-time sports aggregator designed and built by Dipesh for sports fans:\n\n` +
      `- **Core Capabilities**: Live score tracking, fixture discovery, league standings, and curated sports news for football, cricket, and basketball.\n` +
      `- **Tech Stack**: Next.js, React, Node.js, Tailwind CSS, REST APIs.\n` +
      `- **Architecture**: ISR server-side pre-rendering with real-time polling updates.\n\n` +
      `**Live links**:\n` +
      `- [Open Live Platform](https://sportivo.dipeshsapkota7.com.np/)\n` +
      `- [GitHub Repository](https://github.com/dszae/sportivo)\n` +
      `- [Project Details](/projects/sportivo)`;
  } 
  else if (qLower.includes('ioe') || qLower.includes('admission') || qLower.includes('thapathali') || qLower.includes('entrance')) {
    response = `### [IOE Admission Hub](https://www.dipeshsapkota7.com.np/projects/ioe-admission-guide)\n\n` +
      `**IOE Admission Hub** is an engineering admissions decision-support tool for Tribhuvan University entrance applicants in Nepal:\n\n` +
      `- **Features**: Score-to-rank probability prediction, campus comparison (Pulchowk, Thapathali, WRC, ERC), and counseling priority planning.\n` +
      `- **Tech Stack**: React, JavaScript, Data Analytics, Tailwind CSS.\n\n` +
      `**Live links**:\n` +
      `- [Launch IOE Admission Hub](https://ioe-admission.dipeshsapkota7.com.np/)\n` +
      `- [GitHub Repository](https://github.com/dszae/ioe-admission-guide)\n` +
      `- [Project Details](/projects/ioe-admission-guide)`;
  } 
  else if (qLower.includes('video') || qLower.includes('reel') || qLower.includes('motion') || qLower.includes('editing') || qLower.includes('premiere') || qLower.includes('after effects')) {
    response = `### Creative Media & Video Editing Portfolio\n\n` +
      `Dipesh has over **4+ years of professional freelance experience** as a Video Editor & Motion Graphics Designer, having collaborated with 50+ clients globally:\n\n` +
      `- **Core Specializations**: Short-form sports edits, dynamic typography, speed ramping, audio design, and cinematic color grading.\n` +
      `- **Software Toolkit**: Adobe Premiere Pro, Adobe After Effects, DaVinci Resolve, Figma.\n` +
      `- **Featured Work**: High-energy Instagram sports and awareness reels.\n\n` +
      `**Explore His Work**:\n` +
      `- [Instagram Video Profile (@dsz.ae)](https://instagram.com/dsz.ae)\n` +
      `- [Photo & Project Gallery](/gallery)`;
  }
  else if (qLower.includes('555') || qLower.includes('hardware') || qLower.includes('circuit') || qLower.includes('motor') || qLower.includes('matlab') || qLower.includes('analyzer')) {
    response = `### Hardware & Engineering Projects\n\n` +
      `Dipesh combines software logic with physical hardware prototypes:\n\n` +
      `1. **[Astable Multivibrator LED Flasher](/projects/555-flasher)**:\n` +
      `   - Hardware relaxation oscillator built with NE555 timer IC in astable mode.\n` +
      `   - Calculates RC timing networks ($T = 0.693(R_1 + 2R_2)C$) to generate stable square-wave clock switching.\n` +
      `   - Tools: Breadboard Prototyping, Proteus Simulation, Digital Circuitry.\n\n` +
      `2. **[DC Motor Modeling & PID Controller](/projects/motor-modeling)**:\n` +
      `   - Closed-loop computational feedback control simulating motor transient step responses.\n` +
      `   - Tools: MATLAB, Simulink, Control Theory.\n\n` +
      `3. **[Clinical Analyzer Diagnostics](/projects/analyzer-diag)**:\n` +
      `   - Digital state analyzer and signal integrity diagnostic toolkit for I2C, SPI, and UART protocols.`;
  }
  else if (qLower.includes('skill') || qLower.includes('stack') || qLower.includes('technology') || qLower.includes('technologies') || qLower.includes('languages') || qLower.includes('python') || qLower.includes('react') || qLower.includes('c++')) {
    response = `### Technical Competencies & Skills\n\n` +
      `Dipesh's skillset spans four areas:\n\n` +
      `- **Computer Engineering & Programming**: C, C++, Python, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Node.js, REST APIs, Git, GitHub.\n` +
      `- **AI & Intelligent Systems**: Artificial Intelligence, Machine Learning algorithms, and intelligent systems.\n` +
      `- **Creative Media & Motion**: Adobe Premiere Pro, Adobe After Effects, DaVinci Resolve, Figma, Motion Graphics, Sound Design, Color Grading.\n` +
      `- **Embedded Systems & Hardware**: Circuit Analysis, Proteus Simulation, Breadboard Prototyping, NE555 Timer Networks, DC Motor Control, Embedded Systems.\n\n` +
      ` View the interactive list of competencies on the [/skills](/skills) page.`;
  }
  else if (qLower.includes('demo') || qLower.includes('demos') || qLower.includes('live')) {
    response = `### Live Interactive Project Demos\n\n` +
      `Here are Dipesh's active production deployments:\n\n` +
      `- **[Sportivo](https://sportivo.dipeshsapkota7.com.np/)**: Live Scores & Sports Platform\n` +
      `- **[Git Visualizer](https://git-visualizer.dipeshsapkota7.com.np/)**: Interactive Git DAG Simulator & Lessons\n` +
      `- **[IOE Admission Hub](https://ioe-admission.dipeshsapkota7.com.np/)**: Rank Predictor & Engineering Counseling\n` +
      `- **[Sports Reels & Motion Content](https://instagram.com/dsz.ae)**: Short-Form Video Portfolio\n\n` +
      `All code repositories can be inspected on his [GitHub (@dszae)](https://github.com/dszae).`;
  }
  else if (qLower.includes('contact') || qLower.includes('email') || qLower.includes('hire') || qLower.includes('reach') || qLower.includes('message')) {
    response = `### Connect with Dipesh Sapkota\n\n` +
      `- **Email**: [contact@dipeshsapkota7.com.np](https://mail.google.com/mail/?view=cm&fs=1&to=contact@dipeshsapkota7.com.np)\n` +
      `- **WhatsApp**: [+977 9764685307](https://wa.me/9779764685307)\n` +
      `- **Contact Form**: Send a direct inquiry through the [/contact](/contact) page\n` +
      `- **LinkedIn**: [linkedin.com/in/dipeshsapkota7](https://linkedin.com/in/dipeshsapkota7)\n` +
      `- **GitHub**: [github.com/dszae](https://github.com/dszae)\n` +
      `- **Location**: Kathmandu, Nepal (UTC+5:45)\n\n` +
      `*Dipesh is open to computer engineering internships, technical collaborations, and select creative media engagements.*`;
  }
  else if (
    qLower.includes('who is dipesh') ||
    qLower.includes('who are you') ||
    qLower.includes('about dipesh') ||
    qLower.includes('about you') ||
    qLower.includes('tell me about dipesh') ||
    qLower.includes('education') ||
    qLower.includes('background') ||
    qLower.includes('thapathali')
  ) {
    response = `### About Dipesh Sapkota\n\n` +
      `**Dipesh Sapkota** is a Computer Engineering undergraduate student at the **Institute of Engineering (IOE), Thapathali Campus**, Tribhuvan University in Kathmandu, Nepal (Class of 2022–2026).\n\n` +
      `- **Engineering Focus**: Artificial Intelligence, Machine Learning algorithms, intelligent systems, hardware simulation, and embedded engineering.\n` +
      `- **Creative Industry**: 4+ years of professional freelance video editing and motion design for over 50 clients worldwide.\n` +
      `- **Philosophy**: Bridging analytical engineering logic with compelling visual storytelling.\n\n` +
      `Read his full story and academic timeline on the [/about](/about) and [/resume](/resume) pages.`;
  }
  else if (docs.length > 0) {
    response = `### Verified Portfolio Records\n\nHere is what I found in Dipesh's verified portfolio:\n\n` +
      docs.map(d => `**[${d.title}](${d.url})**\n${d.content.slice(0, 280)}...\n`).join('\n') +
      `\nAsk me about any specific project (e.g. *Sportivo*, *Git Visualizer*), his skills, or live demos.`;
  } else {
    response = `I am the AI assistant for Dipesh Sapkota's portfolio. You can ask me:\n\n` +
      `- **Projects**: "What is Git Visualizer?", "Tell me about Sportivo", "Show me live demos"\n` +
      `- **Skills**: "What technologies does Dipesh use?", "What programming languages does he know?"\n` +
      `- **Experience**: "Tell me about his video editing background", "Where does he study?"\n` +
      `- **Contact**: "How can I contact Dipesh?"`;
  }

const chunkSize = 25;
  for (let i = 0; i < response.length; i += chunkSize) {
    sseWriter.sendEvent('delta', { text: response.slice(i, i + chunkSize) });
  }

  sseWriter.sendEvent('done', { iterations: 1, mode: 'grounded_portfolio_rag' });
}
