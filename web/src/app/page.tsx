import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "AIAN — CMS Preview",
  description: "Strapi + Next.js CMS proof of concept",
};

export default function Home() {
  redirect("/ko");
}
