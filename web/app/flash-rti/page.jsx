"use client";

import { Sora } from "next/font/google";
import Sidebar from "./Sidebar";
import { CornerDownLeft, Loader, Check, AlertCircle, CircleCheckBig, Octagon, OctagonAlert, ChevronsRight, ChevronUp, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import Table from "./Table";
import Link from "next/link";

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
})

export default function FlashRTI() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [showSteps, setShowSteps] = useState(true);
  const wsRef = useRef(null);

  const [steps, setSteps] = useState([
    { text: "Identify concerned public authority", status: "default", estimated: 13 },
    { text: "Find available government data sources", status: "default", estimated: 5 },
    { text: "Select most relevant data source", status: "default", estimated: 14 },
    { text: "Retrieve necessary information the source", status: "default", estimated: 5 },
    { text: "Convert raw data to presentable form", status: "default", estimated: 60 },
  ]);

  useEffect(() => {
    const allStepsCompleted = steps.every(
      (step) => step.status === "done" || step.status === "error"
    );

    if (allStepsCompleted) {
      setShowSteps(false);
    }
  }, [steps]);

  // Cleanup websocket when path shifts or component unmounts
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const runQuery = (queryText) => {
    if (!queryText || !queryText.trim()) return;

    if (wsRef.current) {
      wsRef.current.close();
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    // Connect to port 3001
    const wsUrl = `${protocol}//${window.location.hostname}:3001`;
    console.log(`Connecting to WebSocket at ${wsUrl}`);

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log(`WebSocket connection opened. Asking for query: "${queryText}"`);
      ws.send(JSON.stringify({ type: "ask", query: queryText }));
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("WebSocket message received:", message);

        if (message.type === "progress") {
          const { step, status } = message;

          setSteps((prevSteps) => {
            const nextSteps = prevSteps.map((s, idx) => {
              if (idx === step) {
                return { ...s, status };
              }
              return s;
            });
            // If the completed step is followed by a default step, auto-advance to "working" for user experience
            if (status === "done" && nextSteps[step + 1] && nextSteps[step + 1].status === "default") {
              nextSteps[step + 1].status = "working";
            }
            return nextSteps;
          });
        }
        else if (message.type === "done") {
          console.log("WebSocket query execution complete:", message.result);
          setResult(message.result);
          setLoading(false);
          // Set all remaining steps to done
          setSteps((prevSteps) =>
            prevSteps.map(s => (s.status === "working" || s.status === "default") ? { ...s, status: "done" } : s)
          );
          ws.close();
        }
        else if (message.type === "error") {
          console.error("WebSocket query execution error:", message.error);
          setError(message.error);
          setLoading(false);
          // Set current working step to error
          setSteps((prevSteps) =>
            prevSteps.map(s => s.status === "working" ? { ...s, status: "error" } : s)
          );
          ws.close();
        }
      } catch (err) {
        console.error("Error matching WebSocket message payload:", err);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error state:", err);
      setError("WebSocket connection failed. Please ensure the agent backend is running.");
      setLoading(false);
      setSteps((prevSteps) =>
        prevSteps.map(s => s.status === "working" ? { ...s, status: "error" } : s)
      );
    };

    ws.onclose = () => {
      console.log("WebSocket closed.");
      setLoading(false);
      if (wsRef.current === ws) {
        wsRef.current = null;
      }
    };
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      runQuery(query);
    }
  };

  const retryQuery = (e) => {
    runQuery(query);
  }

  return (
    <div className={`w-dvw h-dvh absolute top-0 left-0 bg-slate-50 z-200 overflow-auto ${sora.className} text-lg pl-75`}>
      <Sidebar />
      <div className="w-full">
        <div className="shadow-[inset_0_-0.01px_0_0_#000000] h-15 sticky top-0 bg-slate-50/50 z-10 backdrop-blur-md">
          <Navbar />
        </div>

        <div className="max-w-200 mt-30 mx-auto pb-16 px-4">
          <div className="w-fit mx-auto px-5 py-2 rounded-full text-sm shadow-[inset_0_0_0_0.2px_#aaa]">Note: Mock APIs are limited. Try a suggested query, tweak it, or check History in the sidebar.</div>


          <div className="mb-4 mt-20">
            <p className="text-sm text-gray-500 mb-2">
              Try asking
            </p>

            {/* suggestions */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {[
                "How much income tax was collected from Maharashtra in 2025?",
                "How much was spent on national highways in 2024-25?",
                "How many government hospitals are there in Maharashtra?",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  disabled={loading}
                  className="shrink-0 px-3 py-2 rounded-lg cursor-pointer shadow-[inset_0_0_0_1px_#aaa] text-sm text-gray-600 hover:bg-gray-100 transition"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
          <div className="shadow-[inset_0_0_0_1px_#aaa] pt-2 pl-3 pb-2 pr-2 rounded-lg flex">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              className="resize-none flex-1 outline-none h-20 text-[16px] text-gray-800 placeholder-gray-400 bg-transparent pr-12"
              placeholder="What do you want to know?"
            />
            <div className="flex justify-end items-end">
              <button
                onClick={() => runQuery(query)}
                disabled={loading || !query.trim()}
                className={`p-2 rounded-xl transition flex items-center justify-center cursor-pointer ${loading || !query.trim()
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-[#2D3A1F] text-white hover:bg-[#3d4c2b]"
                  }`}
              >
                <CornerDownLeft size={16} />
              </button>
            </div>
          </div>

          {/* Workflow Steps Monitor */}
          {(loading || result || error || steps.some(s => s.status !== "default")) && (
            <div>
              <div className="space-x-2 text-gray-500 text-sm mt-3 cursor-pointer flex items-center" onClick={() => setShowSteps((prev) => !prev)}>
                <span>{loading ? 'Agents are working for you...' : 'Agents completed working'}</span>
                <span>{showSteps ? <ChevronDown size={17} /> : <ChevronUp size={17} />}</span>
              </div>
              {showSteps &&
                <div className="space-y-2.5 mt-2 text-sm">
                  {steps.map((step, idx) => (
                    <Step key={idx} text={step.text} status={step.status} estimated={step.estimated} />
                  ))}
                </div>
              }
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-8 text-[16px]">
              <div>
                <p className="">An error occured while agents are working. <span className="hover:underline text-blue-700 cursor-pointer" onClick={() => retryQuery()}>retry</span></p>
                <p className="mt-0.5 opacity-90">{error}</p>
              </div>
            </div>
          )}

          {/* Results Presentation Container */}
          {result && (
            <div className="mt-8 space-y-6">
              {/* <div className="pb-2 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Pipeline Result</h3>
              </div> */}

              {!result.is_relevant && (
                <div className="mt-8 text-[16px]">
                  <p>Could not find relevant information regarding your query. <Link href="/submit-request"><span className="hover:underline text-blue-700 cursor-pointer inline-flex gap-1 items-center ml-1">File RTI<ChevronsRight size={18} /></span></Link></p>
                </div>
              )}

              {result.is_relevant && !result.is_sufficient && (
                <div className="mt-8 text-[16px]">
                  <p>Could not find sufficient information regarding your query. <Link href="/submit-request"><span className="hover:underline text-blue-700 cursor-pointer inline-flex gap-1 items-center ml-1">File RTI<ChevronsRight size={18} /></span></Link></p>
                </div>
              )}

              {result.report_data && result.report_data.map((item, index) => {
                if (item.type === "plain") {
                  return (
                    <div key={index} className="mt-8 text-[16px]">
                      <p>{item.content}</p>
                    </div>
                  );
                } else if (item.type === "table") {
                  return (
                    <div key={index} className="space-y-2">
                      {item.title && <h4 className="text-sm text-gray-700 pl-1">{item.title}</h4>}
                      <Table data={item.content} />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}

          {/* Initial default registry table
          {!loading && !result && !error && (
            <div className="mt-8 space-y-3">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Example Registry Data</h3>
              <Table data={initialMockData} />
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}

const Step = ({ text, status, estimated = 13 }) => {
  const [time, setTime] = useState(estimated);

  useEffect(() => {
    setTime(estimated);
  }, [estimated, status]);

  useEffect(() => {
    if (status !== "working") return;

    const timer = setInterval(() => {
      setTime((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  return (
    <div className="flex gap-2 bg-[#E9E8E1] text-[#686861] rounded-lg p-2 shadow-[inset_0_0_0_0.3px_#aaa]">
      <div className="pt-px">
        {status === "done" ? <CircleCheckBig size={17} /> : (status === "error" ? <OctagonAlert size={17} /> : <Loader size={17} className={status === "working" && "animate-spin"} />)}
      </div>
      <div>
        <p>
          {text}
        </p>
        <p className="text-sm opacity-80">
          {status === "working" ? (time > 0 ? `estimated time ${time}s` : "taking longer than usual") : ((status === "done") ? "completed" : (status === "error" ? "information not found" : "yet to start"))}
        </p>
      </div>
    </div>
  )
}