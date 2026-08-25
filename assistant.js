// Injection test for the docs AI assistant (celo-org/docs#2250).
// Mintlify loads every .js file in the content directory on all pages;
// this marker verifies that works on the current plan before the real
// widget loader replaces it.
console.log('[celo-docs-assistant] custom JS injection OK');
