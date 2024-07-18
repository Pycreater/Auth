import { Controller, Get } from "@nestjs/common";
import { DB_NAME } from "src/constants";

@Controller("api/v1/user")
export class UserController {
  @Get()
  hello(): string {
    return "Hello World";
  }
}
