// environment.d.ts or react-app-env.d.ts
interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// To ensure this file is treated as a module, add an empty export statement
export {};