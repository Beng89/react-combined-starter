import * as express from 'express';
import * as React from 'react';
import * as serveStatic from "serve-static"

import { renderToString } from "react-dom/server"
import { useSendHtml } from "./middleware/SendHtml"
import { App } from '../client/App';
import { useDeviceInfo } from './middleware/DeviceInfo';
import { useLogging } from './middleware/Logging';

export function createAndRunServer({ server, logging }: AppConfig) {
  const app = express();

  app.get("/system/health", (req, res) => res.status(204).end())
  app.use("/public", serveStatic(server.staticDirectory, server.staticOptions))

  app.use(
    useLogging(logging),
    useSendHtml(),
    useDeviceInfo()
  )
  app.get("/", (req, res) => {
    const content = renderToString(React.createElement(App, {
      isMobileUserAgent: req.isMobile()
    }));

    res.sendHtml({
      status: 200,
      title: "HomePage",
      content
    })
  })

  const httpServer = app.listen(server.port,
    () => console.info(`Server is listening on port: ${server.port}`));

  return {
    app,
    server: httpServer
  }
}
