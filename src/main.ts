import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import * as dotenv from "dotenv";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import connectDB from "./db";

dotenv.config({
  path: "./.env",
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({
    origin: "https://auth-frontend-9u68fot9g-pratiks-projects-5c2fb984.vercel.app" || "http://localhost:5173" || "*",
    credentials: true
  })
  app.use(cookieParser());

  try {
    await connectDB();
    const port = process.env.PORT || 8000;
    await app.listen(port, () => {
      console.log(`✌ Server is running on port: ${port}`);
    });
  } catch (error) {
    console.error("MONGODB Connection Failed !!", error);
    process.exit(1);
  }
}

bootstrap();
