import { Brain, ArrowRight, FileText, Link2, Quote, Image as ImageIcon, Video, Sparkles, Search, Tag, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Your personal digital brain</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl font-bold mb-6"
          >
            Collect. Think. Create.
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            MindFlow helps you capture everything, organize it with AI auto-tagging, and surface insights
            instantly with smart search — minimal, fast, and thoughtful.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <Button 
              size="lg"
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 hover:shadow-glow transition-all px-8"
              onClick={() => navigate("/auth/signin")}
            >
              <span className="mr-2">📧</span>
              Sign in with Google
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <span className="mr-2">▶</span>
              Explore Demo
            </Button>
          </motion.div>

          {/* Content Type Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            {[
              { icon: FileText, label: "Notes" },
              { icon: Link2, label: "Links" },
              { icon: Quote, label: "Quotes" },
              { icon: ImageIcon, label: "Images" },
              { icon: Video, label: "Videos" },
            ].map((type, idx) => (
              <motion.div
                key={type.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + idx * 0.05 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
              >
                <type.icon className="w-4 h-4" />
                <span className="text-sm">{type.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Decorative gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }} />
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Inbox,
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
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="p-8 rounded-3xl bg-card border border-border hover:border-primary/30 hover:shadow-glow transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What MindFlow Does Section */}
      <section className="py-20 px-6 bg-card/30">
        <div className="container mx-auto max-w-4xl text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-2xl text-foreground leading-relaxed max-w-3xl mx-auto">
              MindFlow helps you capture everything — thoughts, links, notes, and media — and turns them into organized knowledge.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Your personal digital brain — elegant, fast, and effortlessly smart.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-2xl text-foreground leading-relaxed max-w-3xl mx-auto">
              Save, search, and rediscover your ideas instantly with AI-powered tagging and structure.
            </p>
          </motion.div>
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
