import React, { useState, useEffect } from 'react';

const C1 = '#00d4ff';
const C2 = '#7c3aff';
const C3 = '#d400ff';

function gradientCSS(deg = 135) {
  return `linear-gradient(${deg}deg, ${C1}, ${C2}, ${C3})`;
}
function gradientText() {
  return { background: gradientCSS(), WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' };
}

// ─── Logo ──────────────────────────────────────────────────────────────────
function Logo({ size = 24 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width={size + 4} height={size + 4} viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="6" stroke={C1} strokeWidth="2"/>
        <circle cx="14" cy="14" r="10" stroke={C1} strokeWidth="1" strokeDasharray="4 3" opacity="0.5"/>
        <circle cx="14" cy="14" r="3" fill={C3} opacity="0.8"/>
        <path d="M14 4 L14 8 M14 20 L14 24 M4 14 L8 14 M20 14 L24 14" stroke={C1} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: size, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <span style={gradientText()}>ANALITIX</span>
      </span>
    </div>
  );
}

// ─── Nav ───────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 48px', height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(10,11,15,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,212,255,0.1)' : '1px solid transparent',
      transition: 'all 0.3s',
    }}>
      <Logo size={18} />
      <div style={{ display: 'flex', gap: 32 }}>
        {['Features', 'Platforms', 'Pricing', 'Docs'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} style={{
            fontFamily: "'Inter',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.5)',
            textDecoration: 'none', letterSpacing: '0.02em', transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.target.style.color = '#fff'}
          onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
          >{item}</a>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button style={{
          background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.6)', padding: '7px 18px', borderRadius: 6,
          fontSize: 13, cursor: 'pointer', fontFamily: "'Inter',sans-serif", transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.target.style.borderColor = 'rgba(0,212,255,0.4)'; e.target.style.color = '#fff'; }}
        onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.color = 'rgba(255,255,255,0.6)'; }}
        >Sign in</button>
        <button style={{
          background: gradientCSS(), border: 'none', color: '#fff',
          padding: '7px 20px', borderRadius: 6, fontSize: 13, fontWeight: 600,
          cursor: 'pointer', fontFamily: "'Inter',sans-serif", letterSpacing: '0.03em', transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => e.target.style.opacity = '0.85'}
        onMouseLeave={e => e.target.style.opacity = '1'}
        >Get Access</button>
      </div>
    </nav>
  );
}

