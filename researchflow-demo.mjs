const steps = [
  {
    id: "understand",
    kicker: "01 · 任务理解",
    title: "识别研究主题与输出要求",
    status: "理解中",
    copy: "Agent 先识别用户问题中的主题、使用场景、目标受众和输出目标，避免直接生成泛化回答。",
  },
  {
    id: "plan",
    kicker: "02 · Agent 拆解",
    title: "生成可审批的研究提纲",
    status: "规划中",
    copy: "系统将复杂问题拆成问题定义、市场概览、关键判断、方案比较和行动建议，让用户在长任务开始前确认方向。",
  },
  {
    id: "retrieve",
    kicker: "03 · 检索来源",
    title: "检索并筛选可追溯证据",
    status: "检索中",
    copy: "RAG 检索会返回来源标题、地址、摘要和可信度，同时标记本轮检索覆盖与缺口。",
  },
  {
    id: "approve",
    kicker: "04 · 人工审批",
    title: "在人机协作节点控制方向",
    status: "等待审批",
    copy: "长任务中的 Agent 工具调用会被中断并等待用户确认，降低方向偏移、证据不足和误用工具的风险。",
  },
  {
    id: "report",
    kicker: "05 · 结构化报告",
    title: "沉淀可复用的研究报告",
    status: "报告完成",
    copy: "报告按摘要、关键发现、执行步骤、参考来源、下一步建议输出，便于复盘与二次决策。",
  },
];

const sharedSourceBoundary = "本轮真实运行 completed；arXiv 主证据源完成，Milvus 本地库未初始化/未命中，因此不把本地库作为证据来源。";

