import { Brain, ArrowRight, FileText, Link2, Quote, Image as ImageIcon, Video, Sparkles, Search, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-lg bg-background/80">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold">MindFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-sm">
              Guide
            </Button>
            <Button 
              variant="outline" 
              className="text-sm border-border/50 hover:border-primary/50"
              onClick={() => navigate("/auth/signin")}
            >
              Sign in
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Your personal digital brain</span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Collect. Think. Create.
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            MindFlow helps you capture everything, organize it with AI auto-tagging, and surface insights
            instantly with smart search — minimal, fast, and thoughtful.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button 
              size="lg"
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity px-8"
              onClick={() => navigate("/auth/signin")}
            >
              Sign in with Google
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-border/50 hover:border-primary/50"
            >
              <span>Explore Demo</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Content Type Pills */}
          <div className="flex items-center justify-center gap-3 flex-wrap animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: FileText, label: "Notes" },
              { icon: Link2, label: "Links" },
              { icon: Quote, label: "Quotes" },
              { icon: ImageIcon, label: "Images" },
              { icon: Video, label: "Videos" },
            ].map((type) => (
              <div
                key={type.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50 hover:border-primary/50 transition-colors"
              >
                <type.icon className="w-4 h-4" />
                <span className="text-sm">{type.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-10" />
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Capture Anything",
                description: "Save notes, links, quotes, images, and videos in seconds. MindFlow stays out of the way so ideas keep moving.",
              },
              {
                icon: Tag,
                title: "AI Auto-tagging",
                description: "Intelligent organization that learns from you. Clean structure without the manual sorting.",
              },
              {
                icon: Search,
                title: "Smart Search",
                description: "Ask in natural language to find insights instantly — across everything you've saved.",
              },
            ].map((feature, idx) => (
              <div
                key={feature.title}
                className="p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-fade-in"
                style={{ animationDelay: `${0.5 + idx * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Language Section */}
      <section className="py-20 px-6 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Design Language — MindFlow</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Palette */}
            <div className="p-8 rounded-3xl bg-card border border-border/50">
              <h3 className="text-lg font-semibold mb-4">Palette</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-background border border-border" />
                  <span className="text-sm text-muted-foreground">Dark neutrals (background, surfaces)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-primary" />
                  <span className="text-sm text-muted-foreground">Primary (actions)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-accent" />
                  <span className="text-sm text-muted-foreground">Accent (highlights)</span>
                </div>
              </div>
            </div>

            {/* Components */}
            <div className="p-8 rounded-3xl bg-card border border-border/50">
              <h3 className="text-lg font-semibold mb-4">Components</h3>
              <div className="space-y-3">
                <Button className="bg-gradient-primary hover:opacity-90">Button</Button>
                <div className="px-4 py-2 rounded-full bg-accent/20 text-accent text-sm inline-block">Chip</div>
                <div className="px-4 py-2 rounded-full border border-border/50 text-sm inline-block ml-2">Tag</div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-8 rounded-3xl bg-card border border-border/50">
            <h3 className="text-lg font-semibold mb-3">Typography</h3>
            <p className="text-sm text-muted-foreground">
              Sans-serif, geometric, calm. Base 16px for landing, headings bold with tight letter-spacing. Avoid all caps.
            </p>
          </div>

          <div className="mt-8 p-8 rounded-3xl bg-card border border-border/50">
            <h3 className="text-lg font-semibold mb-3">States</h3>
            <p className="text-sm text-muted-foreground">
              Hover: elevate with subtle shadow and border contrast. Active: pressed shadow. Focus: 2px outline using accent on dark surfaces.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            <span className="font-semibold">MindFlow</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 · Simplicity meets intelligence</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
