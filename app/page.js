import { HeroSection } from "@/components/homepage/hero-section";
import { QuickStart } from "@/components/homepage/quick-start";
import { Leaderboard } from "@/components/homepage/leaderboard";
import { Stats } from "@/components/homepage/stats";
import { ThemeToggle } from "@/components/chats/theme-toggle";
import { Footer } from "@/components/homepage/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="flex justify-end mr-6 mt-4">
        <ThemeToggle />
      </div>
      <HeroSection />
      <QuickStart />
      <Leaderboard />
      <Stats />
      <Footer />
    </main>
  );
}
