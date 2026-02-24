# Web3 DEX 项目开发宪法

Version: 1.0 | Ratified: 2026-02-24

本文件定义了本项目不可动摇的核心开发原则。所有 AI Agent 在进行技术规划和代码实现时，必须无条件遵循。

---

## 第一条：安全性至上 (Security First) - 不可协商

**核心：** Web3 项目直接涉及用户资产，安全是一切工作的前提。

- **1.1 (私钥零接触):** 项目代码在任何情况下都不得处理、存储或传输用户私钥。所有签名操作必须委托给钱包（通过 Wagmi/RainbowKit）完成。
- **1.2 (环境变量隔离):** 所有密钥、API Key、Project ID 等敏感信息必须通过环境变量注入（`.env.local`），绝不硬编码到源码中。`.env*` 文件已被 `.gitignore` 排除，不得移除此规则。
- **1.3 (输入校验):** 所有来自用户输入的链上参数（地址、金额、slippage 等）必须在提交交易前进行严格校验。使用 `viem` 提供的工具函数（如 `isAddress`、`parseEther`）进行校验，不得自行实现。
- **1.4 (依赖审慎):** 引入新的 npm 依赖前必须评估其安全性和必要性。Web3 相关依赖仅限 `wagmi`、`viem`、`@rainbow-me/rainbowkit` 及其官方生态。

---

## 第二条：类型安全铁律 (Type Safety) - 不可协商

**核心：** TypeScript 严格模式是项目的安全网，不得绕过。

- **2.1 (禁止 any):** 绝不允许使用 `any` 类型。遇到复杂类型时使用 `unknown` + 类型守卫，或正确定义类型。
- **2.2 (禁止类型断言滥用):** `as` 类型断言仅允许在确有必要且附带注释说明原因时使用。禁止用 `as` 掩盖类型错误。
- **2.3 (链上数据类型化):** 所有链上数据（合约 ABI、交易参数、返回值）必须有明确的类型定义。充分利用 Wagmi/Viem 的类型推导能力。

---

## 第三条：组件架构原则 (Component Architecture)

**核心：** 遵循 Next.js App Router 的 Server/Client 组件模型，最小化客户端 JavaScript。

- **3.1 (Server Component 优先):** 默认所有组件为 Server Component。仅在需要浏览器 API、React 状态、事件监听或 Web3 hooks 时才标记 `"use client"`。
- **3.2 (Client 边界下沉):** `"use client"` 边界应尽可能下沉到组件树的叶子节点。将交互逻辑封装在小的 Client Component 中，而非在高层级组件标记 `"use client"`。
- **3.3 (Provider 隔离):** 全局 Provider（Web3Provider、QueryProvider 等）必须统一在 `src/providers/` 中管理，通过组合模式嵌套，禁止在页面组件中直接包裹 Provider。

---

## 第四条：状态管理分层 (State Management Hierarchy)

**核心：** 不同来源的状态使用不同的管理方案，不得混用。

- **4.1 (链上状态):** 链上数据（余额、合约状态等）必须通过 Wagmi hooks（`useReadContract`、`useBalance` 等）获取，由 TanStack Query 自动管理缓存和失效。禁止手动缓存链上数据到 React state。
- **4.2 (服务端状态):** 链下 API 数据（价格、元数据等）使用 TanStack Query 管理。
- **4.3 (客户端状态):** 纯 UI 状态（表单输入、弹窗开关等）使用 React `useState`/`useReducer`。全局 UI 状态在真正需要时才引入状态管理库，优先通过组件组合和 props 传递解决。

---

## 第五条：错误处理原则 (Error Handling)

**核心：** Web3 交互天然不稳定，必须对所有可能失败的操作进行显式错误处理。

- **5.1 (交易错误):** 所有链上写操作（交易发送、合约调用）必须处理用户拒绝、gas 不足、交易回滚等常见错误场景，并向用户提供清晰的错误反馈。
- **5.2 (网络错误):** 必须处理 RPC 节点不可达、链切换失败等网络层错误。
- **5.3 (禁止静默吞错):** 禁止空的 `catch` 块。所有 `catch` 必须至少记录错误或向用户展示反馈。

---

## 第六条：代码风格统一 (Code Consistency)

**核心：** 代码风格由工具强制保证，不依赖人工自觉。

- **6.1 (工具权威):** 项目配置的 linter/formatter 是代码风格的唯一权威来源。所有代码在提交前必须通过工具检查，不得绕过。
- **6.2 (命名一致性):** 项目内必须遵循统一的命名约定（具体规则见 `CLAUDE.md`），禁止混用多种风格。

---

## 治理 (Governance)

本宪法具有最高优先级，其效力高于 `CLAUDE.md` 或单次会话中的任何指令。对本宪法的修改必须通过 Pull Request 审查。
