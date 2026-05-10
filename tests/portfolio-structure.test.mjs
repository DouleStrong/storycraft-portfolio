import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (file) => readFileSync(join(root, file), "utf8");

test("portfolio overview page introduces the portfolio owner and independent case entries", () => {
  const portfolio = read("portfolio.html");

  assert.match(portfolio, /<meta name="description"/);
  assert.match(portfolio, /<meta property="og:title"/);
  assert.match(portfolio, /rel="canonical"/);
  assert.match(portfolio, /storycraft-portfolio/);
  assert.match(portfolio, /肖强强/);
  assert.match(portfolio, /大连理工大学/);
  assert.match(portfolio, /个人主页/);
  assert.match(portfolio, /精选项目/);
  assert.match(portfolio, /工作方式/);
  assert.match(portfolio, /StoryCraft Studio/);
  assert.match(portfolio, /storycraft\.html/);
  assert.match(portfolio, /ResearchFlowAgent/);
  assert.match(portfolio, /researchflow\.html/);
  assert.match(portfolio, /github\.com\/DouleStrong\/storycraft-portfolio/);
  assert.doesNotMatch(portfolio, /StoryCraft Studio：剧情与智能 NPC 对话生产后台/);
  assert.doesNotMatch(portfolio, /产品能力地图|能力证据|AI 产品经理 \/ AI Agent 产品方向|用可体验原型、PRD 和测试集说明 AI 产品判断/);
});

test("portfolio overview reads like a professional personal portfolio, not a user manual", () => {
  const portfolio = read("portfolio.html");

  assert.match(portfolio, /个人主页/);
  assert.match(portfolio, /肖强强/);
  assert.match(portfolio, /软件工程硕士在读/);
  assert.match(portfolio, /精选项目/);
  assert.match(portfolio, /工作方式/);
  assert.match(portfolio, /项目材料/);
  assert.match(portfolio, /产品判断/);
  assert.match(portfolio, /原型验证/);
  assert.match(portfolio, /内容生产与智能 NPC/);
  assert.match(portfolio, /研究型 Agent 工作流/);
  assert.match(portfolio, /StoryCraft Studio/);
  assert.match(portfolio, /ResearchFlowAgent/);
  assert.match(portfolio, /可验证产出/);
  assert.match(portfolio, /PRD/);
  assert.match(portfolio, /测试集/);
  assert.match(portfolio, /运行回放/);
  assert.match(portfolio, /联系与代码/);
  assert.match(portfolio, /github\.com\/DouleStrong\/storycraft-portfolio/);
  assert.doesNotMatch(portfolio, /Portfolio Notes/);
  assert.doesNotMatch(portfolio, /项目概览/);
  assert.doesNotMatch(portfolio, /建议阅读顺序|先看总览|再进案例|最后看材料|时间有限|直接进入两个 Demo|检查我有没有/);
});

test("portfolio self introduction reflects verified resume background", () => {
  const portfolio = read("portfolio.html");
  const heroStart = portfolio.indexOf('id="overview"');
  const heroEnd = portfolio.indexOf("</section>", heroStart);
  const heroOnly = portfolio.slice(heroStart, heroEnd);

  assert.match(portfolio, /大连理工大学/);
  assert.match(portfolio, /软件工程硕士在读/);
  assert.match(portfolio, /AI Agent 架构与应用/);
  assert.match(portfolio, /导师 AI Agent 平台研发/);
  assert.match(portfolio, /ACM 收录论文/);
  assert.match(portfolio, /通讯作者/);
  assert.match(portfolio, /LangGraph/);
  assert.match(portfolio, /RAG/);
  assert.match(portfolio, /FastAPI/);
  assert.match(portfolio, /SSE/);
  assert.match(portfolio, /benchmark/);
  assert.match(portfolio, /AI Agent 产品原型设计到工程落地/);
  assert.match(portfolio, /6 题 × 2 轮/);
  assert.match(portfolio, /83\.3%/);
  assert.match(portfolio, /9\.1s/);
  assert.match(heroOnly, /AI Agent 产品原型/);
  assert.match(heroOnly, /需求拆解/);
  assert.match(heroOnly, /工作流设计/);
  assert.match(heroOnly, /原型验证/);
  assert.match(heroOnly, /评测复盘/);
  assert.match(heroOnly, /PRD、测试集、benchmark 和运行回放/);
  assert.match(heroOnly, /StoryCraft Studio 关注剧情生产、角色设定和 NPC 对话体验/);
  assert.match(heroOnly, /ResearchFlowAgent 关注科研调研任务的规划、检索、审批和报告输出/);
  assert.match(heroOnly, /我保留了 Demo、文档和评测材料/);
  assert.match(heroOnly, /复盘自己的产品判断和迭代过程/);
  assert.doesNotMatch(heroOnly, /我是肖强强/);
  assert.doesNotMatch(heroOnly, /前者|后者|分别覆盖|方便查看|读者|面试官/);
  assert.doesNotMatch(portfolio, /实习经历|商业化上线|用户增长|千万级|负责人/);
});

