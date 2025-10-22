import { Plus, Sparkles, Folder, Lightbulb } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const spaces = [
  {
    id: 1,
    name: "Design Inspiration",
    description: "A curated board of references: calming surfaces, typography, motion studies, and interaction patterns for current projects.",
    icon: Sparkles,
    color: "hsl(180, 100%, 50%)",
    itemCount: 24,
  },
  {
    id: 2,
    name: "Product Strategy",
    description: "Long-term planning, competitive analysis, and vision documents.",
    icon: Folder,
    color: "hsl(260, 95%, 65%)",
    itemCount: 18,
  },
  {
    id: 3,
    name: "Personal Knowledge",
    description: "Articles, quotes, and ideas that shape my thinking.",
    icon: Lightbulb,
    color: "hsl(40, 100%, 50%)",
    itemCount: 47,
  },
];

const Spaces = () => {
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Spaces</h1>
            <p className="text-muted-foreground">
              Organize your knowledge into focused collections
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus className="mr-2 w-4 h-4" />
            New Space
          </Button>
        </div>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map((space, idx) => (
            <div
              key={space.id}
              className="group p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/10 animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Icon */}
              <Avatar
                className="w-16 h-16 mb-4 border-2"
                style={{ borderColor: `${space.color}40` }}
              >
                <AvatarFallback
                  className="text-white"
                  style={{ background: space.color }}
                >
                  <space.icon className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-2">{space.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {space.description}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{space.itemCount} items</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  Open →
                </span>
              </div>
            </div>
          ))}

          {/* Create New Space Card */}
          <div className="group p-8 rounded-3xl border-2 border-dashed border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center min-h-[240px] animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Create New Space</h3>
            <p className="text-sm text-muted-foreground">
              Start organizing your ideas
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Spaces;
