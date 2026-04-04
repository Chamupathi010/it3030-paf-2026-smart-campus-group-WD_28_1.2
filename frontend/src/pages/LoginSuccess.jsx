import { useState, useEffect } from "react"; //remove afrer implementing dashboard

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@300;400&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #0a0a0f;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Mono', monospace;
    overflow: hidden;
  }

  .bg {
    position: fixed;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, #1a1040 0%, #0a0a0f 70%);
    z-index: 0;
  }

  .grid {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(100,80,255,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(100,80,255,0.06) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 0;
    animation: gridFade 1.2s ease forwards;
  }

  @keyframes gridFade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .glow-orb {
    position: fixed;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(100,60,255,0.18) 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
    z-index: 0;
    animation: pulse 4s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: translate(-50%, -55%) scale(1); opacity: 0.8; }
    50%       { transform: translate(-50%, -55%) scale(1.1); opacity: 1; }
  }

  .card {
    position: relative;
    z-index: 1;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    padding: 56px 64px;
    width: 480px;
    text-align: center;
    backdrop-filter: blur(20px);
    box-shadow:
      0 0 0 1px rgba(100,80,255,0.1),
      0 40px 80px rgba(0,0,0,0.5),
      inset 0 1px 0 rgba(255,255,255,0.06);
    animation: cardIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
    transform: translateY(30px) scale(0.96);
  }

  @keyframes cardIn {
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .icon-wrap {
    width: 72px;
    height: 72px;
    margin: 0 auto 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6440ff 0%, #a78bfa 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 40px rgba(100,64,255,0.5);
    animation: iconPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s both;
    transform: scale(0);
  }

  @keyframes iconPop {
    to { transform: scale(1); }
  }

  .icon-wrap svg {
    width: 32px;
    height: 32px;
    stroke: #fff;
    stroke-width: 2.5;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .checkmark {
    stroke-dasharray: 40;
    stroke-dashoffset: 40;
    animation: drawCheck 0.5s ease 0.9s forwards;
  }

  @keyframes drawCheck {
    to { stroke-dashoffset: 0; }
  }

  .tag {
    display: inline-block;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #a78bfa;
    background: rgba(167,139,250,0.1);
    border: 1px solid rgba(167,139,250,0.2);
    border-radius: 20px;
    padding: 4px 14px;
    margin-bottom: 20px;
    animation: fadeUp 0.6s ease 0.5s both;
    opacity: 0;
    transform: translateY(10px);
  }

  @keyframes fadeUp {
    to { opacity: 1; transform: translateY(0); }
  }

  h1 {
    font-family: 'Syne', sans-serif;
    font-size: 36px;
    font-weight: 800;
    color: #fff;
    line-height: 1.1;
    margin-bottom: 14px;
    animation: fadeUp 0.6s ease 0.6s both;
    opacity: 0;
    transform: translateY(10px);
  }

  h1 span {
    background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: 13px;
    color: rgba(255,255,255,0.4);
    line-height: 1.7;
    margin-bottom: 36px;
    animation: fadeUp 0.6s ease 0.7s both;
    opacity: 0;
    transform: translateY(10px);
  }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
    margin-bottom: 28px;
    animation: fadeUp 0.6s ease 0.75s both;
    opacity: 0;
  }

  .meta {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: rgba(255,255,255,0.25);
    letter-spacing: 0.05em;
    margin-bottom: 32px;
    animation: fadeUp 0.6s ease 0.8s both;
    opacity: 0;
    transform: translateY(10px);
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;
  }

  .meta-item:last-child { text-align: right; }

  .meta-label { font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.15); }
  .meta-value { color: rgba(255,255,255,0.45); }

  .btn {
    display: block;
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #6440ff 0%, #9b59ff 100%);
    color: #fff;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.08em;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    box-shadow: 0 8px 24px rgba(100,64,255,0.35);
    animation: fadeUp 0.6s ease 0.85s both;
    opacity: 0;
    transform: translateY(10px);
  }

  .btn:hover { opacity: 0.88; transform: translateY(-1px); }
  .btn:active { transform: scale(0.98); }

  .particles {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  .particle {
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: #a78bfa;
    opacity: 0;
    animation: float linear infinite;
  }

  @keyframes float {
    0%   { transform: translateY(100vh) scale(0); opacity: 0; }
    10%  { opacity: 0.6; }
    90%  { opacity: 0.3; }
    100% { transform: translateY(-10vh) scale(1); opacity: 0; }
  }
`;

function Particles() {
  return (
    <div className="particles">
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${6 + Math.random() * 8}s`,
            animationDelay: `${Math.random() * 6}s`,
            width: Math.random() > 0.5 ? "3px" : "2px",
            height: Math.random() > 0.5 ? "3px" : "2px",
            opacity: Math.random() * 0.5,
          }}
        />
      ))}
    </div>
  );
}

export default function LoginSuccess() {
  const [time] = useState(() =>
    new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  );
  const [date] = useState(() =>
    new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  );

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = style;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  return (
    <>
      <div className="bg" />
      <div className="grid" />
      <div className="glow-orb" />
      <Particles />

      <div className="card">
        <div className="icon-wrap">
          <svg viewBox="0 0 24 24">
            <polyline className="checkmark" points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div className="tag">Authenticated</div>

        <h1>
          Login <span>Successful</span>
        </h1>

        <p>
          You've been securely verified.<br />
          Welcome back — your session is now active.
        </p>

        <div className="divider" />

        <div className="meta">
          <div className="meta-item">
            <span className="meta-label">Session started</span>
            <span className="meta-value">{time}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Date</span>
            <span className="meta-value">{date}</span>
          </div>
        </div>

        <button className="btn">Continue to Dashboard →</button>
      </div>
    </>
  );
}
