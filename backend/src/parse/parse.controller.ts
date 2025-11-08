import { Controller, Post, Body } from "@nestjs/common";
import { ParseService } from "./parse.service";

@Controller("parse")
export class ParseController {
  constructor(private parseService: ParseService) {}

  @Post()
  async parse(@Body() body: { fileBuffer: string; mimeType?: string }) {
    const buffer = Buffer.from(body.fileBuffer, "base64");
    const parsedData = await this.parseService.parseDocument(
      buffer,
      body.mimeType
    );
    return { data: parsedData };
  }
}
