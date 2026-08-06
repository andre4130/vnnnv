import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "About",
  description: "About the designer and photographer.",
};

export default function AboutPage() {
  return (
    <PageShell
      title="About"
      description="Placeholder for the about page. Bio, approach, and contact details will go here."
    />
  );
}
