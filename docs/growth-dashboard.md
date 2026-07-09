# 增长看板 — Machining Supplier

用于追踪自然搜索与站内转化进展的**月度运营模板**，目标为 **每月 300 个询盘（RFQ）**。

**站点属性：** GA4 `G-WFJ59G7FKN` · GSC 已验证 · 网站 `https://machiningsupplier.com`

建议**每月第一个周一**更新本文件（约 15–20 分钟）。

---

## 北极星指标换算

| 指标 | 计算公式 | 目标 |
|------|----------|------|
| 月询盘数 | 表单提交次数（`rfq_form_submit`） | **300** |
| 隐含流量 @ 1.0% 转化率 | 询盘数 ÷ 0.01 | 约 30,000 次会话 |
| 隐含流量 @ 1.5% 转化率 | 询盘数 ÷ 0.015 | 约 20,000 次会话 |
| 全站转化率（CVR） | 询盘数 ÷ 自然搜索会话数 | 每月追踪 |

---

## 月度快照

> 每月复制下表一行；保留最近 12 个月，便于看趋势。

| 月份 | GSC 展示 | GSC 点击 | GSC 平均排名 | GA4 自然会话 | 询盘提交 | 全站 CVR | 备注 |
|------|---------:|---------:|-------------:|-------------:|---------:|---------:|------|
| **2026-06** | 待填 | 待填 | 待填 | 待填 | 待填 | 待填 | **基线月** — 取 GSC/GA4 最近 28 天填入 |
| YYYY-MM | 待填 | 待填 | 待填 | 待填 | 待填 | 待填 | |

**数据从哪里取**

| 字段 | 来源 | 工具内路径 |
|------|------|------------|
| 展示 / 点击 / 排名 | Google Search Console | 效果 → 搜索结果 → 可按品牌词筛选查询，或不过滤 |
| 自然会话 | GA4 | 报告 → 获客 → 流量获取 → 会话默认渠道组 = **Organic Search（自然搜索）** |
| 询盘提交 | GA4 | 探索 → 事件名称 = `rfq_form_submit`（或 `generate_lead`）→ 统计事件次数 |

---

## 漏斗阶段浏览量（GA4 探索）

追踪 `FunnelPageView.astro` 发出的页面浏览事件：

| 阶段 | GA4 事件 | 页面类型 |
|------|----------|----------|
| 认知（Awareness） | `blog_view` | 博客文章、术语表 |
| 对比（Comparison） | `comparison_page_view` | `/compare/*` |
| 选型（Selection） | `selection_guide_view` | 产品、材料、标准、供应商指南 |
| 询价（Quote） | `rfq_form_view` | `/contact/` |
| 签约（Signing） | `case_study_view` | 案例研究、认证页 |
| 服务（Service） | `resource_view` | DFM 清单、公差指南、资源页 |

### 月度漏斗表

| 月份 | blog_view | comparison_page_view | selection_guide_view | rfq_form_view | case_study_view | resource_view |
|------|----------:|---------------------:|---------------------:|--------------:|----------------:|--------------:|
| **2026-06** | 待填 | 待填 | 待填 | 待填 | 待填 | 待填 |
| YYYY-MM | 待填 | 待填 | 待填 | 待填 | 待填 | 待填 |

**走向 300 询盘的健康节奏：** 先增长 `selection` 与 `comparison` 浏览量 → 约 4–8 周后 `rfq_form_view` 跟上。

---

## 询盘质量信号

来自提交时的 GA4 事件参数（`rfq_form_submit`、`generate_lead`、`rfq_attribution`）：

| 月份 | 主要 `lead_source` | 主要 `material` | 主要 `quantity` 档位 | 平均 `touch_count` |
|------|-------------------|-----------------|----------------------|-------------------:|
| **2026-06** | 待填 | 待填 | 待填 | 待填 |
| YYYY-MM | 待填 | 待填 | 待填 | 待填 |

**联系表单来源选项**（用于与 GA4 `lead_source` 对照）：

- Google Search、Referral、LinkedIn、Trade Show、Existing Customer、Other

---

## 自然搜索 Top 着陆页

从 GSC → 网页（最近 28 天）导出。优先优化：**展示高、CTR 低**，或 **点击高、询盘少** 的页面。

| URL | 点击 | 展示 | CTR | 询盘数（手工 / GA4 着陆页） | 行动项 |
|-----|-----:|-----:|----:|---------------------------:|--------|
| `/contact/` | 待填 | 待填 | 待填 | 待填 | |
| `/compare/` | 待填 | 待填 | 待填 | 待填 | |
| Top 博客支柱页 | 待填 | 待填 | 待填 | 待填 | |
| Top 产品页 | 待填 | 待填 | 待填 | 待填 | |
| Top 案例页 | 待填 | 待填 | 待填 | 待填 | |

---

## 内容与索引健康度

