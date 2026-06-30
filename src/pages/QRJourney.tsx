import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import {
  QrCode, ScanLine, RotateCcw, Gift, Sparkles, CheckCircle,
  ArrowRight, ArrowLeft, ChevronRight, Shield, User, Target, Zap,
  BarChart3, Award, Star, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Stage = 'scan' | 'game' | 'consent' | 'cdp' | 'profile';

// Quiz Component
function QuizGame({ onComplete }: { onComplete: (score: number) => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const questions = [
    {
      q: 'What is Castle Light known for?',
      options: ['Craft Beer', 'Premium Lager', 'Wine', 'Cider'],
      correct: 1,
    },
    {
      q: 'Which music genre fits Castle Light best?',
      options: ['Jazz', 'Hip Hop', 'House/Amapiano', 'Rock'],
      correct: 2,
    },
    {
      q: 'What is the Castle Light summer vibe?',
      options: ['Quiet evenings', 'Outdoor festivals', 'Fine dining', 'Movie nights'],
      correct: 1,
    },
  ];

  const handleAnswer = (idx: number) => {
    if (showResult || finished) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === questions[currentQ].correct) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(prev => prev + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        setFinished(true);
        onComplete(score + (idx === questions[currentQ].correct ? 1 : 0));
      }
    }, 1200);
  };

  if (finished) {
    return (
      <div className="text-center space-y-3 animate-fade-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Award className="w-8 h-8 text-green-600" />
        </div>
        <p className="text-lg font-bold text-slate-900">Quiz Complete!</p>
        <p className="text-sm text-slate-500">You scored {score} out of {questions.length}</p>
        <div className="flex justify-center gap-1">
          {[...Array(3)].map((_, i) => (
            <Star key={i} className={`w-5 h-5 ${i < score ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
          ))}
        </div>
        <Button onClick={() => onComplete(score)} size="sm" className="gradient-indigo">
          Continue
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">Question {currentQ + 1} of {questions.length}</span>
        <Progress value={((currentQ + 1) / questions.length) * 100} className="w-20 h-1.5" />
      </div>
      <p className="text-sm font-semibold text-slate-900">{questions[currentQ].q}</p>
      <div className="space-y-2">
        {questions[currentQ].options.map((opt, i) => {
          let btnClass = 'w-full p-3 rounded-xl text-left text-xs font-medium transition-all border ';
          if (showResult) {
            if (i === questions[currentQ].correct) btnClass += 'bg-green-50 border-green-300 text-green-700';
            else if (i === selected && i !== questions[currentQ].correct) btnClass += 'bg-red-50 border-red-300 text-red-700';
            else btnClass += 'bg-slate-50 border-slate-100 text-slate-400';
          } else {
            btnClass += 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50';
          }

          return (
            <button key={i} onClick={() => handleAnswer(i)} disabled={showResult} className={btnClass}>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
                {showResult && i === questions[currentQ].correct && <CheckCircle className="w-4 h-4 ml-auto text-green-500" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Spin Wheel Component
function SpinWheel({ onComplete }: { onComplete: (prize: string) => void }) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const prizes = ['VIP Tickets', 'Free 6-Pack', 'Cap', 'R50 Voucher', 'T-Shirt', 'Try Again'];
  const colors = ['#4f46e5', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6', '#94a3b8'];

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const extraSpins = 5 + Math.random() * 3;
    const landingIndex = Math.floor(Math.random() * prizes.length);
    const segmentAngle = 360 / prizes.length;
    const finalAngle = extraSpins * 360 + landingIndex * segmentAngle + segmentAngle / 2;
    setRotation(prev => prev + finalAngle);

    setTimeout(() => {
      setResult(prizes[landingIndex]);
      setSpinning(false);
    }, 3000);
  };

  if (result) {
    return (
      <div className="text-center space-y-3 animate-fade-in">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
          <Gift className="w-8 h-8 text-amber-600" />
        </div>
        <p className="text-lg font-bold text-slate-900">You Won!</p>
        <Badge className="bg-amber-100 text-amber-700 text-lg px-4 py-1">{result}</Badge>
        <p className="text-xs text-slate-500">
          {result === 'Try Again' ? 'Better luck next time!' : 'Show this at any participating store'}
        </p>
        <Button onClick={() => onComplete(result)} size="sm" className="gradient-indigo">
          Continue
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center space-y-3">
      <p className="text-sm text-slate-600">Spin the wheel to win prizes!</p>
      <div className="relative mx-auto" style={{ width: 200, height: 200 }}>
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10">
          <div className="w-4 h-5 bg-red-500" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }} />
        </div>
        {/* Wheel */}
        <div
          className="w-full h-full rounded-full border-4 border-slate-200 relative overflow-hidden transition-transform"
          style={{
            transform: `rotate(${rotation}deg)`,
            transitionDuration: spinning ? '3s' : '0s',
            transitionTimingFunction: 'cubic-bezier(0.17, 0.67, 0.12, 0.99)',
          }}
        >
          {prizes.map((prize, i) => {
            const angle = (360 / prizes.length) * i;
            return (
              <div
                key={prize}
                className="absolute w-full h-full flex items-center justify-center"
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              >
                <div
                  className="absolute w-1/2 h-full origin-left"
                  style={{
                    background: colors[i],
                    clipPath: `polygon(0 0, 100% ${50 - 50 * Math.tan(Math.PI / prizes.length)}%, 100% ${50 + 50 * Math.tan(Math.PI / prizes.length)}%, 0 100%)`,
                  }}
                />
                <span
                  className="absolute text-[10px] font-bold text-white"
                  style={{
                    transform: `rotate(${180 / prizes.length}deg) translateX(55px)`,
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  }}
                >
                  {prize}
                </span>
              </div>
            );
          })}
        </div>
        {/* Center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <Star className="w-4 h-4 text-amber-500" />
          </div>
        </div>
      </div>
      <Button onClick={spin} disabled={spinning} size="sm" className="gradient-indigo gap-2">
        {spinning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4" />}
        {spinning ? 'Spinning...' : 'Spin'}
      </Button>
    </div>
  );
}

// Scratch Card Component
function ScratchCard({ onComplete }: { onComplete: (prize: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [prize] = useState(() => {
    const prizes = ['VIP Pass', 'Free Drink', 'R30 Off', 'Merch Pack', 'Better Luck Next Time'];
    return prizes[Math.floor(Math.random() * prizes.length)];
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH HERE', canvas.width / 2, canvas.height / 2 + 5);
  }, []);

  const handleScratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (revealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Check percentage scratched
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    const percent = transparent / (pixels.length / 4);
    if (percent > 0.4 && !revealed) {
      setRevealed(true);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  if (revealed) {
    return (
      <div className="text-center space-y-3 animate-fade-in">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8 text-indigo-600" />
        </div>
        <p className="text-lg font-bold text-slate-900">You Revealed!</p>
        <Badge className="bg-indigo-100 text-indigo-700 text-lg px-4 py-1">{prize}</Badge>
        <p className="text-xs text-slate-500">
          {prize === 'Better Luck Next Time' ? 'Try another game!' : 'Congratulations on your prize!'}
        </p>
        <Button onClick={() => onComplete(prize)} size="sm" className="gradient-indigo">
          Continue
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center space-y-3">
      <p className="text-sm text-slate-600">Scratch to reveal your prize!</p>
      <div className="relative mx-auto inline-block">
        <canvas
          ref={canvasRef}
          width={240}
          height={120}
          className="rounded-xl cursor-crosshair border-2 border-slate-200"
          style={{ maxWidth: '100%', touchAction: 'none' }}
          onMouseMove={e => e.buttons === 1 && handleScratch(e)}
          onTouchMove={handleScratch}
        />
        {/* Hidden prize underneath */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-500 w-full h-full rounded-xl flex items-center justify-center">
            <div className="text-center text-white">
              <Gift className="w-6 h-6 mx-auto mb-1" />
              <p className="text-sm font-bold">{prize}</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-400">Scratch with your finger or mouse</p>
    </div>
  );
}

export default function QRJourney() {
  const [stage, setStage] = useState<Stage>('scan');
  const [consents, setConsents] = useState([false, false, false]);
  const [cdpProgress, setCdpProgress] = useState(0);

  const stages: { id: Stage; label: string }[] = [
    { id: 'scan', label: 'QR Scan' },
    { id: 'game', label: 'Play Game' },
    { id: 'consent', label: 'POPIA Consent' },
    { id: 'cdp', label: 'CDP Flow' },
    { id: 'profile', label: 'AI Profile' },
  ];

  const currentIndex = stages.findIndex(s => s.id === stage);

  const handleGameComplete = () => {
    setTimeout(() => setStage('consent'), 500);
  };

  const handleConsentsSubmit = () => {
    if (consents.every(Boolean)) {
      setStage('cdp');
    }
  };

  // CDP animation
  useEffect(() => {
    if (stage !== 'cdp') return;
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setCdpProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => setStage('profile'), 500);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [stage]);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 font-medium">QR Journey</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">QR Journey</h1>
          <p className="text-sm text-slate-500">Scan, Play, Win — the gamified lead capture experience</p>
        </div>
        <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100">Interactive Demo</Badge>
      </div>

      {/* Progress Steps */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            {stages.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i <= currentIndex ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'
                } ${i === currentIndex ? 'ring-4 ring-indigo-100' : ''}`}>
                  {i < currentIndex ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-xs font-medium hidden md:block ${i === currentIndex ? 'text-indigo-700' : 'text-slate-500'}`}>
                  {s.label}
                </span>
                {i < stages.length - 1 && (
                  <div className={`w-8 lg:w-16 h-1 rounded-full mx-1 ${i < currentIndex ? 'bg-indigo-500' : 'bg-slate-100'}`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Phone */}
        <div className="lg:col-span-2 flex justify-center">
          <div className="relative" style={{ maxWidth: 300, width: '100%' }}>
            <div className="bg-slate-900 rounded-[2.5rem] p-2 phone-shadow">
              <div className="bg-white rounded-[2rem] overflow-hidden">
                <div className="flex justify-center pt-2 pb-1">
                  <div className="w-24 h-5 bg-slate-900 rounded-full" />
                </div>

                <div className="px-4 pb-2 h-[480px] overflow-y-auto">
                  {/* Scan Stage */}
                  {stage === 'scan' && (
                    <div className="text-center space-y-4 animate-fade-in pt-8">
                      <div className="w-24 h-24 bg-teal-50 rounded-3xl flex items-center justify-center mx-auto">
                        <QrCode className="w-12 h-12 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-slate-900">Scan to Play & Win!</p>
                        <p className="text-xs text-slate-500 mt-1">Point your camera at the QR code on your Castle Light product</p>
                      </div>
                      <div className="bg-slate-900 p-4 rounded-2xl inline-block">
                        <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center">
                          <QrCode className="w-24 h-24 text-slate-900" />
                        </div>
                      </div>
                      <button
                        onClick={() => setStage('game')}
                        className="flex items-center gap-2 mx-auto px-5 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors"
                      >
                        <ScanLine className="w-4 h-4" /> Simulate Scan
                      </button>
                    </div>
                  )}

                  {/* Game Stage */}
                  {stage === 'game' && (
                    <div className="pt-2 animate-fade-in">
                      <Tabs defaultValue="quiz" className="w-full">
                        <TabsList className="grid grid-cols-3 w-full h-8 mb-3">
                          <TabsTrigger value="quiz" className="text-[10px]">Quiz</TabsTrigger>
                          <TabsTrigger value="wheel" className="text-[10px]">Wheel</TabsTrigger>
                          <TabsTrigger value="scratch" className="text-[10px]">Scratch</TabsTrigger>
                        </TabsList>
                        <TabsContent value="quiz">
                          <QuizGame onComplete={handleGameComplete} />
                        </TabsContent>
                        <TabsContent value="wheel">
                          <SpinWheel onComplete={handleGameComplete} />
                        </TabsContent>
                        <TabsContent value="scratch">
                          <ScratchCard onComplete={handleGameComplete} />
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}

                  {/* Consent Stage */}
                  {stage === 'consent' && (
                    <div className="space-y-3 pt-2 animate-fade-in">
                      <div className="text-center mb-3">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <Shield className="w-6 h-6 text-emerald-600" />
                        </div>
                        <p className="text-sm font-bold text-slate-900">POPIA Consent</p>
                        <p className="text-xs text-slate-500">We need your consent to process your data</p>
                      </div>

                      {[
                        'I consent to the collection of my personal data for competition entry',
                        'I agree to receive marketing communications via SMS and email',
                        'I understand my data will be stored securely and can request deletion at any time',
                      ].map((text, i) => (
                        <button
                          key={i}
                          onClick={() => setConsents(prev => prev.map((c, j) => j === i ? !c : c))}
                          className={`w-full p-3 rounded-xl text-left text-xs transition-all border ${
                            consents[i]
                              ? 'bg-emerald-50 border-emerald-300'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              consents[i] ? 'bg-emerald-500' : 'bg-slate-200'
                            }`}>
                              {consents[i] && <CheckCircle className="w-3 h-3 text-white" />}
                            </div>
                            <span className="text-slate-700">{text}</span>
                          </div>
                        </button>
                      ))}

                      <div className="pt-2">
                        <Progress value={(consents.filter(Boolean).length / 3) * 100} className="h-1.5 mb-2" />
                        <button
                          onClick={handleConsentsSubmit}
                          disabled={!consents.every(Boolean)}
                          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
                            consents.every(Boolean)
                              ? 'bg-teal-600 text-white hover:bg-teal-700'
                              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          {consents.every(Boolean) ? 'Continue' : `Check all 3 consents (${consents.filter(Boolean).length}/3)`}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* CDP Stage */}
                  {stage === 'cdp' && (
                    <div className="space-y-3 pt-8 animate-fade-in text-center">
                      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                        <Zap className="w-8 h-8 text-indigo-600 animate-pulse" />
                      </div>
                      <p className="text-sm font-bold text-slate-900">Building Your Profile...</p>
                      <p className="text-xs text-slate-500">Data flowing through CDP pipeline</p>
                      <Progress value={cdpProgress} className="h-2" />
                      <div className="space-y-1.5 text-left pt-2">
                        {[
                          { label: 'Identity Resolution', at: 20 },
                          { label: 'Enrichment', at: 40 },
                          { label: 'Segmentation', at: 60 },
                          { label: 'Scoring', at: 80 },
                          { label: 'Profile Ready', at: 100 },
                        ].map((step) => (
                          <div key={step.label} className={`flex items-center gap-2 text-xs transition-all ${cdpProgress >= step.at ? 'text-slate-700' : 'text-slate-300'}`}>
                            <CheckCircle className={`w-3 h-3 ${cdpProgress >= step.at ? 'text-teal-500' : 'text-slate-200'}`} />
                            {step.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Profile Stage */}
                  {stage === 'profile' && (
                    <div className="space-y-3 pt-2 animate-fade-in">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <User className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-sm font-bold text-slate-900">AI Profile Complete</p>
                        <p className="text-xs text-slate-500">Sarah Mokoena — 87/100</p>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {['Festival-Goer', 'BBQ-Enthusiast', 'Sports Fan', 'Mobile-First', 'High-Intent', 'In-Store'].map(tag => (
                            <Badge key={tag} variant="secondary" className="text-[10px] bg-indigo-100 text-indigo-700">{tag}</Badge>
                          ))}
                        </div>

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

                      <div className="bg-indigo-50 p-3 rounded-xl">
                        <p className="text-xs text-indigo-800">
                          <Zap className="w-3 h-3 inline mr-1" />
                          <strong>AI Recommendation:</strong> Assign to David Mokoena (Soweto promoter) within 2 hours. Offer VIP festival ticket + meet-greet.
                        </p>
                      </div>

                      <Link to="/dashboard">
                        <button className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                          <BarChart3 className="w-4 h-4" /> View in Dashboard
                        </button>
                      </Link>
                    </div>
                  )}
                </div>

                <div className="flex justify-center py-2">
                  <div className="w-28 h-1 bg-slate-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-5">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {stages[currentIndex].label}
              </h3>
              <p className="text-sm text-slate-500">
                {stage === 'scan' && 'The consumer scans a QR code printed on Castle Light packaging, in-store displays, or promotional materials. Each QR is uniquely tracked by location and campaign.'}
                {stage === 'game' && 'Gamification increases engagement by 340%. Choose from Quiz (knowledge-based), Spin Wheel (chance-based), or Scratch Card (instant reveal). All games collect behavioral data.'}
                {stage === 'consent' && 'POPIA requires explicit consent for data processing. Our 3-check system ensures full compliance: data collection, marketing communications, and right to deletion.'}
                {stage === 'cdp' && 'The Customer Data Platform processes the lead through 5 stages: Identity Resolution (merge profiles), Enrichment (add behavioral data), Segmentation (assign persona), Scoring (AI prediction), and Profile Activation.'}
                {stage === 'profile' && 'Within 90 seconds of the QR scan, a complete 360-degree customer profile is built with AI-generated tags, behavioral signals, and a recommended action for the promoter.'}
              </p>
            </CardContent>
          </Card>

          {stage === 'game' && (
            <Card className="border-slate-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-slate-900 text-sm mb-3">Why Gamification Works</h4>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Engagement', value: '+340%', color: 'text-indigo-600' },
                    { label: 'Completion', value: '94%', color: 'text-teal-600' },
                    { label: 'Data Quality', value: 'High', color: 'text-amber-600' },
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

          {stage === 'cdp' && (
            <Card className="border-slate-200">
              <CardContent className="p-4 space-y-2">
                <h4 className="font-semibold text-slate-900 text-sm">CDP Pipeline Steps</h4>
                {[
                  { icon: User, label: 'Identity Resolution', desc: 'Match phone/email to existing profiles' },
                  { icon: Sparkles, label: 'Enrichment', desc: 'Add game behavior, location, time data' },
                  { icon: Target, label: 'Segmentation', desc: 'Assign to persona cluster' },
                  { icon: BarChart3, label: 'Scoring', desc: 'AI predicts conversion probability' },
                  { icon: Zap, label: 'Activation', desc: 'Push to CRM, assign promoter' },
                ].map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.label} className={`flex items-center gap-3 p-2 rounded-lg transition-all ${cdpProgress >= (i + 1) * 20 ? 'bg-indigo-50' : 'bg-slate-50'}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cdpProgress >= (i + 1) * 20 ? 'bg-indigo-500' : 'bg-slate-200'}`}>
                        <Icon className={`w-4 h-4 ${cdpProgress >= (i + 1) * 20 ? 'text-white' : 'text-slate-400'}`} />
                      </div>
                      <div>
                        <p className={`text-xs font-semibold ${cdpProgress >= (i + 1) * 20 ? 'text-indigo-900' : 'text-slate-500'}`}>{step.label}</p>
                        <p className="text-[10px] text-slate-500">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {/* Nav buttons */}
          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" onClick={() => {
              const prev = stages[currentIndex - 1];
              if (prev) setStage(prev.id);
            }} disabled={currentIndex === 0} className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Previous
            </Button>
            {stage !== 'profile' && stage !== 'game' && stage !== 'consent' && stage !== 'cdp' && (
              <Button onClick={() => {
                const next = stages[currentIndex + 1];
                if (next) setStage(next.id);
              }} className="gap-2 gradient-indigo hover:opacity-90">
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
