# MTU English Site — Content Plan (2026-10-22)

> Repo: `E:\mtu` → dieselpartsource.com
> 姊妹文档：`E:\mtu-cn\docs\mtu-content-plan-2026-10-22.md`（中文站）
> **两个站的缺口不是一回事，不要互相翻译。**

---

## 一、和中文站的根本差异

| 维度 | 中文站（mtupeijian.com） | 英文站（dieselpartsource.com） |
|---|---|---|
| 主战场 | 百度（2025-07 后 AI 优先生效）+ 微信搜一搜 | Google（AI Overviews 吃点击）+ Bing / IndexNow |
| 买家 | 国内船东、机务、贸易商 | 希腊/土耳其船东、中东与东南亚贸易商、新加坡修船厂、欧洲轮机长 |
| 决策链 | 微信/电话直连，当天报价 | 邮件 + 报价单 + 单证（船级社、保险、清关） |
| 信任来源 | 微信真实、件号核验、中文规格 | 可追溯性、检验报告、包装照片、付款条款、单证完整度 |
| 竞争强度 | 低（对手多是维修厂软文） | **高**（Alfa Marine 等已写深度 sourcing 指南） |
| 内容缺口 | 上游故障与保养（已补 8 篇） | **采购验证、机型深度、出口单证**（不是再写故障） |
| 已有指南 | 8 篇 | **22 篇** |
| 转化 | 微信 / 电话 | RFQ 表单 / email / WhatsApp |

**一句话**：中文站缺"懂车"，英文站缺"懂贸易"。

---

## 二、现状盘点

| 资产 | 数量 | 说明 |
|---|---|---|
| 零件页 | 1,095 | 每页含规格、供货、报价范围、交叉参考、常见问题 |
| 带 HS / 重量 / 适配机型 / 替代号 | 793 | `catalog-part-details.ts`，可用作工具页底座 |
| 指南（guides） | 22 | 已覆盖：大修 ×3、喷油器、换件、档次、油耗、过热、蓝烟、涡轮、机油消耗、气门间隙、缸盖、大修周期、大修包、2000 vs 4000、滤芯号、交叉引用核验 |
| 行业 / 应用 | 6 + 6 | 数据驱动 |
| 新闻 | 3 | 4000 沿革、IMO III/EPA Tier 4、硫含量 |

**GSC 基线**（最近一次导出）：3 个月 52 点击 / 3,570 曝光 / CTR 1.5% / 平均排名 49.3；**50–100 名 170 页占 65% 曝光、CTR 0.29%** —— 这是最该抢救的区间。

---

## 三、缺口分析：不是"再写故障"

22 篇指南已经把故障类基本铺满。真正的空白是四块：

### A. 采购与验证（对手最强，但也最容易做出差异）
英文买家在下单前要解决的是"你是不是真的、你的报价单说了什么、货怎么清关"。Alfa Marine 已经写了 sourcing guide，但**没人写中国出口端的单证与 HS 编码**——这是我们的独有视角。

### B. 机型深度（两个大系列完全没有指南）
`MTU 1163`（100 个零件）和 `MTU 956`（99 个零件）在目录里占前两位，却一篇指南都没有。这是纯粹的内容空白，且零件页已经在，只缺聚合入口。

### C. 场景（applications 只有 6 页）
渔船、拖轮、快速客渡、数据中心备电、矿卡、轨交——每个场景的故障谱与保养重点完全不同，现在只有 6 个通用页。

### D. 工具与清单（英文 B2B 最认这个）
报价单怎么读、备件清单怎么建、off-hire 询价要发什么、大修工作表怎么填。这类内容能直接提高询盘质量，减少来回确认。

---

## 四、问题池来源

| 来源 | 拿到什么 |
|---|---|
| SB Marine Mechanic《MTU Marine Diesel FAQ》（20 问） | 过载过热、巡航掉功率、derate、启动困难、燃油污染、叶轮、间歇报警、长期停放 |
| Alfa Marine sourcing guide | 旧号保留、supersession、cross-reference ≠ interchange、报价核验、包装不是唯一验证、urgent repair 要素 |
| 假冒件识别指南（EMA 口径：全球假冒柴油机零件 30–50 亿美元/年，发电机件约占 30%） | 红灯清单：低于授权价 30%+、无实体地址、拒给批次号、只用手机号 |
| easymanual 用户手册 Q&A 区 | 起动机不转、能转不来火、不到额定转速、燃烧不均、中冷温度高 |
| GSC 现有查询（待导出） | 我们已经在曝光但排 50–100 名的真实词 —— 优先级最高的一手依据 |

---

## 五、24 篇清单

### A. 采购与验证（8 篇）— 直接提升询盘质量

