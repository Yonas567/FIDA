import { Injectable } from "@nestjs/common";
import { AdminService } from "../admin/admin.service";

@Injectable()
export class GenerateService {
  constructor(private adminService: AdminService) {}

  async logGeneration(userId: string) {
    return this.adminService.logIdGeneration(userId);
  }
}
