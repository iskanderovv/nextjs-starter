import Admin from "@/models/admin.model";
import { hash } from "bcrypt";
import mongoose, { ConnectOptions } from "mongoose";

let isConncected: boolean = false;

export const dbConnect = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) {
    return console.log("MISSING MONGODB_URI");
  }

  if (isConncected) {
    return;
  }

  try {
    const options: ConnectOptions = {
      dbName: "dbname",
      autoCreate: true,
    };
    await mongoose.connect(process.env.MONGODB_URI!, options);
    isConncected = true;
    console.log("MongoDB is connected");
    const admins_count = await Admin.countDocuments();

    if (admins_count === 0) {
      const hashedPassword = await hash(process.env.ADMIN_PASSWORD || "admin25", 10);
      await Admin.create({
        email: process.env.ADMIN_EMAIL || "admin@gmail.com",
        password: hashedPassword,
      });
    }
  } catch (err) {
    console.log(err);
  }
};