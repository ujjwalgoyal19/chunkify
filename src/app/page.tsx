"use client";
import ChunkCharts from "@/components/ChunkCharts";
import ChunkComparison from "@/components/ChunkComparison";
import ChunkComposer from "@/components/ChunkComposer";
import ChunkVisualizer from "@/components/ChunkVisualizer";
import VisualizerPanel from "@/components/VisualizerPanel";
import CodeExport from "@/components/CodeExport";
import Navigation from "@/components/Navigation";
import VisualizationContextProvider from "@/contexts/visualization-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <VisualizationContextProvider>
      <main className="flex flex-col h-screen">
        <div className="w-auto mx-24 flex flex-col gap-8 h-full">
          <section className=" flex flex-col gap-10  pt-6 rounded-b-3xl">
            <Navigation />
            <ChunkComposer />
          </section>
          <section className="relative px-12 bg-white/[0.04] h-fit pb-10 rounded-t-3xl pt-8">
            <div className="absolute"></div>
            <Tabs defaultValue="visualizer">
              <TabsList className="mb-6">
                <TabsTrigger value="visualizer">Visualizer</TabsTrigger>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="charts">Charts</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="visualizer" className="">
                <ChunkVisualizer />
              </TabsContent>
              <TabsContent value="dashboard">
                <VisualizerPanel />
              </TabsContent>
              <TabsContent value="charts">
                <ChunkCharts />
              </TabsContent>
              <TabsContent value="code">
                <CodeExport />
              </TabsContent>
              <TabsContent value="comparison">
                <ChunkComparison />
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
    </VisualizationContextProvider>
  );
}
