import "reflect-metadata";
import { ApplicationFactory } from "@/common";
import { AppModule } from "./app.module";
import { AuthGuard } from "./modules/user/guards/auth.guard";
import { ValidationPipe } from "@/common/pipes/validation.pipe";
import { ValidationExceptionFilter } from "@/common/filters/validation-exception.filter";

// 导入 HTML 文件作为静态路由
import indexHtml from "../frontend/pages/index.html";

/**
 * 应用程序启动函数
 */
async function bootstrap() {
  // 创建应用程序实例
  const app = ApplicationFactory.create(AppModule, {
    port: 3000,
    cors: true,
    globalPrefix: "/api",
    // 配置静态路由
    staticRoutes: [
      {
        path: "/",
        html: indexHtml,
      },
    ],
    // 开发模式配置
    development: {
      hmr: true, // 启用热模块替换
      console: true, // 启用控制台日志输出
    },
    // 静态文件目录
    staticDir: "frontend/assets",
    swagger: {
      title: "Bun Web Framework API",
      description: "基于 Bun 运行时的现代化 Web 框架",
      version: "1.0.0",
      servers: [
        {
          url: "http://localhost:3000",
          description: "开发服务器",
        },
      ],
    },
  });

  // 设置全局管道（用于数据验证和转换）
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 过滤掉未在 DTO 中定义的属性
      forbidNonWhitelisted: true, // 如果有非白名单属性则抛出异常
      stopAtFirstError: false, // 收集所有验证错误
    })
  );

  // 设置全局守卫（可选 - 如果需要对所有路由进行认证）
  // app.useGlobalGuards(AuthGuard);

  // 设置全局异常过滤器
  app.useGlobalFilters(
    new ValidationExceptionFilter() // 处理验证异常
  );

  // 启动应用程序
  await app.listen();
}

// 启动应用程序
bootstrap().catch(console.error);
