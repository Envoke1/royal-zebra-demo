import { useState } from 'react';
import { Link } from 'react-router';
import {
  Network as NetworkIcon, ChevronRight, Users, MapPin, TrendingUp,
  Star, Calendar, Clock, ArrowUpRight, Target, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bar } from 'react-chartjs-2';

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' as const, labels: { usePointStyle: true, padding: 15, font: { size: 11 } } },
  },
};

const provinces = [
  { name: 'Gauteng', leads: 1240, promoters: 52, color: 'bg-indigo-500', x: 52, y: 35 },
  { name: 'KwaZulu-Natal', leads: 680, promoters: 38, color: 'bg-teal-500', x: 68, y: 55 },
  { name: 'Western Cape', leads: 420, promoters: 28, color: 'bg-blue-500', x: 25, y: 78 },
  { name: 'Eastern Cape', leads: 240, promoters: 18, color: 'bg-amber-500', x: 55, y: 70 },
  { name: 'Mpumalanga', leads: 156, promoters: 12, color: 'bg-rose-500', x: 62, y: 40 },
  { name: 'Limpopo', leads: 75, promoters: 5, color: 'bg-purple-500', x: 58, y: 18 },
  { name: 'North West', leads: 23, promoters: 2, color: 'bg-slate-500', x: 40, y: 32 },
  { name: 'Free State', leads: 13, promoters: 1, color: 'bg-cyan-500', x: 48, y: 52 },
];

const promoters = [
  { name: 'David Mokoena', location: 'Soweto, Gauteng', leads: 124, conversion: 22.4, rating: 4.9, status: 'Active', avatar: 'DM', color: 'bg-indigo-500' },
  { name: 'Thandi Zwane', location: 'Durban, KZN', leads: 98, conversion: 19.8, rating: 4.8, status: 'Active', avatar: 'TZ', color: 'bg-teal-500' },
  { name: 'Sipho Ndlovu', location: 'Pretoria, Gauteng', leads: 87, conversion: 18.2, rating: 4.7, status: 'Active', avatar: 'SN', color: 'bg-blue-500' },
  { name: 'Lerato Molefe', location: 'Cape Town, WC', leads: 76, conversion: 21.1, rating: 4.9, status: 'Active', avatar: 'LM', color: 'bg-amber-500' },
  { name: 'Bongani Sithole', location: 'Nelspruit, MP', leads: 65, conversion: 17.5, rating: 4.6, status: 'On Leave', avatar: 'BS', color: 'bg-rose-500' },
];

const events = [
  { name: 'Summer Festival Activation', date: '2026-07-15', location: 'Johannesburg, Gauteng', type: 'Festival', status: 'Upcoming' },
  { name: 'Shoprite In-Store Promo', date: '2026-07-08', location: 'Durban, KZN', type: 'Retail', status: 'This Week' },
  { name: 'Campus Brand Day', date: '2026-07-22', location: 'Pretoria, Gauteng', type: 'Youth', status: 'Upcoming' },
  { name: 'Weekend Warrior Event', date: '2026-07-05', location: 'Cape Town, WC', type: 'Sports', status: 'Tomorrow' },
];

const pillars = [
  { title: 'Promoter Network', value: '156', change: '+12', icon: Users, desc: 'Active promoters across all provinces', color: 'bg-indigo-500' },
  { title: 'Retail Partners', value: '850+', change: '+45', icon: MapPin, desc: 'Supermarkets, taverns, and events', color: 'bg-teal-500' },
  { title: 'Brand Ambassadors', value: '24', change: '+3', icon: Star, desc: 'Premium tier with dedicated support', color: 'bg-amber-500' },
  { title: 'Digital Touchpoints', value: '2.4K', change: '+320', icon: Globe, desc: 'QR codes, short links, widgets', color: 'bg-rose-500' },
];

