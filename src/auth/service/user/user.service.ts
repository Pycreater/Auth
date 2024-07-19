import { BadGatewayException, BadRequestException, Injectable, Next, Req, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request } from "express";
import User from "src/models/user.model";
import * as jwt from "jsonwebtoken"

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

  async loginUser(email: string, password: string): Promise<any> {
    // check if all fields are there and valid || error
    // check if a user is new or not || else send register first message
    //  get tokens and validate
    // login send cookie

    if (!email && !password) {
      throw new BadRequestException("username or password is required.");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestException("User does not exist.");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      throw new BadRequestException("Invalid user credentials.");
    }

    const { accessToken, refreshToken } =
      await this.generateAccessAndRefreshTokens(user._id as string);

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return { loggedInUser, accessToken, refreshToken };
  }



  async logoutUser(_id: string) {
    const user = await User.findByIdAndUpdate(
      _id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {new: true}
    )

    return {};
  }

}