// ─── Terminal Window ────────────────────────────────────────────────────────
function TerminalWindow({ children, title = 'Terminal', liveCount }) {
  return (
    <div className="gradient-border" style={{ display: 'inline-block', width: '100%' }}>
      <div className="gradient-border-inner">
        <div style={{
          padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.03)', borderRadius: '11px 11px 0 0',
        }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {['#ff5f57', '#febc2e', '#28c840'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{title}</span>
          {liveCount !== undefined ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ position: 'relative', width: 8, height: 8 }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#28c840', animation: 'ping 1.5s infinite' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
              </div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#28c840' }}>LIVE</span>
              {liveCount && <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginLeft: 8 }}>{liveCount.toLocaleString()} posts</span>}
            </div>
          ) : <div style={{ width: 40 }} />}
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Animated terminal typing ───────────────────────────────────────────────
function TerminalHero() {
  const [lines, setLines] = useState([]);
  const [cursor, setCursor] = useState(true);
  const allLines = [
    { type: 'cmd',  text: '$ ./analitix --mode=whitelist --region=malaysia' },
    { type: 'info', text: '[*] Initializing whitelisted account monitor...' },
    { type: 'info', text: '[*] Loading whitelisted accounts across 3 platforms...' },
    { type: 'ok',   text: '[✓] 1,240 whitelisted accounts loaded & active' },
    { type: 'info', text: '[*] Streaming posts from monitored accounts...' },
    { type: 'data', text: '>>> DATA CAPTURED! <<<' },
    { type: 'ok',   text: '[✓] Captured 1,293 new posts from whitelisted accounts' },
    { type: 'btn',  text: '[ Social Listening Insights ]' },
    { type: 'sub',  text: 'Whitelisted account monitoring across Malaysian Social Media Platforms' },
    { type: 'stat', text: 'Status: LIVE ✓  |  Region: Malaysia  |  2026' },
  ];

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      const item = allLines[i];
      if (i < allLines.length && item) {
        setLines(prev => [...prev, item]);
        i++;
      } else {
        clearInterval(t);
      }
    }, 280);
    const c = setInterval(() => setCursor(v => !v), 500);
    return () => { clearInterval(t); clearInterval(c); };
  }, []);

  const colorFor = (type) => {
    if (type === 'cmd')  return '#00ff88';
    if (type === 'ok')   return '#00d4ff';
    if (type === 'data') return '#fff';
    if (type === 'stat') return 'rgba(255,255,255,0.3)';
    if (type === 'sub')  return 'rgba(255,255,255,0.6)';
    return 'rgba(255,255,255,0.5)';
  };

  return (
    <TerminalWindow title="Terminal">
      <div style={{ padding: '24px 28px', minHeight: 320, fontFamily: 'var(--mono)', fontSize: 13, lineHeight: 2 }}>
        {lines.filter(Boolean).map((line, i) => (
          <div key={i} style={{ color: colorFor(line.type) }}>
            {line.type === 'btn' ? (
              <div style={{
                display: 'inline-block', padding: '8px 32px', margin: '8px 0',
                background: gradientCSS(), borderRadius: 6, color: '#fff',
                fontWeight: 700, fontSize: 14, letterSpacing: '0.04em',
                boxShadow: `0 0 24px ${C1}44`,
              }}>{line.text}</div>
            ) : line.type === 'data' ? (
              <span style={{ fontWeight: 700, fontSize: 15, ...gradientText() }}>{line.text}</span>
            ) : line.type === 'sub' ? (
              <div style={{ marginTop: 4, color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>
                {line.text.replace('Malaysian Social Media Platforms', '').trim()}{' '}
                <span style={{ color: C1 }}>Malaysian Social Media Platforms</span>
              </div>
            ) : (
              <span>{line.text}</span>
            )}
          </div>
        ))}
        {lines.length < allLines.length && (
          <span style={{ color: '#00ff88' }}>{cursor ? '█' : ' '}</span>
        )}
      </div>
    </TerminalWindow>
  );
}

// ─── Platform icons ─────────────────────────────────────────────────────────
const PLATFORMS = [
  { name: 'YouTube',   bg: '#ff0000',  icon: <svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.2 2.8 12 2.8 12 2.8s-4.2 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.6 21.8 12 21.8 12 21.8s4.2 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z"/></svg> },
  { name: 'TikTok',    bg: '#010101',  icon: <svg viewBox="0 0 24 24" fill="white" width="18" height="18"><path d="M19.6 3.3A4.5 4.5 0 0115 0h-3.3v16.4a2.7 2.7 0 01-2.7 2.5 2.7 2.7 0 01-2.7-2.7 2.7 2.7 0 012.7-2.7c.3 0 .5 0 .8.1V10c-.3 0-.5-.1-.8-.1a6 6 0 00-6 6 6 6 0 006 6 6 6 0 006-6V8.2a7.8 7.8 0 004.6 1.5V6.4a4.5 4.5 0 01-2.7-3.1z"/></svg> },
  { name: 'Facebook',  bg: '#1877f2',  icon: <svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z"/></svg> },
  { name: 'Web',       bg: '#0099cc',  icon: <svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg> },
  { name: 'Instagram', bg: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', icon: <svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
  { name: 'Reddit',    bg: '#ff4500',  icon: <svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg> },
  { name: 'X',         bg: '#000',     icon: <svg viewBox="0 0 24 24" fill="white" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
];

// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      minHeight: '100vh', padding: '100px 48px 80px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 500, height: 200, borderRadius: '50%',
        background: `radial-gradient(ellipse, ${C1}18 0%, transparent 70%)`,
        filter: 'blur(30px)', pointerEvents: 'none',
      }} />

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28,
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,212,255,0.2)',
        borderRadius: 100, padding: '5px 14px',
        fontFamily: 'var(--mono)', fontSize: 11,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', display: 'inline-block', animation: 'blink 1s infinite' }} />
        <span style={{ color: 'rgba(255,255,255,0.5)' }}>STATUS: <span style={{ color: '#00ff88' }}>ONLINE</span> — MONITORING WHITELISTED ACCOUNTS</span>
      </div>

      <div style={{ marginBottom: 24 }}>
        <Logo size={52} />
      </div>

      <p style={{
        fontFamily: "'Inter',sans-serif", fontSize: 18, fontWeight: 300, lineHeight: 1.7,
        color: 'rgba(255,255,255,0.55)', textAlign: 'center',
        maxWidth: 540, marginBottom: 48,
      }}>
        Whitelisted account monitoring & indexing — built exclusively for{' '}
        <span style={{ color: C1 }}>Malaysian social media</span>.
      </p>

      <div style={{ width: '100%', maxWidth: 620, marginBottom: 48 }}>
        <TerminalHero />
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {PLATFORMS.map(p => (
          <div key={p.name} title={p.name} style={{
            width: 44, height: 44, borderRadius: 12,
            background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 2px 12px rgba(0,0,0,0.4)', flexShrink: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,212,255,0.3)`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.4)'; }}
          >{p.icon}</div>
        ))}
      </div>
    </section>
  );
}

