// For Cloudflare Pages deployment, we need to handle database differently
// Since static export doesn't support server-side database connections
// We'll export a mock client for build time and handle data differently

// This is a placeholder for static export compatibility
export const prisma = null;

// For actual implementation, we would need to use a different approach
// such as pre-generating data at build time or using a REST API
