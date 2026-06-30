import { useState } from 'react';
import { Link } from 'react-router';
import {
  Building2, ChevronRight, Users, TrendingUp, Target, Award,
  ArrowUpRight, Sparkles, Zap, Globe
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' as const, labels: { usePointStyle: true, padding: 15, font: { size: 11 } } },
  },
};

const brands = [
  {
    id: 'castle-light',
    name: 'Castle Light',
    abbr: 'CL',
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    industry: 'FMCG',
    leads: 1240,
    cpl: 38,
    qualify: 94,
    convert: 18.2,
    campaigns: 6,
    description: 'Premium lager brand with strong festival and summer event presence.',
    tags: ['Festival', 'Summer', 'Premium'],
    caseStudy: {
      challenge: 'Increase qualified leads from in-store activations',
      solution: 'QR gamification at 200+ retail locations',
      results: { leads: '+240%', cpl: '-35%', engagement: '+180%' },
    },
  },
  {
    id: 'african-bank',
    name: 'African Bank',
    abbr: 'AB',
    color: 'bg-red-500',
    lightColor: 'bg-red-50',
    textColor: 'text-red-600',
    industry: 'Finance',
    leads: 856,
    cpl: 52,
    qualify: 88,
    convert: 12.4,
    campaigns: 4,
    description: 'Digital-first banking with focus on personal loans and savings.',
    tags: ['Finance', 'Digital', 'Youth'],
    caseStudy: {
      challenge: 'Reduce cost per qualified loan application',
      solution: 'AI-powered lead scoring + promoter network',
      results: { leads: '+180%', cpl: '-42%', quality: '+65%' },
    },
  },
  {
    id: 'mr-price',
    name: 'Mr Price',
    abbr: 'MP',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    industry: 'Retail',
    leads: 432,
    cpl: 41,
    qualify: 91,
    convert: 15.8,
    campaigns: 5,
    description: 'Value-focused fashion and homeware retailer with nationwide footprint.',
    tags: ['Retail', 'Fashion', 'Value'],
    caseStudy: {
      challenge: 'Drive foot traffic to new store openings',
      solution: 'Geo-targeted QR campaigns + promoter network',
      results: { leads: '+150%', visits: '+85%', sales: '+40%' },
    },
  },
  {
    id: 'tsogo-sun',
    name: 'Tsogo Sun Hotels',
    abbr: 'TS',
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    industry: 'Hospitality',
    leads: 319,
    cpl: 67,
    qualify: 85,
    convert: 10.2,
    campaigns: 3,
    description: 'South Africa\'s leading hotel group with 100+ properties.',
    tags: ['Hotels', 'Travel', 'Luxury'],
    caseStudy: {
      challenge: 'Increase direct bookings vs OTA dependency',
      solution: 'VIP experience campaigns + loyalty integration',
      results: { leads: '+95%', direct: '+120%', loyalty: '+55%' },
    },
  },
  {
    id: 'capitec',
    name: 'Capitec Bank',
    abbr: 'CB',
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    industry: 'Finance',
    leads: 278,
    cpl: 44,
    qualify: 90,
    convert: 14.6,
    campaigns: 3,
    description: 'Simplified banking for all South Africans.',
    tags: ['Banking', 'Inclusive', 'Mobile'],
    caseStudy: {
      challenge: 'Expand client base in rural communities',
      solution: 'Promoter-led activations in townships',
      results: { leads: '+200%', signups: '+90%', awareness: '+75%' },
    },
  },
  {
    id: 'nike-sa',
    name: 'Nike SA',
    abbr: 'NS',
    color: 'bg-slate-800',
    lightColor: 'bg-slate-100',
    textColor: 'text-slate-700',
    industry: 'Retail',
    leads: 195,
    cpl: 72,
    qualify: 87,
    convert: 11.3,
    campaigns: 2,
    description: 'Global sportswear leader with strong local community focus.',
    tags: ['Sports', 'Youth', 'Premium'],
    caseStudy: {
      challenge: 'Drive engagement for Run Jozi campaign',
      solution: 'Community promoter program + Strava integration',
      results: { leads: '+175%', runs: '+220%', community: '+300%' },
    },
  },
  {
    id: 'mcdonalds',
    name: "McDonald's SA",
    abbr: 'MD',
    color: 'bg-yellow-500',
    lightColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    industry: 'FMCG',
    leads: 567,
    cpl: 29,
    qualify: 82,
    convert: 22.1,
    campaigns: 8,
    description: 'Quick service restaurant with 300+ locations across SA.',
    tags: ['Food', 'Family', 'Quick-Service'],
    caseStudy: {
      challenge: 'Promote McCafe to younger demographic',
      solution: 'University campus QR gamification',
      results: { leads: '+310%', trials: '+85%', repeat: '+45%' },
    },
  },
  {
    id: 'sasol',
    name: 'Sasol',
    abbr: 'SL',
    color: 'bg-sky-600',
    lightColor: 'bg-sky-50',
    textColor: 'text-sky-700',
    industry: 'Auto',
    leads: 148,
    cpl: 89,
    qualify: 79,
    convert: 8.7,
    campaigns: 2,
    description: 'Integrated energy and chemical company with retail presence.',
    tags: ['Energy', 'Retail', 'B2B'],
    caseStudy: {
      challenge: 'Increase loyalty program signups at forecourts',
      solution: 'Pump-side QR with instant rewards',
      results: { leads: '+130%', signups: '+95%', frequency: '+25%' },
    },
  },
];