| # | 标题 | 意图 |
|---|---|---|
| 01 | How to Read an MTU Parts Quotation: 9 Fields to Check Before You Pay | 报价核验 |
| 02 | Counterfeit MTU Parts: What the Packaging Will Not Tell You | 真伪 |
| 03 | Superseded MTU Part Numbers: Confirming the Current Reference | 旧号换新 |
| 04 | MTU Cross-Reference: Why a Match Is Not an Interchange | 互换 |
| 05 | Incoterms for Engine Parts: FOB vs CIF vs DAP on a Vessel Repair | 到岸成本 |
| 06 | HS Codes and Export Documents for MTU Parts from China | 清关（独有） |
| 07 | Payment Terms for Engine Parts: When T/T Beats L/C | 付款 |
| 08 | Class Society Documentation for Engine Parts On Board | 验船 |

### B. 机型深度（6 篇）— 填补两个系列的空白

| # | 标题 | 备注 |
|---|---|---|
| 09 | MTU Series 1163 Parts Guide | 100 个零件，零内容 |
| 10 | MTU Series 956 Parts Guide | 99 个零件，零内容 |
| 11 | 16V 4000 M93L vs M73L: What Actually Changes | 变型差异 |
| 12 | 12V 2000 M96 vs M94: Part-Level Differences | 变型差异 |
| 13 | MTU 396 TB94 vs TE94: Identifying Your Variant | 变型识别 |
| 14 | Which MTU Series for Which Application: 2000 vs 4000 vs 396 | 选型 |

### C. 场景（6 篇）— 把 6 个应用页扩成 12 个

| # | 标题 | 买家 |
|---|---|---|
| 15 | Fishing Vessel MTU Parts: What Fails First | 东南亚船东 |
| 16 | Tugboat MTU Parts Under Continuous High Load | 拖轮运营 |
| 17 | Fast Ferry MTU 4000: Service Reality vs the Manual | 客渡 |
| 18 | Data Center Backup MTU Gensets: The Low-Load Problem | 备电集成商 |
| 19 | Mining Truck MTU Parts: Dust, Heat and Duty Cycle | 矿山 |
| 20 | Rail MTU Powerpacks: Sourcing Constraints and Lead Times | 轨交 |

### D. 工具与清单（4 篇）— 可下载，换邮箱

| # | 标题 | 形式 |
|---|---|---|
| 21 | Build a Spare Parts List for Your Vessel | 表格模板 |
| 22 | Vessel Off-Hire Inquiry: What to Send for a Same-Day Quotation | 清单 |
| 23 | How to Fill the MTU Overhaul Worksheet Correctly | 对应现有 XLSX |
| 24 | Annual Parts Budget for an MTU Engine, by Position | 估算模型 |

---

## 六、和中文站的复用规则

| 可复用 | 必须重写 |
|---|---|
| 技术事实（故障机理、零件号结构、替代逻辑） | 开场场景（换成国际船东/轮机长语境） |
| 数据字段（HS、重量、适配机型、替代号） | 单证与贸易条款（中文站不涉及） |
| 图表结构（系统流向图、决策表） | 价格与交期表述（FOB/CIF、lead time 口径） |
| — | **语气**：中文的营销式表达直译到英文会立刻失掉可信度 |

**禁止机翻**。同一事实，英文要用"我核验了什么、依据是什么"的写法，而不是"我们专业可靠"。

---

## 七、GEO：让 AI 引用你

Google AI Overviews 与 ChatGPT 类搜索越来越多地直接给答案，英文站必须做到：

1. **Answer-first**：每篇开头 40–60 词直接回答标题问题，再展开
2. **可引用单元**：每个小节自成一个"问题—答案"块，带明确结论
3. **结构化数据**：`FAQPage` / `Product` / `Offer` / `BreadcrumbList`（已有，保持）
4. **llms.txt / llm-instructions**（已有）保持更新，把新增文章写进去
5. **实体一致性**：公司名、地址、电话在 about / contact / schema / LinkedIn 四处一致

---

## 八、排期与 KPI

| 批次 | 时间 | 篇数 | 验收 |
|---|---|---|---|
| A 采购验证 | 第 1–4 周 | 8 | 每篇含 1 个可下载清单或表格；内链 ≥3 个零件页 |
| B 机型深度 | 第 5–8 周 | 6 | 每个系列页有完整零件分组与变型识别表 |
| C 场景 | 第 9–13 周 | 6 | 每篇内链到对应 applications 页与零件目录 |
| D 工具 | 第 14–16 周 | 4 | 有可下载文件，进入 RFQ 流程 |

**KPI（按 GSC 口径）**：
- 50–100 名区间的 170 页，先有 30% 进入前 30 名
- CTR 从 1.5% 提到 2.5% 以上（标题与描述重写）
- 每月 RFQ 数量（当前基线待补）
- 单个落地页的「到零件页点击率」≥ 15%

---

## 九、执行顺序建议

1. **先导 GSC 导出**，筛出「已有曝光但排 50–100 名」的词 —— 这是最便宜的一批流量，改标题与开头就能提升
2. 再做 A 组（采购验证）：竞争有对手但角度独有（中国出口端单证）
3. B 组补两个空白系列（1163 / 956）—— 内容从零到一的收益最大
4. C、D 组按客户来源排序，先做已有订单的场景
