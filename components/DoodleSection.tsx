// components/DoodleSection.tsx
import type { ReactNode } from "react";
import Image from "next/image";

export interface DoodleSectionProps {
  /** Content to render inside */
  children: ReactNode;
  /** public/images/bgFile.{avif|png} */
  bgImage: string;
  /** Whether to show the scribble divider at bottom */
  divider?: boolean;
  /** Tailwind classes for vertical padding, e.g. "pt-20 pb-0" */
  className?: string;
  /** CSS background-position, e.g. "top center" or "30% 10%" */
  bgPosition?: string;
}

export default function DoodleSection({
  children,
  bgImage,
  divider = true,
  className = "",
  bgPosition = "center",
}: DoodleSectionProps) {
  return (
    <section
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundImage: `url("${bgImage}")`,
        backgroundSize: "cover",
        backgroundPosition: bgPosition,
      }}
    >
      <div className="relative z-10">{children}</div>

      {divider && (
        <div
          className="absolute top-0 left-0 w-full h-16 opacity-20 pointer-events-none transform rotate-180"
        >
          <Image
            src="/images/scribble-divider.svg"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
    </section>
  );
}
