import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Megaphone,
  QrCode,
  BarChart3,
  Building2,
  Network,
  Menu,
  X,
  ChevronRight,
  Bell,
  Search,
  Zap,
  Trophy,
  Users,
  Globe,
  Settings,
  HelpCircle
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navItems = [
  { path: '/', label: 'Home', icon: LayoutDashboard, color: 'text-indigo-500' },
  { path: '/journey-ad', label: 'Ad Journey', icon: Megaphone, color: 'text-blue-500' },
  { path: '/journey-qr', label: 'QR Journey', icon: QrCode, color: 'text-teal-500' },
  { path: '/dashboard', label: 'Dashboard', icon: BarChart3, color: 'text-violet-500' },
  { path: '/brands', label: 'Brands', icon: Building2, color: 'text-amber-500' },
  { path: '/network', label: 'Network', icon: Network, color: 'text-rose-500' },
];

const brandItems = [
  { label: 'Castle Light', abbr: 'CL', color: 'bg-amber-500' },
  { label: 'African Bank', abbr: 'AB', color: 'bg-red-500' },
  { label: 'Mr Price', abbr: 'MP', color: 'bg-blue-500' },
  { label: 'Tsogo Sun', abbr: 'TS', color: 'bg-purple-500' },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeBrand, setActiveBrand] = useState(0);
  const [toasts, setToasts] = useState<Array<{ id: number; message: string; type: string }>>([]);
  const location = useLocation();

  // Auto-close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Toast notifications
  useEffect(() => {
    const messages = [
      { message: 'New lead: Sarah Mokoena — QR Scan — Shoprite Soweto', type: 'success' },
      { message: 'Campaign "Summer Festival" exceeded daily target by 12%', type: 'info' },
      { message: 'Lead assigned: Thabo Jele → David Mokoena', type: 'warning' },
      { message: 'Castle Light conversion rate up 8% this week', type: 'success' },
    ];

    let idx = 0;
    const interval = setInterval(() => {
      const id = Date.now();
      setToasts(prev => [...prev.slice(-2), { id, message: messages[idx].message, type: messages[idx].type }]);
      idx = (idx + 1) % messages.length;
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-slate-200 transition-all duration-300 flex flex-col ${
          sidebarOpen ? 'w-64' : 'w-20'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className={`h-16 flex items-center border-b border-slate-200 px-4 ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-indigo flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <h1 className="font-bold text-slate-900 text-sm leading-tight whitespace-nowrap">Royal Zebra</h1>
                <p className="text-[10px] text-slate-500 leading-tight whitespace-nowrap">Intelligent Lead Engine</p>
              </div>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Brand Selector */}
        <div className={`px-3 py-3 border-b border-slate-200 ${sidebarOpen ? '' : 'flex justify-center'}`}>
          {sidebarOpen ? (
            <div className="space-y-2">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2">Active Brand</p>
              <div className="grid grid-cols-4 gap-1">
                {brandItems.map((brand, i) => (
                  <button
                    key={brand.abbr}
                    onClick={() => setActiveBrand(i)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                      activeBrand === i
                        ? 'bg-indigo-50 ring-1 ring-indigo-500'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-8 h-8 ${brand.color} rounded-lg flex items-center justify-center text-white text-xs font-bold`}>
                      {brand.abbr}
                    </div>
                    <span className={`text-[9px] font-medium ${activeBrand === i ? 'text-indigo-700' : 'text-slate-500'}`}>
                      {brand.abbr}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={`w-10 h-10 ${brandItems[activeBrand].color} rounded-lg flex items-center justify-center text-white text-sm font-bold cursor-pointer`}>
                    {brandItems[activeBrand].abbr}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{brandItems[activeBrand].label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <TooltipProvider key={item.path} delayDuration={sidebarOpen ? 1000 : 100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : item.color}`} />
                      {sidebarOpen && (
                        <>
                          <span className="text-sm flex-1">{item.label}</span>
                          {isActive && <ChevronRight className="w-4 h-4 text-indigo-400" />}
                        </>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {!sidebarOpen && (
                    <TooltipContent side="right">
                      <p>{item.label}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className={`px-3 py-3 border-t border-slate-200 space-y-1 ${sidebarOpen ? '' : 'flex flex-col items-center'}`}>
          <TooltipProvider delayDuration={sidebarOpen ? 1000 : 100}>
            {[
              { icon: Trophy, label: 'Achievements' },
              { icon: Users, label: 'Team' },
              { icon: Globe, label: 'Language' },
              { icon: Settings, label: 'Settings' },
              { icon: HelpCircle, label: 'Help' },
            ].map((action) => (
              <Tooltip key={action.label}>
                <TooltipTrigger asChild>
                  <button
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all w-full ${
                      sidebarOpen ? '' : 'justify-center'
                    }`}
                  >
                    <action.icon className="w-4 h-4" />
                    {sidebarOpen && <span className="text-xs">{action.label}</span>}
                  </button>
                </TooltipTrigger>
                {!sidebarOpen && (
                  <TooltipContent side="right">
                    <p>{action.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setMobileOpen(true);
                } else {
                  setSidebarOpen(!sidebarOpen);
                }
              }}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-slate-600" />
            </button>

            {/* Search */}
            <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-2 w-80">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Search leads, campaigns, brands..."
                className="bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs font-medium text-green-700">Live</span>
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* User avatar */}
            <div className="w-9 h-9 rounded-full gradient-indigo flex items-center justify-center">
              <span className="text-white text-sm font-bold">AD</span>
            </div>
          </div>
        </header>

        {/* Toast notifications */}
        <div className="fixed top-20 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`px-4 py-3 rounded-xl shadow-lg border text-sm max-w-sm animate-slide-up ${
                toast.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : toast.type === 'warning'
                  ? 'bg-amber-50 border-amber-200 text-amber-800'
                  : 'bg-blue-50 border-blue-200 text-blue-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  toast.type === 'success' ? 'bg-green-500' : toast.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                }`} />
                {toast.message}
              </div>
            </div>
          ))}
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
