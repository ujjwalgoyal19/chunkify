import React from "react";
import { ModeToggle } from "./ModeToggle";

type Props = {};

const Navigation = (props: Props) => {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <div>
        <h1 className="text-2xl">Chunkify</h1>
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navigation;
