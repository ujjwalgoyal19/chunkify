"use client";
import Configuration from "@/components/Configuration";
import Navigation from "@/components/Navigation";
import ChunkVisalizer from "@/components/ChunkVisualizer";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const handleTextAreaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setText(e.currentTarget.value);
  };
  return (
    <main className="flex flex-col items-center">
      <section className="flex flex-col  items-center w-full">
        <Navigation />

        <section className="flex w-full">
          <div className="flex justify-center w-full">
            <div className="w-5/6">
              <ChunkVisalizer Text={text} />
            </div>
          </div>
          <div className="px-10 bg-stone-600 ">
            <div className="mb-16 w-full">
              <h3>Text Area</h3>
              <Textarea
                onInput={handleTextAreaInput}
                value={text}
                placeholder="Start writing or Ctrl+V to paste text here."
              />
            </div>
            <Configuration />
          </div>
        </section>
      </section>
    </main>
  );
}
