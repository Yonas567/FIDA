import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { GenerateService } from "./generate.service";
import { AuthGuard } from "../auth/guards/auth.guard";
import { Request } from "express";

@Controller("generate")
@UseGuards(AuthGuard)
export class GenerateController {
  constructor(private generateService: GenerateService) {}

  @Post("log")
  async logGeneration(@Req() req: Request) {
    try {
      const userId = req.session?.userId;
      if (!userId) {
        throw new Error("User not authenticated - no userId in session");
      }

      const result = await this.generateService.logGeneration(userId);
      return { success: true, result };
    } catch (error: any) {
      throw error;
    }
  }
}
