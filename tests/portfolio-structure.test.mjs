import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (file) => readFileSync(join(root, file), "utf8");

test("portfolio page exposes the product case, appendix, demo, and GitHub contact", () => {
  const portfolio = read("portfolio.html");

  assert.match(portfolio, /<meta name="description"/);
  assert.match(portfolio, /<meta property="og:title"/);
  assert.match(portfolio, /rel="canonical"/);
  assert.match(portfolio, /storycraft-portfolio/);
  assert.match(portfolio, /index\.html\?demo=1/);
  assert.match(portfolio, /appendix\.html/);
  assert.match(portfolio, /项目摘要|阅读路径/);
  assert.match(portfolio, /项目推进方式|独立推进/);
  assert.match(portfolio, /成果与限制/);
  assert.match(portfolio, /github\.com\/DouleStrong\/storycraft-portfolio/);
});

test("appendix page contains product artifacts and validation material", () => {
  assert.equal(existsSync(join(root, "appendix.html")), true, "appendix.html should exist");

  const appendix = read("appendix.html");
  assert.match(appendix, /PRD 摘要/);
  assert.match(appendix, /测试集样例/);
  assert.match(appendix, /竞品分析/);
  assert.match(appendix, /迭代记录/);
  assert.match(appendix, /Demo 验收清单/);
  assert.match(appendix, /portfolio\.html/);
  assert.match(appendix, /index\.html\?demo=1/);
});

test("README documents the public portfolio, demo, appendix, and static-only boundary", () => {
  const readme = read("README.md");

  assert.match(readme, /https:\/\/doulestrong\.github\.io\/storycraft-portfolio\//);
  assert.match(readme, /index\.html\?demo=1/);
  assert.match(readme, /appendix\.html/);
  assert.match(readme, /静态展示/);
  assert.match(readme, /不包含后端服务/);
});

test("root page keeps portfolio redirect and demo boot behavior", () => {
  const index = read("index.html");

  assert.match(index, /window\.location\.replace\("\.\/portfolio\.html"\)/);
  assert.match(index, /isDemoRequest/);
  assert.match(index, /document\.body\.dataset\.demoBoot = "pending"/);
  assert.match(index, /data-demo-protocol/);
  assert.match(index, /demo-boot-fallback/);
});

test("case pages use restrained PRD-style language instead of promotional headlines", () => {
  const portfolio = read("portfolio.html");
  const appendix = read("appendix.html");
  const styles = read("styles.css");
  const combined = `${portfolio}\n${appendix}`;

  assert.doesNotMatch(combined, /30 秒读懂|必须能顺畅看到核心价值|把独立想法推进成可体验产品|用可体验链路证明判断/);
  assert.match(combined, /项目概览/);
  assert.match(combined, /需求范围/);
  assert.match(combined, /验收标准/);
  assert.match(combined, /边界说明/);
  assert.match(combined, /验证方式/);
  assert.match(styles, /--portfolio-heading/);
  assert.match(styles, /\.portfolio-doc-note/);
});
