import { ReactNode, useState, useEffect } from "react";
import { Brain, LayoutDashboard, Layers, Package, Search, Settings, LogOut, X, Filter, Calendar, FileType, ExternalLink, Copy } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { getCurrentUser, logout } from "@/lib/auth";
import { AddItemDialog } from "./AddItemDialog";
import { ItemDetailDialog } from "./ItemDetailDialog";
import { apiRequest, normalizeItems } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: ReactNode;
  onItemAdded?: () => void;
}

interface SearchFilters {
  types: string[];
  dateFrom?: Date;
  dateTo?: Date;
}

interface Item {
  id: number;
  type: string;
  title: string;
  content: string;
  url: string;
  storage_path?: string;
  mime_type?: string;
  tags: string[];
  category: string;
  folder: string;
  ai_meta?: any;
  description?: string | null;
  raw_content?: string | null;
  created_at: string;
  updated_at?: string;
}

const DashboardLayout = ({ children, onItemAdded }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileVersion, setProfileVersion] = useState(0);
  const user = getCurrentUser();
  const { toast } = useToast();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [columnsCount, setColumnsCount] = useState<number>(3);
  const [masonryColumns, setMasonryColumns] = useState<Item[][]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    types: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const contentTypes = ["note", "link", "image", "video", "article"];

  useEffect(() => {
    if (searchQuery.length > 0) {
      const delayDebounceFn = setTimeout(() => {
        performSearch();
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchResults([]);
      setSearchActive(false);
    }
  }, [searchQuery, filters.types, filters.dateFrom, filters.dateTo]);

  // Responsive column count based on window width (tailwind-like breakpoints)
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w >= 1280) return 5; // xl
      if (w >= 1024) return 4; // lg
      if (w >= 768) return 3; // md
      if (w >= 640) return 2; // sm
      return 1;
    };

    const onResize = () => setColumnsCount(calc());
    setColumnsCount(calc());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Build masonry columns from searchResults using simple estimated heights per type
  useEffect(() => {
    const buildColumns = () => {
      const cols = Array.from({ length: Math.max(1, columnsCount) }, () => [] as Item[]);
      const colHeights = new Array(columnsCount).fill(0);

      const estimateHeight = (it: Item) => {
        // rough estimates (px) for packing — adjust for tighter fit
        if (it.type === "image" || it.type === "video") return 240;
        if (it.type === "article") return 160;
        if (it.type === "note") return 140;
        if (it.type === "link") return 120;
        return 130;
      };

      for (const it of searchResults) {
        // find shortest column
        let minIdx = 0;
        for (let i = 1; i < colHeights.length; i++) {
          if (colHeights[i] < colHeights[minIdx]) minIdx = i;
        }
        cols[minIdx].push(it);
        colHeights[minIdx] += estimateHeight(it);
      }

      setMasonryColumns(cols);
    };

    buildColumns();
  }, [searchResults, columnsCount]);

  const performSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const params = new URLSearchParams({
        q: searchQuery,
        ...(filters.types.length > 0 && { types: filters.types.join(",") }),
        ...(filters.dateFrom && { date_from: filters.dateFrom.toISOString() }),
        ...(filters.dateTo && { date_to: filters.dateTo.toISOString() }),
      });

      const response = await apiRequest(`/api/v1/search/?${params}`, "GET");
      const normalized = (response.items && Array.isArray(response.items)) ?
        response.items.map((it: any) => ({
          ...it,
          content: it.raw_content || it.content || it.url || "",
          description: it.description ?? it.ai_meta?.description ?? it.title ?? "",
          tags: it.tags || [],
        })) : [];
      setSearchResults(normalized);
      setSearchActive(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to search items",
        variant: "destructive",
      });
    } finally {
      setSearchLoading(false);
    }
  };

  const toggleType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  };

  const clearFilters = () => {
    setFilters({
      types: [],
      dateFrom: undefined,
      dateTo: undefined,
    });
  };

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setDetailDialogOpen(true);
  };

  const closeSearch = () => {
    setSearchActive(false);
    setSearchQuery("");
    setSearchResults([]);
    setShowFilters(false);
    clearFilters();
  };

  const activeFilterCount =
    filters.types.length +
    (filters.dateFrom ? 1 : 0) +
    (filters.dateTo ? 1 : 0);

  const handleLogout = () => {
    logout();
  };

  // Refresh header profile when settings updates user
  useEffect(() => {
    const onUserUpdated = () => setProfileVersion((v) => v + 1);
    window.addEventListener("user-updated", onUserUpdated);
    return () => window.removeEventListener("user-updated", onUserUpdated);
  }, []);

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name.charAt(0).toUpperCase();
    }
    return email.charAt(0).toUpperCase();
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Layers, label: "Spaces", path: "/dashboard/spaces" },
    { icon: Package, label: "Items", path: "/dashboard/items" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden text-foreground bg-gradient-to-b from-[#0a0f1f] via-[#0a0d17] to-[#05070d] flex">
      {/* Background animation removed for performance */}
      {/* Sidebar */}
      <aside className="relative z-10 w-64 border-r border-border/50 flex flex-col p-6">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 px-4">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl font-semibold">MindFlow</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
  <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border/50 px-8 flex items-center justify-between relative">
          <div className="flex-1 max-w-xl flex gap-2 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search notes, links, images, videos..."
                className="bg-secondary/50 border-border/50 rounded-2xl pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setSearchActive(true)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={closeSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="relative bg-white/3 backdrop-blur-sm hover:bg-white/6 border border-border/20 px-3 py-2 rounded-xl transition-all shadow-sm flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span className="font-medium">Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs bg-accent/20 text-accent border border-accent/30">{activeFilterCount}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-96 p-0">
                  <Card className="bg-background/60 backdrop-blur-md rounded-2xl shadow-2xl border border-border/20 overflow-hidden">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold">Filters</h4>
                      </div>
                    {/* Type Filter */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="flex items-center gap-2">
                          <FileType className="w-4 h-4" />
                          Content Type
                        </Label>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {contentTypes.map((type) => (
                          <button
                            key={type}
                            onClick={() => toggleType(type)}
                            className={`px-3 py-1 rounded-lg text-sm transition transform hover:-translate-y-0.5 focus:scale-95 ${filters.types.includes(type) ? 'bg-gradient-to-r from-primary/70 to-accent/60 text-white shadow-md' : 'bg-white/2 text-muted-foreground border border-border/10'}`}
                            aria-pressed={filters.types.includes(type)}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Date Range Filter */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date Range
                      </Label>
                      <div className="flex gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" className="w-full justify-start text-left font-normal rounded-lg px-3 py-2 border border-border/10 bg-white/3 hover:bg-white/6 transition flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{filters.dateFrom ? format(filters.dateFrom, "PPP") : "From date"}</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <div className="p-2"><CalendarComponent
                              mode="single"
                              selected={filters.dateFrom}
                              onSelect={(date) => setFilters({ ...filters, dateFrom: date })}
                              initialFocus
                            /></div>
                          </PopoverContent>
                        </Popover>

                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" className="w-full justify-start text-left font-normal rounded-lg px-3 py-2 border border-border/10 bg-white/3 hover:bg-white/6 transition flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{filters.dateTo ? format(filters.dateTo, "PPP") : "To date"}</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <div className="p-2"><CalendarComponent
                              mode="single"
                              selected={filters.dateTo}
                              onSelect={(date) => setFilters({ ...filters, dateTo: date })}
                              initialFocus
                            /></div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {/* Clear Filters */}
                    {activeFilterCount > 0 && (
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full border border-border/10 hover:bg-red-50 hover:text-black text-muted-foreground">
                          Clear
                        </Button>
                        <Button size="sm" onClick={() => { /* apply filters */ setShowFilters(false); }} className="w-full bg-gradient-to-r from-primary/70 to-accent/60 text-white">
                          Apply
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              className="bg-gradient-primary hover:opacity-90"
              onClick={() => setAddDialogOpen(true)}
            >
              Add
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-10 h-10 border-2 border-primary/20 cursor-pointer hover:border-primary/40 transition-colors">
                  {user?.avatar && <AvatarImage src={user.avatar} alt={user.name || user.email} />}
                  <AvatarFallback className="bg-gradient-primary text-white">
                    {user ? getInitials(user.name, user.email) : "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Filters are now a Popover anchored to the Filters button; no blocking panel */}

        {/* Search Results Overlay */}
        {searchActive && searchQuery && (
          <div className="absolute top-16 left-64 right-0 bottom-0 z-50 pointer-events-auto">
            {/* Backdrop to visually separate search overlay */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={closeSearch} />
            <div className="relative max-w-6xl mx-auto p-6">
              <div className="bg-background/95 rounded-lg shadow-2xl border border-border/30 overflow-hidden">
                <div className="p-4">
                  {searchLoading ? (
                    <div className="text-center py-8 text-muted-foreground">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    <>
                      <div className="text-sm text-muted-foreground mb-4">Found {searchResults.length} results for "{searchQuery}"</div>
                      <div className="mx-auto" style={{ maxWidth: '1200px', padding: '0 8px' }}>
                        {/* Masonry columns rendered via JS for tighter packing */}
                        <div className="flex items-start gap-2">
                          {masonryColumns.map((col, cIdx) => (
                            <div key={`col-${cIdx}`} className="flex-1 flex flex-col gap-2">
                              {col.map((item, idx) => (
                                <div
                                  key={item.id}
                                  className="cursor-pointer"
                                  onClick={() => handleItemClick(item)}
                                >
                                  <div className="rounded-[12px] p-2 mb-0 text-white" style={{ backgroundColor: `hsl(${(idx * 12 + cIdx) % 360} 18% 14%)` }}>
                                    {item.type === "image" && typeof item.content === "string" && item.content.startsWith("http") ? (
                                      <img src={item.content} alt={item.title || ""} className="w-full max-h-48 object-contain rounded-[8px]" />
                                    ) : item.type === "video" && typeof item.content === "string" && item.content.startsWith("http") ? (
                                      <video src={item.content} className="w-full max-h-48 rounded-[8px] object-contain" controls preload="metadata" />
                                    ) : item.type === "link" ? (
                                      <div className="flex items-center justify-between gap-2">
                                        <a
                                          href={item.content}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-primary hover:underline break-all"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          {item.title || item.description || (typeof item.content === 'string' ? item.content.replace(/^https?:\/\//i, '') : item.content)}
                                        </a>
                                        <div className="flex items-center gap-2">
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              try { navigator.clipboard.writeText(item.content || ""); } catch {}
                                            }}
                                            aria-label="Copy link"
                                            className="opacity-80 hover:opacity-100"
                                          >
                                            <Copy className="w-4 h-4" />
                                          </button>
                                          <a
                                            href={item.content}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-primary"
                                            aria-label="Open link"
                                          >
                                            <ExternalLink className="w-4 h-4" />
                                          </a>
                                        </div>
                                      </div>
                                    ) : item.type === "article" ? (
                                      <div className="flex items-center justify-between gap-2">
                                        <a
                                          href={item.content}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-primary hover:underline break-all"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          {item.title || item.description || 'Open PDF'}
                                        </a>
                                        <div className="flex items-center gap-2">
                                          <a
                                            href={item.content}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-primary"
                                            aria-label="Open PDF"
                                          >
                                            <ExternalLink className="w-4 h-4" />
                                          </a>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="text-sm leading-snug whitespace-pre-wrap text-white">{item.title || item.content}</div>
                                    )}

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1 mt-2 mb-1">
                                      {(item.tags || []).map((tag, tIdx) => (
                                        <span key={`${item.id}-${tag}-${tIdx}`} className="px-2 py-0.5 text-xs rounded-full bg-accent/20 text-accent border border-accent/30">{tag}</span>
                                      ))}
                                    </div>

                                    {/* Metadata */}
                                    <div className="text-xs text-muted-foreground mt-1">{new Date(item.created_at).toLocaleDateString()}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">No results found for "{searchQuery}"</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Add Item Dialog */}
      <AddItemDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen}
        onItemAdded={onItemAdded}
      />

      {/* Item Detail Dialog */}
      <ItemDetailDialog
        item={selectedItem}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        onItemUpdated={() => {
          performSearch();
        }}
        onItemDeleted={() => {
          performSearch();
          setDetailDialogOpen(false);
        }}
      />
    </div>
  );
};

export default DashboardLayout;