const researchExamples = {
  "ai-coding-agent": {
    runId: "portfolio_run_01",
    label: "AI Coding Agent 选型",
    question: "请研究 AI Coding Agent 在中小团队研发流程中的典型应用场景，并给出一份面向技术负责人的选型建议。",
    outlineItems: [
      "问题定义：中小团队需要判断 AI Coding Agent 适合介入哪些研发环节，而不是盲目替换现有流程。",
      "应用场景：代码生成、代码审查、重复任务自动化、代码库导航、测试修复和团队协作沉淀。",
      "评估维度：集成成本、上下文管理、多文件修改稳定性、隐私保护、测试验证和团队文化适配。",
      "选型建议：按局部编码、跨文件改造、终端自动化、代码审查和研发知识沉淀分层引入。",
      "落地路径：先用小范围试点定义成功指标，再进入团队规范与权限策略建设。",
    ],
    sourceCards: [
      {
        title: "Transforming Software Development with Generative AI: Empirical Insights on Collaboration and Workflow",
        meta: "arXiv · 2024-02-12 · score 0.99",
        detail: "访谈研究显示，生成式 AI 可以提升开发效率、减少重复任务，并改变敏捷团队中的学习与协作方式。",
      },
      {
        title: "Agentsway -- Software Development Methodology for AI Agents-based Teams",
        meta: "arXiv · 2025-10-26 · score 0.88",
        detail: "提出面向 AI Agent 参与研发的流程方法，强调人类编排、隐私保护和多角色 Agent 协作。",
      },
      {
        title: "Developers Perception of Peer Code Review in Research Software Development",
        meta: "arXiv · 2021-09-22 · score 0.99",
        detail: "代码审查能提升研究软件可信度，也提示 AI 辅助审查需要保留组织化流程与责任边界。",
      },
    ],
    reportSections: [
      {
        title: "研究摘要",
        text: "AI Coding Agents在中小团队研发流程中主要应用于代码生成、代码审查、任务自动化和团队协作优化。它们通过减少重复性工作、加速学习曲线和提升开发效率，显著改善研发流程。技术负责人在选型时应关注工具的集成能力、支持的协作模式、隐私保护机制及对团队文化的适应性。",
      },
      {
        title: "关键发现",
        text: "生成式 AI 工具已经从单点代码补全扩展到研发流程协作；Agentic AI 方法论进一步强调人机协作、角色分工和隐私保护；团队文化会影响工具真实收益。",
      },
      {
        title: "执行步骤",
        text: "1. 明确报告对象为技术负责人；2. 生成研究提纲；3. 检索 AI Coding Agent 应用与选型证据；4. 人工审批检索工具调用；5. 汇总形成场景、指标和落地建议。",
      },
      {
        title: "参考来源",
        text: "Transforming Software Development with Generative AI；Agentsway -- Software Development Methodology for AI Agents-based Teams；Developers Perception of Peer Code Review in Research Software Development。",
      },
      {
        title: "下一步建议",
        text: "先选择一个真实团队任务做 2 周试点，记录完成率、人工返工次数、代码审查意见和测试通过率，再决定是否推广到团队规范。",
      },
    ],
  },
  "mcp-enterprise": {
    runId: "portfolio_run_02",
    label: "MCP 落地研究",
    question: "请分析 MCP 在企业级 Agent 系统中的价值、落地方式与实施风险。",
    outlineItems: [
      "问题定义：企业级 Agent 需要安全连接数据、工具和业务系统，MCP 解决的是上下文与工具接入标准化问题。",
      "价值判断：统一协议、降低工具接入成本、增强多工具编排能力、提升调用可审计性。",
      "落地方式：先建设工具白名单、权限边界、调用日志和失败回退，再逐步开放业务工具。",
      "实施风险：未知工具空间、长上下文成本、权限误配、数据泄露、工具执行不可控和评估体系不足。",
      "治理建议：从低风险读接口开始试点，引入人工确认、审计日志和异常熔断。",
    ],
    sourceCards: [
      {
        title: "MCP-Universe: Benchmarking Large Language Models with Real-World Model Context Protocol Servers",
        meta: "arXiv · 2025-08-20 · score 0.99",
        detail: "指出真实 MCP Server 场景会带来长任务、陌生工具空间和执行评估挑战，是企业落地必须关注的风险。",
      },
      {
        title: "ANX: Protocol-First Design for AI Agent Interaction with a Supporting 3EX Decoupled Architecture",
        meta: "arXiv · 2026-04-06 · score 0.94",
        detail: "从协议优先和解耦架构角度讨论 Agent 原生交互，强调安全通信、人工确认和高信息密度交互。",
      },
      {
        title: "citecheck: An MCP Server for Automated Bibliographic Verification and Repair in Scholarly Manuscripts",
        meta: "arXiv · 2026-03-18 · score 0.99",
        detail: "提供 MCP Server 在文献引用校验场景的具体样例，适合作为低风险工具化能力的试点参考。",
      },
    ],
    reportSections: [
      {
        title: "研究摘要",
        text: "MCP作为连接大型语言模型与外部工具和数据的协议，支持多领域复杂任务的自动化执行，提升企业级Agent系统的能力。",
      },
      {
        title: "关键发现",
        text: "MCP 的价值不只是接工具，而是把工具描述、权限、调用方式和结果回传标准化；但真实落地会遇到长上下文、陌生工具空间和执行安全问题。",
      },
      {
        title: "执行步骤",
        text: "1. 识别企业 Agent 的工具接入诉求；2. 检索 MCP 基准、协议设计和具体 Server 案例；3. 审批检索调用；4. 提炼价值、落地路径和风险控制建议。",
      },
      {
        title: "参考来源",
        text: "MCP-Universe: Benchmarking Large Language Models with Real-World Model Context Protocol Servers；ANX: Protocol-First Design for AI Agent Interaction；citecheck: An MCP Server for Automated Bibliographic Verification and Repair。",
      },
      {
        title: "下一步建议",
        text: "企业可先从只读型、低敏感度工具开始 MCP 试点，建立工具白名单、调用审计、失败回退和人工确认机制后再扩展到写操作。",
      },
    ],
  },
  "coding-tools-compare": {
    runId: "portfolio_run_03",
    label: "工具对比研究",
    question: "请比较 Cursor、Claude Code、Codex CLI 在研发团队中的协作价值，并形成结构化建议。",
    outlineItems: [
      "问题定义：研发团队要比较的不是单次生成速度，而是工具能否进入可复盘、可验证、可协作的研发流程。",
      "工具定位：Cursor 偏 IDE 内编辑与局部重写；Claude Code 偏代码库理解和终端协作；Codex CLI 偏命令行任务执行和验证闭环。",
      "协作维度：上下文理解、多文件修改、测试执行、代码审查、任务交接和结果可追溯。",
      "风险维度：功能缺陷、API/配置错误、权限边界、上下文遗漏和团队规范缺失。",
      "建议策略：按任务类型组合使用，不把单一工具视为完整研发流程替代品。",
    ],
    sourceCards: [
      {
        title: "Engineering Pitfalls in AI Coding Tools: An Empirical Study of Bugs in Claude Code, Codex, and Gemini CLI",
        meta: "arXiv · 2026-03-21 · score 0.94",
        detail: "对 AI 编码工具缺陷进行经验研究，提示终端类工具在 API、集成、配置和命令执行阶段存在常见风险。",
      },
      {
        title: "Transforming Software Development with Generative AI: Empirical Insights on Collaboration and Workflow",
        meta: "arXiv · 2024-02-12 · score 0.88",
        detail: "说明 AI 工具会改变开发者求助、学习和协作方式，因此团队价值应从流程视角评估。",
      },
      {
        title: "Developers Perception of Peer Code Review in Research Software Development",
        meta: "arXiv · 2021-09-22 · score 0.99",
        detail: "代码审查研究可作为评估 AI 工具协作价值的参照：工具产出需要进入审查与验证流程。",
      },
    ],
    reportSections: [
      {
        title: "研究摘要",
        text: "在研发团队协作中，Cursor、Claude Code 和 Codex CLI 各有其独特的协作价值。Claude Code 和 Codex CLI 作为 AI 辅助编码工具，显著提升了开发效率和代码质量，但也存在功能性缺陷和集成挑战。Cursor 主要通过模型驱动开发和代码生成支持团队协作，帮助系统化代码管理。",
      },
      {
        title: "关键发现",
        text: "Cursor 更适合编辑器内高频编码和局部重写；Claude Code 更适合代码库级理解、排查和多文件协作；Codex CLI 更适合命令行驱动的任务执行、测试验证和自动化交付。",
      },
      {
        title: "执行步骤",
        text: "1. 明确比较对象和协作价值定义；2. 检索工具缺陷、团队协作和代码审查相关证据；3. 审批检索调用；4. 从任务类型、风险和落地策略形成结构化建议。",
      },
      {
        title: "参考来源",
        text: "Engineering Pitfalls in AI Coding Tools；Transforming Software Development with Generative AI；Developers Perception of Peer Code Review in Research Software Development。",
      },
      {
        title: "下一步建议",
        text: "团队可把 Cursor 作为编辑器生产力工具，把 Claude Code/Codex CLI 放入复杂任务和验证链路；配套建立任务模板、权限约束和测试门禁。",
      },
    ],
  },
};

