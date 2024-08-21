import express, { Request, Response } from "express";
import { User } from "../model/user";
import { userSchema } from "../zod/schema/types";
import { z } from "zod";

const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = userSchema.parse(req.body);
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation Error:", error.errors); // Log the validation errors
      const formattedErrors = error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({
        message: "Validation failed",
        errors: formattedErrors,
      });
    } else {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
};

export { signup };
