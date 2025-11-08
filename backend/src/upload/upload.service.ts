import { Injectable } from "@nestjs/common";

@Injectable()
export class UploadService {
  async saveFile(file: Express.Multer.File): Promise<Buffer> {
    return file.buffer;
  }
}
