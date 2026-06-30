import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  Megaphone, MousePointer, FileText, Send, BarChart3, CheckCircle,
  ArrowRight, ArrowLeft, ChevronRight, Sparkles, User, Phone, Mail, MapPin,
  Zap, Clock, Target, Shield, Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Step = 'ad' | 'landing' | 'form' | 'submit' | 'automation' | 'dashboard';

const steps: { id: Step; label: string; icon: React.ElementType }[] = [
  { id: 'ad', label: 'Facebook Ad', icon: Megaphone },
  { id: 'landing', label: 'Landing Page', icon: MousePointer },
  { id: 'form', label: 'Lead Form', icon: FileText },
  { id: 'submit', label: 'Submit', icon: Send },
  { id: 'automation', label: 'Automation', icon: Zap },
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
];

export default function AdJourney() {
  const [currentStep, setCurrentStep] = useState<Step>('ad');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', province: '' });
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [automationProgress, setAutomationProgress] = useState(0);
  const [automationLogs, setAutomationLogs] = useState<string[]>([]);

  const currentIndex = steps.findIndex(s => s.id === currentStep);

  const goToStep = (step: Step) => setCurrentStep(step);
  const goNext = () => {
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };
  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const handleFormSubmit = () => {
    const errors: Record<string, boolean> = {};
    if (!formData.name) errors.name = true;
    if (!formData.phone) errors.phone = true;
    if (!formData.email) errors.email = true;
    if (!formData.province) errors.province = true;

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
      setTimeout(() => goToStep('automation'), 800);
    }
  };

  // Automation animation
  useEffect(() => {
    if (currentStep !== 'automation') {
      setAutomationProgress(0);
      setAutomationLogs([]);
      return;
    }

    const logs = [
      { delay: 500, msg: 'Received lead data from form submission' },
      { delay: 1200, msg: 'Validating phone number (+27 format confirmed)' },
      { delay: 2000, msg: 'POPIA consent check — 3/3 consents granted' },
      { delay: 2800, msg: 'Running AI qualification model...' },
      { delay: 3500, msg: 'Lead scored: 87/100 — HIGH INTENT' },
      { delay: 4200, msg: 'Assigning to promoter: David Mokoena (Soweto)' },
      { delay: 4900, msg: 'SMS notification sent to promoter' },
      { delay: 5600, msg: 'Lead synced to CDP — profile enriched' },
      { delay: 6300, msg: 'Dashboard updated in real-time' },
      { delay: 7000, msg: 'Automation complete! Lead ready for follow-up.' },
    ];

    logs.forEach(({ delay, msg }) => {
      setTimeout(() => {
        setAutomationLogs(prev => [...prev, msg]);
        setAutomationProgress(prev => Math.min(prev + 10, 100));
      }, delay);
    });

    const timer = setTimeout(() => {
      setCurrentStep('dashboard');
    }, 8500);

    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 font-medium">Ad Journey</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ad Journey</h1>
          <p className="text-sm text-slate-500">Facebook Ad to Closed Lead — step by step</p>
        </div>
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Interactive Demo</Badge>
      </div>

      {/* Step Navigation */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-1 bg-slate-100 rounded-full" />
            <div
              className="absolute top-5 left-0 h-1 bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = i <= currentIndex;
              const isCurrent = step.id === currentStep;

              return (
                <button
                  key={step.id}
                  onClick={() => goToStep(step.id)}
                  className="relative z-10 flex flex-col items-center gap-2 group"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isCurrent
                        ? 'bg-indigo-600 text-white shadow-lg ring-4 ring-indigo-100'
                        : isActive
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-medium transition-colors ${isCurrent ? 'text-indigo-700' : isActive ? 'text-slate-700' : 'text-slate-400'}`}>
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Phone Preview */}
        <div className="lg:col-span-2 flex justify-center">
          <div className="relative" style={{ maxWidth: 300, width: '100%' }}>
            <div className="bg-slate-900 rounded-[2.5rem] p-2 phone-shadow">
              <div className="bg-white rounded-[2rem] overflow-hidden">
                {/* Notch */}
                <div className="flex justify-center pt-2 pb-1">
                  <div className="w-24 h-5 bg-slate-900 rounded-full" />
                </div>

                <div className="px-4 pb-2 space-y-3 h-[480px] overflow-y-auto">
                  {/* Step: Ad */}
                  {currentStep === 'ad' && (
                    <div className="space-y-3 animate-fade-in">
                      <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-4 rounded-2xl text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">CL</div>
                          <div>
                            <p className="text-xs font-semibold">Castle Light</p>
                            <p className="text-[10px] opacity-75">Sponsored</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium mb-2">Summer Festival 2026 — Win VIP Tickets!</p>
                        <p className="text-xs opacity-90 mb-3">Experience the ultimate summer vibe. Enter now for a chance to win exclusive VIP access.</p>
                        <div className="h-28 bg-white/10 rounded-xl flex items-center justify-center">
                          <Sparkles className="w-10 h-10 opacity-50" />
                        </div>
                        <button
                          onClick={goNext}
                          className="w-full mt-3 py-2.5 bg-white text-amber-600 rounded-lg text-sm font-semibold hover:bg-amber-50 transition-colors"
                        >
                          Learn More
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step: Landing */}
                  {currentStep === 'landing' && (
                    <div className="space-y-3 animate-fade-in">
                      <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-3 rounded-xl text-white text-center">
                        <p className="text-sm font-bold">Castle Light</p>
                        <p className="text-xs opacity-75">Summer Festival 2026</p>
                      </div>
                      <div className="text-center py-2">
                        <h3 className="text-base font-bold text-slate-900">Win VIP Tickets!</h3>
                        <p className="text-xs text-slate-500 mt-1">Enter your details for a chance to win</p>
                      </div>
                      <div className="flex justify-center">
                        <button
                          onClick={goNext}
                          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
                        >
                          Enter Now
                        </button>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl space-y-2">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle className="w-3 h-3 text-teal-500" /> 100% POPIA Compliant
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle className="w-3 h-3 text-teal-500" /> Instant SMS Confirmation
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle className="w-3 h-3 text-teal-500" /> Data Never Shared
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step: Form */}
                  {(currentStep === 'form' || currentStep === 'submit') && (
                    <div className="space-y-3 animate-fade-in">
                      <div className="text-center">
                        <p className="text-sm font-bold text-slate-900">Your Details</p>
                        <p className="text-xs text-slate-500">Fill in all fields to enter</p>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <Label className="text-xs">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-2 top-2 w-3 h-3 text-slate-400" />
                            <Input
                              value={formData.name}
                              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="Your name"
                              className={`text-xs pl-7 h-8 ${formErrors.name ? 'border-red-500' : ''}`}
                            />
                          </div>
                          {formErrors.name && <p className="text-[10px] text-red-500 mt-0.5">Required</p>}
                        </div>
                        <div>
                          <Label className="text-xs">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-2 top-2 w-3 h-3 text-slate-400" />
                            <Input
                              value={formData.phone}
                              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                              placeholder="+27..."
                              className={`text-xs pl-7 h-8 ${formErrors.phone ? 'border-red-500' : ''}`}
                            />
                          </div>
                          {formErrors.phone && <p className="text-[10px] text-red-500 mt-0.5">Required</p>}
                        </div>
                        <div>
                          <Label className="text-xs">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-2 top-2 w-3 h-3 text-slate-400" />
                            <Input
                              value={formData.email}
                              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                              placeholder="your@email.com"
                              className={`text-xs pl-7 h-8 ${formErrors.email ? 'border-red-500' : ''}`}
                            />
                          </div>
                          {formErrors.email && <p className="text-[10px] text-red-500 mt-0.5">Required</p>}
                        </div>
                        <div>
                          <Label className="text-xs">Province</Label>
                          <div className="relative">
                            <MapPin className="absolute left-2 top-2 w-3 h-3 text-slate-400 z-10" />
                            <Select value={formData.province} onValueChange={v => setFormData(prev => ({ ...prev, province: v }))}>
                              <SelectTrigger className={`text-xs pl-7 h-8 ${formErrors.province ? 'border-red-500' : ''}`}>
                                <SelectValue placeholder="Select province" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="gauteng">Gauteng</SelectItem>
                                <SelectItem value="kzn">KwaZulu-Natal</SelectItem>
                                <SelectItem value="western-cape">Western Cape</SelectItem>
                                <SelectItem value="eastern-cape">Eastern Cape</SelectItem>
                                <SelectItem value="mpumalanga">Mpumalanga</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {formErrors.province && <p className="text-[10px] text-red-500 mt-0.5">Required</p>}
                        </div>
                      </div>

                      {!submitted ? (
                        <button
                          onClick={handleFormSubmit}
                          className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <Send className="w-3 h-3" /> Submit Entry
                        </button>
                      ) : (
                        <div className="p-3 bg-green-50 rounded-xl text-center animate-fade-in">
                          <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-1" />
                          <p className="text-sm font-semibold text-green-700">Entry Submitted!</p>
                          <p className="text-xs text-green-600">Good luck {formData.name.split(' ')[0]}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step: Automation */}
                  {currentStep === 'automation' && (
                    <div className="space-y-2 animate-fade-in py-4">
                      <div className="text-center mb-3">
                        <Zap className="w-8 h-8 text-indigo-500 mx-auto mb-1 animate-pulse" />
                        <p className="text-sm font-bold text-slate-900">Processing...</p>
                      </div>
                      <div className="space-y-1.5 max-h-72 overflow-y-auto">
                        {automationLogs.map((log, i) => (
                          <div key={i} className="flex items-start gap-2 text-[10px] p-1.5 bg-slate-50 rounded-lg animate-fade-in">
                            <CheckCircle className="w-3 h-3 text-teal-500 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700">{log}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step: Dashboard Preview */}
                  {currentStep === 'dashboard' && (
                    <div className="space-y-3 animate-fade-in">
                      <div className="text-center">
                        <p className="text-sm font-bold text-slate-900">Lead Captured!</p>
                        <p className="text-xs text-slate-500">View in dashboard</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {formData.name ? formData.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'SM'}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-900">{formData.name || 'Sarah Mokoena'}</p>
                            <p className="text-[10px] text-slate-500">{formData.province ? formData.province.charAt(0).toUpperCase() + formData.province.slice(1) : 'Gauteng'}</p>
                          </div>
                          <Badge className="ml-auto bg-green-100 text-green-700 text-[10px]">87</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div className="bg-white p-2 rounded-lg">
                            <p className="text-sm font-bold text-indigo-600">87</p>
                            <p className="text-[10px] text-slate-500">Lead Score</p>
                          </div>
                          <div className="bg-white p-2 rounded-lg">
                            <p className="text-sm font-bold text-teal-600">High</p>
                            <p className="text-[10px] text-slate-500">Intent</p>
                          </div>
                        </div>
                      </div>
                      <Link to="/dashboard">
                        <button className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                          <BarChart3 className="w-4 h-4" /> View Dashboard
                        </button>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Home indicator */}
                <div className="flex justify-center py-2">
                  <div className="w-28 h-1 bg-slate-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Explanation */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-5">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {steps[currentIndex].label}
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                {currentStep === 'ad' && 'The journey begins when a user scrolls Facebook and sees your sponsored ad. The ad is targeted based on demographics, interests, and lookalike audiences.'}
                {currentStep === 'landing' && 'Clicking the ad opens a fast-loading mobile landing page. The page is optimized for conversion with clear CTAs and social proof.'}
                {currentStep === 'form' && 'The lead form captures essential data: name, phone, email, and province. All fields are validated in real-time and POPIA consent is collected.'}
                {currentStep === 'submit' && 'On submit, the data is encrypted and sent to the Royal Zebra API. A confirmation SMS is sent to the lead within 3 seconds.'}
                {currentStep === 'automation' && 'The automation engine processes the lead: validates data, runs AI scoring, assigns to a promoter, and syncs to the CDP.'}
                {currentStep === 'dashboard' && 'The lead appears instantly on the dashboard with a full AI-generated profile, behavioral scores, and recommended actions.'}
              </p>

              {currentStep === 'form' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Shield className="w-4 h-4 text-teal-500" />
                    <span>All data is encrypted in transit and at rest</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>Average form completion time: 45 seconds</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Target className="w-4 h-4 text-indigo-500" />
                    <span>Form completion rate: 94%</span>
                  </div>
                </div>
              )}

              {currentStep === 'automation' && (
                <div className="space-y-3">
                  <Progress value={automationProgress} className="h-2" />
                  <p className="text-xs text-slate-500">{automationProgress}% complete</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step-specific info cards */}
          {currentStep === 'ad' && (
            <div className="grid grid-cols-2 gap-3">
              <Card className="border-slate-200">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-indigo-600">1,240</p>
                  <p className="text-xs text-slate-500">Ad clicks this month</p>
                </CardContent>
              </Card>
              <Card className="border-slate-200">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-teal-600">R38</p>
                  <p className="text-xs text-slate-500">Cost per click</p>
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === 'dashboard' && (
            <Card className="border-slate-200 border-indigo-200 bg-indigo-50/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Real-Time Notifications</p>
                    <p className="text-xs text-slate-500">Promoters get instant alerts for new leads</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">DM</div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-900">New Lead Assigned</p>
                      <p className="text-[10px] text-slate-500">{formData.name || 'Sarah Mokoena'} — Score: 87</p>
                    </div>
                    <span className="text-[10px] text-slate-400">Now</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" onClick={goBack} disabled={currentIndex === 0} className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Previous
            </Button>
            {currentStep !== 'dashboard' && (
              <Button onClick={goNext} className="gap-2 gradient-indigo hover:opacity-90">
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            )}
            {currentStep === 'dashboard' && (
              <Link to="/dashboard">
                <Button className="gap-2 gradient-indigo hover:opacity-90">
                  Full Dashboard <BarChart3 className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
