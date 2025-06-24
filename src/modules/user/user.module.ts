import { Module } from "@/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthGuard } from "./guards/auth.guard";
import { ValidationExceptionFilter } from "@/common/filters/validation-exception.filter";

/**
 * 用户模块
 */
@Module({
  controllers: [UserController],
  providers: [UserService, AuthGuard, ValidationExceptionFilter],
  exports: [UserService],
})
export class UserModule {}
