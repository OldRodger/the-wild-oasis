"use client";

import { useState } from "react";

function TextExpander({
  children,
}: Readonly<{
  children: string;
}>) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 40).join(" ") + "...";

  return (
    <span>
      {displayText}{" "}
      <button
        className="border-b border-primary-700 pb-1 leading-3 text-primary-700"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </span>
  );
}

export default TextExpander;
