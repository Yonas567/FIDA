import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password_hash: adminPassword,
      role: "admin",
    },
  });
  console.log("✅ Admin user created:", admin.username);

  // Create test client user
  const clientPassword = await bcrypt.hash("client123", 10);
  const client = await prisma.user.upsert({
    where: { username: "client" },
    update: {},
    create: {
      username: "client",
      password_hash: clientPassword,
      role: "client",
    },
  });
  console.log("✅ Client user created:", client.username);

  // Create another test client
  const client2Password = await bcrypt.hash("test123", 10);
  const client2 = await prisma.user.upsert({
    where: { username: "testuser" },
    update: {},
    create: {
      username: "testuser",
      password_hash: client2Password,
      role: "client",
    },
  });
  console.log("✅ Test user created:", client2.username);

  // Create some sample usage logs for the client user
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  // Check if logs already exist for these dates
  const existingTodayLog = await prisma.usageLog.findFirst({
    where: {
      user_id: client.id,
      date: today,
    },
  });

  if (!existingTodayLog) {
    await prisma.usageLog.create({
      data: {
        user_id: client.id,
        count: 3,
        date: today,
      },
    });
    console.log("✅ Created usage log for today");
  } else {
    console.log("ℹ️  Usage log for today already exists");
  }

  const existingYesterdayLog = await prisma.usageLog.findFirst({
    where: {
      user_id: client.id,
      date: yesterday,
    },
  });

  if (!existingYesterdayLog) {
    await prisma.usageLog.create({
      data: {
        user_id: client.id,
        count: 5,
        date: yesterday,
      },
    });
    console.log("✅ Created usage log for yesterday");
  } else {
    console.log("ℹ️  Usage log for yesterday already exists");
  }

  const existingTwoDaysAgoLog = await prisma.usageLog.findFirst({
    where: {
      user_id: client.id,
      date: twoDaysAgo,
    },
  });

  if (!existingTwoDaysAgoLog) {
    await prisma.usageLog.create({
      data: {
        user_id: client.id,
        count: 2,
        date: twoDaysAgo,
      },
    });
    console.log("✅ Created usage log for two days ago");
  } else {
    console.log("ℹ️  Usage log for two days ago already exists");
  }

  console.log("\n🎉 Seed completed successfully!");
  console.log("\n📝 Default credentials:");
  console.log('   Admin: username="admin", password="admin123"');
  console.log('   Client: username="client", password="client123"');
  console.log('   Test User: username="testuser", password="test123"');
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
