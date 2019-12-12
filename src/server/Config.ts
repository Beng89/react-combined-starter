import { join } from "path";
import { ServeStaticOptions } from "serve-static";
import { LoggingOptions } from "./middleware/Logging";

declare global {
  type AppConfig = typeof Config
}

export const Config = {
  server: {
    port: 3000,
    staticDirectory: join(process.cwd(), "dist"),
    staticOptions: {

    } as ServeStaticOptions
  },
  logging: {
    format: "common",
    options: {

    }
  } as LoggingOptions
}
