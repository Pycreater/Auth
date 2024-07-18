import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Response } from "express";
import { UserService } from "src/auth/service/user/user.service";
import { DB_NAME } from "src/constants";

@Controller("api/v1/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  async register(
    @Body("email") email: string,
    @Body("username") username: string,
    @Body("password") password: string,
    @Res() res: Response
  ): Promise<any> {
    const user = await this.userService.registerUser(email, username, password);

    return res
      .status(201)
      .json({ status: 200, user, msg: "User Created Successfull.y" });
  }
}
