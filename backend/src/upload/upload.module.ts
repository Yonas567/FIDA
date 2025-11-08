import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { ParseModule } from "../parse/parse.module";

@Module({
  imports: [ParseModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
