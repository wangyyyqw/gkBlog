// For Cloudflare Pages deployment, we need to move OG image generation to build time
// This API route will be removed in favor of pre-generated static images

// This is a placeholder to avoid breaking the build
export default function handler() {
  return new Response("OG Image API is not available in static export mode", {
    status: 404,
  });
}

// Add a GET config to avoid Next.js warnings
export async function GET() {
  return new Response("OG Image API is not available in static export mode", {
    status: 404,
  });
}
