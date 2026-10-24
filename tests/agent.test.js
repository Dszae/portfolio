/**
 * Automated Verification Test Suite for Dipesh Sapkota's Portfolio AI Agent.
 * Run with: node tests/agent.test.js
 */
import assert from 'node:assert/strict';
import { getKnowledgeBase, retrievePortfolioContext } from '../lib/agent/knowledge.js';
import { executeTool, ToolSchemas } from '../lib/agent/tools.js';
import { checkRateLimit } from '../lib/agent/rateLimiter.js';
import { ChatRequestSchema } from '../lib/agent/types.js';

async function runTestSuite() {
  console.log('🚀 Starting Portfolio AI Agent Verification Suite...\n');
  let passed = 0;
  let total = 0;

  async function test(name, fn) {
    total++;
    try {
      await fn();
      console.log(`  ✓ ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ ${name}:`, err.message);
    }
  }

  // 1. Knowledge Base Tests
  await test('Knowledge Base indexes projects, bio, skills, articles', async () => {
    const chunks = await getKnowledgeBase();
    assert.ok(chunks.length > 10, 'Expected at least 10 knowledge chunks');
    const categories = new Set(chunks.map(c => c.category));
    assert.ok(categories.has('profile'), 'Missing profile chunk');
    assert.ok(categories.has('projects'), 'Missing projects chunk');
    assert.ok(categories.has('skills'), 'Missing skills chunk');
  });

  await test('Hybrid Retrieval finds Git Visualizer on query "git commit graph"', async () => {
    const results = await retrievePortfolioContext('git commit graph', { topK: 3 });
    assert.ok(results.length > 0, 'Should find at least 1 chunk');
    const found = results.some(r => r.title.toLowerCase().includes('git') || r.content.toLowerCase().includes('git'));
    assert.ok(found, 'Should find Git-related documents');
  });

  await test('Hybrid Retrieval filters by category properly', async () => {
    const results = await retrievePortfolioContext('engineering', { category: 'skills', topK: 5 });
    for (const r of results) {
      assert.equal(r.category, 'skills', 'Expected only skills category chunks');
    }
  });

  // 2. Tool Execution Tests
  await test('Tool search_projects filters by technology (e.g. Next.js)', async () => {
    const res = await executeTool('search_projects', { technology: 'Next.js' });
    assert.ok(res.projects.length >= 1, 'Should find at least 1 Next.js project (Sportivo)');
    const titles = res.projects.map(p => p.title);
    assert.ok(titles.some(t => t.includes('Sportivo')), 'Sportivo should be returned');
  });

  await test('Tool get_project_details returns architecture and live links for "sportivo"', async () => {
    const res = await executeTool('get_project_details', { project_id: 'sportivo' });
    assert.equal(res.found, true);
    assert.ok(res.project.live_demo_url.includes('sportivo'), 'Live URL missing');
    assert.ok(res.project.github_repository.includes('github.com'), 'GitHub URL missing');
  });

  await test('Tool get_project_details returns error on invalid slug gracefully', async () => {
    const res = await executeTool('get_project_details', { project_id: 'non-existent-xyz' });
    assert.equal(res.found, false);
    assert.ok(res.error, 'Should return error message');
  });

  await test('Tool get_project_demo returns live URL for Git Visualizer', async () => {
    const res = await executeTool('get_project_demo', { project_id: 'git-visualizer' });
    assert.equal(res.found, true);
    assert.ok(res.live_url.includes('git-visualizer'), 'Missing demo url');
  });

  await test('Tool get_profile_information returns verified education and contact links', async () => {
    const res = await executeTool('get_profile_information', { section: 'all' });
    assert.equal(res.name, 'Dipesh Sapkota');
    assert.ok(res.education.institution.includes('Thapathali'), 'Education institution missing');
    assert.ok(res.links.portfolio.includes('dipeshsapkota7.com.np'), 'Portfolio URL missing');
  });

  await test('Tool get_contact_links returns email and social profiles', async () => {
    const res = await executeTool('get_contact_links', {});
    assert.equal(res.email, 'dsz.ae18@gmail.com');
    assert.ok(res.gmail_web_link.includes('mail.google.com'), 'Gmail web link missing');
    assert.ok(res.github.includes('dszae'), 'GitHub handle missing');
    assert.ok(res.linkedin.includes('dszae'), 'LinkedIn handle missing');
  });

  await test('Tool get_github_repository safely handles non-existent or rate-limited repo', async () => {
    const res = await executeTool('get_github_repository', { owner: 'dszae', repo: 'random-unknown-repo-12345' });
    assert.equal(res.found, false);
    assert.ok(res.message || res.error, 'Should report not found message');
  });

  // 3. Schema & Validation Tests
  await test('ChatRequestSchema validates valid payload and rejects empty/malformed messages', () => {
    const valid = ChatRequestSchema.safeParse({
      messages: [{ role: 'user', content: 'What is Sportivo?' }]
    });
    assert.equal(valid.success, true);

    const empty = ChatRequestSchema.safeParse({ messages: [] });
    assert.equal(empty.success, false);

    const badRole = ChatRequestSchema.safeParse({
      messages: [{ role: 'hacker', content: 'hello' }]
    });
    assert.equal(badRole.success, false);
  });

  // 4. Rate Limiter Tests
  await test('Rate Limiter permits standard request and decrements remaining quota', () => {
    const check1 = checkRateLimit('test-ip-user-1');
    assert.equal(check1.allowed, true);
    assert.ok(check1.remaining < check1.limit);
  });

  await test('Rate Limiter denies abusive requests exceeding maximum budget', () => {
    const abusiveIp = 'abusive-test-ip-99';
    for (let i = 0; i < 20; i++) {
      checkRateLimit(abusiveIp);
    }
    const blocked = checkRateLimit(abusiveIp);
    assert.equal(blocked.allowed, false, 'Expected abusive IP to be blocked');
    assert.equal(blocked.remaining, 0);
    assert.ok(blocked.resetInSeconds > 0);
  });

  console.log(`\n========================================`);
  console.log(`Verification Complete: ${passed}/${total} Tests Passed`);
  console.log(`========================================\n`);

  if (passed !== total) {
    process.exit(1);
  }
}

runTestSuite();

