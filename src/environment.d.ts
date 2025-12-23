// environment.d.ts or react-app-env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_API_URL: string;
    // Add other variables here as needed
  }
}

// To ensure this file is treated as a module, add an empty export statement
export {};