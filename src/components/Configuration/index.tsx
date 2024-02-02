import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChunkingMethods, LangchainSplitterLanguages } from "@/constants";
import Image from "next/image";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Language, useConfigContext } from "@/contexts/config-context";

type Props = {};
const Configuration = (props: Props) => {
  const config = useConfigContext();
  return (
    <div className=" flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p>Split Method</p>
        <Select onValueChange={config?.changeChunkingMethod}>
          <SelectTrigger className="w-[400px]">
            <SelectValue
              placeholder="Text Split Method"
              defaultValue={
                ChunkingMethods.find(
                  (Method) => Method.code === config?.chunkingMethod
                )?.name
              }
            />
          </SelectTrigger>
          <SelectContent>
            {ChunkingMethods.map((Method) => {
              return (
                <SelectItem value={Method.code} key={Method.code}>
                  {Method.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      {config?.chunkingMethod === "cts" || config?.chunkingMethod === "rcts" ? (
        <div>
          <p>Separator</p>
          <Input
            type="text"
            placeholder="Separator like \n"
            value={config?.separator.join(",")}
            onChange={(e) => config?.changeSeparator(e.currentTarget.value)}
          />
        </div>
      ) : null}
      {config?.chunkingMethod === "mcrcts" ? (
        <div className="flex flex-col gap-2">
          <p>Language</p>
          <Select
            onValueChange={(value) => config.changeLanguage(value as Language)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select laguage type" />
            </SelectTrigger>
            <SelectContent>
              {LangchainSplitterLanguages.map((language) => {
                return (
                  <SelectItem value={language.code} key={language.code}>
                    <div className="flex flex-row gap-2">
                      <Image
                        src={language.icon}
                        alt={language.name}
                        width={20}
                        height={20}
                      />
                      <p>{language.name}</p>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p>Chunk Size</p>
          <Input
            className="min-w-20 w-fit max-w-fit"
            type="text"
            placeholder=""
            value={config?.chunkSize}
            onChange={(e) => {
              if (isNaN(Number(e.currentTarget.value))) {
                toast("Chunk Size can only be numberical");
                return;
              }
              config?.changeChunkSize(Number(e.currentTarget.value));
            }}
          />
        </div>
        <Slider
          defaultValue={[config?.chunkSize!]}
          max={1000}
          min={1}
          step={1}
          onValueChange={(e) => config?.changeChunkSize(e[0])}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p>Chunk Overlap</p>
          <Input
            className="w-fit"
            type="text"
            placeholder=""
            value={config?.chunkOverlap}
            onChange={(e) => {
              if (isNaN(Number(e.currentTarget.value))) {
                toast("Chunk Overlap can only be numberical");
                return;
              }
              config?.changeChunkOverlap(Number(e.currentTarget.value));
            }}
          />
        </div>
        <Slider
          value={[config?.chunkOverlap!]}
          max={config?.chunkSize! - 1}
          step={1}
          onValueChange={(e) => config?.changeChunkOverlap(e[0])}
        />
      </div>
    </div>
  );
};

export default Configuration;
