import { Module } from "@nestjs/common";

import { UserController } from "./auth/controller/user/user.controller";
import { UserService } from "./auth/service/user/user.service";
import { UserModule } from "./auth/user/user.module";

@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
