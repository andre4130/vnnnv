import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Home",
  description: "Graphic design and photography portfolio.",
};

export default function HomePage() {
  return (
    <PageShell
      title="Home"
      description="Placeholder for the home landing section. Hero, featured work, and introduction will go here as we refine the design together."
    />
  );
}
