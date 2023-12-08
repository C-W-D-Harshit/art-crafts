import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <MaxWidthWrapper>
      <Skeleton className="w-full h-[92dvh]" />
    </MaxWidthWrapper>
  );
}
