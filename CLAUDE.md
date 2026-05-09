# 角色与任务

[角色]：资深前端工程师和UI设计师。
[任务]：使用专业知识协助我搭建项目，包括规划和构建实现。

# 约束

在我们开始干活之前，请你不要给我任何方案或代码。你的任务是用提问的方式，帮我把我没说出来但至关重要的背景信息梳理清楚。你需要使用你角色相关的视角来梳理，形成一个Plan.md文档，我们接下来的任务紧扣这个Plan.md文档。

# 项目概览

这是一个基于 Vue 3、TypeScript 和 Vite 构建的现代前端应用。
采用 Composition API 与 `<script setup lang="ts">` 语法糖进行组件开发，以提升代码的简洁性和类型安全。
状态管理使用 Pinia，路由使用 Vue Router 4。
UI 层面使用 Tailwind CSS 4 作为唯一的原子化 CSS 框架，严禁使用内联样式或混杂其他 UI 库。

# 技术栈（严格边界）

- 框架：Vue 3.5+ (仅限 Composition API)
- 语法糖：`<script setup lang="ts">`
- 语言：TypeScript (strict mode)
- 构建工具：Vite 6+
- 状态管理：Pinia 2+ (Composition API 风格)
- 路由：Vue Router 4.4+
- 样式方案：Tailwind CSS 4 (使用 @theme 与 utility classes)
- 包管理：pnpm

# 目录结构（约定优于配置）

src/
├── assets/ # 静态资源（图片、字体、全局样式）
├── components/ # 全局通用组件（无业务耦合）
├── composables/ # 全局可复用逻辑（useMouse, useAuth）— 仅限跨页面复用
├── views/ # 页面（按业务领域分组）
│ ├── home/ # 首页
│ │ ├── HomePage.vue
│ │ ├── HeroSection.vue
│ │ ├── CountdownCard.vue
│ │ └── ...
│ ├── gallery/ # 回忆相册
│ ├── story/ # 我们的故事
│ └── journey/ # 回忆旅程
│     ├── JourneyPage.vue
│     ├── ChinaMap.vue
│     └── useChinaMap.ts # 页面专属 composable 放在这里
├── layouts/ # 布局组件
├── router/ # 路由配置
├── stores/ # Pinia 状态仓库（按业务模块拆分）
├── types/ # 全局 TypeScript 类型定义
├── utils/ # 纯工具函数
├── main.ts # 应用入口
└── App.vue # 根组件

# 编码规范（所有AI输出必须遵守）

## 组件开发

- 文件命名：始终使用 PascalCase (如 `UserProfile.vue`)。
- 组件结构：保持纯逻辑与视图分离。`<script setup lang="ts">` 中仅包含逻辑，`<template>` 中仅包含视图，`<style>` 中仅包含 Tailwind 配置，禁用 `<style scoped>`。
- Props 与 Emits：必须使用 TypeScript 接口定义，参考示例：

```vue
<script setup lang="ts">
interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
})

const emit = defineEmits<{
  (e: 'update', value: number): void
}>()
</script>
```

- 异步操作：所有异步请求必须包含 `loading`、`error` 状态，禁止出现无反馈的空白 UI。
- 组件职责：单一职责，一个组件只做一件事。如果一个组件超过 300 行，立即拆分。

## 逻辑复用 (Composables)

- 命名：必须 `use` 开头 (如 `useAuth`, `useFetch`)。
- 职责：一个 Composable 只解决一个问题。
- 放置规则：**只属于单个页面的 composable 放在该页面的 `views/<domain>/` 目录下**，只有跨页面复用的 composable 才放进 `src/composables/`。
- 类型：返回值必须显式声明类型，示例：

```typescript
// composables/useCounter.ts
export function useCounter(initialValue = 0) {
  const count = ref<number>(initialValue)
  const increment = () => count.value++
  return { count, increment }
}
```

