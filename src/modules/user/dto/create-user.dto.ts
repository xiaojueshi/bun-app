import {
  IsEmail,
  IsString,
  IsInt,
  Min,
  Max,
  IsOptional,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from "class-validator";
import { Type } from "class-transformer";

/**
 * 创建用户请求 DTO
 *
 * 使用 class-validator 装饰器进行数据验证
 *
 * @example
 * ```typescript
 * const dto = new CreateUserDto();
 * dto.email = "user@example.com";
 * dto.name = "John Doe";
 * dto.age = 25;
 * ```
 */
export class CreateUserDto {
  /**
   * 用户邮箱地址
   * 必填，必须是有效的邮箱格式
   */
  @IsEmail({}, { message: "邮箱格式不正确" })
  @IsNotEmpty({ message: "邮箱不能为空" })
  email!: string;

  /**
   * 用户姓名
   * 必填，长度 2-50 个字符
   */
  @IsString({ message: "姓名必须是字符串" })
  @IsNotEmpty({ message: "姓名不能为空" })
  @MinLength(2, { message: "姓名至少需要2个字符" })
  @MaxLength(50, { message: "姓名不能超过50个字符" })
  name!: string;

  /**
   * 用户年龄
   * 可选，范围 18-120
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "年龄必须是整数" })
  @Min(18, { message: "年龄不能小于18岁" })
  @Max(120, { message: "年龄不能大于120岁" })
  age?: number;

  /**
   * 用户密码
   * 必填，长度 6-20 个字符
   */
  @IsString({ message: "密码必须是字符串" })
  @IsNotEmpty({ message: "密码不能为空" })
  @MinLength(6, { message: "密码至少需要6个字符" })
  @MaxLength(20, { message: "密码不能超过20个字符" })
  password!: string;

  /**
   * 用户简介
   * 可选，最大 500 个字符
   */
  @IsOptional()
  @IsString({ message: "简介必须是字符串" })
  @MaxLength(500, { message: "简介不能超过500个字符" })
  bio?: string;
}
