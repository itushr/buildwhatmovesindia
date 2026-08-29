"use client";

import { useEffect, useState, useRef } from "react";
import { Sora } from "next/font/google";
import {
  CornerDownLeft,
  ChevronsRight,
  ChevronUp,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import Table from "./Table";
import DottedWave from "@/components/DottedWave";
import Link from "next/link";
import Header from "./Header";
import Step from "./Step";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
});

const initialSteps = [
  { text: "Identify concerned public authority", status: "default", estimated: 13 },
  { text: "Find available government data sources", status: "default", estimated: 5 },
  { text: "Select most relevant data source", status: "default", estimated: 14 },
  { text: "Retrieve necessary information the source", status: "default", estimated: 5 },
  { text: "Convert raw data to presentable form", status: "default", estimated: 60 },
];

export default function FlashRTI() {
  const { user } = useAppStore();
  const router = useRouter();
  const abortControllerRef = useRef(null);

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [showSteps, setShowSteps] = useState(true);

  const [histories, setHistories] = useState([]);
  const [activeHistoryId, setActiveHistoryId] = useState(null);
  const [originalQuery, setOriginalQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  })

  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [steps, setSteps] = useState(initialSteps);

  const resetSteps = () => {
    setSteps(initialSteps.map((step) => ({ ...step })));
  };

  const fetchHistories = async () => {
    try {
      const res = await fetch("/api/history");

      if (res.ok) {
        const data = await res.json();
        setHistories(data);
      }
    } catch (err) {
      console.error("Error fetching history list:", err);
    }
  };

  const handleHistoryClick = async (id) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setSidebarOpen(false);
    setLoading(false);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/history?id=${id}`);

      if (res.ok) {
        const data = await res.json();

        setActiveHistoryId(data.id);
        setQuery(data.query || "");
        setOriginalQuery(data.query || "");

        if (data.data) {
          setResult(data.data.result);
          setError(data.data.error);

          if (data.data.steps) {
            setSteps(data.data.steps);
            const allStepsCompleted = data.data.steps.every(
              (step) => step.status === "done" || step.status === "error"
            );
            if (allStepsCompleted) {
              setShowSteps(false);
            }
          }
        }
      }
    } catch (err) {
      console.error("Error loading history details:", err);
      setError("Failed to load details from history.");
    }
  };

  const handleNewSessionClick = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setSidebarOpen(false);
    setLoading(false);
    setError(null);
    setResult(null);
    setQuery("");
    setOriginalQuery("");
    setActiveHistoryId(null);
    resetSteps();
  };

  useEffect(() => {
    fetchHistories();
  }, []);


  // Prevent body scrolling when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  // Cleanup REST requests
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const runQuery = async (queryText) => {
    if (!queryText || !queryText.trim()) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    if (
      activeHistoryId !== null &&
      queryText.trim() !== originalQuery.trim()
    ) {
      setActiveHistoryId(null);
      setOriginalQuery("");
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setShowSteps(true);
    resetSteps();

    try {
      // Step 0: Identify concerned public authority
      setSteps((prev) => {
        const next = prev.map((s, idx) => (idx === 0 ? { ...s, status: "working" } : s));
        return next;
      });

      const res0 = await fetch("/api/run-step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: 0, query: queryText, context: {} }),
        signal: controller.signal,
      });

      const data0 = await res0.json();
      if (controller.signal.aborted) return;

      if (data0.status === "error") {
        setSteps((prev) => {
          const next = prev.map((s, idx) => (idx === 0 ? { ...s, status: "error" } : s));
          return next;
        });
        setError(data0.error);
        if (data0.historyId) {
          setActiveHistoryId(data0.historyId);
          setOriginalQuery(queryText);
          fetchHistories();
        }
        setLoading(false);
        return;
      }


      if (data0.abort === true) {
        setSteps((prev) =>
          prev.map((s, idx) =>
            idx === 0 ? { ...s, status: "done" } : s
          )
        );

        if (data0.details) {
          setResult(data0.details);
        }

        setLoading(false);

        if (data0.historyId) {
          setActiveHistoryId(data0.historyId);
          setOriginalQuery(queryText);
          fetchHistories();
        }

        return;
      }

      setSteps((prev) =>
        prev.map((s, idx) => {
          if (idx === 0) return { ...s, status: "done" };
          if (idx === 1) return { ...s, status: "working" };
          return s;
        })
      );

      // Step 1: Find available government data sources
      const res1 = await fetch("/api/run-step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: 1, query: queryText, context: { authorityData: data0.details } }),
        signal: controller.signal,
      });

      const data1 = await res1.json();
      if (controller.signal.aborted) return;

      if (data1.status === "error") {
        setSteps((prev) => {
          const next = prev.map((s, idx) => (idx === 1 ? { ...s, status: "error" } : s));
          return next;
        });
        setError(data1.error);
        if (data1.historyId) {
          setActiveHistoryId(data1.historyId);
          setOriginalQuery(queryText);
          fetchHistories();
        }
        setLoading(false);
        return;
      }

      if (data1.abort === true) {
        setSteps((prev) =>
          prev.map((s, idx) =>
            idx === 1 ? { ...s, status: "done" } : s
          )
        );

        if (data1.details) {
          setResult(data1.details);
        }

        setLoading(false);

        if (data1.historyId) {
          setActiveHistoryId(data1.historyId);
          setOriginalQuery(queryText);
          fetchHistories();
        }

        return;
      }

      setSteps((prev) =>
        prev.map((s, idx) => {
          if (idx === 1) return { ...s, status: "done" };
          if (idx === 2) return { ...s, status: "working" };
          return s;
        })
      );

      // Step 2: Select most relevant data source
      const res2 = await fetch("/api/run-step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: 2, query: queryText, context: { services: data1.details } }),
        signal: controller.signal,
      });

      const data2 = await res2.json();
      if (controller.signal.aborted) return;

      if (data2.status === "error") {
        setSteps((prev) => {
          const next = prev.map((s, idx) => (idx === 2 ? { ...s, status: "error" } : s));
          return next;
        });
        setError(data2.error);
        if (data2.historyId) {
          setActiveHistoryId(data2.historyId);
          setOriginalQuery(queryText);
          fetchHistories();
        }
        setLoading(false);
        return;
      }


      if (data2.abort === true) {
        setSteps((prev) =>
          prev.map((s, idx) =>
            idx === 2 ? { ...s, status: "done" } : s
          )
        );

        if (data2.details) {
          setResult(data2.details);
        }

        setLoading(false);

        if (data2.historyId) {
          setActiveHistoryId(data2.historyId);
          setOriginalQuery(queryText);
          fetchHistories();
        }

        return;
      }

      setSteps((prev) =>
        prev.map((s, idx) => {
          if (idx === 2) return { ...s, status: "done" };
          if (idx === 3) return { ...s, status: "working" };
          return s;
        })
      );

      // Step 3: Retrieve necessary information the source
      const res3 = await fetch("/api/run-step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: 3, query: queryText, context: { serviceData: data2.details } }),
        signal: controller.signal,
      });

      const data3 = await res3.json();
      if (controller.signal.aborted) return;

      if (data3.status === "error") {
        setSteps((prev) => {
          const next = prev.map((s, idx) => (idx === 3 ? { ...s, status: "error" } : s));
          return next;
        });
        setError(data3.error);
        if (data3.historyId) {
          setActiveHistoryId(data3.historyId);
          setOriginalQuery(queryText);
          fetchHistories();
        }
        setLoading(false);
        return;
      }


      if (data3.abort === true) {
        setSteps((prev) =>
          prev.map((s, idx) =>
            idx === 3 ? { ...s, status: "done" } : s
          )
        );

        if (data3.details) {
          setResult(data3.details);
        }

        setLoading(false);

        if (data3.historyId) {
          setActiveHistoryId(data3.historyId);
          setOriginalQuery(queryText);
          fetchHistories();
        }

        return;
      }

      setSteps((prev) =>
        prev.map((s, idx) => {
          if (idx === 3) return { ...s, status: "done" };
          if (idx === 4) return { ...s, status: "working" };
          return s;
        })
      );

      // Step 4: Convert raw data to presentable form
      const res4 = await fetch("/api/run-step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: 4, query: queryText, context: { data: data3.details } }),
        signal: controller.signal,
      });

      const data4 = await res4.json();
      if (controller.signal.aborted) return;

      if (data4.status === "error") {
        setSteps((prev) => {
          const next = prev.map((s, idx) => (idx === 4 ? { ...s, status: "error" } : s));
          return next;
        });
        setError(data4.error);
        if (data4.historyId) {
          setActiveHistoryId(data4.historyId);
          setOriginalQuery(queryText);
          fetchHistories();
        }
        setLoading(false);
        return;
      }


      setSteps((prev) => {
        return prev.map((s) => ({ ...s, status: "done" }));
      });


      setResult(data4.details);
      setLoading(false);
      setShowSteps(false);

      if (data4.historyId) {
        setActiveHistoryId(data4.historyId);
        setOriginalQuery(queryText);
        fetchHistories();
      }

    } catch (err) {
      if (controller.signal.aborted) return;
      console.error("Step execution error:", err);
      setError("Something went wrong");
      setLoading(false);
      setSteps((prev) =>
        prev.map((s) => (s.status === "working" ? { ...s, status: "error" } : s))
      );
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
    }
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

  const retryQuery = () => {
    runQuery(query);
  };

  return (
    <div
      className={`w-full h-dvh bg-slate-50 overflow-hidden ${sora.className} text-lg flex flex-col`}
    >
      <DottedWave />
      <Header />

      <div className="flex-1 flex min-h-0 relative">

        {/* ================= MOBILE SIDEBAR BACKDROP ================= */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ================= SIDEBAR ================= */}
        <aside
          className={`
            fixed md:static
            inset-y-0 left-0
            z-50 md:z-auto
            w-80 md:w-auto
            shrink-0
            bg-white
            transform transition-transform duration-300 ease-out
            ${sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
            }
          `}
        >
          {/* Mobile close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="
              md:hidden
              absolute right-3 top-4 z-10
              p-2 rounded-lg
              bg-gray-100 hover:bg-gray-200
              text-gray-600
              transition
            "
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>

          <Sidebar
            activeHistoryId={activeHistoryId}
            histories={histories}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onHistoryClick={handleHistoryClick}
            onNewSessionClick={handleNewSessionClick}
          />
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 min-w-0 min-h-0 overflow-y-auto">

          {/* Mobile menu button */}
          <div className="md:hidden sticky top-0 z-30 px-4 pt-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="
                p-2.5
                rounded-xl
                bg-white
                text-gray-700
                shadow-[inset_0_0_0_1px_#ddd]
                hover:bg-gray-50
                transition
              "
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
          </div>

          <div
            className="
              w-full
              max-w-200
              mx-auto
              mt-16 md:mt-30
              pb-16
              px-4 sm:px-6
            "
          >
            {/* ================= NOTE ================= */}
            <div
              className="
                w-fit max-w-full
                mx-auto
                px-4 sm:px-5
                py-2
                rounded-full
                text-xs sm:text-sm
                text-center
                leading-relaxed
                shadow-[inset_0_0_0_0.2px_#aaa]
              "
            >
              Note: Mock APIs are limited. Try a suggested query, tweak it,
              or check History in the sidebar.
            </div>

            {/* ================= SUGGESTIONS ================= */}
            <div className="mb-4 mt-12 md:mt-20">
              <p className="text-sm text-gray-500 mb-2">
                Try asking
              </p>

              <div
                className="
                  flex gap-2
                  overflow-x-auto
                  pb-2
                  scrollbar-none
                  -mx-1
                  px-1
                "
              >
                {[
                  "How much income tax was collected from Maharashtra in 2025?",
                  "How much was spent on national highways in 2024-25?",
                  "How many government hospitals are there in Maharashtra?",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    disabled={loading}
                    className="
                      shrink-0
                      max-w-[85vw] sm:max-w-none
                      px-3 py-2
                      rounded-lg
                      cursor-pointer
                      shadow-[inset_0_0_0_1px_#aaa]
                      text-sm
                      text-gray-600
                      hover:bg-gray-100
                      active:bg-gray-200
                      transition
                      whitespace-normal sm:whitespace-nowrap
                      text-left
                    "
                    onClick={() =>
                      handleSuggestionClick(suggestion)
                    }
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* ================= QUERY INPUT ================= */}
            <div
              className="
                shadow-[inset_0_0_0_1px_#aaa]
                pt-2 pl-3 pb-2 pr-2
                rounded-lg
                flex
                min-h-22.5
                bg-white/40
              "
            >
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="
                  resize-none
                  flex-1
                  min-w-0
                  outline-none
                  h-20
                  text-[16px]
                  text-gray-800
                  placeholder-gray-400
                  bg-transparent
                  pr-2
                "
                placeholder="What do you want to know?"
              />

              <div className="flex justify-end items-end shrink-0">
                <button
                  onClick={() => runQuery(query)}
                  disabled={loading || !query.trim()}
                  className={`
                    p-2
                    rounded-xl
                    transition
                    flex items-center justify-center
                    ${loading || !query.trim()
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-[#2D3A1F] text-white hover:bg-[#3d4c2b]"
                    }
                  `}
                >
                  <CornerDownLeft size={16} />
                </button>
              </div>
            </div>

            {/* ================= WORKFLOW ================= */}
            {(loading ||
              result ||
              error ||
              steps.some((s) => s.status !== "default")) && (
                <div>
                  <div
                    className="
                    space-x-2
                    text-gray-500
                    text-sm
                    mt-3
                    cursor-pointer
                    flex items-center
                    select-none
                  "
                    onClick={() =>
                      setShowSteps((prev) => !prev)
                    }
                  >
                    <span>
                      {loading
                        ? "Agents are working for you..."
                        : "Agents completed working"}
                    </span>

                    <span>
                      {showSteps ? (
                        <ChevronDown size={17} />
                      ) : (
                        <ChevronUp size={17} />
                      )}
                    </span>
                  </div>

                  {showSteps && (
                    <div className="space-y-2.5 mt-2 text-sm">
                      {steps.map((step, idx) => (
                        <Step
                          key={idx}
                          text={step.text}
                          status={step.status}
                          estimated={step.estimated}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

            {/* ================= ERROR ================= */}
            {error && (
              <div className="mt-8 text-[15px] sm:text-[16px]">
                {(typeof error === "string" && error.startsWith("429")) ? <p>Too many requests! Please try again after some time.</p> :

                  <p>
                    An error occurred while agents are working.{" "}
                    <span
                      className="hover:underline text-blue-700 cursor-pointer"
                      onClick={retryQuery}
                    >
                      retry
                    </span>
                  </p>
                }
                <p>{error}</p>
              </div>
            )}

            {/* ================= RESULTS ================= */}
            {result && (
              <div className="mt-8 space-y-6 min-w-0">

                {!result.is_relevant && (
                  <div className="mt-8 text-[15px] sm:text-[16px]">
                    <p>
                      Could not find relevant information regarding
                      your query.{" "}
                      <Link href="/submit-request">
                        <span
                          className="
                            hover:underline
                            text-blue-700
                            cursor-pointer
                            inline-flex
                            gap-1
                            items-center
                            ml-1
                          "
                        >
                          File RTI
                          <ChevronsRight size={18} />
                        </span>
                      </Link>
                    </p>
                  </div>
                )}

                {(result.is_relevant && !result.report_data) && !result.is_sufficient && (
                  <div className="mt-8 text-[15px] sm:text-[16px]">
                    <p>
                      Could not find sufficient information
                      regarding your query.{" "}
                      <Link href="/submit-request">
                        <span
                          className="
                              hover:underline
                              text-blue-700
                              cursor-pointer
                              inline-flex
                              gap-1
                              items-center
                              ml-1
                            "
                        >
                          File RTI
                          <ChevronsRight size={18} />
                        </span>
                      </Link>
                    </p>
                  </div>
                )}

                {result.report_data &&
                  result.report_data.map((item, index) => {
                    if (item.type === "plain") {
                      return (
                        <div
                          key={index}
                          className="
                            mt-8
                            text-[15px] sm:text-[16px]
                            wrap-break-word
                          "
                        >
                          <p>{item.content}</p>
                        </div>
                      );
                    }

                    if (item.type === "table") {
                      return (
                        <div
                          key={index}
                          className="
                            space-y-2
                            min-w-0
                            overflow-hidden
                          "
                        >
                          {item.title && (
                            <h4 className="text-sm text-gray-700 pl-1">
                              {item.title}
                            </h4>
                          )}

                          {/* Prevent wide tables from breaking page */}
                          <div className="w-full overflow-x-auto">
                            <Table data={item.content} />
                          </div>
                        </div>
                      );
                    }

                    return null;
                  })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}