const caseStudies = [
  {
    title: 'Summer Festival Campaign',
    brand: 'Castle Light',
    metric: '+240%',
    description: 'QR gamification drove record engagement at 200+ retail locations',
    icon: Sparkles,
    color: 'bg-amber-500',
  },
  {
    title: 'Township Banking Drive',
    brand: 'Capitec',
    metric: '+200%',
    description: 'Promoter network reached 50,000+ potential clients in 30 days',
    icon: Users,
    color: 'bg-emerald-500',
  },
  {
    title: 'Direct Booking Push',
    brand: 'Tsogo Sun',
    metric: '+120%',
    description: 'VIP experience campaigns reduced OTA dependency significantly',
    icon: Target,
    color: 'bg-purple-500',
  },
  {
    title: 'McCafe Youth Launch',
    brand: "McDonald's",
    metric: '+310%',
    description: 'University campus gamification drove trial and adoption',
    icon: Zap,
    color: 'bg-yellow-500',
  },
  {
    title: 'Run Jozi Community',
    brand: 'Nike SA',
    metric: '+300%',
    description: 'Community promoter program built lasting running culture',
    icon: Globe,
    color: 'bg-slate-700',
  },
  {
    title: 'Loan Quality Boost',
    brand: 'African Bank',
    metric: '-42% CPL',
    description: 'AI scoring reduced cost per qualified application by nearly half',
    icon: TrendingUp,
    color: 'bg-red-500',
  },
];

