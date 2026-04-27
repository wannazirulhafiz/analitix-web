import React, { useState, useEffect, useRef } from 'react';
import { Radio, Facebook, Instagram, Lock, Globe } from 'lucide-react';

// Matrix Rain Component
const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(26, 26, 26, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      
      const colors = [
        { r: 34, g: 197, b: 94 },
        { r: 255, g: 255, b: 255 },
      ];

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const opacity = Math.random() * 0.5 + 0.1;
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-30"
      style={{ background: 'transparent' }}
    />
  );
};

// Typing Animation Component
const TypingText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayText('');
        setIndex(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default function AnalitixLanding() {
  const [scanPosition, setScanPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPosition((prev) => (prev >= 110 ? -10 : prev + 0.5));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>
      <MatrixRain />
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-3 bg-white rounded-lg px-5 py-3 shadow-lg">
          <Radio className="w-7 h-7 text-fuchsia-500" />
          <span className="text-3xl font-black tracking-tight text-slate-800">
            ANALITIX
          </span>
        </div>
      </div>

      <div className="w-full max-w-2xl p-[2px] rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
        <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-slate-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm text-slate-400">Terminal</span>
          <div className="w-12"></div>
        </div>

        <div className="p-8 font-mono text-sm space-y-6">
          <div className="text-green-400">$ <TypingText text="./crawl-social.sh" /></div>

          <div className="flex justify-center">
            <div className="border border-amber-600 px-8 py-2">
              <span className="text-amber-500 tracking-widest text-xs">SOCIAL MEDIA CRAWLER</span>
            </div>
          </div>

          <div className="text-center">
            <span className="text-green-400 text-xl tracking-wider">&gt;&gt;&gt; DATA CAPTURED! &lt;&lt;&lt;</span>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-lg blur-md opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white px-8 py-3 rounded-lg font-bold text-lg">
                [ Social Listening Insights ]
              </div>
            </div>
          </div>

          <div className="text-center space-y-1 text-slate-300">
            <div>Automated crawling & indexing across</div>
            <div className="text-fuchsia-400 font-bold">Malaysian Social Media Platforms</div>
          </div>

          <div className="text-center text-slate-500 text-xs tracking-wider">
            Status: <span className="text-green-400">LIVE</span> ✓ | Region: Malaysia | 2026
          </div>
        </div>
        </div>
      </div>

      <div className="mt-16 flex items-center justify-center gap-4">
        <div className="animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>
          <div className="bg-red-600 p-3 rounded-xl shadow-lg">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
        </div>

        <div className="animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '2.2s' }}>
          <div className="bg-black p-3 rounded-xl shadow-lg border border-slate-700">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </div>
        </div>

        <div className="animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '2.4s' }}>
          <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
            <Facebook className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '2.6s' }}>
          <div className="bg-cyan-500 p-3 rounded-xl shadow-lg">
            <Globe className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '2.8s' }}>
          <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-3 rounded-xl shadow-lg">
            <Instagram className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.2s' }}>
          <div className="bg-orange-500 p-3 rounded-xl shadow-lg">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
            </svg>
          </div>
        </div>

        <div className="animate-bounce" style={{ animationDelay: '1.2s', animationDuration: '2s' }}>
          <div className="bg-black p-3 rounded-xl shadow-lg border border-slate-700">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-16 w-full max-w-2xl p-[2px] rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500">
        <div className="bg-neutral-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="px-4 py-3 flex items-center border-b border-slate-700/50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-600 animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-slate-600 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <div className="flex items-center gap-2 mx-auto text-slate-400 text-sm">
              <Lock className="w-3 h-3" />
              <span>social media</span>
              <span className="text-green-400 text-xs animate-pulse">● LIVE</span>
            </div>
            <div className="text-xs text-cyan-400 font-mono">
              <span className="animate-pulse">{scanPosition > 50 ? '2,847' : '1,293'}</span> posts
            </div>
          </div>

          <div className="p-6 space-y-5 relative overflow-hidden">
            <div 
              className="absolute top-0 bottom-0 w-1 bg-blue-500 pointer-events-none z-20"
              style={{ 
                left: `${scanPosition}%`,
                boxShadow: '0 0 20px 5px rgba(59, 130, 246, 0.5)'
              }}
            />

            <div className="flex gap-4 items-start">
              <div className="w-28 h-20 bg-slate-700/80 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 space-y-2 pt-1">
                <div className="h-3 bg-slate-600 rounded w-3/4"></div>
                <div className="h-3 bg-slate-600 rounded w-1/2"></div>
                <div className="h-6 bg-blue-500 rounded w-16 mt-3"></div>
              </div>
              <div className="flex-shrink-0">
                <div className="h-8 bg-slate-600 rounded w-16"></div>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-20 h-16 bg-slate-700/80 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 space-y-2 pt-1">
                <div className="h-2 bg-slate-600 rounded w-2/3"></div>
                <div className="h-5 bg-blue-500 rounded w-14 mt-2"></div>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-20 h-16 bg-slate-700/80 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 space-y-2 pt-1">
                <div className="h-2 bg-slate-600 rounded w-3/4"></div>
                <div className="h-2 bg-slate-600 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-slate-600"></div>
          <span className="text-slate-500 text-sm">Developed by</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-slate-600"></div>
        </div>
        <div className="text-xl font-bold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
          Analitika
        </div>
        <p className="text-slate-600 text-xs">© 2026 All Rights Reserved</p>
      </div>
      </div>
    </div>
  );
}
