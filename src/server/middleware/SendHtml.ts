import { RequestHandler } from "express";

declare global {
  namespace Express {
    interface Response {
      sendHtml(props: HtmlProps): this
    }
  }
}

const html: (props: Pick<HtmlProps, "title" | "content">) => string = props => {

  const { title, content } = props

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>${title}</title>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
      </head>
      <body style="margin:0">
        <div id="app">${content}</div>

        <script src="/public/bundle.js"></script>
      </body>
    </html>
  `
}

export type HtmlProps = {
  status?: number

  title: string
  content: string
}
export const useSendHtml: () => RequestHandler = () =>
  (req, res, next) => {

    res.sendHtml = props => {

      const { status, ...moreProps } = props

      res.status(
        status ? status
          : 200
      ).contentType("html")
        .send(html(moreProps))

      return res;
    }

    next();
  }
