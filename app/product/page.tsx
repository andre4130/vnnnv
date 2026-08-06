import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Product",
  description: "Product photography and design work.",
};

export default function ProductPage() {
  return (
    <PageShell
      title="Product"
      description="Placeholder for product photography and design projects. Gallery and case studies will be added here."
    />
  );
}
