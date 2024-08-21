import mongoose from "mongoose";
interface User {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}
const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
});
const User = mongoose.model<User>("User", userSchema);
export { User };
