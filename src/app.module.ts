import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { UserController } from "./auth/controller/user/user.controller";
import { UserService } from "./auth/service/user/user.service";
import { UserModule } from "./auth/user/user.module";
import { AuthMiddleware } from "./auth/user/middleware/AuthMiddleware.middleware";

@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) // Apply middleware to the logout route
      .forRoutes("api/v1/user/logout")
      .apply(AuthMiddleware)
      .forRoutes("api/v1/user/forgot-password");
  }
}