// ─── Live Feed ──────────────────────────────────────────────────────────────
function LiveFeed() {
  const [count, setCount] = useState(1293);
  useEffect(() => {
    const t = setInterval(() => setCount(v => v + Math.floor(Math.random() * 3) + 1), 2000);
    return () => clearInterval(t);
  }, []);

  const posts = [
    { platform: 'Facebook', handle: '@kedaiKLcentral',   time: '2s ago',  sentiment: 'positive', text: 'Produk ni memang terbaik! Dah order 3 kali...', img: true },
    { platform: 'X',        handle: '@techMY_update',    time: '5s ago',  sentiment: 'neutral',  text: 'Apa pendapat korang pasal update terbaru?',    img: false },
    { platform: 'TikTok',   handle: '@nasi_lemak_vibes', time: '12s ago', sentiment: 'positive', text: '#fyp #malaysia viral raya content 🎉',          img: true },
    { platform: 'Reddit',   handle: 'r/malaysia',        time: '28s ago', sentiment: 'negative', text: 'Why is this service so slow in Sabah??',        img: false },
  ];
  const sentColors = { positive: '#00ff88', neutral: '#00d4ff', negative: '#ff2d78' };

  return (
    <section id="features" style={{ padding: '80px 48px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', color: C1, marginBottom: 14 }}>// LIVE INTELLIGENCE</div>
          <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 'clamp(26px,3.5vw,44px)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Monitor your whitelisted accounts —{' '}
            <span style={gradientText()}>in real time</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 24, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Posts captured (daily)', value: '9,000+', color: C1 },
              { label: 'Platforms monitored',    value: '3',       color: '#00ff88' },
              { label: 'Snapshots per day',      value: '3–4×',    color: C2 },
            ].map(stat => (
              <div key={stat.label} style={{
                background: 'var(--bg2)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 10, padding: '16px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{stat.label}</span>
                <span style={{ fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 22, color: stat.color }}>{stat.value}</span>
              </div>
            ))}
          </div>

          <TerminalWindow title="social media" liveCount={count}>
            <div>
              {posts.map((post, i) => (
                <div key={i} style={{
                  padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  transition: 'background 0.2s', cursor: 'default',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: 8, flexShrink: 0,
                    background: 'rgba(255,255,255,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--mono)',
                  }}>{post.img ? '▣' : '◻'}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 500 }}>{post.handle}</span>
                      <span style={{
                        fontSize: 10, padding: '1px 6px', borderRadius: 3,
                        background: `${sentColors[post.sentiment]}18`,
                        color: sentColors[post.sentiment],
                        border: `1px solid ${sentColors[post.sentiment]}33`,
                        fontFamily: 'var(--mono)',
                      }}>{post.sentiment}</span>
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginLeft: 'auto', fontFamily: 'var(--mono)' }}>{post.time}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.text}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>{post.platform}</div>
                  </div>
                  <div style={{ width: 32, height: 22, borderRadius: 4, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </TerminalWindow>
        </div>
      </div>
    </section>
  );
}