export default function Network() {
  const [selectedProvince, setSelectedProvince] = useState(provinces[0]);
  const [showProvinceDetail, setShowProvinceDetail] = useState(false);

  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Promoter Leads',
        data: [320, 380, 450, 520, 580, 640],
        backgroundColor: '#4f46e5',
        borderRadius: 4,
      },
      {
        label: 'Retail QR',
        data: [280, 340, 390, 480, 510, 520],
        backgroundColor: '#14b8a6',
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 font-medium">Network</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ground Network</h1>
          <p className="text-sm text-slate-500">156 promoters, 850+ retail partners, nationwide coverage</p>
        </div>
        <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100">
          <NetworkIcon className="w-3 h-3 mr-1" /> Live Network
        </Badge>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map(pillar => {
          const Icon = pillar.icon;
          return (
            <Card key={pillar.title} className="card-hover border-slate-200">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 ${pillar.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-700 text-xs">+{pillar.change}</Badge>
                </div>
                <p className="text-2xl font-bold text-slate-900">{pillar.value}</p>
                <p className="text-sm text-slate-500">{pillar.title}</p>
                <p className="text-xs text-slate-400 mt-1">{pillar.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Interactive SA Map */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-slate-900">South Africa Network Map</CardTitle>
            <p className="text-xs text-slate-500">Click a province to view details</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Map visualization */}
            <div className="lg:col-span-2">
              <div className="relative bg-gradient-to-b from-blue-50 to-green-50 rounded-2xl p-6 min-h-[400px]">
                {/* SA Map simplified as relative positioned dots */}
                <div className="relative w-full h-[360px]">
                  {/* Country outline hint */}
                  <svg viewBox="0 0 100 90" className="absolute inset-0 w-full h-full opacity-20">
                    <path
                      d="M48 5 L55 8 L58 15 L62 18 L68 22 L72 28 L75 35 L78 42 L80 50 L78 58 L75 65 L70 72 L65 78 L58 82 L50 85 L42 82 L35 78 L28 72 L22 65 L18 58 L15 50 L12 42 L10 35 L12 28 L15 22 L20 18 L25 15 L32 12 L38 8 L42 6 Z"
                      fill="none"
                      stroke="#64748b"
                      strokeWidth="0.5"
                    />
                  </svg>

                  {provinces.map(prov => (
                    <button
                      key={prov.name}
                      onClick={() => { setSelectedProvince(prov); setShowProvinceDetail(true); }}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                      style={{ left: `${prov.x}%`, top: `${prov.y}%` }}
                    >
                      <div className={`w-4 h-4 ${prov.color} rounded-full animate-pulse ring-4 ring-white shadow-lg group-hover:scale-150 transition-transform`} />
                      <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-white px-2 py-1 rounded-lg shadow-lg text-xs font-medium z-10">
                        {prov.name}
                        <div className="text-[10px] text-slate-500">{prov.leads} leads • {prov.promoters} promoters</div>
                      </div>
                    </button>
                  ))}

                  {/* Legend */}
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur rounded-xl p-3 shadow-sm">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase mb-2">Legend</p>
                    <div className="space-y-1">
                      {provinces.slice(0, 4).map(p => (
                        <div key={p.name} className="flex items-center gap-2">
                          <div className={`w-2 h-2 ${p.color} rounded-full`} />
                          <span className="text-[10px] text-slate-600">{p.name}</span>
                        </div>
                      ))}
                      <p className="text-[10px] text-slate-400">+4 more provinces</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Province Detail */}
            <div>
              {showProvinceDetail ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${selectedProvince.color} rounded-xl flex items-center justify-center`}>
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{selectedProvince.name}</p>
                      <p className="text-xs text-slate-500">{selectedProvince.promoters} active promoters</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: 'Total Leads', value: selectedProvince.leads.toLocaleString(), icon: Users, color: 'text-indigo-600' },
                      { label: 'Active Promoters', value: selectedProvince.promoters, icon: Target, color: 'text-teal-600' },
                      { label: 'Conversion Rate', value: '18.4%', icon: TrendingUp, color: 'text-green-600' },
                      { label: 'Avg Response Time', value: '2.3 hrs', icon: Clock, color: 'text-amber-600' },
                    ].map(metric => {
                      const Icon = metric.icon;
                      return (
                        <div key={metric.label} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 ${metric.color}`} />
                            <span className="text-sm text-slate-600">{metric.label}</span>
                          </div>
                          <span className="font-bold text-slate-900">{metric.value}</span>
                        </div>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowProvinceDetail(false)}
                    className="w-full"
                  >
                    Close Detail
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <MapPin className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Click on a province dot on the map to see details</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Promoters */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-slate-900">Top Performing Promoters</CardTitle>
            <Badge variant="secondary" className="text-xs">This Month</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {promoters.map((promoter, i) => (
              <div key={promoter.name} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl hover:bg-indigo-50 transition-colors group">
                {/* Rank */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                  i === 0 ? 'bg-amber-100 text-amber-700' :
                  i === 1 ? 'bg-slate-200 text-slate-600' :
                  i === 2 ? 'bg-orange-100 text-orange-700' :
                  'bg-slate-100 text-slate-500'
                }`}>
                  {i + 1}
                </div>

                {/* Avatar */}
                <div className={`w-10 h-10 ${promoter.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                  {promoter.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-900 text-sm">{promoter.name}</p>
                    <Badge className={`text-[10px] ${
                      promoter.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {promoter.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {promoter.location}
                  </p>
                </div>

                {/* Stats */}
                <div className="hidden md:flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="font-bold text-slate-900">{promoter.leads}</p>
                    <p className="text-[10px] text-slate-500">Leads</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-green-600">{promoter.conversion}%</p>
                    <p className="text-[10px] text-slate-500">Conversion</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <p className="font-bold text-slate-900">{promoter.rating}</p>
                    </div>
                    <p className="text-[10px] text-slate-500">Rating</p>
                  </div>
                </div>

                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-slate-900">Upcoming Events</CardTitle>
              <Calendar className="w-4 h-4 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {events.map(event => (
                <div key={event.name} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl hover:bg-indigo-50 transition-colors">
                  <div className="w-12 h-12 bg-white rounded-xl flex flex-col items-center justify-center shadow-sm">
                    <span className="text-[10px] text-slate-500 font-semibold">
                      {new Date(event.date).toLocaleString('en', { month: 'short' }).toUpperCase()}
                    </span>
                    <span className="text-lg font-bold text-slate-900 leading-none">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 text-sm">{event.name}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {event.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className={`text-[10px] ${
                      event.status === 'Tomorrow' ? 'bg-red-100 text-red-700' :
                      event.status === 'This Week' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {event.status}
                    </Badge>
                    <p className="text-[10px] text-slate-500 mt-1">{event.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Chart */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-slate-900">Network Performance</CardTitle>
              <Badge variant="secondary" className="text-xs">YTD 2026</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ height: 250 }}>
              <Bar data={performanceData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
