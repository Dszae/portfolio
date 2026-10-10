import { GET as getServerCard } from '../mcp/server-card.json/route.js';

export async function GET() {
  return getServerCard();
}
