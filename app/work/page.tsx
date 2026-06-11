import { Header } from "@/components/Header";
import { WorkIndex } from "@/components/WorkIndex";
import { getSiteSettings, getWorkItems } from "@/lib/sanity/fetch";

export const metadata = {
  title: "Work | DS Portfolio",
  description: "Filtered archive of Daniel Simmen portfolio work, motion studies, and Rive experiments.",
};

export default async function WorkPage() {
  const [items, settings] = await Promise.all([getWorkItems(), getSiteSettings()]);

  return (
    <main className="page-shell">
      <Header
        statement={settings?.headerStatement}
        email={settings?.email}
        linkedin={settings?.linkedin}
      />
      <WorkIndex items={items} />
    </main>
  );
}
