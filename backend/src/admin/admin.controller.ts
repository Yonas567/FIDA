import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminGuard } from "./guards/admin.guard";

@Controller("admin")
@UseGuards(AdminGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get("users")
  async getUsers(
    @Query("startDate") startDate?: string,
    @Query("endDate") endDate?: string
  ) {
    return this.adminService.getAllUsersWithStats(startDate, endDate);
  }

  @Get("stats")
  async getStats(
    @Query("userId") userId: string,
    @Query("startDate") startDate?: string,
    @Query("endDate") endDate?: string
  ) {
    return this.adminService.getUsageStats(userId, startDate, endDate);
  }
}