const historicalBenchmark = {
  completionRate: "83.33%",
  medianTotalCompletionMs: "9117.5 ms",
  averageApprovalRounds: "1.00",
  beforeCompletionRate: "75.00%",
  beforeMedianTotalCompletionMs: "16498 ms",
};

const capturedCompletedRuns = {
  portfolio_run_01: {
    status: "completed",
    statusLabel: "本轮真实运行",
    completedAt: "2026-05-09 20:56:13",
    approvalRounds: 1,
    sourceCount: 5,
    totalCompletionMs: 20514,
    traceId: "trace-454f0008bfd8",
    traceIds: ["trace-44388fa05125", "trace-454f0008bfd8"],
    threadId: "portfolio_portfolio_run_01_1778331352609",
    sourceBoundary: sharedSourceBoundary,
    events: [
      {
        time: "20:55:55",
        label: "任务理解完成",
        detail: "trace-44388fa05125 识别研究主题、目标受众与报告结构。",
      },
      {
        time: "20:55:57",
        label: "等待人工审批",
        detail: "系统中断在 search_documents 工具调用前，等待用户确认检索请求。",
      },
      {
        time: "20:56:00",
        label: "检索来源返回",
        detail: "arXiv 返回 5 条主证据源；Milvus 本地库未初始化/未命中。",
      },
      {
        time: "20:56:13",
        label: "结构化报告完成",
        detail: "trace-454f0008bfd8 输出摘要、发现、执行步骤、参考来源和下一步建议。",
      },
    ],
  },
  portfolio_run_02: {
    status: "completed",
    statusLabel: "本轮真实运行",
    completedAt: "2026-05-09 20:56:39",
    approvalRounds: 1,
    sourceCount: 5,
    totalCompletionMs: 15074,
    traceId: "trace-9d8ae3df6733",
    traceIds: ["trace-1f8e37053659", "trace-9d8ae3df6733"],
    threadId: "portfolio_portfolio_run_02_1778331375176",
    sourceBoundary: sharedSourceBoundary,
    events: [
      {
        time: "20:56:24",
        label: "任务理解完成",
        detail: "Agent 将问题拆成价值、落地方式、实施风险和治理建议。",
      },
      {
        time: "20:56:27",
        label: "人工审批通过",
        detail: "用户批准围绕 MCP 企业级落地进行 arXiv + Milvus 混合检索。",
      },
      {
        time: "20:56:31",
        label: "检索来源返回",
        detail: "arXiv 返回 MCP-Universe、ANX、citecheck 等 5 条证据源。",
      },
      {
        time: "20:56:39",
        label: "结构化报告完成",
        detail: "报告形成 MCP 价值、实施路径、风险和试点建议。",
      },
    ],
  },
  portfolio_run_03: {
    status: "completed",
    statusLabel: "本轮真实运行",
    completedAt: "2026-05-09 20:57:02",
    approvalRounds: 1,
    sourceCount: 5,
    totalCompletionMs: 14118,
    traceId: "trace-f445d3fc03ec",
    traceIds: ["trace-e6b5709819c2", "trace-f445d3fc03ec"],
    threadId: "portfolio_portfolio_run_03_1778331392371",
    sourceBoundary: sharedSourceBoundary,
    events: [
      {
        time: "20:56:48",
        label: "任务理解完成",
        detail: "Agent 明确 Cursor、Claude Code、Codex CLI 的协作价值比较口径。",
      },
      {
        time: "20:56:50",
        label: "人工审批通过",
        detail: "用户批准检索 AI Coding 工具缺陷、团队协作和代码审查相关证据。",
      },
      {
        time: "20:56:55",
        label: "检索来源返回",
        detail: "arXiv 返回 Engineering Pitfalls、GenAI Workflow、Peer Code Review 等来源。",
      },
      {
        time: "20:57:02",
        label: "结构化报告完成",
        detail: "报告形成三类工具的定位、协作价值、风险和组合使用建议。",
      },
    ],
  },
};