| 检查项 | 当前基线 | 月度目标 |
|--------|----------|----------|
| 可索引博客文章 | 约 37 篇 | 每月新增 4–6 篇可索引内容 |
| noindex 博客文章 | 约 67 篇 | 不新增薄内容 / listicle |
| Sitemap 排除 noindex 博客 | 是（`sitemap-exclude.ts`） | 每次部署后核对 |
| 案例含 `proof` 块 | **18 / 18**（全覆盖） | 每月刷新 2 个案例的实测数据 |
| 对比页缺少 `blogSlug` | 0（已全部关联） | 新对比页发布时同步关联 |
| 行业合规证明链 | 5 条 standards ↔ 案例 | 每月深化 1 条行业线 |

---

## 站外权威（手工记录）

要做到 300 询盘/月，站外信号必不可少。每月记录：

| 月份 | 新增引用域名 | LinkedIn 发帖 | 客座文章 / 目录收录 | 备注 |
|------|-------------:|--------------:|--------------------|------|
| **2026-06** | 待填 | 待填 | 待填 | 基线月 |
| YYYY-MM | 待填 | 待填 | 待填 | |

**站点待补齐项（就绪后勾选）**

- [ ] 在 `src/data/site.ts` 填写 `site.social.linkedin`（公司页 URL）
- [ ] ISO 证书编号 / 发证机构 → `quality.iso9001CertNumber` / `iso9001CertBody`
- [x] YouTube 工厂 tour 链接 → `site.social.youtube`（与首页视频 ID 一致；有频道后可改为频道 URL）

---

## 里程碑门槛

| 阶段 | 月自然会话 | 月询盘 | 典型时间线 |
|------|-----------:|-------:|------------|
| 基线 | 记录实际值 | 记录实际值 | 第 0 月 |
| 起量 | 2,000+ | 20–40 | 第 3–6 月 |
| 放大 | 8,000+ | 80–120 | 第 9–12 月 |
| 目标 | 20,000+ | **300** | 第 15–24 月 |

**诊断逻辑：**

- 展示涨、询盘不涨 → 优化 **转化率（CVR）**（信任背书、案例、RFQ 页）
- 展示不涨 → 优化 **权威度**（外链、LinkedIn、可索引内容体量）

---

## 每月审计 / 验证类内容模板（4 篇/月）

> 避免 listicle 同质化。每篇必须回答「采购内审时会问什么」，并内链到案例、对比页或 `/resources/inspection-samples/`。

| 周 | 主题类型 | 标题公式 | 必含模块 | 内链目标 |
|----|----------|----------|----------|----------|
| W1 | 供应商审计 | How to audit a CNC supplier for {industry} | 检查清单 8–12 条、红旗 3–5 条、样例文档要求 | `/certifications/` + 1 案例 |
| W2 | 文档验证 | What to request on PO: {CMM / FAI / EN 10204} | 文档结构说明、常见造假红旗、RFQ 措辞 | `/resources/inspection-samples/#anchor` |
| W3 | 合规选型 | {Standard} machining: what buyers verify | 标准要点、检验深度、首单风险 | `/standards/{slug}/` + 对比页 |
| W4 | 案例深化 | Lessons from {material/process} project | 挑战→方案→**实测 outcome**（数字） | `/case-studies/{slug}/` |

**发布前自检（5 项）**

1. 有至少 1 个可核实数字（公差、Cpk、交期、废品率区间）
2. 无「best/top supplier」标题
3. 链到 1 个案例 + 1 个工具页（对比 / 资源 / 标准）
4. `intent: informational` 或 `commercial`，标签含 `quality` 或 `sourcing`
5. Copyscape 抽检重复率 &lt; 25%

---

## 每月 30 分钟检查清单

1. [ ] 填写上方「月度快照」表
2. [ ] 导出 GSC Top 20 查询词 — 是否有新排名机会？
3. [ ] 查看 GA4 `rfq_form_submit` 按着陆页分布
4. [ ] 检查 3 个展示最高但 CTR &lt; 2% 的页面 — 改写标题 / meta
5. [ ] 发布或深化 1 篇支柱相关内容（博客、案例或对比页）
6. [ ] 记录 2 项以上站外动作（LinkedIn、外链、目录）
7. [ ] 若改动 sitemap / 内容，运行 `npm run build` 并确认已部署

---

## GA4 快速配置：询盘漏斗探索

1. **探索 → 漏斗探索（Funnel exploration）**
2. 步骤：`session_start`（自然搜索）→ `comparison_page_view` 或 `selection_guide_view` → `rfq_form_view` → `rfq_form_submit`
3. 细分维度：着陆页（Landing page）
4. 保存为 **「Organic RFQ Funnel」**

---

## 修订记录

| 日期 | 变更 |
|------|------|
| 2026-06-15 | 初版看板；实现 sitemap 排除 noindex 博客 |
| 2026-06-15 | 全文汉化 |
| 2026-06-15 | P0：2026-06 基线行；看板纳入 git；修复 features 详情页模板；Footer 社交链；YouTube sameAs |
