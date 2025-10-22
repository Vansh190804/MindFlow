import { Search, Sparkles } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchPage = () => {
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Search Header */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Search className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Search</h1>
            <p className="text-muted-foreground">
              Ask a question or type keywords to find anything
            </p>
          </div>

          {/* Search Input */}
          <div className="relative mb-8">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search your MindFlow... Ask a question or type keywords"
              className="pl-14 pr-32 h-16 bg-card border-border/50 rounded-3xl text-lg focus:border-primary/50"
            />
            <Button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-primary hover:opacity-90 rounded-2xl"
            >
              Search
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-3 flex-wrap mb-12">
            <span className="text-sm text-muted-foreground">Quick filters:</span>
            {["#productivity", "#research", "#idea", "#meeting-notes"].map((tag) => (
              <button
                key={tag}
                className="px-4 py-2 rounded-full bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30 transition-colors text-sm"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* AI Smart Suggestions */}
          <div className="p-8 rounded-3xl bg-card border border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">AI Smart Suggestions</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Related items and queries based on your recent activity
            </p>

            {/* Suggested Queries */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-secondary/50 border border-border/30 hover:border-primary/30 transition-colors cursor-pointer">
                <p className="text-sm">"how to reduce context switching"</p>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/50 border border-border/30 hover:border-primary/30 transition-colors cursor-pointer">
                <p className="text-sm">"rituals for focus sprints"</p>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/50 border border-border/30 hover:border-primary/30 transition-colors cursor-pointer">
                <p className="text-sm">"best timeboxing methods"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SearchPage;
