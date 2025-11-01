import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";

export function Navbar() {
  return (
    <header className={cn("w-full border-b px-6 py-4 bg-background")}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold">Second Brain</h1>

        <nav className="flex gap-4">
          <Button variant="ghost">Dashboard</Button>
          <Button variant="ghost">Add Content</Button>
          <Button variant="ghost">Settings</Button>
        </nav>
      </div>
    </header>
  );
}
