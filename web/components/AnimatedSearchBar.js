"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { SearchIcon, XIcon } from "./Icons";
import { useApp } from "../context/AppContext";

const emptySubscribe = () => () => {};

export default function AnimatedSearchBar({
  prompts: customPrompts,
  onSearch,
  className = "",
}) {
  const { t } = useApp();
  const prompts = customPrompts || t.searchBar.prompts;

  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [prevPrompts, setPrevPrompts] = useState(prompts);
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  // Sync state during render if prompts prop changes
  if (prompts !== prevPrompts) {
    setPrevPrompts(prompts);
    setPromptIndex(0);
    setDisplayText("");
    setIsDeleting(false);
  }

  const timeoutRef = useRef(null);

  // Handle Typing & Backspacing animation loop
  useEffect(() => {
    if (!isMounted) return;

    // Pause animation if user is focused on input or has entered text
    if (isFocused || query.trim() !== "") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    // Respect reduced motion settings
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      const timer = setTimeout(() => {
        setDisplayText(prompts[0] || "");
      }, 0);
      return () => clearTimeout(timer);
    }

    const currentPrompt = prompts[promptIndex] || prompts[0];

    const handleTypewriter = () => {
      if (!isDeleting) {
        // Typing characters out
        if (displayText.length < currentPrompt.length) {
          setDisplayText(currentPrompt.slice(0, displayText.length + 1));
          timeoutRef.current = setTimeout(handleTypewriter, 60);
        } else {
          // Finished typing full phrase -> pause to let user read
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, 2200);
        }
      } else {
        // Backspacing / deleting characters
        if (displayText.length > 0) {
          setDisplayText(currentPrompt.slice(0, displayText.length - 1));
          timeoutRef.current = setTimeout(handleTypewriter, 30);
        } else {
          // Finished deleting phrase -> switch to next prompt & start typing
          setIsDeleting(false);
          setPromptIndex((prev) => (prev + 1) % prompts.length);
          timeoutRef.current = setTimeout(handleTypewriter, 350);
        }
      }
    };

    timeoutRef.current = setTimeout(handleTypewriter, isDeleting ? 30 : 60);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, isDeleting, promptIndex, isFocused, query, prompts, isMounted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery("");
  };

  const showPlaceholderOverlay = isMounted && !isFocused && query.length === 0;

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-3xl flex items-center h-[56px] sm:h-[60px] rounded-2xl border border-blue-300/80 bg-white p-1.5 mx-auto shadow-[0_4px_30px_-2px_rgba(29,104,242,0.26),0_0_18px_rgba(11,28,63,0.08)] hover:shadow-[0_6px_35px_-2px_rgba(29,104,242,0.34),0_0_24px_rgba(11,28,63,0.12)] hover:border-blue-400 focus-within:border-blue-600 focus-within:shadow-[0_8px_40px_-2px_rgba(29,104,242,0.4),0_0_28px_rgba(11,28,63,0.15)] focus-within:ring-4 focus-within:ring-blue-600/15 transition-all duration-300 relative group overflow-hidden ${className}`}
    >
      {/* Search Bar Body (White portion to the left of the search button) */}
      <div className="relative flex-1 h-full flex items-center min-w-0">
        {/* Real Input Element with Left Padding */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Search public information or file an RTI"
          placeholder={showPlaceholderOverlay ? "" : (prompts[0] || t.searchBar.placeholder)}
          className="w-full h-full bg-transparent pl-6 sm:pl-7 pr-3 text-slate-800 placeholder:text-slate-400/80 text-base font-normal outline-none z-10 flex items-center leading-normal"
        />

        {/* Animated Typewriter Placeholder Overlay with Matching Left Padding */}
        <div
          className={`absolute inset-y-0 left-0 right-0 pl-6 sm:pl-7 pr-3 flex items-center pointer-events-none select-none z-0 transition-opacity duration-200 ${
            showPlaceholderOverlay ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          <span className="text-slate-400 text-base font-normal truncate max-w-full leading-normal">
            {displayText}
          </span>
          <span className="inline-block w-[2px] h-[1.15em] bg-blue-600 align-middle ml-0.5 rounded-full animate-[pulse_1s_infinite]" />
        </div>

        {/* Clear Button when user types */}
        {query.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="z-20 p-1.5 mr-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors shrink-0"
            title="Clear search"
            aria-label="Clear search query"
          >
            <XIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Blue Inset Search Button (Rounded Square Button inside container) */}
      <button
        type="submit"
        className="h-full aspect-square bg-[#1D68F2] hover:bg-[#1554C8] active:bg-[#1044A5] text-white rounded-xl flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-2xs ml-1"
        aria-label="Search"
      >
        <SearchIcon className="w-5 h-5 text-white stroke-[2.2]" />
      </button>
    </form>
  );
}