const capturedRunStatus = capturedCompletedRuns;

const stepArtifacts = {
  understand: {
    id: "research-intent",
    title: "任务理解产物",
    items: [
      ["识别主题", "从问题中抽取研究对象、应用场景、目标受众和期望输出形式。"],
      ["目标受众", "默认面向技术负责人，报告需要偏选型建议、落地风险和执行路径。"],
      ["执行约束", "需要先规划再检索，并保留来源依据；证据不足时必须标记待解决问题。"],
    ],
  },
  plan: {
    id: "outline-plan",
    title: "Agent 拆解产物",
    items: [
      ["问题定义", "明确用户真正要判断的问题，不直接进入泛化回答。"],
      ["报告结构", "拆成问题定义、市场概览、关键信号、方案比较、建议行动五个部分。"],
      ["检索计划", "将核心概念、工具名称和落地风险转成可执行的检索关键词。"],
    ],
  },
  retrieve: {
    id: "source-review",
    title: "检索来源产物",
    items: [
      ["来源卡片", "展示标题、来源位置和证据摘要，支持用户判断是否可用于报告。"],
      ["覆盖检查", "检查来源是否覆盖工具对比、团队协作、实施风险和评估指标。"],
      ["检索边界", "本轮 arXiv 主证据源完成；Milvus 本地库未初始化/未命中，报告不伪造本地知识库证据。"],
    ],
  },
  approve: {
    id: "approval-console",
    title: "人工审批产物",
    items: [
      ["审批动作", "用户可以通过、退回或调整提纲与检索方向。"],
      ["中断恢复", "审批节点不是错误状态，而是让长任务暂停并等待人工确认。"],
      ["风险控制", "在生成最终报告前拦截方向偏移、来源不足和不适合的结论。"],
    ],
  },
  report: {
    id: "report-preview",
    title: "结构化报告产物",
    items: [
      ["研究摘要", "先给出面向决策者的直接结论。"],
      ["来源依据", "报告段落绑定来源卡，降低不可验证的 AI 总结。"],
      ["建议行动", "输出可执行试点方案、风险边界和后续待验证问题。"],
    ],
  },
};

let activeExample = researchExamples["ai-coding-agent"];

