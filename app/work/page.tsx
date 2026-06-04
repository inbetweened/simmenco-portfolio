import { Header } from "@/components/Header";
import { WorkIndex } from "@/components/WorkIndex";

export const metadata = {
  title: "Work | DS Portfolio",
  description: "Filtered archive of Daniel Simmen portfolio work, motion studies, and Rive experiments.",
};

export default function WorkPage() {
  return (
    <main className="page-shell">
      <Header />
      <WorkIndex />
    </main>
  );
}
