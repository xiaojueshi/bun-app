# Bun Web 全栈框架

一个基于 Bun 运行时构建的现代化全栈 Web 框架，采用类似 NestJS 的设计模式，支持装饰器、依赖注入、模块化架构和静态文件服务。

## ✨ 特性

### 🚀 核心功能

- **高性能**: 基于 Bun 运行时，启动速度快，性能优异
- **装饰器支持**: 使用装饰器定义控制器、服务和模块
- **依赖注入**: 内置依赖注入容器，支持服务自动解析
- **模块化架构**: 采用模块化设计，便于组织和维护代码
- **TypeScript**: 完整的 TypeScript 支持和类型安全

### 🌐 全栈开发

- **静态文件服务**: 支持 HTML、CSS、JavaScript、TypeScript 的自动打包和服务
- **热重载**: 开发模式下的实时热重载，提升开发效率
- **前端构建**: 自动处理 `<script>` 和 `<link>` 标签，支持 TypeScript/JSX 转译
- **可执行文件**: 支持打包为单一可执行文件，便于部署

### 🔧 开发工具

- **CORS 支持**: 内置 CORS 支持，便于前后端分离开发
- **守卫系统**: 内置认证守卫和权限控制系统
- **异常过滤器**: 统一异常处理和错误响应格式化
- **数据验证**: 内置数据验证管道和 DTO 支持
- **现代化 API 文档**: 基于 Scalar 的美观 API 文档界面，支持在线测试

## 📦 安装依赖

```bash
bun install
```

## 🚀 运行项目

### 开发模式（热重载）

```bash
bun run dev
```

启动后可访问：

- 🏠 主页: http://localhost:3000
- 📊 仪表板: http://localhost:3000/dashboard
- 📖 API 文档: http://localhost:3000/docs

### 生产模式

```bash
bun run start
```

### 构建项目

```bash
# 构建为 JavaScript 包
bun run build

# 构建为可执行文件（开发版）
bun run build:exe

# 构建为可执行文件（生产版，压缩优化）
bun run build:exe-prod
```

### 预览可执行文件

```bash
# 构建并运行可执行文件
bun run build:exe
bun run preview
```

## 📁 项目结构

```
bun-app/
├── src/                        # 后端源代码
│   ├── common/                 # 通用模块
│   │   ├── decorators/         # 装饰器
│   │   ├── container/          # 依赖注入容器
│   │   ├── application/        # 应用程序核心
│   │   ├── core/               # 核心工具
│   │   ├── guards/             # 守卫接口
│   │   ├── filters/            # 异常过滤器
│   │   ├── pipes/              # 数据管道
│   │   ├── swagger/            # API 文档
│   │   └── index.ts            # 通用模块导出
│   ├── modules/                # 业务模块
│   │   └── user/               # 用户模块
│   │       ├── dto/            # 数据传输对象
│   │       ├── guards/         # 用户模块守卫
│   │       ├── user.controller.ts
│   │       ├── user.service.ts
│   │       └── user.module.ts
│   ├── app.module.ts           # 根模块
│   └── main.ts                 # 应用入口
├── frontend/                   # 前端文件目录 ✨ 已重新整理
│   ├── assets/                 # 静态资源
│   │   ├── favicon.ico         # 网站图标
│   │   └── logo.svg            # 应用图标
│   ├── components/             # 前端组件
│   │   ├── app.ts              # 主页应用逻辑
│   │   └── dashboard.ts        # 仪表板逻辑
│   ├── pages/                  # HTML 页面
│   │   ├── index.html          # 主页
│   │   └── dashboard.html      # 仪表板页面
│   ├── styles/                 # 样式文件
│   │   └── styles.css          # 主样式文件
│   └── README.md               # 前端目录说明
├── dist/                       # 构建输出目录 ✨
├── package.json
├── tsconfig.json
└── README.md
```

## 🌐 全栈开发

> **✨ 前端文件已重新整理！** 所有前端相关文件现在都统一放在 `frontend/` 目录下，提供更清晰的项目结构和更好的文件组织。

### 新前端目录结构

