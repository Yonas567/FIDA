import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getUsageStats(userId: string, startDate?: string, endDate?: string) {
    const where: any = { user_id: userId };

    if (startDate || endDate) {
      where.date = {};
      if (startDate) {
        where.date.gte = new Date(startDate);
      }
      if (endDate) {
        where.date.lte = new Date(endDate);
      }
    }

    const logs = await this.prisma.usageLog.findMany({
      where,
      orderBy: {
        date: "desc",
      },
    });

    const totalCount = logs.reduce((sum, log) => sum + log.count, 0);
    const today = new Date().toISOString().split("T")[0];
    const todayLog = logs.find(
      (log) => log.date.toISOString().split("T")[0] === today
    );
    const todayCount = todayLog ? todayLog.count : 0;

    return {
      total: totalCount,
      today: todayCount,
      logs,
    };
  }

  async getAllUsersWithStats(startDate?: string, endDate?: string) {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const stats = await this.getUsageStats(user.id, startDate, endDate);
        return {
          ...user,
          totalGenerated: stats.total,
          todayGenerated: stats.today,
        };
      })
    );

    return usersWithStats;
  }

  async logIdGeneration(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error(`User with id ${userId} not found`);
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const existingLog = await this.prisma.usageLog.findFirst({
        where: {
          user_id: userId,
          date: {
            gte: today,
            lt: tomorrow,
          },
        },
      });

      if (existingLog) {
        const updated = await this.prisma.usageLog.update({
          where: { id: existingLog.id },
          data: { count: existingLog.count + 1 },
        });
        return updated;
      } else {
        const created = await this.prisma.usageLog.create({
          data: {
            user_id: userId,
            date: today,
            count: 1,
          },
        });
        return created;
      }
    } catch (error) {
      throw error;
    }
  }
}
