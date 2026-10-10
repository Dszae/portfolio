const serverInfo = {
  name: "dipesh-sapkota-portfolio",
  version: "1.0.0"
};

const capabilities = {
  tools: { listChanged: true },
  resources: { listChanged: true },
  prompts: { listChanged: true }
};

const tools = [
  {
    name: "get_portfolio_summary",
    description: "Retrieve comprehensive developer portfolio summary in Markdown format",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "get_projects",
    description: "List engineering projects, tech stack, and case studies by Dipesh Sapkota",
    inputSchema: {
      type: "object",
      properties: {
        tag: { type: "string", description: "Filter by technology or tag" }
      }
    }
  },
  {
    name: "get_contact_info",
    description: "Get contact methods, socials, and email for Dipesh Sapkota",
    inputSchema: { type: "object", properties: {} }
  }
];

export async function GET() {
  return new Response(JSON.stringify({
    status: "active",
    protocol: "mcp",
    transport: "streamable-http",
    serverInfo,
    capabilities,
    endpoint: "https://www.dipeshsapkota7.com.np/mcp"
  }, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { id, method } = body;

    if (method === "initialize") {
      return new Response(JSON.stringify({
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2025-11-25",
          capabilities,
          serverInfo
        }
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    if (method === "tools/list") {
      return new Response(JSON.stringify({
        jsonrpc: "2.0",
        id,
        result: { tools }
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    if (method === "tools/call") {
      const { name } = body.params || {};
      let resultText = "Tool executed successfully.";
      if (name === "get_contact_info") {
        resultText = "Dipesh Sapkota | Email: dsz.ae18@gmail.com | Location: Kathmandu, Nepal | Website: https://www.dipeshsapkota7.com.np";
      } else if (name === "get_portfolio_summary") {
        resultText = "Dipesh Sapkota is a Computer Engineering student at IOE Thapathali Campus, Programmer, Video Editor, and Graphic Designer.";
      }

      return new Response(JSON.stringify({
        jsonrpc: "2.0",
        id,
        result: {
          content: [{ type: "text", text: resultText }]
        }
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    return new Response(JSON.stringify({
      jsonrpc: "2.0",
      id,
      result: {}
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch {
    return new Response(JSON.stringify({
      jsonrpc: "2.0",
      error: { code: -32603, message: "Internal error" }
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
}
