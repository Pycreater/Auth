import { BadRequestException, Injectable } from "@nestjs/common";
import User from "src/models/user.model";

@Injectable()
export class UserService {
  async generateAccessAndRefreshTokens(userId: string): Promise<any> {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new BadRequestException("User not found");
      }

      const accessToken = user.generateAccessToken();
      const refreshToken = await user.generateRefreshToken();

      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });

      return { accessToken, refreshToken };
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong while genrating refresh and access token."
      );
    }
  }

  async registerUser(
    email: string,
    username: string,
    password: string
  ): Promise<any> {
    // 1. get all the data
    // 2. check if user exists or not if user exists then throw an error
    // 3. else get all the data
    // 4. create an User instance and add all properties in it and save that object
    //
    try {
      if (!(email || username || password)) {
        throw new BadRequestException("All fields are required");
      }

      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        throw new BadRequestException(
          "User with email or username already exists"
        );
      }

      const newUser = await User.create({
        username: username.toLowerCase(),
        email,
        password,
      });

      const createdUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
      );

      return { createdUser };
    } catch (error) {
      throw new BadRequestException(
        `Failed to register user: ${error.message}`
      );
    }
  }
}
