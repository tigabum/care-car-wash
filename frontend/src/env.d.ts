declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly REACT_APP_API_URL: string;
      // Add other env variables here
    }
  }
}

export {};
