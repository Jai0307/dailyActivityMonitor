import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  address: { type: String, default: "" },
  phonenumber: { type: String, default: "" },
  verificationcode: { type: String },
  verified: { type: Boolean, default: false },
  passwordresetcode: { type: String },
  resetlinktime: { type: Number },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

const users = mongoose.models.users || mongoose.model("users", UserSchema);
export default users;
