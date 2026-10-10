import { GET as getServerCard } from '../server-card.json/route.js';

export async function GET() {
  return getServerCard();
}