const state = {
  currentStepIndex: 0,
  started: false,
  outlineApproved: false,
  reportGenerated: false,
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function getCompletedRun() {
  return capturedCompletedRuns[activeExample.runId] ?? null;
}

function getDisplayReportSections() {
  return activeExample.reportSections;
}

function renderStep() {
  const step = steps[state.currentStepIndex];
  $("[data-stage-kicker]").textContent = step.kicker;
  $("[data-stage-title]").textContent = step.title;
  $("[data-agent-status]").textContent = state.started ? step.status : "待开始";
  $("[data-stage-copy]").textContent = state.started
    ? step.copy
    : "点击“开始拆解”后，系统会模拟 Agent 识别研究主题、输出提纲、检索来源，并等待用户审批后生成报告。";

  $$("[data-demo-step]").forEach((item, index) => {
    item.classList.toggle("is-active", index === state.currentStepIndex);
    item.classList.toggle("is-done", state.started && index < state.currentStepIndex);
  });

  $("[data-prev-step]").disabled = state.currentStepIndex === 0;
  $("[data-next-step]").disabled = state.currentStepIndex === steps.length - 1;

  renderArtifacts();
  renderStepArtifact(step.id);
  renderRunReplay();
}

function renderArtifacts() {
  const stepId = steps[state.currentStepIndex].id;
  const shouldShowOutline = state.started && ["plan", "retrieve", "approve", "report"].includes(stepId);
  const shouldShowSources = state.started && ["retrieve", "approve", "report"].includes(stepId);

  $("[data-outline-state]").textContent = shouldShowOutline
    ? state.outlineApproved
      ? "已审批"
      : "待审批"
    : "待生成";
  $("[data-outline-list]").innerHTML = shouldShowOutline
    ? activeExample.outlineItems.map((item) => `<li>${item}</li>`).join("")
    : "<li>等待 Agent 生成研究提纲</li>";

  $("[data-source-state]").textContent = shouldShowSources ? `${activeExample.sourceCards.length} 条来源` : "待检索";
  $("[data-source-cards]").innerHTML = shouldShowSources
    ? activeExample.sourceCards
        .map(
          (source) => `
            <article>
              <strong>${source.title}</strong>
              <span>${source.meta}</span>
              <p>${source.detail}</p>
            </article>
          `,
        )
        .join("")
    : "<p>完成 Agent 拆解后展示来源卡片。</p>";

  renderReport();
}

function renderReport() {
  const canGenerate = state.outlineApproved || steps[state.currentStepIndex].id === "report";
  $("[data-generate-report]").disabled = !canGenerate;
  $("[data-report-state]").textContent = state.reportGenerated ? "已生成" : canGenerate ? "可生成" : "待审批";

  if (!state.reportGenerated) {
    $("[data-report-output]").innerHTML = "<p>审批通过后生成结构化报告，包括研究摘要、关键发现、执行步骤、参考来源和下一步建议。</p>";
    return;
  }

  $("[data-report-output]").innerHTML = getDisplayReportSections()
    .map(
      (section) => `
        <article>
          <strong>${section.title}</strong>
          <p>${section.text}</p>
        </article>
      `,
    )
    .join("");
}

function renderStepArtifact(stepId = steps[state.currentStepIndex].id) {
  const artifact = stepArtifacts[stepId];
  const artifactCard = $("[data-step-artifact]");
  artifactCard.querySelector("h3").textContent = artifact.title;
  artifactCard.querySelector(".researchflow-panel-head span").textContent = artifact.id;
  artifactCard.querySelector(".researchflow-artifact-grid").innerHTML = artifact.items
    .map(
      ([title, text]) => `
        <article>
          <strong>${title}</strong>
          <p>${text}</p>
        </article>
      `,
    )
    .join("");
}

function renderRunReplay() {
  const run = getCompletedRun();
  $("[data-run-status]").textContent = run.statusLabel;
  $("[data-run-meta]").innerHTML = `
    <article>
      <span>本轮真实运行</span>
      <strong>${run.status}</strong>
      <p>${run.completedAt} · ${run.traceId} · ${run.threadId}</p>
    </article>
    <article>
      <span>运行指标</span>
      <strong>${(run.totalCompletionMs / 1000).toFixed(1)}s</strong>
      <p>来源 ${run.sourceCount} 条 · 人工审批 ${run.approvalRounds} 轮 · arXiv 主证据源</p>
    </article>
    <article>
      <span>检索边界</span>
      <strong>Milvus 未命中</strong>
      <p>${run.sourceBoundary}</p>
    </article>
    <article>
      <span>历史 benchmark</span>
      <strong>${historicalBenchmark.completionRate}</strong>
      <p>历史总完成中位耗时 ${historicalBenchmark.medianTotalCompletionMs}，平均审批轮次 ${historicalBenchmark.averageApprovalRounds}。</p>
    </article>
  `;
  renderRunEvents();
  $("[data-run-result]").innerHTML = `
    <article>
      <strong>${activeExample.runId} · ${activeExample.label}</strong>
      <p>${activeExample.question}</p>
    </article>
    ${getDisplayReportSections()
      .map(
        (section) => `
          <article>
            <strong>${section.title}</strong>
            <p>${section.text}</p>
          </article>
        `,
      )
      .join("")}
  `;
}

function renderRunEvents() {
  const run = getCompletedRun();
  $("[data-run-events]").innerHTML = run.events
    .map(
      (event) => `
        <article>
          <span>${event.time}</span>
          <strong>${event.label}</strong>
          <p>${event.detail}</p>
        </article>
      `,
    )
    .join("");
}

function startResearchflowDemo() {
  state.started = true;
  state.currentStepIndex = 1;
  state.outlineApproved = false;
  state.reportGenerated = false;
  renderStep();
}

function approveOutline() {
  state.started = true;
  state.outlineApproved = true;
  state.currentStepIndex = Math.max(state.currentStepIndex, 3);
  renderStep();
}

function generateReport() {
  state.started = true;
  state.outlineApproved = true;
  state.reportGenerated = true;
  state.currentStepIndex = 4;
  renderStep();
}

function moveStep(delta) {
  state.started = true;
  state.currentStepIndex = Math.min(Math.max(state.currentStepIndex + delta, 0), steps.length - 1);
  if (state.currentStepIndex >= 3) {
    state.outlineApproved = true;
  }
  renderStep();
}

function jumpToStep(stepId) {
  const targetIndex = steps.findIndex((step) => step.id === stepId);
  if (targetIndex < 0) return;

  state.started = true;
  state.currentStepIndex = targetIndex;
  if (targetIndex >= 3) {
    state.outlineApproved = true;
  }
  if (stepId === "report") {
    state.reportGenerated = true;
  }
  renderStep();
}

function loadResearchExample(exampleId) {
  activeExample = researchExamples[exampleId] ?? researchExamples["ai-coding-agent"];
  $("[data-question-input]").value = activeExample.question;
  state.started = true;
  state.currentStepIndex = 1;
  state.outlineApproved = false;
  state.reportGenerated = false;

  $$("[data-example-id]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.exampleId === exampleId);
  });

  renderStep();
}

