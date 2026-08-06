import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Visual",
  description: "Visual and photographic work.",
};

export default function VisualPage() {
  return (
    <PageShell
      title="Visual"
      description="Placeholder for visual and photographic work. Imagery and series will be added here."
    />
  );
}
