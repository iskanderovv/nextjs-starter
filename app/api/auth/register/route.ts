import { NextResponse } from "next/server";
import { RegisterSchema } from "@/lib/validators/auth";
import { dbConnect } from "@/lib/mongoose";
import Admin from "@/models/admin.model";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validation error", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    await dbConnect();

    const exists = await Admin.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { message: "Email is already taken" },
        { status: 409 }
      );
    }

    const hash = await bcrypt.hash(password, 12);

    await Admin.create({
      email: email.toLowerCase().trim(),
      password: hash,
    });

    return NextResponse.json({ message: "Registration successful" }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
