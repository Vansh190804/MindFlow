import { FileText, Link2, Image as ImageIcon, Video, Quote } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";

// Sample data
const recentItems = [
  {
    id: 1,
    type: "note",
    title: "Meeting Notes: Q2 Roadmap",
    preview: "Discussed key priorities for the upcoming quarter...",
    image: null,
    tags: ["planning", "roadmap", "stakeholders"],
    folder: "Team/Strategy",
  },
  {
    id: 2,
    type: "link",
    title: "Link: Systems Thinking Article",
    preview: "example.com",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    tags: ["systems", "theory", "longread"],
    folder: "Inbox/Reads",
  },
  {
    id: 3,
    type: "snippet",
    title: "Snippet: Graph Query",
    preview: "SELECT * FROM nodes...",
    image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400&h=300&fit=crop",
    tags: ["neo4j", "cypher", "graph"],
    folder: "Dev/Notes",
  },
  {
    id: 4,
    type: "image",
    title: "Image: UX Sticky Wall",
    preview: null,
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=300&fit=crop",
    tags: ["ux", "inspiration"],
    folder: "Design/Assets",
  },
  {
    id: 5,
    type: "graph",
    title: "Graph: Topics Map v2",
    preview: null,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    tags: ["map", "relations", "exploration"],
    folder: "Knowledge/Graphs",
  },
  {
    id: 6,
    type: "video",
    title: "Video: Mental Models Talk",
    preview: "youtube.com",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=300&fit=crop",
    tags: ["learning", "models", "talk"],
    folder: "Inbox/Watch",
  },
];

const Dashboard = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case "note":
      case "snippet":
        return FileText;
      case "link":
        return Link2;
      case "image":
      case "graph":
        return ImageIcon;
      case "video":
        return Video;
      case "quote":
        return Quote;
      default:
        return FileText;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recently Added</h2>
          <Button variant="outline" className="border-border/50">
            Filter
          </Button>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentItems.map((item) => {
            const Icon = getIcon(item.type);
            
            return (
              <div
                key={item.id}
                className="group rounded-3xl bg-card border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/10 animate-fade-in"
              >
                {/* Image/Preview */}
                {item.image ? (
                  <div className="aspect-video w-full bg-secondary/50 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-gradient-to-br from-secondary/50 to-secondary/20 flex items-center justify-center">
                    <Icon className="w-12 h-12 text-muted-foreground/30" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-semibold mb-2 line-clamp-1">{item.title}</h3>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-accent/20 text-accent border border-accent/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Folder */}
                  <div className="text-sm text-muted-foreground">{item.folder}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Capture Button */}
        <div className="fixed bottom-8 right-8">
          <Button
            size="lg"
            className="rounded-full bg-gradient-primary hover:opacity-90 shadow-lg shadow-primary/30 px-8 animate-glow"
          >
            AI Capture
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