test("portfolio project cards describe user pain points instead of presentation intent", () => {
  const portfolio = read("portfolio.html");
  const caseStart = portfolio.indexOf('id="case-overview"');
  const caseEnd = portfolio.indexOf("</section>", caseStart);
  const caseOnly = portfolio.slice(caseStart, caseEnd);

  assert.match(caseOnly, /内容团队在做互动叙事时/);
  assert.match(caseOnly, /角色设定容易漂移/);
  assert.match(caseOnly, /玩家追问时缺少稳定的上下文/);
  assert.match(caseOnly, /StoryCraft Studio 把剧情、角色和 NPC 对话放到同一条生产链路里/);
  assert.match(caseOnly, /科研调研任务常常卡在资料分散/);
  assert.match(caseOnly, /过程不可追踪/);
  assert.match(caseOnly, /ResearchFlowAgent 把任务拆解、检索、审批和报告生成串成工作流/);
  assert.doesNotMatch(caseOnly, /重点展示|如何用|支撑可信交付|而是需要/);
});

test("StoryCraft case page exposes the product case, appendix, demo, and GitHub contact", () => {
  assert.equal(existsSync(join(root, "storycraft.html")), true, "storycraft.html should exist");
  const storycraft = read("storycraft.html");

  assert.match(storycraft, /<meta name="description"/);
  assert.match(storycraft, /<meta property="og:title"/);
  assert.match(storycraft, /rel="canonical"/);
  assert.match(storycraft, /storycraft-portfolio/);
  assert.match(storycraft, /index\.html\?demo=1/);
  assert.match(storycraft, /appendix\.html/);
  assert.match(storycraft, /项目摘要|阅读路径/);
  assert.match(storycraft, /项目推进方式|独立推进/);
  assert.match(storycraft, /成果与限制/);
  assert.match(storycraft, /github\.com\/DouleStrong\/storycraft-portfolio/);
});

