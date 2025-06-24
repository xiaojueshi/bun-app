# Bun Web 框架

一个基于 Bun 运行时构建的轻量级 Web 框架，采用类似 NestJS 的设计模式，支持装饰器、依赖注入和模块化架构。

## ✨ 特性

- 🚀 **高性能**: 基于 Bun 运行时，启动速度快，性能优异
- 🎯 **装饰器支持**: 使用装饰器定义控制器、服务和模块
- 💉 **依赖注入**: 内置依赖注入容器，支持服务自动解析
- 🏗️ **模块化架构**: 采用模块化设计，便于组织和维护代码
- 🔧 **TypeScript**: 完整的 TypeScript 支持和类型安全
- 🌐 **CORS 支持**: 内置 CORS 支持，便于前后端分离开发
- 🛡️ **守卫系统**: 内置认证守卫和权限控制系统
- 🔍 **异常过滤器**: 统一异常处理和错误响应格式化
- 📝 **数据验证**: 内置数据验证管道和 DTO 支持
- ✨ **现代化 API 文档**: 基于 Scalar 的美观 API 文档界面，支持在线测试

## 📦 安装依赖

```bash
bun install
```

## 🚀 运行项目

### 开发模式（热重载）

```bash
bun run dev
```

### 生产模式

```bash
bun run start
```

### 构建项目

```bash
bun run build
```

## 📁 项目结构

```
bun-app/
├── src/
│   ├── common/                 # 通用模块
│   │   ├── decorators/         # 装饰器
│   │   │   ├── injectable.decorator.ts    # @Injectable 装饰器
│   │   │   ├── controller.decorator.ts    # @Controller 装饰器
│   │   │   ├── module.decorator.ts        # @Module 装饰器
│   │   │   ├── http-methods.decorator.ts  # HTTP 方法装饰器
│   │   │   ├── guard.decorator.ts         # @UseGuards 装饰器
│   │   │   ├── exception-filter.decorator.ts # @UseFilters 装饰器
│   │   │   ├── param.decorator.ts         # 参数装饰器
│   │   │   └── swagger.decorator.ts       # Swagger 装饰器
│   │   ├── container/          # 依赖注入容器
│   │   │   └── container.ts
│   │   ├── application/        # 应用程序核心
│   │   │   └── application.ts
│   │   ├── core/               # 核心工具
│   │   │   └── application-factory.ts
│   │   ├── guards/             # 守卫接口
│   │   │   └── guard.interface.ts
│   │   ├── filters/            # 异常过滤器
│   │   │   ├── exception.filter.ts
│   │   │   └── validation-exception.filter.ts
│   │   ├── pipes/              # 数据管道
│   │   │   ├── pipe.interface.ts
│   │   │   ├── pipe-resolver.ts
│   │   │   └── validation.pipe.ts
│   │   ├── swagger/            # API 文档
│   │   │   ├── swagger-generator.ts
│   │   │   └── swagger.module.ts
│   │   └── index.ts            # 通用模块导出
│   ├── modules/                # 业务模块
│   │   └── user/               # 用户模块
│   │       ├── dto/            # 数据传输对象
│   │       │   └── create-user.dto.ts
│   │       ├── guards/         # 用户模块守卫
│   │       │   └── auth.guard.ts
│   │       ├── user.controller.ts
│   │       ├── user.service.ts
│   │       └── user.module.ts
│   ├── app.module.ts           # 根模块
│   └── main.ts                 # 应用入口
├── package.json
├── tsconfig.json
└── README.md
```

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

---

此项目使用 [Bun](https://bun.sh) 构建，一个快速的 JavaScript 运行时。