export default function Brands() {
  const [selectedBrand, setSelectedBrand] = useState(brands[0]);
  const [industryFilter, setIndustryFilter] = useState('All');

  const filteredBrands = industryFilter === 'All'
    ? brands
    : brands.filter(b => b.industry === industryFilter);

  // Castle Light charts (deep dive)
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Leads',
      data: [680, 820, 950, 1100, 1350, 1240],
      borderColor: '#f59e0b',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      fill: true,
      tension: 0.4,
    }],
  };

  const channelData = {
    labels: ['QR Retail', 'Facebook', 'Instagram', 'Promoter', 'Direct'],
    datasets: [{
      data: [520, 380, 195, 95, 50],
      backgroundColor: ['#f59e0b', '#4f46e5', '#ec4899', '#14b8a6', '#8b5cf6'],
    }],
  };

  const conversionData = {
    labels: ['Impressions', 'Clicks', 'Leads', 'Qualified', 'Converted'],
    datasets: [{
      label: 'Castle Light',
      data: [45000, 8200, 1240, 1166, 225],
      backgroundColor: '#f59e0b',
      borderRadius: 4,
    }],
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 font-medium">Brands</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Brands</h1>
          <p className="text-sm text-slate-500">Multi-tenant platform — {brands.length} brands managed</p>
        </div>
        <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
          <Building2 className="w-3 h-3 mr-1" /> Multi-Tenant
        </Badge>
      </div>

      {/* Filter Tabs */}
      <Tabs value={industryFilter} onValueChange={setIndustryFilter}>
        <TabsList className="bg-white border border-slate-200">
          {['All', 'FMCG', 'Finance', 'Retail', 'Hospitality', 'Auto'].map(tab => (
            <TabsTrigger key={tab} value={tab} className="text-xs">{tab}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Brand Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredBrands.map(brand => (
          <Card
            key={brand.id}
            className={`card-hover border-slate-200 cursor-pointer transition-all ${
              selectedBrand.id === brand.id ? 'ring-2 ring-indigo-500 shadow-lg' : ''
            }`}
            onClick={() => setSelectedBrand(brand)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 ${brand.color} rounded-xl flex items-center justify-center text-white font-bold text-sm`}>
                  {brand.abbr}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{brand.name}</p>
                  <Badge variant="secondary" className="text-[10px]">{brand.industry}</Badge>
                </div>
              </div>
              <p className="text-xs text-slate-500 mb-3 line-clamp-2">{brand.description}</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-50 rounded-lg p-2">
                  <p className="text-sm font-bold text-slate-900">{brand.leads.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-500">Leads</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2">
                  <p className="text-sm font-bold text-slate-900">R{brand.cpl}</p>
                  <p className="text-[10px] text-slate-500">CPL</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2">
                  <p className="text-sm font-bold text-slate-900">{brand.convert}%</p>
                  <p className="text-[10px] text-slate-500">Conv.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Deep Dive — Selected Brand */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${selectedBrand.color} rounded-xl flex items-center justify-center text-white font-bold`}>
              {selectedBrand.abbr}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-slate-900">{selectedBrand.name} — Deep Dive</CardTitle>
              <p className="text-sm text-slate-500">{selectedBrand.description}</p>
            </div>
            <div className="ml-auto flex gap-1">
              {selectedBrand.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Leads', value: selectedBrand.leads.toLocaleString(), icon: Users, color: 'text-indigo-600' },
              { label: 'Cost Per Lead', value: `R${selectedBrand.cpl}`, icon: Target, color: 'text-teal-600' },
              { label: 'Qualify Rate', value: `${selectedBrand.qualify}%`, icon: Award, color: 'text-amber-600' },
              { label: 'Conversion', value: `${selectedBrand.convert}%`, icon: TrendingUp, color: 'text-green-600' },
            ].map(metric => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="p-4 bg-slate-50 rounded-xl text-center">
                  <Icon className={`w-5 h-5 ${metric.color} mx-auto mb-1`} />
                  <p className="text-xl font-bold text-slate-900">{metric.value}</p>
                  <p className="text-xs text-slate-500">{metric.label}</p>
                </div>
              );
            })}
          </div>

          {/* Case Study */}
          <div className="p-4 bg-slate-50 rounded-xl">
            <h4 className="font-semibold text-slate-900 text-sm mb-3">Case Study: {selectedBrand.caseStudy.challenge}</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Solution</p>
                <p className="text-sm text-slate-700">{selectedBrand.caseStudy.solution}</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(selectedBrand.caseStudy.results).map(([key, val]) => (
                  <div key={key} className="text-center p-2 bg-white rounded-lg">
                    <p className="text-sm font-bold text-green-600">{val}</p>
                    <p className="text-[10px] text-slate-500 capitalize">{key}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Charts */}
          {selectedBrand.id === 'castle-light' && (
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-semibold">Monthly Lead Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ height: 180 }}>
                    <Line data={monthlyData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-semibold">Channel Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ height: 180 }}>
                    <Doughnut data={channelData} options={{ ...chartOptions, cutout: '65%' }} />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-semibold">Conversion Funnel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ height: 180 }}>
                    <Bar data={conversionData} options={{ ...chartOptions, indexAxis: 'y' as const }} />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Case Studies Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Success Stories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {caseStudies.map((study, i) => {
            const Icon = study.icon;
            return (
              <Card key={i} className="card-hover border-slate-200">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 ${study.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{study.title}</p>
                      <p className="text-xs text-slate-500">{study.brand}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{study.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-700">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      {study.metric}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