// ─── Dashboard charts ────────────────────────────────────────────────────────
function MiniLineChart() {
  const d = "M0,60 C20,55 40,20 60,30 C80,40 100,10 120,15 C140,20 160,35 180,25 C200,15 220,30 240,20";
  return (
    <svg width="240" height="70" viewBox="0 0 240 70">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C1} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={C1} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={d + " L240,70 L0,70 Z"} fill="url(#lineGrad)"/>
      <path d={d} fill="none" stroke={C1} strokeWidth="2"
        style={{ strokeDasharray: 400, strokeDashoffset: 400, animation: 'line-draw 1.8s ease forwards 0.5s' }}
      />
    </svg>
  );
}

function BarChart() {
  const bars = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 72, 88];
  return (
    <svg width="240" height="80" viewBox="0 0 240 80">
      {bars.map((h, i) => (
        <rect key={i} x={i * 20 + 2} y={80 - h * 0.75} width="16" height={h * 0.75} rx="2"
          fill={C1} opacity={0.3 + (i / bars.length) * 0.5}
          style={{ transformOrigin: `${i * 20 + 10}px 80px`, transform: 'scaleY(0)', animation: `bar-grow 0.5s ease forwards ${0.3 + i * 0.06}s` }}
        />
      ))}
    </svg>
  );
}

// ─── Dashboard Mockup ────────────────────────────────────────────────────────
function DashboardMockup() {
  const metrics = [
    { label: 'Total Posts',      value: '9,241',  change: '+12.5%' },
    { label: 'Accounts Tracked', value: '1,240',  change: '+3' },
    { label: 'Avg. Engagement',  value: '4.7%',   change: '+0.3%' },
    { label: 'Snapshots Today',  value: '3/4',    change: 'next in 2h' },
  ];
  return (
    <div style={{
      background: '#10131a', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 14, overflow: 'hidden', width: '100%',
      boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 60px ${C1}18`,
      fontFamily: "'Inter',sans-serif", fontSize: 12,
      animation: 'float 6s ease-in-out infinite',
    }}>
      <div style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>analitix.my — Dashboard</span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#28c840', animation: 'blink 2s infinite' }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#28c840' }}>LIVE</span>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: 130, borderRight: '1px solid rgba(255,255,255,0.05)', padding: '14px 0', flexShrink: 0 }}>
          {['Overview', 'Posts', 'Accounts', 'Snapshots', 'Reports', 'Settings'].map((item, i) => (
            <div key={item} style={{
              padding: '8px 14px', fontSize: 11, cursor: 'pointer',
              color: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
              background: i === 0 ? `${C1}12` : 'transparent',
              borderLeft: i === 0 ? `2px solid ${C1}` : '2px solid transparent',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ opacity: 0.5, fontSize: 10 }}>{'◈▸◉◆▣⚙'[i]}</span>{item}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, padding: 14, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 12 }}>
            {metrics.map(m => (
              <div key={m.label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10, marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 15, color: 'rgba(255,255,255,0.9)', marginBottom: 2 }}>{m.value}</div>
                <div style={{ fontSize: 10, color: '#28c840' }}>{m.change}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 10 }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Post Volume Trend</span>
                <span style={{ color: C1, fontSize: 10, background: `${C1}15`, padding: '2px 6px', borderRadius: 4 }}>30d</span>
              </div>
              <MiniLineChart />
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ marginBottom: 8 }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>By Platform</span>
              </div>
              <BarChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard Section ────────────────────────────────────────────────────────
function DashboardSection() {
  return (
    <section style={{ padding: '80px 48px', background: 'var(--bg2)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', color: C1, marginBottom: 14 }}>// DASHBOARD</div>
          <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 'clamp(26px,3.5vw,44px)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Everything in one <span style={gradientText()}>view</span>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', marginTop: 14, maxWidth: 440, margin: '14px auto 0' }}>
            Track post volume, account activity, and snapshot schedules from a single clean dashboard.
          </p>
        </div>
        <DashboardMockup />
      </div>
    </section>
  );
}

// ─── Features ──────────────────────────────────────────────────────────────
function FeatureCard({ f }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '36px 32px', border: '1px solid rgba(255,255,255,0.06)',
        background: hov ? 'rgba(255,255,255,0.02)' : 'transparent',
        transition: 'background 0.2s', position: 'relative', overflow: 'hidden',
      }}>
      {hov && <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${C1}10, transparent 70%)`, pointerEvents: 'none' }} />}
      <div style={{
        width: 36, height: 36, borderRadius: 8, marginBottom: 18,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `${C1}15`, color: C1, fontSize: 16,
        border: `1px solid ${C1}25`, fontFamily: 'var(--mono)',
      }}>{f.icon}</div>
      <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 10, letterSpacing: '-0.01em' }}>{f.title}</h3>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 16 }}>{f.desc}</p>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C1, background: `${C1}12`, padding: '3px 8px', borderRadius: 4, border: `1px solid ${C1}25` }}>{f.tag}</span>
    </div>
  );
}

