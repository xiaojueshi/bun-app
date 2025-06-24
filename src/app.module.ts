import { Module } from "@/common";
import { UserModule } from "@/modules/user/user.module";

/**
 * 应用程序根模块
 */
@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
