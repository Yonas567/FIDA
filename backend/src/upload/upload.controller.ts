import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
  UseGuards,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import { ParseService } from "../parse/parse.service";
import { Request } from "express";
import { AuthGuard } from "../auth/guards/auth.guard";

@Controller("upload")
@UseGuards(AuthGuard)
export class UploadController {
  constructor(
    private uploadService: UploadService,
    private parseService: ParseService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request
  ) {
    if (!file) {
      throw new Error("No file uploaded");
    }

    const fileBuffer = await this.uploadService.saveFile(file);

    const parseResult = await this.parseService.parseDocument(
      fileBuffer,
      file.mimetype
    );

    return parseResult;
  }
}
