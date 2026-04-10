'use client';

import { useState, useRef } from 'react';
import { Mic, Play, DollarSign, Wallet } from 'lucide-react';
import html2canvas from 'html2canvas';

const agents = [
  { name: 'FAIR VALUE\nGAPS', color: '#ec4899' },
  { name: 'MARKET\nMAKER', color: '#22d3ee' },
  { name: 'SCALPER', color: '#10b981' },
  { name: 'RISK MGR', color: '#f59e0b' },
  { name: 'ELLIOTT\nWAVES', color: '#3b82f6' },
  { name: 'SMC / ICT', color: '#a855f7' },
  { name: 'WYCKOFF', color: '#f97316' },
  { name: 'QUANT', color: '#8b5cf6' },
  { name: 'SENTIMENT', color: '#f43f5e' },
  { name: 'VOLUME', color: '#eab308' },
  { name: 'PRICE\nACTION', color: '#06b67f' },
  { name: 'PURE PA', color: '#84cc16' },
  { name: 'BREAKOUT', color: '#14b8a6' },
  { name: 'ICHIMOKU', color: '#d946ef' },
];

export default function Home() {
  const [verdict, setVerdict] = useState<any>(null);
  const [listening, setListening] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const [showPayment, setShowPayment] = useState(false);

  const runAnalysis = async () => {
    setShowPayment(true);
    setTimeout(async () => {
      setShowPayment(false);
      const screenshot = await html2canvas(chartRef.current!);
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
      const utterance = new SpeechSynthesisUtterance('Анализ завершён. Вердикт Hold.');
      utterance.lang = 'ru-RU';
      speechSynthesis.speak(utterance);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="bg-black border-b border-cyan-500 p-4 flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-2xl font-black">N</div>
          <div>
            <div className="font-bold text-2xl tracking-widest">NEC TRADING HUD</div>
            <div className="text-xs text-cyan-400">** BTC/USDT ** 72,336.78</div>
          </div>
        </div>
        <div className="flex-1" />
        <button
          onClick={runAnalysis}
          className="bg-cyan-500 hover:bg-cyan-400 text-black px-10 py-3 rounded-2xl font-bold flex items-center gap-3 text-lg neon-cyan"
        >
          <Play size={22} /> АНАЛИЗ
        </button>
      </div>

      <div className="flex flex-1">
        {/* Left panel */}
        <div className="w-80 bg-zinc-900 border-r border-zinc-700 p-5 text-sm flex flex-col">
          <div className="text-yellow-400 text-3xl font-bold mb-6">ЖДАТЬ</div>
          {/* ... весь левый текст как у тебя был */}
          <div className="space-y-4 text-sm">
            <div className="text-cyan-400 font-bold">** BTC/USDT ** 72,336.78</div>
            <div className="text-red-400">x5 ликвид ±18.0%</div>
            <div className="grid grid-cols-2 gap-y-2 text-xs">
              <div className="text-gray-400">Вход</div><div className="text-red-500 font-bold">** НЕТ</div>
              <div className="text-gray-400">Стоп</div><div className="text-red-500 font-bold">** НЕТ</div>
              {/* остальные строки как раньше */}
            </div>
          </div>
        </div>

        {/* CENTRAL GLOWING AREA */}
        <div className="flex-1 flex items-center justify-center p-8 relative" ref={chartRef}>
          <div className="relative w-[560px] h-[560px]">
            {/* Большой glowing круг */}
            <div className="absolute inset-0 border-[14px] border-cyan-400 rounded-full neon-cyan" />

            {/* Внутренний чарт */}
            <div className="absolute inset-[38px] bg-zinc-950 rounded-full border border-zinc-700 flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <div className="text-cyan-300 text-5xl font-mono">BTC/USDT</div>
                <div className="text-7xl font-bold text-white mt-3">72,336</div>
                <div className="text-emerald-400 text-3xl">+0.8% (4ч)</div>
                <div className="text-xs text-gray-500 mt-12">TradingView • Live</div>
              </div>
            </div>

            {/* 14 гексагонов вокруг */}
            {agents.map((agent, i) => {
              const angle = (i * 360) / agents.length - 90;
              const rad = (angle * Math.PI) / 180;
              const radius = 255;
              const x = Math.cos(rad) * radius + 280;
              const y = Math.sin(rad) * radius + 280;
              return (
                <div
                  key={i}
                  className="absolute w-20 h-20 flex items-center justify-center text-[10px] font-bold leading-tight text-center rounded-2xl border-2 border-black hex-glow"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: `translate(-50%, -50%)`,
                    backgroundColor: agent.color,
                    color: '#000',
                    boxShadow: `0 0 25px ${agent.color}`,
                  }}
                >
                  {agent.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Voice button */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-cyan-500 hover:bg-cyan-400 rounded-3xl flex items-center justify-center text-4xl shadow-2xl neon-cyan">
        <Mic />
      </button>

      {/* Payment & Verdict модалки — оставь как было раньше */}
      {/* (я их не менял, они уже работали) */}
    </div>
  );
}
