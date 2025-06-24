import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from "@/common";
import type { CanActivate, ExecutionContext } from "@/common";

/**
 * 认证守卫 - 验证请求是否包含有效的认证信息
 */
@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * 验证用户是否已认证
   * @param context 执行上下文
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.getRequest();

    // 获取 Authorization 头
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      throw new UnauthorizedException(
        "请提供授权头信息 (Authorization header)"
      );
    }

    // 简单验证 Bearer token
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      throw new UnauthorizedException(
        "授权格式错误，请使用 'Bearer <token>' 格式"
      );
    }

    // 模拟不同的错误场景
    if (token === "invalid-token") {
      throw new UnauthorizedException("提供的访问令牌无效或已过期");
    }

    if (token === "forbidden-token") {
      throw new ForbiddenException("您的账户权限不足，无法访问此资源");
    }

    if (token === "expired-token") {
      throw new UnauthorizedException("访问令牌已过期，请重新登录");
    }

    // 在实际应用中，这里应该验证 JWT token 或查询数据库
    if (token.length < 8) {
      throw new UnauthorizedException("令牌格式不正确，长度不足");
    }

    // 可以在这里将用户信息附加到请求对象
    (request as any).user = {
      id: 1,
      username: "test-user",
      token,
    };

    console.log(`✅ 用户认证成功: ${token}`);
    return true;
  }
}
