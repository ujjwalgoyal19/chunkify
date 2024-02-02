"use client";
import { useConfigContext } from "@/contexts/config-context";
import {
  splitCodeMarkupRecursivelyByCharacter,
  splitTextByCharacter,
  splitTextRecursivelyByCharacter,
} from "@/utils/splitters";
import { Document } from "langchain/document";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  Text: string;
};

const COLORS = [
  "text-orange-200",
  "text-yellow-200",
  "text-lime-200",
  "text-indigo-200",
  "text-fuchsia-200",
];

const ShowConfig = (props: { name: string; value: number | string }) => {
  return (
    <div className="flex flex-col items-center">
      <h6 className="text-2xl">{props.name}</h6>
      <p className="text-lg">{props.value}</p>
    </div>
  );
};

const ChunkPill = (props: {
  index: number;
  uniquePart: string;
  overlapPart: string | undefined;
}) => {
  return (
    <span
      className={`transition-all glass glass-${
        props.index % 4
      } rounded-lg font-normal mr-2`}
      // className={`py-2 px-3 overflow-hidden mr-3 border-white/20 border glass2 rounded-lg duration-300 text-[#f4f0ff] cursor-pointer select-none`}
    >
      <span>{props.uniquePart}</span>
      {props.overlapPart && (
        <span className="text-shadow-none">{props.overlapPart}</span>
      )}
    </span>
  );
};

const ChunkVisualizer = (props: Props) => {
  const config = useConfigContext();

  const [chunks, setChunks] = useState<Document<Record<string, any>>[]>([]);

  const getChunks = useCallback(async () => {
    if (config) {
      const text = props.Text;
      let chunks: Document<Record<string, any>>[] = [];

      if (config.chunkingMethod === "mcrcts" && config.language) {
        chunks = await splitCodeMarkupRecursivelyByCharacter(
          text,
          config?.language,
          config?.chunkSize,
          config?.chunkOverlap
        );
      } else if (config.chunkingMethod === "cts") {
        chunks = await splitTextByCharacter(
          text,
          config.separator.length > 0 ? config.separator[0] : "",
          config.chunkSize,
          config.chunkOverlap
        );
      } else if (config.chunkingMethod === "rcts") {
        chunks = await splitTextRecursivelyByCharacter(
          text,
          config.separator,
          config.chunkSize,
          config.chunkOverlap
        );
      }
      setChunks(chunks);
      console.log(chunks);
    }
  }, [config, props.Text]);

  useEffect(() => {
    getChunks();
  }, [config, getChunks, props.Text]);

  const getTextSize = () => {
    if (props.Text.length < 700) {
      return "text-4xl";
    } else if (props.Text.length < 1100) {
      return "text-3xl";
    } else if (props.Text.length < 1300) {
      return "text-2xl";
    } else {
      return "text-md";
    }
  };

  const getChunkOverlapText = (text: string, index: number) => {
    let uniquePart = text;
    let overlapPart;
    let overlap = true;
    if (config) {
      for (let sep of config.separator) {
        if (sep !== "") {
          overlap = false;
          break;
        }
      }
    }

    if (config && overlap) {
      if (index == 0 && index === chunks.length - 1) {
        uniquePart = text;
      } else if (index === 0) {
        uniquePart = text.slice(0, text.length - config.chunkOverlap);
        overlapPart = text.slice(text.length - config.chunkOverlap);
      } else if (index !== chunks.length - 1) {
        uniquePart = text.slice(
          config.chunkOverlap,
          text.length - config.chunkOverlap
        );
        overlapPart = text.slice(text.length - config.chunkOverlap);
      } else {
        uniquePart = text.slice(config.chunkOverlap);
        overlapPart = "";
      }
    }

    return { uniquePart, overlapPart };
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex justify-between w-3/5 mb-14">
        <ShowConfig name="Total Props" value={chunks.length} />
        <ShowConfig name="Total Characters" value={props.Text.length} />
      </div>
      <div
        className={`${getTextSize()} h-full break-words break-all w-full leading-normal`}
      >
        {chunks.map((chunk, index) => {
          const { uniquePart, overlapPart } = getChunkOverlapText(
            chunk.pageContent,
            index
          );
          return (
            <ChunkPill
              key={index}
              index={index}
              uniquePart={uniquePart}
              overlapPart={overlapPart}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChunkVisualizer;
