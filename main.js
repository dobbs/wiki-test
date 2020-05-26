import playwright from "playwright";

class WikiClient {
  constructor(tab) {
    this.tab = tab
  }
  async site(url) { return await this.tab.goto(url); }
  async followLink(label) {
    try {
      await this.tab.$eval(`text="${label}"`, el => el.click());
    } catch (e) {
      console.log(`cannot find link labeled "${label}"`);
    }
  }
}

async function defaultContext() {
  const browser = await playwright.chromium.launch({headless:false});
  const context = await browser.newContext();
  return {browser, context};
}

export {
  WikiClient,
  defaultContext
}
