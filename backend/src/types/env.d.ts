import "@types/node"
import "process"

declare module "process" {
    export interface ProcessEnv {
      JWT_SECRET: string
      REFRESH_SECRET: string
      DB_URL: string
      NODE_ENV: "development" | "production"
    }
}

// declare global {
//   namespace NodeJs {
//     interface ProcessEnv {
//       JWT_SECRET: string;
//       REFRESH_SECRET: string;
//       DB_URL: string;
//       NODE_ENV: 'development' | 'production';
//     }
//   }
// }
// export {};
