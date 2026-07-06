import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  Funnel, Bot, ClipboardCheck, Layers, Phone, FileSignature, CalendarCheck, CheckCircle,
  ArrowRight, ArrowLeft, ChevronRight, Sparkles, User, PhoneCall, Mail, MapPin,
  Target, Shield, MessageSquare, Award, Calendar,
  Monitor, Users, BarChart3, Send, CheckSquare, Bell,
  Briefcase, Globe, ThumbsUp
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

type Step = 'capture' | 'autorespond' | 'qualify' | 'queue' | 'outreach' | 'proposal' | 'signed' | 'slotbooked';

const steps: { id: Step; label: string; icon: React.ElementType }[] = [
  { id: 'capture', label: 'Lead Capture', icon: Funnel },
  { id: 'autorespond', label: 'Auto-Response', icon: Bot },
  { id: 'qualify', label: 'Qualification', icon: ClipboardCheck },
  { id: 'queue', label: 'Queue & Score', icon: Layers },
  { id: 'outreach', label: 'Sales Outreach', icon: Phone },
  { id: 'proposal', label: 'Proposal', icon: FileSignature },
  { id: 'signed', label: 'Signed', icon: CheckSquare },
  { id: 'slotbooked', label: 'Slot Booked', icon: CalendarCheck },
];

// Qualification questions
const qualificationQuestions = [
  {
    q: 'What is your monthly advertising budget?',
    options: ['Under R5,000', 'R5,000 - R15,000', 'R15,000 - R50,000', 'R50,000+'],
    scores: [10, 25, 40, 50],
  },
  {
    q: 'How many display locations are you interested in?',
    options: ['1-2 screens', '3-5 screens', '6-10 screens', '10+ screens (network)'],
    scores: [5, 15, 25, 35],
  },
  {
    q: 'What is your target launch timeline?',
    options: ['Just exploring', 'Within 3 months', 'Within 1 month', 'ASAP (immediate)'],
    scores: [5, 10, 20, 30],
  },
  {
    q: 'Do you have decision-making authority?',
    options: ['I need to consult', 'I influence decisions', 'I am a decision-maker', 'I am the owner/CEO'],
    scores: [5, 10, 20, 25],
  },
];

