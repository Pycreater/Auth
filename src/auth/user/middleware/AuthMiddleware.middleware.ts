import {
    BadGatewayException,
    BadRequestException,
    Injectable,
    NestMiddleware,
    UnauthorizedException,
  } from "@nestjs/common";
  import { NextFunction, Request } from "express";
  import * as jwt from "jsonwebtoken";
  import User from "src/models/user.model";
  
  @Injectable()
  export class AuthMiddleware implements NestMiddleware {
    async use(req: Request, _, next: NextFunction) {
      try {
        const token =
          req.cookies?.accessToken ||
          req.header("Authorization")?.replace("Bearer ", "");
  
        if (!token) {
          throw new UnauthorizedException("Unauthorized request");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as jwt.JwtPayload & {
          _id: string;
        };
  
        const user = await User.findById(decodedToken._id).select(
          "-password -refreshToken"
        );
        console.log(user);
        
  
        if (!user) {
          throw new BadGatewayException("Invalid Access Token.");
        }
  
        (req as any).user = user; // Add user to request object to transfer to the next function if needed.
        next();
      } catch (error) {
        console.error("Middleware Error: ", error); // Log error details
        throw new BadRequestException(error?.message || "Invalid access token.");
      }
    }
  }
  