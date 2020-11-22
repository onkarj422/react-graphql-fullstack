// import serialize from "serialize-javascript";
import { minify } from 'html-minifier';

export default (
    head: Record<string, any>,
    { styles, js }: any,
    htmlContent: string,
    muiCss: any,
): any => {
    const html = `
    <!doctype html>
    <html ${head.htmlAttributes.toString()}>
      <head>
        <meta charset="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <!--[if IE]>
          <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
        <![endif]-->

        ${head.title.toString()}
        ${head.base.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}

        <!-- Insert bundled styles into <link> tag -->
        <style id="jss-server-side">${muiCss}</style>
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
