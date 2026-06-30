import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import {
  Megaphone, QrCode, BarChart3, Building2, Network,
  ArrowRight, Shield, Users, TrendingUp, Target, Zap,
  Play, Pause, ChevronRight, Sparkles, Globe, Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

function AnimatedCounter({ end, duration = 2000, prefix = '', suffix = '' }: { end: number; duration?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

function PhoneMockup({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto ${className}`} style={{ maxWidth: 280 }}>
      <div className="bg-slate-900 rounded-[2.5rem] p-2 phone-shadow">
        <div className="bg-white rounded-[2rem] overflow-hidden">
          {/* Notch */}
          <div className="flex justify-center pt-2 pb-1">
            <div className="w-24 h-5 bg-slate-900 rounded-full" />
          </div>
          {children}
          {/* Home indicator */}
          <div className="flex justify-center py-2">
            <div className="w-28 h-1 bg-slate-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Data Flow Animation Component
function DataFlowSimulation() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    { label: 'Ad Click', icon: Megaphone, color: 'bg-blue-500' },
    { label: 'Landing Page', icon: Target, color: 'bg-indigo-500' },
    { label: 'Form Submit', icon: Users, color: 'bg-violet-500' },
    { label: 'Qualify', icon: Shield, color: 'bg-teal-500' },
    { label: 'CRM', icon: BarChart3, color: 'bg-green-500' },
    { label: 'Convert', icon: Award, color: 'bg-amber-500' },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Lead Flow Simulation</h3>
            <p className="text-sm text-slate-500">Watch how leads move through your funnel in real-time</p>
          </div>
          <Button
            variant={isPlaying ? 'secondary' : 'default'}
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="gap-2"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause' : 'Simulate'}
          </Button>
        </div>

        <div className="flex items-center justify-between relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-slate-100 rounded-full" />
          <div
            className="absolute top-8 left-0 h-1 bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full transition-all duration-500"
            style={{ width: isPlaying ? `${(activeStep / (steps.length - 1)) * 100}%` : '0%' }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = i <= activeStep && isPlaying;
            const isCurrent = i === activeStep && isPlaying;

            return (
              <div key={step.label} className="relative z-10 flex flex-col items-center gap-3">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    isActive ? step.color : 'bg-slate-100'
                  } ${isCurrent ? 'scale-110 shadow-lg ring-4 ring-indigo-100' : ''}`}
                >
                  <Icon className={`w-7 h-7 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                </div>
                <span className={`text-xs font-medium transition-colors ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                  {step.label}
                </span>
                {isCurrent && (
                  <Badge variant="secondary" className="absolute -top-2 bg-indigo-100 text-indigo-700 text-[10px]">
                    Processing
                  </Badge>
                )}
              </div>
            );
          })}
        </div>

        {isPlaying && (
          <div className="mt-6 p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>
                {activeStep === 0 && 'User clicks Facebook ad for Summer Festival campaign...'}
                {activeStep === 1 && 'Landing page loads with 0.8s load time...'}
                {activeStep === 2 && 'Form submitted — Sarah Mokoena, Gauteng, Score: 87...'}
                {activeStep === 3 && 'AI qualifies lead — 94% match to target persona...'}
                {activeStep === 4 && 'Lead synced to CRM, assigned to David Mokoena...'}
                {activeStep === 5 && 'Meeting booked! Conversion pipeline complete.'}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const stats = [
    { label: 'Total Leads', value: 2847, prefix: '', suffix: '', change: '+12%', changeType: 'positive', icon: Users, color: 'bg-indigo-500' },
    { label: 'Qualified', value: 2104, prefix: '', suffix: '', change: '+18%', changeType: 'positive', icon: Target, color: 'bg-teal-500' },
    { label: 'Cost Per Lead', value: 42, prefix: 'R', suffix: '', change: '-6%', changeType: 'positive', icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Conversions', value: 512, prefix: '', suffix: '', change: '+23%', changeType: 'positive', icon: Award, color: 'bg-amber-500' },
  ];

  const journeyCards = [
    {
      title: 'Ad Journey',
      description: 'Facebook Ad → Landing Page → Form → Automation → Dashboard',
      icon: Megaphone,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      path: '/journey-ad',
      stats: '1,240 leads this month',
    },
    {
      title: 'QR Journey',
      description: 'QR Scan → Gamification → POPIA Consent → CDP → AI Profile',
      icon: QrCode,
      color: 'bg-teal-500',
      lightColor: 'bg-teal-50',
      textColor: 'text-teal-600',
      path: '/journey-qr',
      stats: '892 scans this week',
    },
    {
      title: 'Dashboard',
      description: 'Real-time analytics, conversion funnel, AI customer profiles',
      icon: BarChart3,
      color: 'bg-violet-500',
      lightColor: 'bg-violet-50',
      textColor: 'text-violet-600',
      path: '/dashboard',
      stats: '18 campaigns active',
    },
    {
      title: 'Brands',
      description: 'Multi-tenant brand management with isolated data and campaigns',
      icon: Building2,
      color: 'bg-amber-500',
      lightColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      path: '/brands',
      stats: '8 brands managed',
    },
    {
      title: 'Network',
      description: 'Ground team management, promoter tracking, event coordination',
      icon: Network,
      color: 'bg-rose-500',
      lightColor: 'bg-rose-50',
      textColor: 'text-rose-600',
      path: '/network',
      stats: '156 promoters active',
    },
  ];

  const popiaPillars = [
    { title: 'Consent Management', desc: 'Digital consent capture with audit trail', icon: Shield, progress: 100 },
    { title: 'Data Minimization', desc: 'Collect only what you need, when you need it', icon: Target, progress: 95 },
    { title: 'Right to Access', desc: 'Instant data export for any consumer', icon: Users, progress: 100 },
    { title: 'Secure Processing', desc: 'Encrypted storage and transmission', icon: Shield, progress: 98 },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
            <Zap className="w-3 h-3 mr-1" /> Intelligent Lead Engine
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Turn Every Touchpoint<br />
            Into a <span className="text-gradient">Qualified Lead</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Royal Zebra captures, qualifies, and converts leads from ads, QR codes,
            and in-store activations — all while staying fully POPIA compliant.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/journey-ad">
              <Button size="lg" className="gap-2 gradient-indigo hover:opacity-90">
                Explore Ad Journey <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/journey-qr">
              <Button size="lg" variant="outline" className="gap-2">
                Try QR Journey <QrCode className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Quick stats row */}
          <div className="flex flex-wrap gap-6 pt-4">
            {[
              { label: 'Brands', value: '8+' },
              { label: 'Promoters', value: '156' },
              { label: 'Leads/mo', value: '2,847' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="text-sm text-slate-600"><strong className="text-slate-900">{s.value}</strong> {s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phone Mockup */}
        <div className="flex justify-center">
          <PhoneMockup>
            <div className="p-4 space-y-3">
              {/* Simulated Facebook Ad */}
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-4 rounded-2xl text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">CL</div>
                  <div>
                    <p className="text-xs font-semibold">Castle Light</p>
                    <p className="text-[10px] opacity-75">Sponsored</p>
                  </div>
                </div>
                <p className="text-sm font-medium mb-2">Summer Festival 2026 — Win VIP Tickets!</p>
                <div className="h-24 bg-white/10 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-8 h-8 opacity-50" />
                </div>
                <button className="w-full mt-2 py-2 bg-white text-amber-600 rounded-lg text-xs font-semibold">
                  Learn More
                </button>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 p-3 rounded-xl text-center">
                  <p className="text-lg font-bold text-indigo-600">2,847</p>
                  <p className="text-[10px] text-slate-500">Total Leads</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl text-center">
                  <p className="text-lg font-bold text-teal-600">94%</p>
                  <p className="text-[10px] text-slate-500">Qualify Rate</p>
                </div>
              </div>
            </div>
          </PhoneMockup>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="card-hover border-slate-200">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-900">
                  <AnimatedCounter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Journey Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Customer Journeys</h2>
            <p className="text-sm text-slate-500">Click any card to explore the full interactive journey</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {journeyCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.path} to={card.path}>
                <Card className="card-hover border-slate-200 h-full cursor-pointer group">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 ${card.lightColor} ${card.textColor} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">{card.title}</h3>
                    <p className="text-sm text-slate-500 mb-3">{card.description}</p>
                    <Badge variant="secondary" className="text-xs">{card.stats}</Badge>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Data Flow Simulation */}
      <DataFlowSimulation />

      {/* POPIA Compliance */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">POPIA Compliance</h2>
              <p className="text-sm text-slate-500">100% compliant with South Africa's data protection act</p>
            </div>
            <Badge className="ml-auto bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Fully Compliant</Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popiaPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="p-4 bg-slate-50 rounded-xl">
                  <Icon className="w-5 h-5 text-indigo-500 mb-2" />
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">{pillar.title}</h4>
                  <p className="text-xs text-slate-500 mb-3">{pillar.desc}</p>
                  <Progress value={pillar.progress} className="h-1.5" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Brand Showcase Preview */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Trusted by Leading Brands</h2>
              <p className="text-sm text-slate-500">Multi-tenant platform powering South Africa's top brands</p>
            </div>
            <Link to="/brands">
              <Button variant="outline" size="sm" className="gap-2">
                View All <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Castle Light', abbr: 'CL', color: 'bg-amber-500', leads: '1,240', cpl: 'R38' },
              { name: 'African Bank', abbr: 'AB', color: 'bg-red-500', leads: '856', cpl: 'R52' },
              { name: 'Mr Price', abbr: 'MP', color: 'bg-blue-500', leads: '432', cpl: 'R41' },
              { name: 'Tsogo Sun', abbr: 'TS', color: 'bg-purple-500', leads: '319', cpl: 'R67' },
            ].map((brand) => (
              <Link key={brand.abbr} to="/brands">
                <div className="p-4 bg-slate-50 rounded-xl hover:bg-indigo-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 ${brand.color} rounded-xl flex items-center justify-center text-white font-bold text-sm`}>
                      {brand.abbr}
                    </div>
                    <span className="font-semibold text-slate-900 text-sm group-hover:text-indigo-700 transition-colors">{brand.name}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">{brand.leads} leads</span>
                    <span className="text-indigo-600 font-medium">{brand.cpl} CPL</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ground Network Preview */}
      <Link to="/network">
        <Card className="card-hover border-slate-200 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Ground Network</h2>
                  <p className="text-sm text-slate-500">156 active promoters across 6 provinces — click to explore</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2">
                {['Gauteng', 'KZN', 'Western Cape', 'Eastern Cape', 'Mpumalanga', 'Other'].map((prov) => (
                  <Badge key={prov} variant="secondary" className="text-xs">{prov}</Badge>
                ))}
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
