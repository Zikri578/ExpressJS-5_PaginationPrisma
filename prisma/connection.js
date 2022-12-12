import { PrismaClient } from "@prisma/Client";

// membuat variabel db
const db = new PrismaClient();

// melakukan export db untuk semua file supaya masuk ke database
export default db;