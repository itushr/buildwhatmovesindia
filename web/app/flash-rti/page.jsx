"use client";

import { Inter, Sora } from "next/font/google";
import Sidebar from "./Sidebar";
import { ArrowRight, ArrowUp, CornerDownLeft, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
})

export default function page() {
  return (
    <div className={`w-dvw h-dvh absolute top-0 left-0 bg-slate-50 z-50 flex overflow-auto ${sora.className} text-lg`}>
      <Sidebar />
      <div className="flex-1">
        <div className="shadow-[inset_0_-0.1px_0_0_#000000] h-15">
          <Navbar />
        </div>

        <div className="max-w-200 mt-50 mx-auto">
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">
              Try asking
            </p>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {[
                "How much income tax was collected from Maharashtra in 2025?",
                "How much was spent on national highways in 2024-25?",
                "How many government hospitals are there in Maharashtra?",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  className="shrink-0 px-3 py-2 rounded-lg cursor-pointer shadow-[inset_0_0_0_1px_#aaa] text-sm text-gray-600 hover:bg-gray-100 transition"
                  onClick={() => setQuery(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className="shadow-[inset_0_0_0_1px_#aaa] pt-5 pl-5 pb-2 pr-2 rounded-lg flex">
            <textarea className="resize-none flex-1 outline-none h-15" placeholder="What do you want to know?" />
            <div className="flex justify-end items-end">
              <div className="p-2 rounded-full bg-[#2D3A1F]">
                <CornerDownLeft size={15} stroke="white" />
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-3">
            <Step status="working" text="Identifying concerned public authority" />
            <Step status="default" text="Find available government data sources" />
            <Step status="default" text="Select most relevant data source" />
            <Step status="default" text="Retrieve necessary information the source" />
            <Step status="default" text="Convert raw data to presentable form" />
          </div>
        </div>

      </div>
    </div>
  )
}

const Step = ({ text, status, estimated = 13 }) => {
  const [time, setTime] = useState(estimated);

  useEffect(() => {
    if (status !== "working") return;

    const timer = setInterval(() => {
      setTime((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  return (
    <div className="flex gap-3 bg-[#E9E8E1] text-[#686861] rounded-lg p-2 shadow-[inset_0_0_0_0.3px_#aaa]">
      <div>
        <Loader size={17} className={status === "working" ? "animate-spin mt-1" : "mt-1"} />
      </div>
      <div>
        <p>
          {text}
        </p>
        <p className="text-sm opacity-80">
          {status === "working" ? (time > 0 ? `estimated time ${time}s` : "taking longer than usual") : "yet to start"}
        </p>
      </div>
    </div>
  )
}