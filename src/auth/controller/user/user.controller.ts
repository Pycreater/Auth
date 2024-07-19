import { Body, ClassSerializerInterceptor, Controller, Get, Post, Req, Res, UseInterceptors } from "@nestjs/common";
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
      .json({ status: 200, user, msg: "User Created Successfully." });
  }

  @Post("login")
  async login(
    @Body("email") email: string,
    @Body("password") password: string,
    @Res() res: Response
  ): Promise<any> {
    const user = await this.userService.loginUser(email, password);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", user.accessToken, options)
      .cookie("refreshToken", user.refreshToken, options)
      .json({ status: 200, user, msg: "User Logged In Successfully." });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post("logout")
  async logout(@Req() req: Request, @Res() res: Response):Promise<any>{
    const user = (req as any).user;
    const result = await this.userService.logoutUser(user._id);

    return res
    .clearCookie("accessToken", { httpOnly: true, secure: true })
    .clearCookie("refreshToken", { httpOnly: true, secure: true })
    .json({ message: "User logged out successfully" });
  }
}