function Features() {
  const feats = [
    { icon: '◈', title: 'Whitelisted Account Monitoring', desc: 'You define the accounts — we monitor them. Add any YouTube, TikTok, or Facebook account to your whitelist and get every post indexed automatically.', tag: '3 platforms' },
    { icon: '◆', title: 'Influencer Intelligence', desc: 'Automatically identify and rank Malaysian KOLs by reach, engagement quality, and audience authenticity across all platforms.', tag: 'KOL scoring' },
    { icon: '⬡', title: 'PDPA Compliant', desc: 'All data is processed and stored on Malaysian infrastructure. Personal data handling follows PDPA 2010 requirements by design.', tag: 'PDPA 2010' },
  ];
  return (
    <section style={{ padding: '80px 48px', background: 'var(--bg2)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', color: C1, marginBottom: 14 }}>// CAPABILITIES</div>
          <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 'clamp(26px,3.5vw,44px)', letterSpacing: '-0.02em' }}>
            Everything you need to<br /><span style={gradientText()}>listen at scale</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1 }}>
          {feats.map((f, i) => <FeatureCard key={i} f={f} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ───────────────────────────────────────────────────────────────
function Pricing() {
  const [annual, setAnnual] = useState(true);
  const plans = [
    {
      name: 'STARTER', price: annual ? 'RM 299' : 'RM 359',
      desc: 'For individuals & small teams exploring social listening.',
      features: ['3 platforms', 'Your own whitelisted accounts', '3 snapshots per post', '3 day data retention'],
      cta: 'Start 7-day free trial', hot: false,
    },
    {
      name: 'BUSINESS', price: annual ? 'RM 999' : 'RM 1,199',
      desc: 'For marketing teams that need deeper competitive intelligence.',
      features: ['6 platforms', 'Your own whitelisted accounts', 'Access to our curated account list', '6 snapshots per post', '7 day data retention'],
      cta: 'Start 7-day free trial', hot: true,
    },
    {
      name: 'ENTERPRISE', price: 'Custom',
      desc: 'For large brands, agencies & government bodies with custom requirements.',
      features: ['Custom platforms', 'Your own whitelisted accounts', 'Access to our curated account list', 'Custom snapshots per post', 'Custom data retention', 'Dedicated support'],
      cta: 'Contact us', hot: false,
    },
  ];
  return (
    <section id="pricing" style={{ padding: '80px 48px', background: 'var(--bg)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', color: C1, marginBottom: 14 }}>// PRICING</div>
          <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 'clamp(26px,3.5vw,44px)', letterSpacing: '-0.02em', marginBottom: 24 }}>Simple, transparent pricing</h2>
          <div style={{ display: 'inline-flex', background: 'var(--bg2)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 100, padding: '4px 6px' }}>
            {['Monthly', 'Annual'].map(opt => (
              <button key={opt} onClick={() => setAnnual(opt === 'Annual')} style={{
                padding: '6px 18px', borderRadius: 100, border: 'none', cursor: 'pointer',
                fontSize: 13, fontFamily: "'Inter',sans-serif",
                background: (opt === 'Annual') === annual ? 'var(--bg3)' : 'transparent',
                color: (opt === 'Annual') === annual ? '#fff' : 'rgba(255,255,255,0.4)',
                transition: 'all 0.2s',
              }}>
                {opt} {opt === 'Annual' && <span style={{ color: C1, fontSize: 11, marginLeft: 3 }}>−17%</span>}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden' }}>
          {plans.map((p, i) => (
            <div key={i} style={{
              padding: '36px 28px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              background: p.hot ? `linear-gradient(180deg, ${C1}0a 0%, var(--bg3) 100%)` : 'var(--bg3)',
              position: 'relative', display: 'flex', flexDirection: 'column',
            }}>
              {p.hot && (
                <div style={{
                  position: 'absolute', top: 14, right: 14, background: gradientCSS(),
                  fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
                  padding: '3px 8px', borderRadius: 4, color: '#fff', fontFamily: 'var(--mono)',
                }}>POPULAR</div>
              )}
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>{p.name}</div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 34, letterSpacing: '-0.03em', marginBottom: 6 }}>{p.price}</div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 24, lineHeight: 1.5 }}>{p.desc}</p>
              <div style={{ marginBottom: 24, flex: 1 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 9, fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--mono)' }}>
                    <span style={{ color: C1, fontSize: 10 }}>›</span> {f}
                  </div>
                ))}
              </div>
              <button style={{
                width: '100%', padding: '11px',
                background: p.hot ? gradientCSS() : 'transparent',
                border: p.hot ? 'none' : '1px solid rgba(255,255,255,0.12)',
                color: '#fff', borderRadius: 7, fontSize: 13, cursor: 'pointer',
                fontFamily: "'Inter',sans-serif", fontWeight: 500, transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.target.style.opacity = '0.8'}
              onMouseLeave={e => e.target.style.opacity = '1'}
              >{p.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ───────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section style={{ padding: '80px 48px', position: 'relative', overflow: 'hidden', background: 'var(--bg2)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 200, background: `radial-gradient(ellipse, ${C1}1a, transparent 70%)`, filter: 'blur(20px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', color: C1, marginBottom: 16 }}>// START LISTENING</div>
        <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 'clamp(26px,4vw,48px)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}>
          Ready to hear <span style={gradientText()}>Malaysia's voice</span>?
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, marginBottom: 36 }}>
          Get started in minutes. No credit card required. 7-day free trial.
        </p>
        <button style={{
          background: gradientCSS(), border: 'none', color: '#fff',
          padding: '14px 32px', borderRadius: 8, fontSize: 14, fontWeight: 600,
          cursor: 'pointer', fontFamily: "'Inter',sans-serif",
          boxShadow: `0 8px 32px ${C1}33`, transition: 'all 0.2s', letterSpacing: '0.02em',
        }}
        onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; }}
        >Start 7-day free trial</button>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '48px 48px 28px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(3,1fr)', gap: 40, marginBottom: 40 }}>
          <div>
            <Logo size={18} />
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7, marginTop: 14, maxWidth: 210 }}>
              Social listening intelligence crafted for Malaysia's digital landscape.
            </p>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(255,255,255,0.2)', marginTop: 14 }}>
              Developed by <span style={{ color: C1 }}>Analitika</span><br />
              🇲🇾 Region: Malaysia | © 2026
            </div>
          </div>
          {[
            { title: 'Product', links: ['Features', 'Platforms', 'Pricing', 'API Docs', 'Status'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press', 'Contact'] },
            { title: 'Legal',   links: ['Privacy Policy', 'Terms', 'PDPA Notice', 'Security'] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>{col.title.toUpperCase()}</div>
              {col.links.map(l => (
                <a key={l} href="#" style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', marginBottom: 9, transition: 'color 0.2s' }}
                   onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.8)'}
                   onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
                >{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>$ analitix.my --version 2.0.1</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>Status: LIVE ✓</span>
        </div>
      </div>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div>
      <div className="matrix-bg" />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <Hero />
        <LiveFeed />
        <DashboardSection />
        <Features />
        <Pricing />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
