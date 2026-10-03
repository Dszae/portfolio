export async function GET() {
  const skillsIndex = {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: "portfolio-inquiry",
        type: "skill-md",
        description: "Enables automated agents to discover and query portfolio details, technical skills, and engineering projects.",
        url: "https://www.dipeshsapkota7.com.np/auth.md",
        digest: "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
      }
    ]
  };

  return new Response(JSON.stringify(skillsIndex, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}