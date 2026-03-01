import React from "react";

import type { AnimatedIconType } from "@/components/home/types";

export function AnimatedIcon({ type }: { type: AnimatedIconType }) {
  switch (type) {
    case "express":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <rect
            x="8"
            y="28"
            width="22"
            height="16"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="opacity-65"
          />
          <rect
            x="16"
            y="45"
            width="6"
            height="2"
            fill="currentColor"
            className="opacity-55"
          />
          <path d="M19 47 L17 51 L21 51 Z" fill="currentColor" className="opacity-55" />

          <rect x="70" y="27" width="22" height="8" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-65" />
          <rect x="70" y="39" width="22" height="8" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-65" />
          <rect x="70" y="51" width="22" height="8" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-65" />
          <circle cx="75" cy="31" r="1.2" fill="#1d4ed8" />
          <circle cx="75" cy="43" r="1.2" fill="#1d4ed8" />
          <circle cx="75" cy="55" r="1.2" fill="#1d4ed8" />

          <line x1="34" y1="34" x2="66" y2="34" stroke="#1e3a8a" strokeWidth="1.3" strokeDasharray="4 3" className="opacity-85" />
          <line x1="66" y1="46" x2="34" y2="46" stroke="#1e3a8a" strokeWidth="1.3" strokeDasharray="4 3" className="opacity-85" />

          <polygon points="66,34 62,32 62,36" fill="#1d4ed8" />
          <polygon points="34,46 38,44 38,48" fill="#1d4ed8" />

          <circle cx="34" cy="34" r="1.6" fill="#2563eb">
            <animate attributeName="cx" values="34;66;34" dur="2.3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" dur="2.3s" repeatCount="indefinite" />
          </circle>
          <circle cx="66" cy="46" r="1.6" fill="#1e40af">
            <animate attributeName="cx" values="66;34;66" dur="2.3s" begin="1.15s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" dur="2.3s" begin="1.15s" repeatCount="indefinite" />
          </circle>
        </svg>
      );

    case "websocket":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <line x1="20" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" className="opacity-20" />
          <line x1="20" y1="60" x2="80" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" className="opacity-20" />

          {[0, 1, 2].map((i) => (
            <React.Fragment key={i}>
              <circle cx="0" cy="40" r="2" fill="currentColor">
                <animate attributeName="cx" values="20;80" dur="2s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;0" dur="2s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
              </circle>
              <circle cx="0" cy="60" r="2" fill="currentColor">
                <animate attributeName="cx" values="80;20" dur="2s" begin={`${i * 0.6 + 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;0" dur="2s" begin={`${i * 0.6 + 0.3}s`} repeatCount="indefinite" />
              </circle>
            </React.Fragment>
          ))}

          <rect x="10" y="35" width="10" height="30" rx="2" fill="currentColor" />
          <rect x="80" y="35" width="10" height="30" rx="2" fill="currentColor" />
        </svg>
      );

    case "database":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <path d="M30 60 L70 60 L75 65 L25 65 Z" fill="currentColor" className="opacity-20" />
          <path d="M30 70 L70 70 L75 75 L25 75 Z" fill="currentColor" className="opacity-40" />
          <path d="M30 80 L70 80 L75 85 L25 85 Z" fill="currentColor" />

          <rect x="40" y="20" width="20" height="15" rx="1" fill="#065f46" className="opacity-0">
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
            <animate attributeName="y" values="10;50" dur="2s" repeatCount="indefinite" />
            <animate attributeName="width" values="20;40" dur="2s" repeatCount="indefinite" />
            <animate attributeName="x" values="40;30" dur="2s" repeatCount="indefinite" />
          </rect>

          <rect x="30" y="80" width="40" height="2" fill="white" className="opacity-0">
            <animate attributeName="opacity" values="0;0.5;0" dur="2s" repeatCount="indefinite" />
            <animate attributeName="x" values="30;70" dur="2s" repeatCount="indefinite" />
          </rect>
        </svg>
      );

    case "devops":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <rect x="34" y="34" width="32" height="32" rx="2" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-25" />
          <line x1="34" y1="50" x2="66" y2="50" stroke="currentColor" strokeWidth="1" className="opacity-20" />
          <line x1="50" y1="34" x2="50" y2="66" stroke="currentColor" strokeWidth="1" className="opacity-20" />

          <rect x="30" y="30" width="40" height="40" rx="2" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="140">
            <animate attributeName="stroke-dashoffset" values="140;0" dur="3s" repeatCount="indefinite" />
          </rect>

          <line x1="30" y1="30" x2="70" y2="30" stroke="#1e3a8a" strokeWidth="1.5" className="opacity-0">
            <animate attributeName="y1" values="30;70;30" dur="3s" repeatCount="indefinite" />
            <animate attributeName="y2" values="30;70;30" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.7;0" dur="3s" repeatCount="indefinite" />
          </line>

          <circle cx="40" cy="40" r="1.8" fill="currentColor">
            <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="40" r="1.8" fill="currentColor">
            <animate attributeName="opacity" values="1;0.2;1" dur="1s" begin="0.3s" repeatCount="indefinite" />
          </circle>
          <circle cx="40" cy="60" r="1.8" fill="currentColor">
            <animate attributeName="opacity" values="1;0.2;1" dur="1s" begin="0.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="60" r="1.8" fill="currentColor">
            <animate attributeName="opacity" values="1;0.2;1" dur="1s" begin="0.9s" repeatCount="indefinite" />
          </circle>
        </svg>
      );

    default:
      return null;
  }
}
