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
  if (!config) {
    return;
  }
  const {
    chunkSize,
    chunkOverlap,
    chunkingMethod,
    language,
    separator,
    changeChunkOverlap,
    changeChunkSize,
    changeChunkingMethod,
    changeLanguage,
    changeSeparator,
  } = config;
  return (
    <div className=" flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm">Split Method</h3>
        <Select onValueChange={changeChunkingMethod}>
          <SelectTrigger>
            <SelectValue
              placeholder="Text Split Method"
              defaultValue={
                ChunkingMethods.find((Method) => Method.code === chunkingMethod)
                  ?.name
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
      {chunkingMethod === "cts" || chunkingMethod === "rcts" ? (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm">Separator</h3>
          <Input
            type="text"
            placeholder="Separator like \n"
            value={separator.join(",")}
            onChange={(e) => changeSeparator(e.currentTarget.value)}
          />
        </div>
      ) : null}
      {chunkingMethod === "mcrcts" ? (
        <div className="flex flex-col gap-2">
          <p>Language</p>
          <Select onValueChange={(value) => changeLanguage(value as Language)}>
            <SelectTrigger>
              <SelectValue
                placeholder="Select laguage type"
                defaultValue={
                  LangchainSplitterLanguages.find(
                    (Language) => Language.code === language
                  )?.name
                }
              />
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

      <div className="flex justify-between w-full gap-14">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-center">
            <label className="text-sm">Chunk Size</label>
            <Input
              className="w-fit text-right"
              type="text"
              value={chunkSize}
              onChange={(e) => {
                if (isNaN(Number(e.currentTarget.value))) {
                  toast("Chunk Size can only be numberical");
                  return;
                }
                changeChunkSize(Number(e.currentTarget.value));
              }}
            />
          </div>
          <Slider
            defaultValue={[chunkSize]}
            max={1000}
            min={1}
            step={1}
            onValueChange={(e) => changeChunkSize(e[0])}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-center">
            <p>Chunk Overlap</p>
            <Input
              className="max-w-20 w-fit"
              type="text"
              placeholder=""
              value={chunkOverlap}
              onChange={(e) => {
                if (isNaN(Number(e.currentTarget.value))) {
                  toast("Chunk Overlap can only be numberical");
                  return;
                }
                changeChunkOverlap(Number(e.currentTarget.value));
              }}
            />
          </div>
          <Slider
            value={[chunkOverlap]}
            max={chunkSize - 1}
            step={1}
            onValueChange={(e) => changeChunkOverlap(e[0])}
          />
        </div>
      </div>
    </div>
  );
};

export default Configuration;