export default function LeadEngineJourney() {
  const [currentStep, setCurrentStep] = useState<Step>('capture');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', business: '', province: '' });
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  // Qualification state
  const [qIndex, setQIndex] = useState(0);
  const [qAnswers, setQAnswers] = useState<number[]>([]);
  const [qCompleted, setQCompleted] = useState(false);
  const [qualificationScore, setQualificationScore] = useState(0);

  // Queue state
  const [queueProgress, setQueueProgress] = useState(0);
  const [queueLogs, setQueueLogs] = useState<string[]>([]);

  // Outreach state
  const [callSimulated, setCallSimulated] = useState(false);

  // Proposal state
  const [proposalSent, setProposalSent] = useState(false);
  const [proposalOpened, setProposalOpened] = useState(false);
  const [proposalSigned, setProposalSigned] = useState(false);

  // Slot booking state
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

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
    if (!formData.business) errors.business = true;
    if (!formData.province) errors.province = true;

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
      setTimeout(() => goToStep('autorespond'), 1000);
    }
  };

  // Qualification handler
  const handleQAnswer = (optionIdx: number) => {
    const newAnswers = [...qAnswers, optionIdx];
    setQAnswers(newAnswers);

    if (qIndex < qualificationQuestions.length - 1) {
      setTimeout(() => setQIndex(prev => prev + 1), 400);
    } else {
      // Calculate score
      const total = newAnswers.reduce((sum, ansIdx, i) => sum + qualificationQuestions[i].scores[ansIdx], 0);
      setQualificationScore(total);
      setTimeout(() => setQCompleted(true), 500);
    }
  };

  // Queue animation
  useEffect(() => {
    if (currentStep !== 'queue') {
      setQueueProgress(0);
      setQueueLogs([]);
      return;
    }

    const logs = [
      { delay: 500, msg: 'Lead entered priority queue' },
      { delay: 1200, msg: `Qualification score applied: ${qualificationScore || 78}/140` },
      { delay: 2000, msg: 'AI intent analysis: HIGH — Display Network prospect' },
      { delay: 2800, msg: 'Matched to sales rep: David Mokoena (Enterprise)' },
      { delay: 3500, msg: 'Auto-prioritized: Hot lead — response within 15 min' },
      { delay: 4500, msg: 'Lead synced to CRM + Calendar' },
      { delay: 5500, msg: 'Queue position: #1 — Ready for outreach' },
    ];

    logs.forEach(({ delay, msg }) => {
      setTimeout(() => {
        setQueueLogs(prev => [...prev, msg]);
        setQueueProgress(prev => Math.min(prev + 15, 100));
      }, delay);
    });
  }, [currentStep, qualificationScore]);

  // Proposal animation
  useEffect(() => {
    if (currentStep !== 'proposal' || !proposalSent) return;

    const t1 = setTimeout(() => setProposalOpened(true), 2500);
    const t2 = setTimeout(() => setProposalSigned(true), 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [currentStep, proposalSent]);

  const getQualLabel = (score: number) => {
    if (score >= 120) return { label: 'Hot Lead', color: 'text-red-600', bg: 'bg-red-100' };
    if (score >= 80) return { label: 'Warm Lead', color: 'text-amber-600', bg: 'bg-amber-100' };
    if (score >= 40) return { label: 'Tepid Lead', color: 'text-blue-600', bg: 'bg-blue-100' };
    return { label: 'Cold Lead', color: 'text-slate-600', bg: 'bg-slate-100' };
  };

  const qualResult = getQualLabel(qualificationScore);

  // Calendar slots
  const calendarSlots = [
    { id: 'mon-am', label: 'Mon AM', available: true },
    { id: 'mon-pm', label: 'Mon PM', available: false },
    { id: 'tue-am', label: 'Tue AM', available: true },
    { id: 'tue-pm', label: 'Tue PM', available: true },
    { id: 'wed-am', label: 'Wed AM', available: true },
    { id: 'wed-pm', label: 'Wed PM', available: false },
    { id: 'thu-am', label: 'Thu AM', available: true },
    { id: 'thu-pm', label: 'Thu PM', available: true },
    { id: 'fri-am', label: 'Fri AM', available: false },
    { id: 'fri-pm', label: 'Fri PM', available: true },
  ];

  const toggleSlot = (id: string) => {
    setSelectedSlots(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 font-medium">Lead Engine Journey</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Lead Engine Journey</h1>
          <p className="text-sm text-slate-500">From lead capture to signed client with booked display slots</p>
        </div>
        <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-100">B2B Pipeline</Badge>
      </div>

      {/* Step Navigation */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-1 bg-slate-100 rounded-full" />
            <div
              className="absolute top-5 left-0 h-1 bg-violet-500 rounded-full transition-all duration-500"
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
                        ? 'bg-violet-600 text-white shadow-lg ring-4 ring-violet-100'
                        : isActive
                        ? 'bg-violet-500 text-white'
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-medium transition-colors hidden md:block ${isCurrent ? 'text-violet-700' : isActive ? 'text-slate-700' : 'text-slate-400'}`}>
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
                  {/* Step: Capture */}
                  {currentStep === 'capture' && (
                    <div className="space-y-3 animate-fade-in">
                      <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-4 rounded-2xl text-white text-center">
                        <Monitor className="w-8 h-8 mx-auto mb-2 opacity-90" />
                        <p className="text-sm font-bold">Royal Zebra Network</p>
                        <p className="text-xs opacity-75">Display Advertising</p>
                      </div>
                      <div className="text-center py-2">
                        <h3 className="text-base font-bold text-slate-900">Advertise With Us</h3>
                        <p className="text-xs text-slate-500 mt-1">Put your brand on screens across SA</p>
                      </div>

                      {!submitted ? (
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
                            <Label className="text-xs">Business Name</Label>
                            <div className="relative">
                              <Briefcase className="absolute left-2 top-2 w-3 h-3 text-slate-400" />
                              <Input
                                value={formData.business}
                                onChange={e => setFormData(prev => ({ ...prev, business: e.target.value }))}
                                placeholder="Company name"
                                className={`text-xs pl-7 h-8 ${formErrors.business ? 'border-red-500' : ''}`}
                              />
                            </div>
                            {formErrors.business && <p className="text-[10px] text-red-500 mt-0.5">Required</p>}
                          </div>
                          <div>
                            <Label className="text-xs">Phone</Label>
                            <div className="relative">
                              <PhoneCall className="absolute left-2 top-2 w-3 h-3 text-slate-400" />
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
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {formErrors.province && <p className="text-[10px] text-red-500 mt-0.5">Required</p>}
                          </div>
                          <button
                            onClick={handleFormSubmit}
                            className="w-full py-2.5 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"
                          >
                            <Send className="w-3 h-3" /> Get Started
                          </button>
                        </div>
                      ) : (
                        <div className="p-3 bg-green-50 rounded-xl text-center animate-fade-in">
                          <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-1" />
                          <p className="text-sm font-semibold text-green-700">Lead Captured!</p>
                          <p className="text-xs text-green-600">Redirecting to auto-response...</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step: Auto-Response */}
                  {currentStep === 'autorespond' && (
                    <div className="space-y-3 animate-fade-in">
                      <div className="text-center pt-2">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <MessageSquare className="w-6 h-6 text-green-600" />
                        </div>
                        <p className="text-sm font-bold text-slate-900">Message Sent!</p>
                        <p className="text-xs text-slate-500">Auto-response delivered instantly</p>
                      </div>

                      {/* WhatsApp-style message bubbles */}
                      <div className="space-y-2">
                        <div className="flex justify-end">
                          <div className="bg-violet-500 text-white p-3 rounded-2xl rounded-tr-sm max-w-[85%]">
                            <p className="text-xs">Hi! I saw your interest in advertising on the Royal Zebra Display Network. I can help you get started. What type of business are you in?</p>
                            <span className="text-[9px] opacity-70 mt-1 block">Now</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="w-3 h-3 text-slate-500" />
                          </div>
                          <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-sm max-w-[85%]">
                            <p className="text-xs text-slate-700">Thanks for reaching out! I run a retail brand and I am interested in display advertising. Can you tell me more about your network?</p>
                            <span className="text-[9px] text-slate-400 mt-1 block">Now</span>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-violet-500 text-white p-3 rounded-2xl rounded-tr-sm max-w-[85%]">
                            <p className="text-xs">Absolutely! We have 500+ screens across malls, taxi ranks, and petrol stations. To give you the best recommendation, could you share your monthly ad budget and how many locations you are targeting?</p>
                            <span className="text-[9px] opacity-70 mt-1 block">Now</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 p-2 rounded-xl flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                        <p className="text-[10px] text-green-700">Response time: 3 seconds</p>
                      </div>
                    </div>
                  )}

                  {/* Step: Qualification */}
                  {currentStep === 'qualify' && (
                    <div className="space-y-3 animate-fade-in pt-2">
                      {!qCompleted ? (
                        <>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">Question {qIndex + 1} of {qualificationQuestions.length}</span>
                            <Progress value={((qIndex + 1) / qualificationQuestions.length) * 100} className="w-20 h-1.5" />
                          </div>
                          <p className="text-sm font-semibold text-slate-900">{qualificationQuestions[qIndex].q}</p>
                          <div className="space-y-2">
                            {qualificationQuestions[qIndex].options.map((opt, i) => (
                              <button
                                key={i}
                                onClick={() => handleQAnswer(i)}
                                className="w-full p-3 rounded-xl text-left text-xs font-medium transition-all border bg-white border-slate-200 text-slate-700 hover:border-violet-300 hover:bg-violet-50"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold">
                                    {String.fromCharCode(65 + i)}
                                  </span>
                                  {opt}
                                </div>
                              </button>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="text-center space-y-3 animate-fade-in">
                          <div className={`w-16 h-16 ${qualResult.bg} rounded-full flex items-center justify-center mx-auto`}>
                            <Target className={`w-8 h-8 ${qualResult.color}`} />
                          </div>
                          <div>
                            <p className="text-lg font-bold text-slate-900">Qualification Complete</p>
                            <Badge className={`${qualResult.bg} ${qualResult.color} mt-1`}>{qualResult.label}</Badge>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-xl">
                            <p className="text-2xl font-bold text-violet-600">{qualificationScore || 78}<span className="text-sm text-slate-400">/140</span></p>
                            <p className="text-xs text-slate-500">Lead Score</p>
                          </div>
                          <div className="space-y-1 text-left">
                            {[
                              { label: 'Budget', score: qualificationScore ? Math.round((qAnswers[0] !== undefined ? qualificationQuestions[0].scores[qAnswers[0]] : 40) / 50 * 100) : 80 },
                              { label: 'Scale', score: qualificationScore ? Math.round((qAnswers[1] !== undefined ? qualificationQuestions[1].scores[qAnswers[1]] : 25) / 35 * 100) : 71 },
                              { label: 'Urgency', score: qualificationScore ? Math.round((qAnswers[2] !== undefined ? qualificationQuestions[2].scores[qAnswers[2]] : 20) / 30 * 100) : 67 },
                              { label: 'Authority', score: qualificationScore ? Math.round((qAnswers[3] !== undefined ? qualificationQuestions[3].scores[qAnswers[3]] : 20) / 25 * 100) : 80 },
                            ].map(item => (
                              <div key={item.label}>
                                <div className="flex items-center justify-between text-xs mb-0.5">
                                  <span className="text-slate-600">{item.label}</span>
                                  <span className="font-semibold text-slate-900">{item.score}%</span>
                                </div>
                                <Progress value={item.score} className="h-1" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step: Queue */}
                  {currentStep === 'queue' && (
                    <div className="space-y-2 animate-fade-in py-4">
                      <div className="text-center mb-3">
                        <Layers className="w-8 h-8 text-violet-500 mx-auto mb-1 animate-pulse" />
                        <p className="text-sm font-bold text-slate-900">Smart Queue</p>
                        <p className="text-xs text-slate-500">AI-powered lead prioritization</p>
                      </div>
                      <Progress value={queueProgress} className="h-2" />
                      <div className="space-y-1.5 max-h-64 overflow-y-auto">
                        {queueLogs.map((log, i) => (
                          <div key={i} className="flex items-start gap-2 text-[10px] p-1.5 bg-slate-50 rounded-lg animate-fade-in">
                            <CheckCircle className="w-3 h-3 text-teal-500 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700">{log}</span>
                          </div>
                        ))}
                      </div>
                      {queueProgress >= 100 && (
                        <div className="p-2 bg-violet-50 rounded-xl text-center animate-fade-in">
                          <p className="text-xs font-semibold text-violet-700">Ready for outreach!</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step: Outreach */}
                  {currentStep === 'outreach' && (
                    <div className="space-y-3 animate-fade-in pt-2">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Phone className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="text-sm font-bold text-slate-900">Sales Outreach</p>
                        <p className="text-xs text-slate-500">Personal follow-up by assigned rep</p>
                      </div>

                      {!callSimulated ? (
                        <div className="space-y-3">
                          <div className="bg-slate-50 p-3 rounded-xl space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center text-white text-xs font-bold">DM</div>
                              <div>
                                <p className="text-xs font-semibold text-slate-900">David Mokoena</p>
                                <p className="text-[10px] text-slate-500">Enterprise Sales — assigned</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-white p-2 rounded-lg text-center">
                                <p className="text-sm font-bold text-violet-600">15 min</p>
                                <p className="text-[10px] text-slate-500">Response SLA</p>
                              </div>
                              <div className="bg-white p-2 rounded-lg text-center">
                                <p className="text-sm font-bold text-blue-600">92%</p>
                                <p className="text-[10px] text-slate-500">Close Rate</p>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => setCallSimulated(true)}
                            className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                          >
                            <PhoneCall className="w-4 h-4" /> Simulate Call
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3 animate-fade-in">
                          <div className="bg-green-50 p-3 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <p className="text-xs font-semibold text-green-700">Call completed — 8 minutes</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] text-slate-600"><strong>Notes:</strong> Client interested in 5-location network. Budget R25k/month. Wants to start within 2 weeks.</p>
                              <p className="text-[10px] text-slate-600"><strong>Next step:</strong> Send proposal with custom package</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-600">
                            <Calendar className="w-4 h-4 text-violet-500" />
                            <span>Follow-up scheduled: Tomorrow 10am</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-600">
                            <ThumbsUp className="w-4 h-4 text-green-500" />
                            <span>Lead warmed — ready for proposal</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step: Proposal */}
                  {currentStep === 'proposal' && (
                    <div className="space-y-3 animate-fade-in pt-2">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <FileSignature className="w-6 h-6 text-amber-600" />
                        </div>
                        <p className="text-sm font-bold text-slate-900">Proposal</p>
                        <p className="text-xs text-slate-500">Custom package sent for approval</p>
                      </div>

                      {!proposalSent ? (
                        <div className="space-y-3">
                          <div className="bg-slate-50 p-3 rounded-xl space-y-2">
                            <p className="text-xs font-semibold text-slate-900">Custom Package</p>
                            <div className="space-y-1.5">
                              {[
                                { item: '5 Display Screens', detail: 'Mall + Taxi Rank locations', price: 'R18,500' },
                                { item: 'Ad Creative Design', detail: '3 variants included', price: 'R3,500' },
                                { item: 'Campaign Management', detail: 'Monthly optimization', price: 'R2,500' },
                                { item: 'Analytics Dashboard', detail: 'Real-time reporting', price: 'Included' },
                              ].map(line => (
                                <div key={line.item} className="flex items-center justify-between text-xs">
                                  <div>
                                    <p className="font-medium text-slate-700">{line.item}</p>
                                    <p className="text-[10px] text-slate-500">{line.detail}</p>
                                  </div>
                                  <p className="font-semibold text-slate-900">{line.price}</p>
                                </div>
                              ))}
                            </div>
                            <div className="border-t border-slate-200 pt-2 flex items-center justify-between">
                              <p className="text-xs font-bold text-slate-900">Total Monthly</p>
                              <p className="text-sm font-bold text-violet-600">R24,500</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setProposalSent(true)}
                            className="w-full py-2.5 bg-amber-500 text-white rounded-xl text-sm font-semibold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
                          >
                            <Send className="w-4 h-4" /> Send Proposal
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3 animate-fade-in">
                          {!proposalOpened && (
                            <div className="text-center py-4">
                              <Send className="w-8 h-8 text-amber-500 mx-auto mb-2 animate-pulse" />
                              <p className="text-sm font-semibold text-slate-700">Proposal sent to {formData.email || 'client@email.com'}</p>
                              <p className="text-xs text-slate-500 mt-1">Waiting for client to open...</p>
                            </div>
                          )}
                          {proposalOpened && !proposalSigned && (
                            <div className="p-3 bg-blue-50 rounded-xl animate-fade-in">
                              <div className="flex items-center gap-2 mb-2">
                                <Mail className="w-4 h-4 text-blue-500" />
                                <p className="text-xs font-semibold text-blue-700">Proposal opened!</p>
                              </div>
                              <p className="text-[10px] text-slate-600">Client viewed the proposal 2 minutes ago. Engaging with pricing section.</p>
                            </div>
                          )}
                          {proposalSigned && (
                            <div className="p-3 bg-green-50 rounded-xl text-center animate-fade-in">
                              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                              <p className="text-sm font-bold text-green-700">Proposal Accepted!</p>
                              <p className="text-xs text-green-600">Contract e-signed by {formData.name || 'Client'}</p>
                              <div className="mt-2 bg-white p-2 rounded-lg">
                                <p className="text-[10px] text-slate-500">Contract #RZ-2026-0842</p>
                                <p className="text-[10px] text-slate-500">Signed: {new Date().toLocaleDateString()}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step: Signed */}
                  {currentStep === 'signed' && (
                    <div className="space-y-3 animate-fade-in pt-2">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Award className="w-8 h-8 text-green-600" />
                        </div>
                        <p className="text-lg font-bold text-slate-900">Client Signed!</p>
                        <p className="text-xs text-slate-500">Welcome to the Royal Zebra Network</p>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-900">{formData.business || 'Client Business'}</p>
                            <p className="text-[10px] text-slate-500">{formData.name || 'Client Name'}</p>
                          </div>
                          <Badge className="ml-auto bg-green-100 text-green-700 text-[10px]">Active</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white p-2 rounded-lg text-center">
                            <p className="text-sm font-bold text-violet-600">R24,500</p>
                            <p className="text-[10px] text-slate-500">Monthly Value</p>
                          </div>
                          <div className="bg-white p-2 rounded-lg text-center">
                            <p className="text-sm font-bold text-blue-600">5</p>
                            <p className="text-[10px] text-slate-500">Screens</p>
                          </div>
                          <div className="bg-white p-2 rounded-lg text-center">
                            <p className="text-sm font-bold text-amber-600">12 mo</p>
                            <p className="text-[10px] text-slate-500">Contract</p>
                          </div>
                          <div className="bg-white p-2 rounded-lg text-center">
                            <p className="text-sm font-bold text-teal-600">R294K</p>
                            <p className="text-[10px] text-slate-500">Total Value</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-violet-50 p-3 rounded-xl">
                        <p className="text-xs text-violet-800">
                          <Sparkles className="w-3 h-3 inline mr-1" />
                          <strong>Next:</strong> Book your ad slots on the availability calendar to go live!
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step: Slot Booked */}
                  {currentStep === 'slotbooked' && (
                    <div className="space-y-3 animate-fade-in pt-2">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <CalendarCheck className="w-6 h-6 text-teal-600" />
                        </div>
                        <p className="text-sm font-bold text-slate-900">Book Your Slots</p>
                        <p className="text-xs text-slate-500">Select up to 3 time slots</p>
                      </div>

                      {!bookingConfirmed ? (
                        <>
                          <div className="grid grid-cols-2 gap-1.5">
                            {calendarSlots.map(slot => (
                              <button
                                key={slot.id}
                                onClick={() => slot.available && toggleSlot(slot.id)}
                                disabled={!slot.available}
                                className={`p-2 rounded-lg text-xs font-medium transition-all ${
                                  selectedSlots.includes(slot.id)
                                    ? 'bg-teal-500 text-white'
                                    : slot.available
                                    ? 'bg-white border border-slate-200 text-slate-700 hover:border-teal-300'
                                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                }`}
                              >
                                {slot.label}
                                {!slot.available && <span className="block text-[9px]">Booked</span>}
                              </button>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                            <span>{selectedSlots.length}/3 selected</span>
                            <span>{selectedSlots.length * 5} screens allocated</span>
                          </div>
                          <button
                            onClick={() => setBookingConfirmed(true)}
                            disabled={selectedSlots.length === 0}
                            className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                              selectedSlots.length > 0
                                ? 'bg-teal-600 text-white hover:bg-teal-700'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            <CalendarCheck className="w-4 h-4" /> Confirm Booking
                          </button>
                        </>
                      ) : (
                        <div className="space-y-3 animate-fade-in">
                          <div className="p-3 bg-green-50 rounded-xl text-center">
                            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                            <p className="text-sm font-bold text-green-700">Slots Confirmed!</p>
                            <p className="text-xs text-green-600">Your ads are scheduled to go live</p>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-xl space-y-2">
                            <p className="text-xs font-semibold text-slate-900">Booking Summary</p>
                            {selectedSlots.map(slotId => {
                              const slot = calendarSlots.find(s => s.id === slotId);
                              return (
                                <div key={slotId} className="flex items-center gap-2 text-xs">
                                  <Monitor className="w-3 h-3 text-violet-500" />
                                  <span className="text-slate-700">{slot?.label} — Screen Pack B (5 locations)</span>
                                  <CheckCircle className="w-3 h-3 text-green-500 ml-auto" />
                                </div>
                              );
                            })}
                            <div className="border-t border-slate-200 pt-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-600">Go-live date</span>
                                <span className="font-semibold text-slate-900">{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-3 rounded-xl text-white text-center">
                            <p className="text-xs font-semibold">Your brand will be seen by</p>
                            <p className="text-lg font-bold">~125,000 people/day</p>
                            <p className="text-[10px] opacity-75">across {selectedSlots.length * 5} screen locations</p>
                          </div>
                        </div>
                      )}
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
                {currentStep === 'capture' && 'A potential advertiser discovers Royal Zebra through our website, partner referral, or inbound inquiry. The lead form captures business details, contact info, and location — all validated in real-time.'}
                {currentStep === 'autorespond' && 'Within 3 seconds of form submission, an AI-powered WhatsApp bot engages the lead. It confirms receipt, asks qualifying questions, and maintains conversation flow 24/7. No lead goes cold.'}
                {currentStep === 'qualify' && 'The BANT+ qualification framework scores leads on Budget, Authority, Need, and Timeline. AI analyzes responses and assigns a score from 0-140. Only qualified leads proceed to sales — saving hours of rep time.'}
                {currentStep === 'queue' && 'Qualified leads enter a smart priority queue. AI factors in score, intent signals, and rep availability to route leads optimally. Hot leads get sub-15-minute response guarantees.'}
                {currentStep === 'outreach' && 'An assigned sales rep receives a full lead briefing: qualification answers, AI-generated talk points, and recommended approach. Calls are logged, transcribed, and synced automatically.'}
                {currentStep === 'proposal' && 'Based on qualification data, a custom proposal is auto-generated with relevant pricing, locations, and creative packages. Digital signature tracking shows real-time client engagement.'}
                {currentStep === 'signed' && 'Once e-signed, the client is onboarded instantly. Their profile activates in the system, billing begins, and they gain dashboard access. The full contract value is tracked in the pipeline.'}
                {currentStep === 'slotbooked' && 'Clients book ad slots on a live availability calendar. The system matches their scale needs (number of screens, locations) with open inventory. Confirmed bookings sync directly to the display network.'}
              </p>

              {currentStep === 'qualify' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Target className="w-4 h-4 text-violet-500" />
                    <span>BANT+ Scoring: Budget, Authority, Need, Timeline</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Bot className="w-4 h-4 text-blue-500" />
                    <span>AI conversational qualification via WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Shield className="w-4 h-4 text-teal-500" />
                    <span>Only 60%+ scores reach human sales reps</span>
                  </div>
                </div>
              )}

              {currentStep === 'queue' && (
                <div className="space-y-3">
                  <Progress value={queueProgress} className="h-2" />
                  <p className="text-xs text-slate-500">{queueProgress}% processed</p>
                </div>
              )}

              {currentStep === 'outreach' && callSimulated && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <PhoneCall className="w-4 h-4 text-green-500" />
                    <span>Call logged and transcribed automatically</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Sparkles className="w-4 h-4 text-violet-500" />
                    <span>AI-generated call summary and next steps</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>Follow-up auto-scheduled in CRM</span>
                  </div>
                </div>
              )}

              {currentStep === 'slotbooked' && bookingConfirmed && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Monitor className="w-4 h-4 text-violet-500" />
                    <span>Slots sync directly to display network CMS</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <BarChart3 className="w-4 h-4 text-blue-500" />
                    <span>Impression tracking begins at go-live</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Globe className="w-4 h-4 text-teal-500" />
                    <span>Real-time dashboard shows ad performance</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step-specific info cards */}
          {currentStep === 'capture' && (
            <div className="grid grid-cols-2 gap-3">
              <Card className="border-slate-200">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-violet-600">2,847</p>
                  <p className="text-xs text-slate-500">Leads captured this month</p>
                </CardContent>
              </Card>
              <Card className="border-slate-200">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-teal-600">3.2s</p>
                  <p className="text-xs text-slate-500">Avg. form completion</p>
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === 'autorespond' && (
            <div className="grid grid-cols-3 gap-3">
              <Card className="border-slate-200">
                <CardContent className="p-3 text-center">
                  <p className="text-lg font-bold text-green-600">3s</p>
                  <p className="text-[10px] text-slate-500">Response Time</p>
                </CardContent>
              </Card>
              <Card className="border-slate-200">
                <CardContent className="p-3 text-center">
                  <p className="text-lg font-bold text-blue-600">98%</p>
                  <p className="text-[10px] text-slate-500">Engagement Rate</p>
                </CardContent>
              </Card>
              <Card className="border-slate-200">
                <CardContent className="p-3 text-center">
                  <p className="text-lg font-bold text-violet-600">24/7</p>
                  <p className="text-[10px] text-slate-500">Always On</p>
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === 'qualify' && qCompleted && (
            <Card className="border-slate-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-slate-900 text-sm mb-3">Qualification Breakdown</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Hot Lead (120-140)', desc: 'Immediate sales priority', color: 'bg-red-100 text-red-700' },
                    { label: 'Warm Lead (80-119)', desc: 'Nurture + sales follow-up', color: 'bg-amber-100 text-amber-700' },
                    { label: 'Tepid Lead (40-79)', desc: 'Marketing nurture sequence', color: 'bg-blue-100 text-blue-700' },
                    { label: 'Cold Lead (0-39)', desc: 'Long-term drip campaign', color: 'bg-slate-100 text-slate-600' },
                  ].map(tier => (
                    <div key={tier.label} className="flex items-center gap-2">
                      <Badge className={`${tier.color} text-[10px]`}>{tier.label}</Badge>
                      <span className="text-xs text-slate-500">{tier.desc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 'queue' && queueProgress >= 100 && (
            <Card className="border-violet-200 bg-violet-50/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-violet-500 rounded-xl flex items-center justify-center">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Rep Notification</p>
                    <p className="text-xs text-slate-500">David Mokoena alerted instantly</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center text-white text-xs font-bold">DM</div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-900">New Qualified Lead</p>
                      <p className="text-[10px] text-slate-500">{formData.business || 'Business'} — Score: {qualificationScore || 78}</p>
                    </div>
                    <span className="text-[10px] text-slate-400">Now</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 'proposal' && proposalSent && (
            <Card className="border-slate-200">
              <CardContent className="p-4 space-y-2">
                <h4 className="font-semibold text-slate-900 text-sm">Proposal Timeline</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Proposal Sent', done: true, time: 'Just now' },
                    { label: 'Client Opened', done: proposalOpened, time: proposalOpened ? '2 min ago' : 'Waiting...' },
                    { label: 'Reviewing', done: proposalOpened, time: proposalOpened ? 'In progress' : 'Pending' },
                    { label: 'E-Signed', done: proposalSigned, time: proposalSigned ? 'Completed' : 'Pending' },
                  ].map((item, i) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.done ? 'bg-green-500' : 'bg-slate-200'}`}>
                        {item.done ? <CheckCircle className="w-3 h-3 text-white" /> : <span className="text-xs text-slate-400">{i + 1}</span>}
                      </div>
                      <div className="flex-1">
                        <p className={`text-xs font-medium ${item.done ? 'text-slate-900' : 'text-slate-400'}`}>{item.label}</p>
                      </div>
                      <span className="text-[10px] text-slate-400">{item.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 'signed' && (
            <Card className="border-slate-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-slate-900 text-sm mb-3">Pipeline Impact</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Conversion Rate', value: '24%', color: 'text-violet-600' },
                    { label: 'Avg. Deal Size', value: 'R24.5K', color: 'text-teal-600' },
                    { label: 'Sales Cycle', value: '4.2 days', color: 'text-blue-600' },
                    { label: 'Rep Efficiency', value: '+68%', color: 'text-amber-600' },
                  ].map(stat => (
                    <div key={stat.label} className="text-center p-2 bg-slate-50 rounded-lg">
                      <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                      <p className="text-[10px] text-slate-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 'slotbooked' && bookingConfirmed && (
            <Card className="border-slate-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-slate-900 text-sm mb-3">Network Scale</h4>
                <div className="space-y-2">
                  {[
                    { icon: Monitor, label: 'Screens in Network', value: '500+' },
                    { icon: Users, label: 'Daily Impressions', value: '~2.1M' },
                    { icon: MapPin, label: 'Locations', value: '180+' },
                    { icon: Globe, label: 'Provinces Covered', value: '9/9' },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                        <Icon className="w-4 h-4 text-violet-500" />
                        <span className="text-xs text-slate-600 flex-1">{item.label}</span>
                        <span className="text-xs font-bold text-slate-900">{item.value}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" onClick={goBack} disabled={currentIndex === 0} className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Previous
            </Button>
            {currentStep !== 'slotbooked' && (
              <Button onClick={goNext} className="gap-2 bg-violet-600 hover:bg-violet-700">
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            )}
            {currentStep === 'slotbooked' && (
              <Link to="/dashboard">
                <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
                  Dashboard <BarChart3 className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