test("portfolio page uses the same drawer navigation as supporting pages", () => {
  const portfolio = read("portfolio.html");

  assert.match(portfolio, /class="portfolio-drawer-toggle"/);
  assert.match(portfolio, /class="portfolio-sidebar portfolio-drawer"/);
  assert.match(portfolio, /aria-label="作品集侧边导航"/);
  assert.match(portfolio, /class="portfolio-sidebar-nav"/);
  assert.doesNotMatch(portfolio, /class="portfolio-layout/);
  assert.doesNotMatch(portfolio, /class="portfolio-content"/);

  const headerStart = portfolio.indexOf('<header class="portfolio-nav">');
  const headerEnd = portfolio.indexOf("</header>", headerStart);
  const headerOnly = portfolio.slice(headerStart, headerEnd);

  assert.doesNotMatch(headerOnly, /#project-summary/);
  assert.doesNotMatch(headerOnly, /#demo-walkthrough/);
  assert.doesNotMatch(headerOnly, /#delivery-method/);
  assert.doesNotMatch(headerOnly, /#results-boundary/);
});

test("drawer project links share the same visual treatment", () => {
  const portfolio = read("portfolio.html");
  const styles = read("styles.css");

  assert.match(portfolio, /class="portfolio-sidebar-project-link" href="\.\/storycraft\.html"/);
  assert.match(portfolio, /class="portfolio-sidebar-project-link" href="\.\/researchflow\.html"/);
  assert.match(styles, /\.portfolio-sidebar-nav a\.portfolio-sidebar-project-link/);
  assert.doesNotMatch(styles, /\.portfolio-sidebar-nav a:last-child/);
});

test("portfolio first screen keeps project case paths instead of product demo paths", () => {
  const portfolio = read("portfolio.html");
  const heroStart = portfolio.indexOf('id="overview"');
  const heroEnd = portfolio.indexOf("</section>", heroStart);
  const heroOnly = portfolio.slice(heroStart, heroEnd);
  const heroActionsStart = heroOnly.indexOf('<div class="portfolio-hero-actions">');
  const heroActionsEnd = heroOnly.indexOf("</div>", heroActionsStart);
  const heroActions = heroOnly.slice(heroActionsStart, heroActionsEnd);

  assert.match(heroActions, /storycraft\.html/);
  assert.match(heroActions, /researchflow\.html/);
  assert.doesNotMatch(heroActions, /index\.html\?demo=1/);
  assert.doesNotMatch(heroActions, /prd\.html/);
  assert.doesNotMatch(heroActions, /github\.com/);
  assert.doesNotMatch(heroActions, /#product-definition/);
});

test("supporting pages remove redundant hero jump buttons", () => {
  const expectations = [
    ["appendix.html", [/prd\.html/], [/index\.html\?demo=1/, /researchflow\.html/, /github\.com/, /portfolio\.html/]],
    ["prd.html", [/docs\/storycraft-studio-prd\.md/], [/index\.html\?demo=1/, /portfolio\.html/]],
    ["researchflow.html", [/researchflow-demo\.html/], [/appendix\.html/, /github\.com/, /portfolio\.html/]],
    ["storycraft.html", [/index\.html\?demo=1/, /prd\.html/], [/researchflow\.html/, /github\.com/, /#product-definition/]],
  ];

  for (const [page, requiredPatterns, forbiddenPatterns] of expectations) {
    const html = read(page);
    const actionsStart = html.indexOf('<div class="portfolio-hero-actions">');
    const actionsEnd = html.indexOf("</div>", actionsStart);
    const actions = html.slice(actionsStart, actionsEnd);

    for (const pattern of requiredPatterns) {
      assert.match(actions, pattern);
    }

    for (const pattern of forbiddenPatterns) {
      assert.doesNotMatch(actions, pattern);
    }
  }
});

test("legacy top navigation keeps button styling if cached markup is served", () => {
  const styles = read("styles.css");

  assert.match(styles, /\.portfolio-nav nav a,\s*\.portfolio-primary-link,\s*\.portfolio-secondary-link/);
  assert.match(styles, /\.portfolio-nav nav a,\s*\.portfolio-secondary-link/);
});

test("secondary pages expose an obvious back button to the portfolio", () => {
  for (const page of ["appendix.html", "prd.html", "researchflow.html", "researchflow-demo.html", "index.html"]) {
    const html = read(page);

    assert.match(html, /class="[^"]*portfolio-back-link|class="[^"]*demo-back-link/);
    assert.match(html, /href="\.\/portfolio\.html"/);
    assert.match(html, /返回作品集/);
  }
});

test("secondary page back links stay inside sidebars instead of floating above content", () => {
  for (const page of ["storycraft.html", "appendix.html", "prd.html", "researchflow.html", "researchflow-demo.html"]) {
    const html = read(page);
    const sidebarStart = html.indexOf("data-drawer-panel");
    const sidebarTagStart = html.lastIndexOf("<aside", sidebarStart);
    const sidebarEnd = html.indexOf("</aside>", sidebarStart);
    const contentStart = html.indexOf('<header class="portfolio-nav">');
    const contentEnd = html.indexOf("</header>", contentStart);
    const sidebarOnly = html.slice(sidebarTagStart, sidebarEnd);
    const headerOnly = html.slice(contentStart, contentEnd);

    assert.match(sidebarOnly, /class="[^"]*portfolio-back-link/);
    assert.match(sidebarOnly, /返回作品集/);
    assert.doesNotMatch(headerOnly, /portfolio-back-link/);
  }
});

test("portfolio pages open sidebars as overlays without shrinking page content", () => {
  for (const page of ["portfolio.html", "storycraft.html", "appendix.html", "prd.html", "researchflow.html", "researchflow-demo.html", "index.html"]) {
    const html = read(page);

    assert.match(html, /class="portfolio-drawer-toggle"/);
    assert.match(html, /data-drawer-open/);
    assert.match(html, /class="portfolio-sidebar portfolio-drawer"/);
    assert.match(html, /data-drawer-panel/);
    assert.doesNotMatch(html, /class="portfolio-layout/);
    assert.doesNotMatch(html, /class="portfolio-content"/);
  }

  const styles = read("styles.css");
  assert.match(styles, /\.portfolio-drawer\s*{[^}]*position:\s*fixed/s);
  assert.match(styles, /\.portfolio-drawer-toggle\s*{[^}]*position:\s*fixed/s);
  assert.match(styles, /\.portfolio-sidebar:not\(\.portfolio-drawer\)\s*{/);
  assert.match(styles, /\.portfolio-shell\.has-drawer-open\s+\.portfolio-drawer/s);
  assert.match(styles, /body\.has-drawer-open\s+\.portfolio-drawer/s);
  assert.match(styles, /\.portfolio-drawer-backdrop/);
  assert.match(styles, /\.researchflow-demo-shell\s*{[^}]*width:\s*min\(1800px,\s*calc\(100vw - 40px\)\)/s);

  const script = read("portfolio-drawer.mjs");
  assert.match(script, /data-drawer-open/);
  assert.match(script, /data-drawer-close/);
  assert.match(script, /has-drawer-open/);
});

test("drawer menu button stays outside the topbar reading area", () => {
  const styles = read("styles.css");

  assert.match(styles, /--drawer-toggle-safe-area:\s*112px/);
  assert.match(styles, /\.portfolio-nav\s*{[^}]*padding-left:\s*var\(--drawer-toggle-safe-area\)/s);
  assert.match(styles, /\.figma-demo-topbar\s*{[^}]*padding-left:\s*var\(--drawer-toggle-safe-area\)/s);
  assert.match(styles, /@media \(max-width:\s*980px\)\s*{[^}]*\.portfolio-shell,\s*\.researchflow-demo-shell\s*{[^}]*padding-top:\s*var\(--drawer-toggle-safe-area\)/s);
});

test("StoryCraft demo workspace keeps a visible drawer menu after JavaScript takes over", () => {
  const app = read("app.js");
  const index = read("index.html");

  assert.match(index, /class="portfolio-drawer-toggle"/);
  assert.match(index, /data-drawer-open/);
  assert.match(index, /class="portfolio-sidebar portfolio-drawer"/);
  assert.match(index, /portfolio-drawer\.mjs/);
  assert.match(app, /demo-topbar-actions/);
  assert.doesNotMatch(app, /class="[^"]*demo-back-link/);
});

test("portfolio pages move crowded top links into drawer sidebars", () => {
  for (const page of ["portfolio.html", "storycraft.html", "appendix.html", "prd.html", "researchflow.html", "researchflow-demo.html"]) {
    const html = read(page);

    assert.match(html, /class="portfolio-sidebar portfolio-drawer"/);
    assert.match(html, /class="portfolio-sidebar-nav"/);
    assert.match(html, /aria-label="[^"]*侧边导航"/);

    const headerStart = html.indexOf('<header class="portfolio-nav">');
    const headerEnd = html.indexOf("</header>", headerStart);
    const headerOnly = headerStart >= 0 && headerEnd >= 0 ? html.slice(headerStart, headerEnd) : "";

    assert.doesNotMatch(headerOnly, /<nav/);
    assert.doesNotMatch(headerOnly, /href="#/);
  }
});

test("ResearchFlow demo avoids compressed hero typography inside the workbench", () => {
  const styles = read("styles.css");

  assert.match(styles, /\.researchflow-demo-sidebar h1/);
  assert.match(styles, /font-size:\s*clamp\(1\.45rem,\s*2\.2vw,\s*2\.2rem\)/);
  assert.match(styles, /\.researchflow-demo-board\s*{[^}]*grid-template-columns:\s*minmax\(260px,\s*0\.82fr\) minmax\(420px,\s*1\.35fr\) minmax\(240px,\s*0\.72fr\)/s);
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
  assert.match(appendix, /storycraft\.html/);
  assert.match(appendix, /index\.html\?demo=1/);
});

test("README documents the public overview, project cases, demos, appendix, and static-only boundary", () => {
  const readme = read("README.md");

  assert.match(readme, /https:\/\/doulestrong\.github\.io\/storycraft-portfolio\//);
  assert.match(readme, /portfolio\.html/);
  assert.match(readme, /storycraft\.html/);
  assert.match(readme, /researchflow\.html/);
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
  const storycraft = read("storycraft.html");
  const appendix = read("appendix.html");
  const styles = read("styles.css");
  const combined = `${storycraft}\n${appendix}`;

  assert.doesNotMatch(combined, /30 秒读懂|必须能顺畅看到核心价值|把独立想法推进成可体验产品|用可体验链路证明判断/);
  assert.match(combined, /项目概览/);
  assert.match(combined, /需求范围/);
  assert.match(combined, /验收标准/);
  assert.match(combined, /边界说明/);
  assert.match(combined, /验证方式/);
  assert.match(styles, /--portfolio-heading/);
  assert.match(styles, /\.portfolio-doc-note/);
});

test("formal PRD exists in web and markdown formats with execution-level sections", () => {
  assert.equal(existsSync(join(root, "prd.html")), true, "prd.html should exist");
  assert.equal(existsSync(join(root, "docs", "storycraft-studio-prd.md")), true, "markdown PRD should exist");

  const prdPage = read("prd.html");
  const prdMarkdown = read("docs/storycraft-studio-prd.md");
  const combined = `${prdPage}\n${prdMarkdown}`;

  for (const pattern of [
    /FR-001/,
    /目标用户/,
    /需求范围/,
    /非目标/,
    /验收标准/,
    /测试集样例/,
    /边界说明/,
    /核心流程/,
    /非功能需求/,
    /迭代计划/,
  ]) {
    assert.match(combined, pattern);
  }

  assert.match(prdPage, /docs\/storycraft-studio-prd\.md/);
  assert.match(prdPage, /index\.html\?demo=1/);
});

test("portfolio, appendix, and README link to the formal PRD", () => {
  const portfolio = read("portfolio.html");
  const storycraft = read("storycraft.html");
  const appendix = read("appendix.html");
  const readme = read("README.md");

  assert.doesNotMatch(portfolio, /prd\.html/);
  assert.match(storycraft, /prd\.html/);
  assert.match(appendix, /prd\.html/);
  assert.match(readme, /prd\.html/);
  assert.match(readme, /docs\/storycraft-studio-prd\.md/);
});

test("ResearchFlowAgent case page exists and is linked from the portfolio materials", () => {
  assert.equal(existsSync(join(root, "researchflow.html")), true, "researchflow.html should exist");

  const researchflow = read("researchflow.html");
  const portfolio = read("portfolio.html");
  const readme = read("README.md");

  for (const pattern of [
    /ResearchFlowAgent/,
    /研究型 AI Agent 工作流产品/,
    /任务理解 - 提纲规划 - 知识检索 - 人工审批 - 结构化报告输出/,
    /来源回溯/,
    /中断恢复/,
    /benchmark/,
    /完成率提升至 83\.3%/,
    /16\.5s 降至 9\.1s/,
    /2\.42 降至 1\.00/,
    /3 个研究组/,
    /边界说明/,
  ]) {
    assert.match(researchflow, pattern);
  }

  assert.match(portfolio, /researchflow\.html/);
  assert.match(readme, /researchflow\.html/);
});

test("ResearchFlowAgent static demo exists and exposes the workflow experience", () => {
  assert.equal(existsSync(join(root, "researchflow-demo.html")), true, "researchflow-demo.html should exist");
  assert.equal(existsSync(join(root, "researchflow-demo.mjs")), true, "researchflow-demo.mjs should exist");

  const demo = read("researchflow-demo.html");
  const script = read("researchflow-demo.mjs");
  const casePage = read("researchflow.html");
  const readme = read("README.md");

  for (const pattern of [
    /ResearchFlowAgent Demo/,
    /研究问题/,
    /Agent 拆解/,
    /检索来源/,
    /人工审批/,
    /结构化报告/,
    /benchmark 指标/,
    /data-demo-step/,
    /researchflow-demo\.mjs/,
  ]) {
    assert.match(demo, pattern);
  }

  for (const pattern of [/startResearchflowDemo/, /approveOutline/, /generateReport/, /renderStep/, /sourceCards/]) {
    assert.match(script, pattern);
  }

  assert.match(casePage, /researchflow-demo\.html/);
  assert.match(readme, /researchflow-demo\.html/);
});

test("ResearchFlowAgent demo includes runnable example scenarios", () => {
  const demo = read("researchflow-demo.html");
  const script = read("researchflow-demo.mjs");

  for (const pattern of [
    /项目运行效果/,
    /data-example-id="ai-coding-agent"/,
    /data-example-id="mcp-enterprise"/,
    /data-example-id="coding-tools-compare"/,
    /AI Coding Agent 选型/,
    /MCP 落地研究/,
    /工具对比研究/,
    /请研究 AI Coding Agent 在中小团队研发流程中的典型应用场景，并给出一份面向技术负责人的选型建议。/,
    /请分析 MCP 在企业级 Agent 系统中的价值、落地方式与实施风险。/,
    /请比较 Cursor、Claude Code、Codex CLI 在研发团队中的协作价值，并形成结构化建议。/,
  ]) {
    assert.match(demo, pattern);
  }

  for (const pattern of [
    /researchExamples/,
    /loadResearchExample/,
    /ai-coding-agent/,
    /mcp-enterprise/,
    /coding-tools-compare/,
    /请研究 AI Coding Agent 在中小团队研发流程中的典型应用场景/,
    /请分析 MCP 在企业级 Agent 系统中的价值/,
    /请比较 Cursor、Claude Code、Codex CLI/,
    /outlineItems/,
    /reportSections/,
  ]) {
    assert.match(script, pattern);
  }

  assert.doesNotMatch(demo, /平台信誉排序评估|智能 NPC 对话评测/);
  assert.doesNotMatch(script, /ReputationRank|StoryCraft Studio PRD|洛克王国|第五人格|王者荣耀/);
});

test("ResearchFlowAgent demo renders each workflow module as a visible product artifact", () => {
  const demo = read("researchflow-demo.html");
  const script = read("researchflow-demo.mjs");
  const styles = read("styles.css");

  for (const pattern of [
    /data-step-button="understand"/,
    /data-step-button="plan"/,
    /data-step-button="retrieve"/,
    /data-step-button="approve"/,
    /data-step-button="report"/,
    /data-step-artifact/,
    /任务理解产物/,
    /Agent 拆解产物/,
    /检索来源产物/,
    /人工审批产物/,
    /结构化报告产物/,
  ]) {
    assert.match(demo, pattern);
  }

  for (const pattern of [
    /renderStepArtifact/,
    /stepArtifacts/,
    /research-intent/,
    /outline-plan/,
    /source-review/,
    /approval-console/,
    /report-preview/,
  ]) {
    assert.match(script, pattern);
  }

  assert.match(styles, /researchflow-artifact-card/);
  assert.match(styles, /researchflow-artifact-grid/);
});

test("ResearchFlowAgent demo shows captured project run replay and quota boundary", () => {
  const demo = read("researchflow-demo.html");
  const script = read("researchflow-demo.mjs");

  for (const pattern of [
    /运行回放/,
    /本轮真实运行/,
    /检索边界/,
    /data-run-replay/,
    /data-run-status/,
    /data-run-meta/,
    /data-run-result/,
    /data-run-events/,
    /completed/,
    /arXiv 主证据源/,
    /历史 benchmark/,
    /83\.33%/,
    /9117\.5 ms/,
  ]) {
    assert.match(demo, pattern);
  }

  for (const pattern of [
    /capturedRunStatus/,
    /capturedCompletedRuns/,
    /historicalBenchmark/,
    /renderRunReplay/,
    /renderRunEvents/,
    /trace-454f0008bfd8/,
    /trace-9d8ae3df6733/,
    /trace-f445d3fc03ec/,
    /portfolio_portfolio_run_01_1778331352609/,
    /sourceCount: 5/,
    /approvalRounds: 1/,
    /portfolio_run_01/,
    /portfolio_run_02/,
    /portfolio_run_03/,
  ]) {
    assert.match(script, pattern);
  }
});

test("ResearchFlowAgent demo replays a real completed report from the original project log", () => {
  const script = read("researchflow-demo.mjs");

  for (const pattern of [
    /AI Coding Agents在中小团队研发流程中主要应用于代码生成/,
    /MCP作为连接大型语言模型与外部工具和数据的协议/,
    /在研发团队协作中，Cursor、Claude Code 和 Codex CLI 各有其独特的协作价值/,
    /执行步骤/,
    /参考来源/,
    /下一步建议/,
    /Transforming Software Development with Generative AI/,
    /MCP-Universe: Benchmarking Large Language Models/,
    /Engineering Pitfalls in AI Coding Tools/,
  ]) {
    assert.match(script, pattern);
  }

  assert.doesNotMatch(script, /403 insufficient_quota/);
});

test("PRD acceptance criteria describe product outcomes, not portfolio implementation checks", () => {
  const prdPage = read("prd.html");
  const prdMarkdown = read("docs/storycraft-studio-prd.md");
  const combined = `${prdPage}\n${prdMarkdown}`;

  for (const pattern of [/内容生产效率/, /人设一致性/, /剧情边界/, /Reviewer 通过率/, /测试集回流/]) {
    assert.match(combined, pattern);
  }

  const pageAcceptance = prdPage.slice(prdPage.indexOf('id="acceptance"'), prdPage.indexOf('id="test-set"'));
  const markdownAcceptance = prdMarkdown.slice(prdMarkdown.indexOf("## 8. 验收标准"), prdMarkdown.indexOf("## 9. 测试集样例"));
  const acceptanceOnly = `${pageAcceptance}\n${markdownAcceptance}`;

  assert.doesNotMatch(acceptanceOnly, /GitHub Pages|index\.html\?demo=1|导航栏|展示宽度|状态栏|静态展示 Demo/);
});

test("PRD core flow describes the real content production workflow", () => {
  const prdPage = read("prd.html");
  const prdMarkdown = read("docs/storycraft-studio-prd.md");
  const pageFlow = prdPage.slice(prdPage.indexOf('id="core-flow"'), prdPage.indexOf('id="functional-requirements"'));
  const markdownFlow = prdMarkdown.slice(prdMarkdown.indexOf("## 5. 核心流程"), prdMarkdown.indexOf("## 6. 功能需求"));
  const flowOnly = `${pageFlow}\n${markdownFlow}`;

  for (const pattern of [/创建或选择叙事项目/, /维护角色卡/, /生成或编辑 NPC 对话/, /单聊验证/, /Reviewer 质检/, /失败样本回流/]) {
    assert.match(flowOnly, pattern);
  }

  assert.doesNotMatch(flowOnly, /GitHub Pages|index\.html\?demo=1|展示版工作台/);
});
