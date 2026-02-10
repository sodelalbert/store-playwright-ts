# Store Playwright TypeScript Tests Framework

This repository contains automated tests for the Demo Web Shop application using Playwright and TypeScript.

## Installation

To run the tests you need to install `Node.js` and `npm`. Then, you can install the dependencies and playwright by running:

```bash
npm install && npx playwright install
```

## Configuration

The base URL and other configuration options are set in `playwright.config.ts`. You can modify the `baseURL` in the `use` section:

```typescript
use: {
  baseURL: 'https://demowebshop.tricentis.com/',
  headless: true,
  // ... other options
}
```
