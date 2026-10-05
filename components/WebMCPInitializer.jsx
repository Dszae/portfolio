'use client';

import { useEffect } from 'react';

export default function WebMCPInitializer() {
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.modelContext) {
      const controller = new AbortController();

      try {
        navigator.modelContext.registerTool({
          name: "get_portfolio_info",
          description: "Retrieves professional background, engineering projects, and technical skills for Dipesh Sapkota.",
          inputSchema: {
            type: "object",
            properties: {
              topic: {
                type: "string",
                description: "Specific project or skill category (e.g., IoT, programming, web)"
              }
            }
          },
          execute: async () => {
            return {
              content: [
                {
                  type: "text",
                  text: `Dipesh Sapkota is an engineering student at Thapathali Campus and a developer working with React, Next.js, Python, C++, and IoT embedded systems.`
                }
              ]
            };
          }
        });
      } catch (error) {
        console.error("Failed to register WebMCP tool:", error);
      }

      return () => {
        controller.abort();
      };
    }
  }, []);

  return null;
}