- `frontend/assets/` - 静态资源（图标、图片等）
- `frontend/components/` - 前端 TypeScript 组件
- `frontend/pages/` - HTML 页面文件
- `frontend/styles/` - CSS 样式文件

### 静态路由配置

框架支持通过导入 HTML 文件来配置静态路由：

```typescript
// src/main.ts
import indexHtml from "../frontend/pages/index.html";
import dashboardHtml from "../frontend/pages/dashboard.html";

const app = ApplicationFactory.create(AppModule, {
  staticRoutes: [
    { path: "/", html: indexHtml }, // 主页
    { path: "/dashboard", html: dashboardHtml }, // 仪表板
  ],
  // 静态文件目录
  staticDir: "frontend/assets",
  development: {
    hmr: true, // 启用热重载
    console: true, // 启用控制台日志
  },
});
```

### 前端资源处理

- **自动打包**: HTML 文件中的 `<script>` 和 `<link>` 标签会被自动处理
- **TypeScript 支持**: 前端 TypeScript 文件会被自动转译
- **热重载**: 开发模式下，前端文件修改会触发自动刷新
- **静态文件**: `static/` 目录下的文件可直接访问

### 示例 HTML 文件

```html
<!DOCTYPE html>
<html>
  <head>
    <title>我的应用</title>
    <link rel="stylesheet" href="../styles/styles.css" />
    <link rel="icon" href="../assets/favicon.ico" type="image/x-icon" />
  </head>
  <body>
    <div id="app">
      <img src="../assets/logo.svg" alt="Logo" />
      <h1>Hello World</h1>
    </div>
    <script type="module" src="../components/app.ts"></script>
  </body>
</html>
```

Bun 会自动：

1. 转译 TypeScript 文件
2. 打包和压缩资源
3. 生成内容哈希以支持缓存
4. 重写文件路径

## 📦 可执行文件打包

### 构建单一可执行文件

框架支持将整个应用打包为单一的可执行文件，便于部署：

```bash
# 开发版本（包含调试信息）
bun run build:exe

# 生产版本（压缩优化）
bun run build:exe-prod
```

### 部署

```bash
# 复制可执行文件到服务器
scp ./dist/bun-app user@server:/path/to/deployment/

# 复制静态资源（如果需要）
scp -r ./static user@server:/path/to/deployment/
scp -r ./public user@server:/path/to/deployment/

# 在服务器上运行
./bun-app
```

### 特性

- ✅ **单文件部署**: 无需安装 Node.js 或 Bun 运行时
- ✅ **跨平台**: 支持 Linux、macOS、Windows
- ✅ **静态资源嵌入**: HTML 和前端资源会被自动嵌入到可执行文件中
- ✅ **极速启动**: 冷启动时间极短
- ✅ **内存效率**: 运行时内存占用低

## 🎯 快速开始

### 1. 创建服务

```typescript
import { Injectable } from "@/common";

@Injectable()
export class UserService {
  private users = [{ id: 1, name: "张三", email: "zhangsan@example.com" }];

  findAll() {
    return this.users;
  }

  findById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(userData: any) {
    const newUser = {
      id: this.users.length + 1,
      ...userData,
    };
    this.users.push(newUser);
    return newUser;
  }
}
```

### 2. 创建控制器

```typescript
import { Controller, Get, Post, Param, Body, UseGuards } from "@/common";
import { UserService } from "./user.service";
import { AuthGuard } from "./guards/auth.guard";

@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return {
      success: true,
      data: this.userService.findAll(),
    };
  }

  @Get("/:id")
  @UseGuards(AuthGuard)
  async getUserById(@Param("id") id: string) {
    const userId = parseInt(id);
    const user = this.userService.findById(userId);

    return {
      success: true,
      data: user,
    };
  }

  @Post()
  createUser(@Body() userData: any) {
    const newUser = this.userService.create(userData);
    return {
      success: true,
      data: newUser,
    };
  }
}
```

### 3. 创建模块

```typescript
import { Module } from "@/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthGuard } from "./guards/auth.guard";

@Module({
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService],
})
export class UserModule {}
```

### 4. 在根模块中导入