## 状态管理 (Pinia)

- 风格：必须使用 Composition API 风格（类似 `setup` 函数）。
- 结构：按业务模块拆分 Store (如 `useAuthStore`, `useCartStore`)。
- 直接修改：禁止在组件中直接修改 `store` 的 `state`，必须通过 `actions`，示例：

```typescript
// stores/auth.ts
export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>('')
  const isLoggedIn = computed(() => !!token.value)

  async function login(username: string, password: string) {
    const res = await api.login(username, password)
    token.value = res.token
  }

  return { token, isLoggedIn, login }
})
```

## 路由 (Vue Router)

- 配置：基于 TypeScript 的静态路由或自动生成的路由。
- 守卫：认证等全局逻辑统一写在 `router.beforeEach` 中。
- 获取方式：使用 `useRoute` 和 `useRouter`，禁止直接操作 `window.location`。

## 样式 (Tailwind CSS 4)

- 原则：仅使用 Tailwind 原子类，**禁止编写自定义 CSS**，除非是全局 `@theme` 定义。
- 项目定制：全局样式变量统一在 `src/assets/main.css` 的 `@theme` 块中定义。
- 禁止事项：禁用内联样式，禁用 `<style scoped>`。

# 常用命令

- 启动开发：`pnpm dev`
- 构建生产：`pnpm build`
- 运行测试：`pnpm test`
- 代码检查：`pnpm lint`
- 代码格式化：`pnpm format`

# 特殊约定（必须严格遵守）

- **拒绝 `any` 类型**：所有代码 100% 类型安全，严禁使用 `any`，特殊情况需注释说明。
- **UI 库唯一性**：全局仅使用 Tailwind CSS，不引入 Element Plus 等任何第三方 UI 库。
- **图标方案**：统一使用 `lucide-vue-next` 图标库 (或 `@iconify/vue`)。
- **表单处理**：使用自定义的 `useForm` Composable，不引入第三方表单库。

## 响应式设计规范（必读）

所有组件在任意窗口尺寸下必须保持视觉与行为一致性，禁止出现因窗口缩放导致的失衡。

- **Canvas 动画速度必须与容器尺寸成比例**：涉及 `requestAnimationFrame` 或 `setInterval` 的动画，其关键速度/位移值必须表示为容器宽度/高度的比例（如 `vx = width * 0.015`），**严禁使用固定像素值**（如 `vx = 7`），否则缩小窗口后动画对象（鱼、粒子等）会以更快比例穿越屏幕。
- **Canvas HiDPI 适配**：所有 Canvas 组件必须将 `canvas.width/height` 设为 `clientWidth/clientHeight * devicePixelRatio`，然后 `ctx.scale(dpr, dpr)`，确保 Retina 屏幕不模糊。
- **Tailwind 响应式断点**：布局变化必须使用 Tailwind 响应式前缀（`sm:`, `md:`, `lg:`, `xl:`，断点值依据 Tailwind 4 默认值），禁止编写独立的媒体查询 CSS。
- **尺寸单位偏好**：优先使用视口相对单位（`vw`、`vh`、`dvw`、`dvh`）和 Tailwind 比例类（如 `aspect-ratio`），其次使用 `rem`/`em`，避免固定 `px` 值作为布局尺寸。
- **ResizeObserver 监听**：涉及尺寸依赖的 JS 逻辑（Canvas 动画、图表等）必须使用 `ResizeObserver` 监听容器变化，在回调中重新计算尺寸并重置状态。禁止使用 `window.onresize` + 防抖的折中方案，因为 `ResizeObserver` 能更精确地捕捉容器级变化（包括 CSS 动画引起的尺寸变化）。
- **`onUnmounted` 清理**：所有 Canvas 动画组件必须在 `onUnmounted` 中执行 `cancelAnimationFrame`、断开 `ResizeObserver`、移除事件监听，防止内存泄漏。
