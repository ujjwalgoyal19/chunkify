"use client";
import Navigation from "@/components/Navigation";
import ChunkComposer from "@/components/ChunkComposer";
import ChunkVisualizer from "@/components/ChunkVisualizer";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="w-auto mx-24 flex flex-col">
        <section className="px-12 flex flex-col gap-10 bg-white/[0.04] pt-6 rounded-b-3xl">
          <Navigation />
          <ChunkComposer />
        </section>
        <section>
          <div></div>
        </section>
      </div>
    </main>
  );
}
