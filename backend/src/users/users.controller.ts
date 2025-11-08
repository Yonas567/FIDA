import { Controller, Get, Post, Body, UseGuards, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AdminService } from "../admin/admin.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthGuard } from "../auth/guards/auth.guard";
import { AdminGuard } from "../admin/guards/admin.guard";
import { Request } from "express";

@Controller("users")
export class UsersController {
  constructor(
    private usersService: UsersService,
    private adminService: AdminService
  ) {}

  @Get()
  @UseGuards(AdminGuard)
  async findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get("stats")
  @UseGuards(AuthGuard)
  async getMyStats(@Req() req: Request) {
    const userId = req.session.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    return this.adminService.getUsageStats(userId);
  }
}
