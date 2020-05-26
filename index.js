// Set options as a parameter, environment variable, or rc file.
// eslint-disable-next-line no-global-assign
require = require("esm")(module/* , options */)
module.exports = require("./main.js")

const repl = require("repl");
const active = repl.start();
(async () => {
  console.log(`Wiki test console is starting...

explore the federation with the following commands:
  wiki.followLink('Start Playing Wiki');
  wiki.site('http://fed.wiki.org');

explore the playwright API:
  https://github.com/microsoft/playwright/blob/master/docs/api.md

  wiki.tab.goBack();
  wiki.tab.goForward();
  (await wiki.tab.$('a')).innerHTML();
  Promise.all((await wiki.tab.$$('a')).map(a => a.innerHTML()));
`);
  const {WikiClient, defaultContext} = module.exports;
  const {browser, context} = await defaultContext();
  active.on("exit", _ => {
    browser.close();
    process.exit();
  });
  active.context.wiki = new WikiClient(await context.newPage());
  await active.context.wiki.site('http://start.fed.wiki/welcome-visitors.html');
})();
