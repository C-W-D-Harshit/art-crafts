"use server";

import connectMongoDB from "@/lib/mongo/dbConnect";
import User from "@/models/user";
import { signupSchema } from "@/schema/userSchema";
import { resend } from "@/utils/resend";
import { signIn } from "next-auth/react";

function generateOTP() {
  const otpLength = 6;
  const min = Math.pow(10, otpLength - 1);
  const max = Math.pow(10, otpLength) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const signUpAction = async (formData: signupSchema) => {
  let data;
  try {
    const response = signupSchema.parse(formData);
    data = response;
  } catch (err: any) {
    return {
      error: "Validation error: " + err.message,
    };
  }

  // Connect DB
  await connectMongoDB();

  const email = data.email;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return {
      error: "User already exists!",
    };
  }

  // create verifyKey
  const verifyKey = generateOTP();
  const verifyKeyExpires = Date.now() + 10 * 60 * 1000;

  // Create the user after all checks
  const user = await User.create({
    name: data.name,
    email: data.email,
    password: data.password,
    verifyKey,
    verifyKeyExpires,
  });

  // creating necessary fields
  var nameParts = user.name.split(" ");
  const firstName: string = nameParts[0];
  const otp = user.verifyKey as number;

  //   try {
  //     const data = await resend.emails.send({
  //       from: "Vista Cart <vista-cart@cleverdevloper.in>",
  //       to: [user.email],
  //       subject: "Welcome to Vista Cart!",
  //       react: NewArrivalEmailTemplate({ firstName, otp }),
  //     });
  //   } catch (error) {
  //     return { error };

  // if every thing goes ok then login user

  return { message: "Sign Up Successfully!" };
};
