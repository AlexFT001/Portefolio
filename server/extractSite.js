import puppeteer from "puppeteer";
import fs from "fs";

const urls = [
  "http://localhost:5173/",
  "http://localhost:5173/dont",
  "http://localhost:5173/repositories"
];

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const docs = [];

  for (const url of urls) {
    await page.goto(url, { waitUntil: "networkidle0" }); // wait for React to render
    const text = await page.evaluate(() => document.body.innerText);
    docs.push({ url, text });
  }

  await browser.close();

  fs.writeFileSync("site_docs.json", JSON.stringify(docs, null, 2));
  console.log("Site content extracted!");
}

main();
