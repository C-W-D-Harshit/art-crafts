"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectMongoDB from "@/lib/mongo/dbConnect";
import JustSessionChecker from "@/lib/session/JustSessionChecker";
import User from "@/models/user";
import { getServerSession } from "next-auth";

export const updateUserField = async ({
  field,
  value,
}: {
  field: string;
  value: string;
}) => {
  // check session first
  const session = await JustSessionChecker();

  // Connect DB
  await connectMongoDB();

  const user = await User.findById(session.user.id);
  user[field] = value;
  await user.save();
  return {
    success: true,
    message: `Changed user ${field}`,
  };
};
