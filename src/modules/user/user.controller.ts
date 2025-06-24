import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  Headers,
  UseGuards,
  UseFilters,
  NotFoundException,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@/common";
import { UserService } from "./user.service";
import { AuthGuard } from "./guards/auth.guard";
import { ValidationExceptionFilter } from "@/common/filters/validation-exception.filter";
import { CreateUserDto } from "./dto/create-user.dto";

/**
 * 用户控制器
 */
@ApiTags("用户管理")
@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 获取所有用户
   */
  @Get()
  @ApiOperation({
    summary: "获取所有用户",
    description: "获取系统中所有用户的列表",
  })
  @ApiResponse({
    status: 200,
    description: "成功获取用户列表",
    example: {
      success: true,
      data: [
        { id: 1, name: "张三", email: "zhangsan@example.com" },
        { id: 2, name: "李四", email: "lisi@example.com" },
      ],
      message: "获取用户列表成功",
    },
  })
  getAllUsers() {
    return {
      success: true,
      data: this.userService.findAll(),
      message: "获取用户列表成功",
    };
  }

  /**
   * 根据 ID 获取用户
   */
  @Get("/:id")
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: "根据 ID 获取用户",
    description: "通过用户 ID 获取特定用户的详细信息",
  })
  @ApiParam({
    name: "id",
    description: "用户 ID",
    type: "number",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "成功获取用户信息",
    example: {
      success: true,
      data: { id: 1, name: "张三", email: "zhangsan@example.com" },
      message: "获取用户信息成功",
    },
  })
  @ApiResponse({
    status: 404,
    description: "用户不存在",
    example: {
      success: false,
      message: "用户不存在",
    },
  })
  async getUserById(
    @Param("id") id: string,
    @Headers("authorization") auth: string
  ) {
    const userId = parseInt(id);
    console.log(`🔍 查找用户 ID: ${userId}, 认证头: ${auth}`);

    // 验证 ID 参数
    if (isNaN(userId) || userId <= 0) {
      throw new NotFoundException(`无效的用户ID: ${id}`);
    }

    const user = this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(`用户不存在，ID: ${userId}`);
    }

    return {
      success: true,
      data: user,
      message: "获取用户信息成功",
    };
  }

  /**
   * 创建用户
   */
  @Post()
  @UseFilters(ValidationExceptionFilter)
  @ApiOperation({
    summary: "创建新用户",
    description: "创建一个新的用户账户",
  })
  @ApiBody({
    description: "用户创建信息",
    example: {
      name: "王五",
      email: "wangwu@example.com",
    },
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "用户创建成功",
    example: {
      success: true,
      data: { id: 4, name: "王五", email: "wangwu@example.com" },
      message: "创建用户成功",
    },
  })
  @ApiResponse({
    status: 400,
    description: "请求参数错误",
    example: {
      statusCode: 400,
      error: "Validation Error",
      message: "输入数据验证失败",
      errors: {
        name: ["姓名不能为空"],
        email: ["邮箱格式不正确"],
      },
    },
  })
  async createUser(@Body() userData: CreateUserDto) {
    console.log(`📝 创建用户数据:`, userData);

    // 由于使用了验证管道，数据已经经过了验证和转换
    // 这里不再需要手动验证

    // 创建用户
    const newUser = this.userService.create(userData);

    return {
      success: true,
      data: newUser,
      message: "创建用户成功",
    };
  }

  /**
   * 更新用户
   */
  @Put("/:id")
  @ApiOperation({
    summary: "更新用户信息",
    description: "根据用户 ID 更新用户的详细信息",
  })
  @ApiParam({
    name: "id",
    description: "用户 ID",
    type: "number",
    example: 1,
  })
  @ApiBody({
    description: "用户更新信息",
    example: {
      name: "张三（已更新）",
      email: "zhangsan_updated@example.com",
    },
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "用户更新成功",
    example: {
      success: true,
      data: {
        id: 1,
        name: "张三（已更新）",
        email: "zhangsan_updated@example.com",
      },
      message: "更新用户成功",
    },
  })
  @ApiResponse({
    status: 404,
    description: "用户不存在",
    example: {
      success: false,
      message: "用户不存在",
    },
  })
  async updateUser(req: any) {
    try {
      const url = new URL(req.url);
      const id = parseInt(url.pathname.split("/").pop() || "0");
      const body = await req.json();

      const updatedUser = this.userService.update(id, body);
      if (!updatedUser) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "用户不存在",
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      return {
        success: true,
        data: updatedUser,
        message: "更新用户成功",
      };
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "更新用户失败",
          error: error instanceof Error ? error.message : "未知错误",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  /**
   * 删除用户
   */
  @Delete("/:id")
  @ApiOperation({
    summary: "删除用户",
    description: "根据用户 ID 删除用户账户",
  })
  @ApiParam({
    name: "id",
    description: "用户 ID",
    type: "number",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "用户删除成功",
    example: {
      success: true,
      message: "删除用户成功",
    },
  })
  @ApiResponse({
    status: 404,
    description: "用户不存在",
    example: {
      success: false,
      message: "用户不存在",
    },
  })
  async deleteUser(req: any) {
    const url = new URL(req.url);
    const id = parseInt(url.pathname.split("/").pop() || "0");

    const deleted = this.userService.delete(id);
    if (!deleted) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "用户不存在",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return {
      success: true,
      message: "删除用户成功",
    };
  }
}
