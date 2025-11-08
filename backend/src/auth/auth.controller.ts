import { Controller, Post, Body, Req, UseGuards, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto, @Req() req: Request) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password
    );
    const result = await this.authService.login(user);

    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.role = user.role;

    return result;
  }

  @Post("logout")
  async logout(@Req() req: Request) {
    return new Promise((resolve) => {
      req.session.destroy(() => {
        resolve({ message: "Logged out successfully" });
      });
    });
  }

  @Get("me")
  async getMe(@Req() req: Request) {
    if (!req.session.userId) {
      return { user: null };
    }

    return {
      user: {
        id: req.session.userId,
        username: req.session.username,
        role: req.session.role,
      },
    };
  }
}
