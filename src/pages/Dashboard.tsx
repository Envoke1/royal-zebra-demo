import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import {
  Download, Users, Target, TrendingUp, Award, BarChart3, ChevronRight,
  Search, Filter, ArrowUpRight, ArrowDownRight, MapPin, Clock, Zap,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Doughnut, Bar, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, RadialLinearScale, Filler, Tooltip, Legend
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: { usePointStyle: true, padding: 15, font: { size: 11 } },
    },
  },
};

function AnimatedCounter({ end, prefix = '', suffix = '' }: { end: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = Date.now();
          const animate = () => {
            const elapsed = Date.now() - start;
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
  }, [end]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState('castle-light');
  const [showToast, setShowToast] = useState(false);

  // Export toast
  const handleExport = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Stats
  const stats = [
    { label: 'Total Leads', value: 2847, prefix: '', change: '+12%', up: true, icon: Users, color: 'bg-indigo-500' },
    { label: 'Qualified', value: 2104, prefix: '', change: '+18%', up: true, icon: Target, color: 'bg-teal-500' },
    { label: 'Cost Per Lead', value: 42, prefix: 'R', change: '-6%', up: true, icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Conversions', value: 512, prefix: '', change: '+23%', up: true, icon: Award, color: 'bg-amber-500' },
  ];

  // Lead Volume Chart
  const leadVolumeData = {
    labels: ['Jun 1', 'Jun 3', 'Jun 5', 'Jun 7', 'Jun 9', 'Jun 11', 'Jun 13', 'Jun 15', 'Jun 17', 'Jun 19', 'Jun 21', 'Jun 23', 'Jun 25', 'Jun 27', 'Jun 29'],
    datasets: [
      {
        label: 'Total Leads',
        data: [120, 145, 180, 165, 200, 220, 195, 240, 210, 230, 250, 220, 270, 240, 262],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
      },
      {
        label: 'Qualified',
        data: [95, 110, 140, 130, 165, 180, 160, 200, 175, 195, 210, 185, 230, 205, 220],
        borderColor: '#14b8a6',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
      },
      {
        label: 'Converted',
        data: [20, 28, 35, 30, 42, 48, 40, 55, 45, 52, 58, 50, 62, 55, 60],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };

  // Source Breakdown
  const sourceData = {
    labels: ['QR Shoprite', 'QR Pick n Pay', 'QR Spar', 'QR Promoter', 'FB Ad', 'IG Ad'],
    datasets: [{
      data: [680, 520, 410, 295, 582, 360],
      backgroundColor: ['#4f46e5', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'],
      borderWidth: 0,
    }],
  };

  // Hourly Inflow
  const hourlyData = {
    labels: ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM'],
    datasets: [
      {
        label: 'Ad Leads',
        data: [15, 25, 45, 80, 120, 95, 70, 55, 85, 110, 90, 75, 60, 45, 35, 25, 18],
        backgroundColor: '#4f46e5',
        borderRadius: 4,
      },
      {
        label: 'QR Leads',
        data: [5, 8, 12, 25, 40, 65, 120, 180, 150, 80, 45, 30, 35, 50, 40, 20, 10],
        backgroundColor: '#14b8a6',
        borderRadius: 4,
      },
    ],
  };

  // Radar Chart
  const radarData = {
    labels: ['Event Interest', 'Purchase Intent', 'Brand Loyalty', 'Social Share', 'Engagement Depth', 'Repeat Potential'],
    datasets: [
      {
        label: 'Festival-Goers',
        data: [95, 70, 65, 85, 90, 75],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        pointRadius: 3,
      },
      {
        label: 'BBQ-Enthusiasts',
        data: [70, 90, 80, 60, 75, 85],
        borderColor: '#14b8a6',
        backgroundColor: 'rgba(20, 184, 166, 0.2)',
        pointRadius: 3,
      },
      {
        label: 'Sports Fans',
        data: [85, 75, 90, 75, 80, 70],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        pointRadius: 3,
      },
    ],
  };

  // Campaign Performance
  const campaignData = {
    labels: ['Summer Festival', 'FB Retargeting', 'Weekend Warrior', 'QR Shoprite', 'In-Store Promo'],
    datasets: [{
      label: 'Leads',
      data: [1240, 892, 715, 680, 420],
      backgroundColor: '#4f46e5',
      borderRadius: 4,
    }],
  };

  // Funnel data
  const funnelSteps = [
    { label: 'Impressions', value: 24800, percent: 100 },
    { label: 'Clicks/Scans', value: 3412, percent: 13.8 },
    { label: 'Form Complete', value: 2847, percent: 83.4 },
    { label: 'Qualified', value: 2104, percent: 73.9 },
    { label: 'Contacted', value: 1568, percent: 74.5 },
    { label: 'Meeting Booked', value: 824, percent: 52.6 },
    { label: 'Converted', value: 512, percent: 62.1 },
  ];

  // Geo data
  const geoData = [
    { province: 'Gauteng', leads: 1240, percent: 43.5 },
    { province: 'KwaZulu-Natal', leads: 680, percent: 23.9 },
    { province: 'Western Cape', leads: 420, percent: 14.7 },
    { province: 'Eastern Cape', leads: 240, percent: 8.4 },
    { province: 'Mpumalanga', leads: 156, percent: 5.5 },
    { province: 'Other', leads: 111, percent: 3.9 },
  ];

  // Lead table data
  const leads = [
    { name: 'Sarah Mokoena', initials: 'SM', location: 'Soweto, Gauteng', source: 'QR — Shoprite', score: 87, status: 'New', time: '2 min ago', color: 'bg-indigo-500' },
    { name: 'Thabo Jele', initials: 'TJ', location: 'Durban, KZN', source: 'FB Ad', score: 64, status: 'Assigned', time: '15 min ago', color: 'bg-teal-500' },
    { name: 'Lerato Nkosi', initials: 'LN', location: 'Pretoria, Gauteng', source: 'QR — Pick n Pay', score: 58, status: 'Nurturing', time: '32 min ago', color: 'bg-amber-500' },
    { name: 'David Mabena', initials: 'DM', location: 'Nelspruit, MP', source: 'Promoter', score: 92, status: 'New', time: '45 min ago', color: 'bg-indigo-500' },
    { name: 'Grace Khumalo', initials: 'GK', location: 'Cape Town, WC', source: 'IG Ad', score: 71, status: 'Contacted', time: '1 hr ago', color: 'bg-teal-500' },
    { name: 'Mike Peters', initials: 'MP', location: 'Port Elizabeth, EC', source: 'QR — Spar', score: 45, status: 'Nurturing', time: '2 hrs ago', color: 'bg-amber-500' },
  ];

  const filteredLeads = leads.filter(l =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 font-medium">Dashboard</span>
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500">Real-time analytics for Castle Light campaigns</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={brandFilter} onValueChange={setBrandFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="castle-light">Castle Light</SelectItem>
              <SelectItem value="african-bank">African Bank</SelectItem>
              <SelectItem value="mr-price">Mr Price</SelectItem>
              <SelectItem value="tsogo-sun">Tsogo Sun</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExport} variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl shadow-lg animate-slide-up text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Report exported — CastleLight_Q2_2026.pdf downloaded
          </div>
        </div>
      )}

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
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900">
                  <AnimatedCounter end={stat.value} prefix={stat.prefix} />
                </p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Campaign Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { name: 'Summer Festival Push', status: 'Active', leads: 1240, qualify: 94, cpl: 38, convert: 18.2, color: 'bg-green-500' },
          { name: 'Facebook Retargeting', status: 'Active', leads: 892, qualify: 91, cpl: 45, convert: 16.4, color: 'bg-green-500' },
          { name: 'Weekend Warrior Promo', status: 'Paused', leads: 715, qualify: 88, cpl: 52, convert: 14.1, color: 'bg-amber-500' },
        ].map(campaign => (
          <Card key={campaign.name} className="card-hover border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-900 text-sm">{campaign.name}</h3>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${campaign.color}`} />
                  <span className="text-xs text-slate-500">{campaign.status}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-slate-500">Leads</p>
                  <p className="font-bold text-slate-900">{campaign.leads.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Qualify</p>
                  <p className="font-bold text-slate-900">{campaign.qualify}%</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">CPL</p>
                  <p className="font-bold text-slate-900">R{campaign.cpl}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Convert</p>
                  <p className="font-bold text-slate-900">{campaign.convert}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-900">Lead Volume & Conversion Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: 280 }}>
              <Line data={leadVolumeData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-900">Lead Source Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: 280 }}>
              <Doughnut
                data={sourceData}
                options={{
                  ...chartOptions,
                  cutout: '65%',
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-900">Hourly Lead Inflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: 280 }}>
              <Bar data={hourlyData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-900">Customer Segment Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: 280 }}>
              <Radar data={radarData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-slate-900">Campaign Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: 250 }}>
            <Bar
              data={campaignData}
              options={{
                ...chartOptions,
                indexAxis: 'y' as const,
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Conversion Funnel */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-slate-900">Conversion Funnel</CardTitle>
            <Badge variant="secondary" className="text-xs">7 Steps</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {funnelSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-4">
                <div className="w-28 text-right">
                  <p className="text-xs font-medium text-slate-600">{step.label}</p>
                  <p className="text-xs text-slate-400">{step.value.toLocaleString()}</p>
                </div>
                <div className="flex-1">
                  <div className="h-8 bg-slate-100 rounded-lg overflow-hidden">
                    <div
                      className="h-full rounded-lg transition-all duration-1000"
                      style={{
                        width: `${step.percent}%`,
                        background: `linear-gradient(90deg, #4f46e5 ${100 - i * 15}%, #14b8a6)`,
                      }}
                    />
                  </div>
                </div>
                <div className="w-16">
                  <span className="text-xs font-semibold text-slate-700">{step.percent}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Geographic Distribution */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-slate-900">Geographic Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {geoData.map(geo => (
              <div key={geo.province} className="p-4 bg-slate-50 rounded-xl hover:bg-indigo-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-indigo-700">{geo.province}</span>
                </div>
                <p className="text-xl font-bold text-slate-900">{geo.leads.toLocaleString()}</p>
                <Progress value={geo.percent} className="h-1 mt-2" />
                <p className="text-xs text-slate-500 mt-1">{geo.percent}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Lead Table + AI Profile */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Lead Table */}
        <Card className="lg:col-span-2 border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-slate-900">Live Lead Feed</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                  <Input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search leads..."
                    className="pl-7 h-8 text-xs w-48"
                  />
                </div>
                <Button variant="outline" size="sm" className="h-8 px-2">
                  <Filter className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-slate-500 border-b border-slate-100">
                    <th className="pb-2 font-medium">Lead</th>
                    <th className="pb-2 font-medium">Source</th>
                    <th className="pb-2 font-medium">Score</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.name} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 ${lead.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                            {lead.initials}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{lead.name}</p>
                            <p className="text-xs text-slate-500">{lead.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-sm text-slate-600">{lead.source}</td>
                      <td className="py-3">
                        <Badge className={`text-xs ${
                          lead.score >= 80 ? 'bg-green-100 text-green-700' :
                          lead.score >= 60 ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {lead.score}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <Badge variant="outline" className={`text-xs ${
                          lead.status === 'New' ? 'border-indigo-300 text-indigo-700 bg-indigo-50' :
                          lead.status === 'Assigned' ? 'border-teal-300 text-teal-700 bg-teal-50' :
                          lead.status === 'Nurturing' ? 'border-amber-300 text-amber-700 bg-amber-50' :
                          'border-green-300 text-green-700 bg-green-50'
                        }`}>
                          {lead.status}
                        </Badge>
                      </td>
                      <td className="py-3 text-xs text-slate-500">{lead.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* AI Profile Card */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-900">AI Customer Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Profile Header */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-lg">SM</span>
              </div>
              <p className="font-semibold text-slate-900">Sarah Mokoena</p>
              <p className="text-xs text-slate-500">+27 72 345 6789 • Soweto, Gauteng</p>
              <div className="mt-2">
                <Badge className="bg-green-100 text-green-700 text-lg px-3 py-1">
                  <Star className="w-4 h-4 fill-green-600 text-green-600 mr-1" />
                  87/100
                </Badge>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {[
                { label: 'Festival-Goer', color: 'bg-indigo-100 text-indigo-700' },
                { label: 'BBQ-Enthusiast', color: 'bg-green-100 text-green-700' },
                { label: 'Sports Fan', color: 'bg-amber-100 text-amber-700' },
                { label: 'Mobile-First', color: 'bg-blue-100 text-blue-700' },
                { label: 'High-Intent', color: 'bg-purple-100 text-purple-700' },
                { label: 'In-Store', color: 'bg-rose-100 text-rose-700' },
              ].map(tag => (
                <Badge key={tag.label} className={`text-[10px] ${tag.color}`}>{tag.label}</Badge>
              ))}
            </div>

            {/* Behavioral Signals */}
            <div className="space-y-2">
              {[
                { label: 'Engagement', value: 92 },
                { label: 'Purchase Intent', value: 87 },
                { label: 'Brand Affinity', value: 78 },
                { label: 'Event Likelihood', value: 95 },
              ].map(signal => (
                <div key={signal.label}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-600">{signal.label}</span>
                    <span className="font-semibold text-slate-900">{signal.value}%</span>
                  </div>
                  <Progress value={signal.value} className="h-1.5" />
                </div>
              ))}
            </div>

            {/* AI Recommendation */}
            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-indigo-800 leading-relaxed">
                  <strong>AI Recommendation:</strong> Assign to David Mokoena (Soweto promoter) within 2 hours. Offer VIP festival ticket + meet-greet. <strong>82% probability</strong> of event attendance within 30 days.
                </p>
              </div>
            </div>

            {/* Capture info */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> Captured: 2 min ago
              </div>
              <div className="flex items-center gap-1">
                <BarChart3 className="w-3 h-3" /> QR — Shoprite
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
