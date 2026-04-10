'use client';

import { useState, useRef } from 'react';
import { Mic, Play, DollarSign, Wallet } from 'lucide-react';
import html2canvas from 'html2canvas';

const agents = [
  { name: 'FAIR VALUE GAPS', color: 'pink' },
  { name: 'MARKET MAKER', color: 'cyan' },
  { name: 'SCALPER', color: 'emerald' },
  { name: 'RISK MGR', color: 'amber' },
  { name: 'ELLIO TT WAVES', color: 'blue' },
  { name: 'SMC / ICT', color: 'purple' },
  { name: 'WYCKOFF', color: 'orange' },
  { name: 'QUANT', color: 'violet' },
  { name: 'SENTIMENT', color: 'rose' },
  { name: 'VOLUME', color: 'yellow' },
  { name: 'PRICE ACTION', color: 'sky' },
  { name: 'PURE PA', color: 'lime' },
  { name: 'BREAKOUT', color: 'teal' },
  { name: 'ICHIMOKU', color: 'fuchsia' },
];

export default function Home() {
  const [verdict, setVerdict] = useState<any>(null);
  const [listening, setListening] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const [showPayment, setShowPayment] = useState(false);

  const recognition = typeof window !== 'undefined' && 'SpeechRecognition' in window 
    ? new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)() 
    : null;

  const startVoice = () => {
    if (!recognition) return alert('Голосовое управление работает только в Chrome');
    setListening(true);
    recognition.lang = 'ru-RU';
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript.toLowerCase();
      if (text.includes('анализ') || text.includes('запустить')) runAnalysis();
    };
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  const captureChart = async () => {
    if (!chartRef.current) return null;
    const canvas = await html2canvas(chartRef.current);
    return canvas.toDataURL('image/png');
  };

  const runAnalysis = async () => {
    setShowPayment(true);
    // После оплаты (симуляция)
    setTimeout(async () => {
      setShowPayment(false);
      const screenshot = await captureChart();
      
      // Заглушка мульти-агентного анализа (можно заменить на реальный вызов Anthropic)
      setVerdict({
        verdict: 'Hold',
        entry: '72,336',
        stop: '71,900',
        tp1: '73,000',
        tp2: '74,200',
        rr: '1:3.2',
        prob: '68%',
        reasons: 'Зона манипуляции + нет подтверждения от SMC и Wyckoff. Ждём возврата к 69k-70k.'
      });
      
      // Голосовой ответ
      const utterance = new SpeechSynthesisUtterance('Анализ завершён. Вердикт: Hold. Вход не рекомендуется.');
      utterance.lang = 'ru-RU';
      speechSynthesis.speak(utterance);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {/* Top bar */}
      <div className="bg-black border-b border-cyan-500 p-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">N</div>
          <span className="font-bold text-xl tracking-widest">NEC TRADING HUD</span>
        </div>
        <div className="flex-1 flex items-center gap-6 text-sm">
          <div><span className="text-cyan-400">** BTC/USDT **</span> <span className="font-mono text-xl">72,336.78</span></div>
          <div className="text-emerald-400">+18.0%</div>
        </div>
        <button 
          onClick={runAnalysis}
          className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-2 rounded-xl font-bold flex items-center gap-2 neon-cyan"
        >
          <Play size={18} /> АНАЛИЗ
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <div className="w-80 bg-zinc-900 border-r border-zinc-800 p-4 flex flex-col text-sm">
          <div className="text-yellow-400 font-bold text-2xl mb-4">ЖДАТЬ</div>
          <div className="space-y-6">
            <div>
              <div className="text-cyan-400">** BTC/USDT ** 72,336.78</div>
              <div className="text-red-500">x5 ликвид ±18.0%</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between"><span className="text-gray-400">Вход</span><span className="text-red-500 font-bold">** НЕТ</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Стоп</span><span className="text-red-500 font-bold">** НЕТ</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Цель 1</span><span className="text-red-500 font-bold">** НЕТ</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Цель 2</span><span className="text-red-500 font-bold">** НЕТ</span></div>
              <div className="flex justify-between"><span className="text-gray-400">R/R</span><span className="text-red-500 font-bold">** НЕТ</span></div>
            </div>

            <div className="bg-zinc-800 p-3 rounded-xl text-xs">
              <div className="text-orange-400">** 59,315 (SHORT) / 85,358 (LONG)</div>
              <div className="text-white">оба уровня внутри зоны манипуляции</div>
            </div>

            <div className="text-xs bg-red-950 border border-red-500 p-3 rounded-xl">
              Вход на текущем уровне гарантирует ликвидацию...
              <div className="text-red-400 mt-2">Торговля запрещена до смены структурного контекста.</div>
            </div>
          </div>
        </div>

        {/* Central area */}
        <div className="flex-1 flex items-center justify-center relative p-8" ref={chartRef}>
          {/* Glowing circle */}
          <div className="relative w-[520px] h-[520px]">
            {/* Circle */}
            <div className="absolute inset-0 border-8 border-cyan-400 rounded-full neon-cyan flex items-center justify-center">
              {/* TradingView Chart placeholder */}
              <div className="w-[420px] h-[420px] bg-zinc-950 rounded-full border border-zinc-700 flex items-center justify-center overflow-hidden relative">
                <div className="text-center">
                  <div className="text-4xl font-mono text-cyan-300">BTC/USDT</div>
                  <div className="text-7xl font-bold text-white mt-2">72,336</div>
                  <div className="text-emerald-400 text-2xl">+0.8% (4ч)</div>
                  <div className="mt-8 text-xs text-gray-500">TradingView • Live</div>
                  {/* Здесь можно вставить настоящий TradingView widget */}
                </div>
              </div>
            </div>

            {/* 14 hexagonal agents around the circle */}
            {agents.map((agent, i) => {
              const angle = (i * 360) / agents.length;
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * 240 + 260;
              const y = Math.sin(rad) * 240 + 260;
              return (
                <div
                  key={i}
                  className={`absolute w-16 h-16 flex items-center justify-center text-[10px] font-bold text-center leading-tight rounded-2xl border-2 border-transparent hex-glow`}
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: 'translate(-50%, -50%) rotate(30deg)',
                    backgroundColor: agent.color === 'pink' ? '#ec4899' : 
                                     agent.color === 'cyan' ? '#22d3ee' : '#a3e635',
                    color: 'black',
                  }}
                >
                  {agent.name}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right panel (orderbook placeholder) */}
        <div className="w-64 bg-zinc-900 border-l border-zinc-800 p-4 text-xs">
          <div className="font-bold mb-4">ORDERBOOK</div>
          <div className="space-y-1 text-emerald-400">79,000.00 ↑</div>
          {/* ... можно добавить больше строк */}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-black p-2 text-center text-xs text-gray-500 border-t border-zinc-800">
        TradingView • Анализ завершён ✓
      </div>

      {/* Voice button */}
      <button
        onClick={startVoice}
        className={`fixed bottom-8 right-8 w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-all ${listening ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'}`}
      >
        <Mic size={28} />
      </button>

      {/* Payment modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-8 rounded-3xl w-96">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><DollarSign /> Оплата анализа</h2>
            <p className="mb-8 text-gray-400">Стоимость: 5 USDT / 0.002 TON</p>
            
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => {}} className="border border-cyan-400 hover:bg-cyan-400/10 p-6 rounded-2xl flex flex-col items-center">
                <Wallet /> TON
              </button>
              <button onClick={() => {}} className="border border-emerald-400 hover:bg-emerald-400/10 p-6 rounded-2xl flex flex-col items-center">
                USDT
              </button>
            </div>
            
            <button 
              onClick={() => runAnalysis()} 
              className="mt-8 w-full bg-white text-black py-4 rounded-2xl font-bold"
            >
              Оплатить и запустить анализ
            </button>
          </div>
        </div>
      )}

      {/* Verdict modal */}
      {verdict && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50" onClick={() => setVerdict(null)}>
          <div className="bg-zinc-900 p-8 rounded-3xl max-w-md w-full mx-4">
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">ФИНАЛЬНЫЙ ВЕРДИКТ</h2>
            <div className="space-y-4 text-lg">
              <div>Вердикт: <span className="text-4xl font-bold">{verdict.verdict}</span></div>
              <div>Вход: <span className="font-mono">{verdict.entry}</span></div>
              <div>Стоп: <span className="font-mono">{verdict.stop}</span></div>
              <div>TP1: <span className="font-mono">{verdict.tp1}</span></div>
              <div>RR: <span className="font-mono">{verdict.rr}</span></div>
              <div>Вероятность: <span className="text-emerald-400">{verdict.prob}</span></div>
              <div className="text-sm mt-6">{verdict.reasons}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
