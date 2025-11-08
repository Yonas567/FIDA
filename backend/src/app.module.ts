import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { UploadModule } from "./upload/upload.module";
import { ParseModule } from "./parse/parse.module";
import { AdminModule } from "./admin/admin.module";
import { GenerateModule } from "./generate/generate.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    UploadModule,
    ParseModule,
    AdminModule,
    GenerateModule,
  ],
})
export class AppModule {}
