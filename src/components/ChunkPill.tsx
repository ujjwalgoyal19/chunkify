import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { FC, HTMLAttributes } from "react";

const pillVariants = cva("font-normal text-grey cursor-pointer transition-all select-none", {
  variants: {
    variant: {
      0: "bg-visual-0",
      1: "bg-visual-1",
      2: "bg-visual-2",
      3: "bg-visual-3",
    },
    selected: {
      true: "ring-2 ring-yellow-400 ring-offset-1",
      false: "",
    },
    hovered: {
      true: "ring-1 ring-blue-300 ring-offset-1 scale-105",
      false: "",
    },
  },
});

interface ChunkPillProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pillVariants> {
  uniquePart: string;
  overlapPart: string | undefined;
  selected?: boolean;
  hovered?: boolean;
  onSelect?: () => void;
  onHover?: (hovered: boolean) => void;
}

const ChunkPill: FC<ChunkPillProps> = ({
  className,
  variant,
  uniquePart,
  overlapPart,
  selected = false,
  hovered = false,
  onSelect,
  onHover,
  ...props
}) => {
  return (
    <span 
      className={cn(pillVariants({ variant, selected, hovered, className }))} 
      onClick={onSelect}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      {...props}
    >
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
