export async function GET() {
  const serverCard = {
    serverInfo: {
      name: "Dipesh Sapkota Portfolio MCP Server",
      version: "1.0.0"
    },
    endpoint: "https://www.dipeshsapkota7.com.np/mcp",
    capabilities: {
      tools: {
        listChanged: true
      },
      resources: {
        subscribe: true,
        listChanged: true
      },
      prompts: {
        listChanged: true
      }
    }
  };

  return new Response(JSON.stringify(serverCard, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}