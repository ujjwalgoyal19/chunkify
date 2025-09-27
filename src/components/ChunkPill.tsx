import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { FC, HTMLAttributes } from "react";

const pillVariants = cva("font-normal text-grey", {
  variants: {
    variant: {
      0: "bg-visual-0",
      1: "bg-visual-1",
      2: "bg-visual-2",
      3: "bg-visual-3",
    },
  },
});

interface ChunkPillProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pillVariants> {
  uniquePart: string;
  overlapPart: string | undefined;
}

const ChunkPill: FC<ChunkPillProps> = ({
  className,
  variant,
  uniquePart,
  overlapPart,
  ...props
}) => {
  return (
    <span className={cn(pillVariants({ variant, className }))} {...props}>
      <span>{uniquePart}</span>
      {overlapPart && (
        <span className="bg-background border-stone-500 border">
          {overlapPart}
        </span>
      )}
    </span>
  );
};

export default ChunkPill;
