import { Module } from "@nestjs/common";
import { GenerateController } from "./generate.controller";
import { GenerateService } from "./generate.service";
import { AdminService } from "../admin/admin.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [GenerateController],
  providers: [GenerateService, AdminService],
})
export class GenerateModule {}
