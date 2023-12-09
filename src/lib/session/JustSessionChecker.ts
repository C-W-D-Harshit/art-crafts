import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const JustSessionChecker = async () => {
  // Check session
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("You are not authorized to perform this action!");
  }

  // If the session exists, return it
  return session;
};

export default JustSessionChecker;