```typescript
import { Module } from "@/common";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

## 🔧 可用装饰器

### 类装饰器

- `@Injectable()` - 标记可注入的服务类
- `@Controller(path?)` - 标记控制器类并设置路由前缀
- `@Module(metadata)` - 定义模块及其元数据

### 方法装饰器

- `@Get(path?)` - 定义 GET 路由
- `@Post(path?)` - 定义 POST 路由
- `@Put(path?)` - 定义 PUT 路由
- `@Delete(path?)` - 定义 DELETE 路由
- `@Patch(path?)` - 定义 PATCH 路由

### 功能装饰器

- `@UseGuards(...guards)` - 应用守卫进行权限控制
- `@UseFilters(...filters)` - 应用异常过滤器
- `@Catch(...exceptions)` - 标记异常过滤器捕获的异常类型

### 参数装饰器

- `@Param(key?)` - 获取路径参数
- `@Query(key?)` - 获取查询参数
- `@Body(key?)` - 获取请求体
- `@Headers(key?)` - 获取请求头
- `@Req()` - 获取原始请求对象
- `@Res()` - 获取原始响应对象

### API 文档装饰器

- `@ApiTags(tags)` - 为控制器添加标签
- `@ApiOperation(options)` - 描述 API 操作
- `@ApiResponse(options)` - 描述 API 响应
- `@ApiParam(options)` - 描述路径参数
- `@ApiBody(options)` - 描述请求体

## 🌐 API 示例

启动应用后，可以访问以下 API：

- `GET /api/users` - 获取所有用户
- `GET /api/users/:id` - 根据 ID 获取用户（需要认证）
- `POST /api/users` - 创建新用户

## 🔧 配置选项

应用程序支持以下配置选项：

```typescript
const app = ApplicationFactory.create(AppModule, {
  port: 3000, // 监听端口
  cors: true, // 是否启用 CORS
  globalPrefix: "/api", // 全局路由前缀
  swagger: {
    title: "API 文档",
    description: "基于 Scalar 的现代化 API 文档",
    version: "1.0.0",
  },
});
```

## 🛡️ 全局功能配置

### 全局守卫

```typescript
// 为所有路由应用认证守卫
app.useGlobalGuards(AuthGuard);
```

### 全局异常过滤器

```typescript
// 统一异常处理
app.useGlobalFilters(new ValidationExceptionFilter());
```

### 全局数据验证管道

```typescript
// 全局数据验证
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    stopAtFirstError: false,
  })
);
```

## ✨ 现代化 API 文档

本项目使用 **Scalar** 提供现代化、美观的 API 文档界面，相比传统的 Swagger UI 具有以下优势：

- 🎨 **现代化界面**: 基于 Scalar 的美观、直观的用户界面
- 🚀 **快速加载**: 优化的性能，快速渲染文档
- 📱 **响应式设计**: 完美适配各种设备屏幕
- 🔍 **智能搜索**: 内置搜索功能，快速找到所需的 API
- 🛠️ **在线测试**: 直接在文档中测试 API 端点
- 📋 **代码示例**: 自动生成多种语言的代码示例

访问 API 文档：

- 主文档页面：`http://localhost:3000/docs`
- OpenAPI 规范：`http://localhost:3000/docs-json`

## 🏗️ 架构设计

### 依赖注入容器

框架内置了轻量级的依赖注入容器，支持：

- 自动依赖解析
- 单例模式管理
- 循环依赖检测

### 模块化系统

采用类似 NestJS 的模块化架构：

- 每个模块都有自己的控制器和服务
- 支持模块间的导入导出
- 清晰的代码组织结构

### 中间件和守卫系统

- **守卫**: 在路由处理前进行权限验证
- **过滤器**: 统一处理异常和错误响应
- **管道**: 数据验证和转换

## 🚀 性能特点

- **基于 Bun**: 利用 Bun 运行时的高性能特性
- **零拷贝**: 充分利用 Bun 的零拷贝 I/O
- **快速启动**: 相比 Node.js 应用，启动速度提升 3-4 倍
- **低内存占用**: 优化的内存使用，适合容器化部署

## 📚 学习资源

- [Bun 官方文档](https://bun.sh/docs)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [Reflect Metadata](https://github.com/rbuckton/reflect-metadata)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目！

## 📄 许可证

MIT License
