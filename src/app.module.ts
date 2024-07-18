import { Module } from "@nestjs/common";

import { UserController } from "./auth/controller/user/user.controller";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
