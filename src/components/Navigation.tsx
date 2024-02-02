import React from "react";
import { ModeToggle } from "./ModeToggle";

type Props = {};

const Navigation = (props: Props) => {
  return (
    <div className="flex justify-center w-full py-2 bg-stone-800/30">
      <div className="flex flex-row justify-between items-center w-5/6">
        <div>Chunkify</div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
