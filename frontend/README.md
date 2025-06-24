# 前端目录结构

这个目录包含了项目的前端文件，这是一个简单的静态网站介绍页面。

## 目录结构

```
frontend/
├── assets/          # 静态资源文件
│   ├── favicon.ico  # 网站图标
│   └── logo.svg     # 项目 Logo
├── pages/           # HTML 页面
│   └── index.html   # 主页（网站介绍）
└── styles/          # 样式文件
    └── styles.css   # 主样式文件
```

## 文件说明

### 页面文件 (pages/)

- `index.html` - 项目主页，简单的网站介绍页

### 样式文件 (styles/)

- `styles.css` - 全局样式文件，使用现代 CSS 特性和响应式设计

### 静态资源 (assets/)

- `favicon.ico` - 网站图标
- `logo.svg` - 项目 Logo，支持 SVG 格式

## 路径说明

HTML 文件中的资源引用路径：

- CSS: `../styles/styles.css`
- 图标: `../assets/favicon.ico`
- Logo: `../assets/logo.svg`

## 设计特点

- **简洁明了**：专注于项目介绍，去除复杂功能
- **响应式设计**：支持各种设备尺寸的良好显示
- **现代化样式**：使用 CSS 变量、渐变背景等现代特性
- **易于维护**：结构清晰，代码简洁

## 技术栈展示

页面展示了该项目使用的主要技术：

- Bun 运行时
- TypeScript
- 现代 CSS
- RESTful API

## 构建和部署

前端文件会被 Bun 运行时直接处理，支持：

- 静态文件服务
- 开发模式优化
- 自动类型检查
