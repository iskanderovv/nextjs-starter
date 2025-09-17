import mongoose from "mongoose";

interface IAdmin {
  email: string;
  password: string;
}

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model<IAdmin>("Admin", adminSchema);
export default Admin;