function bindResearchflowDemo() {
  $("[data-start-demo]").addEventListener("click", startResearchflowDemo);
  $("[data-approve-outline]").addEventListener("click", approveOutline);
  $("[data-generate-report]").addEventListener("click", generateReport);
  $("[data-prev-step]").addEventListener("click", () => moveStep(-1));
  $("[data-next-step]").addEventListener("click", () => moveStep(1));
  $$("[data-example-id]").forEach((button) => {
    button.addEventListener("click", () => loadResearchExample(button.dataset.exampleId));
  });
  $$("[data-example-id]")[0]?.classList.add("is-active");
  $("[data-question-input]").value = activeExample.question;
  $$("[data-step-button]").forEach((button) => {
    button.addEventListener("click", () => jumpToStep(button.dataset.stepButton));
  });
  renderStep();
}

bindResearchflowDemo();

const outlineItems = researchExamples["ai-coding-agent"].outlineItems;
const reportSections = researchExamples["ai-coding-agent"].reportSections;
const sourceCards = researchExamples["ai-coding-agent"].sourceCards;

export {
  approveOutline,
  capturedCompletedRuns,
  capturedRunStatus,
  generateReport,
  historicalBenchmark,
  loadResearchExample,
  outlineItems,
  renderRunEvents,
  renderRunReplay,
  renderStep,
  renderStepArtifact,
  reportSections,
  researchExamples,
  sourceCards,
  startResearchflowDemo,
  stepArtifacts,
};
