/**
 * Production Smoke Test Suite for Dipesh Sapkota's Portfolio
 * Run with: node scripts/smoke-test.js [targetUrl]
 */

const target = process.argv[2] || process.env.DEPLOY_URL || 'https://www.dipeshsapkota7.com.np';
const baseUrl = target.replace(/\/+$/, '');

const ROUTES = [
  { path: '/api/health', expectedStatus: 200, jsonCheck: (data) => data?.status === 'ok' },
  { path: '/', expectedStatus: 200 },
  { path: '/about', expectedStatus: 200 },
  { path: '/projects', expectedStatus: 200 },
  { path: '/skills', expectedStatus: 200 },
  { path: '/certificates', expectedStatus: 200 },
  { path: '/resume', expectedStatus: 200 },
  { path: '/contact', expectedStatus: 200 },
  { path: '/llms.txt', expectedStatus: 200 },
];

async function runSmokeTests() {
  console.log(`Starting smoke tests against: ${baseUrl}\n`);
  let passed = 0;
  let failed = 0;

  for (const route of ROUTES) {
    const url = `${baseUrl}${route.path}`;
    const start = Date.now();
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Portfolio-CI-SmokeTest/1.0' },
      });
      const duration = Date.now() - start;

      if (res.status !== route.expectedStatus) {
        console.error(`  FAIL [${res.status}] ${route.path} (expected ${route.expectedStatus}) in ${duration}ms`);
        failed++;
        continue;
      }

      if (route.jsonCheck) {
        const json = await res.json();
        if (!route.jsonCheck(json)) {
          console.error(`  FAIL [JSON] ${route.path} validation failed in ${duration}ms`);
          failed++;
          continue;
        }
      }

      console.log(`  PASS [${res.status}] ${route.path} (${duration}ms)`);
      passed++;
    } catch (err) {
      console.error(`  FAIL [ERR] ${route.path}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Smoke Tests Complete: ${passed}/${ROUTES.length} Passed`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runSmokeTests();
