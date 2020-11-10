// import serialize from "serialize-javascript";
import { minify } from 'html-minifier';

export default (
    head: Record<string, any>,
    { styles, js }: any,
    htmlContent: string,
): any => {
    const html = `
    <!doctype html>
    <html ${head.htmlAttributes.toString()}>
      <head>
        <meta charset="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <!--[if IE]>
          <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
        <![endif]-->

        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />

        ${head.title.toString()}
        ${head.base.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}

        <!-- Insert bundled styles into <link> tag -->
        ${styles}
      </head>
      <body>
        <!-- Insert the router, which passed from server-side -->
        <div id="react-view">${htmlContent}</div>

        <!-- Store the initial state into window -->
        <script>
          // Use serialize-javascript for mitigating XSS attacks. See the following security issues:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
        </script>

        <!-- Insert bundled scripts into <script> tag -->
        ${js}
        ${head.script.toString()}
      </body>
    </html>
  `;

    // html-minifier configuration, refer to "https://github.com/kangax/html-minifier" for more configuration
    const minifyConfig = {
        collapseWhitespace: true,
        removeComments: true,
        trimCustomFragments: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
    };

    // Minify html in production
    return __DEV__ ? html : minify(html, minifyConfig);
};
