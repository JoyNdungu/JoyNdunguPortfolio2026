import { Link } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player'
import animationData from '../assets/animation.json'
import { useEffect, useState } from 'react'
import Shapes3D from '../components/Shapes3D'

function useTypingEffect(text, speed = 80) {
  const [displayed, setDisplayed] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    setDisplayed('')
    setDone(false)

    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1))
          i++
        } else {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
      return () => clearInterval(interval)
    }, 600)

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => {
      clearTimeout(startDelay)
      clearInterval(cursorInterval)
    }
  }, [text, speed])

  return { displayed, showCursor, done }
}

const marqueeTexts = [
  'Full Stack Developer & Graphic Designer',
  'A touch of GRANDEUR in every design',
  '404: Boring portfolio not found',
]

function Hero() {
  const { displayed, showCursor } = useTypingEffect('welcome to my world', 85)

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: '#0d0118',
      }}
    >
      <Shapes3D />

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }

        .hero-tag    { animation: heroFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both; }
        .hero-h1     { animation: heroFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both; }
        .hero-sub    { animation: heroFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both; }
        .hero-btns   { animation: heroFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.65s both; }
        .hero-lottie { animation: heroFadeIn 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both; }

        .btn-ghost {
          position: relative;
          padding: 14px 32px;
          font-family: Quicksand, sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #F5D5E0;
          border: 1px solid rgba(245,213,224,0.25);
          border-radius: 10px;
          overflow: hidden;
          text-decoration: none;
          text-align: center;
          transition: border-color 0.35s ease, transform 0.25s ease;
          display: inline-block;
        }
        .btn-ghost::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(245,213,224,0.04);
          transition: background 0.35s ease;
        }
        .btn-ghost:hover {
          border-color: rgba(245,213,224,0.5);
          transform: translateY(-2px);
        }
        .btn-ghost:hover::before { background: rgba(245,213,224,0.09); }

        .btn-solid {
          position: relative;
          padding: 14px 32px;
          font-family: Quicksand, sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #fff;
          border-radius: 10px;
          overflow: hidden;
          text-decoration: none;
          text-align: center;
          background: linear-gradient(135deg, #7B337E 0%, #6667AB 100%);
          transition: transform 0.25s ease, box-shadow 0.35s ease;
          display: inline-block;
        }
        .btn-solid::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #8a3d8e 0%, #7778bb 100%);
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .btn-solid:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(102,103,171,0.35);
        }
        .btn-solid:hover::before { opacity: 1; }
        .btn-solid span { position: relative; z-index: 1; }

        .hero-divider { animation: glowPulse 3s ease-in-out infinite; }

        @media (max-width: 1023px) {
          .hero-layout { flex-direction: column !important; align-items: center !important; }
          .hero-text   { max-width: 100% !important; text-align: center; }
          .hero-btns-wrap { justify-content: center !important; }
        }
        @media (max-width: 600px) {
          .hero-btns-wrap { flex-direction: column !important; width: 100%; }
          .btn-ghost, .btn-solid { width: 100%; }
        }
      `}</style>

      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 80% 60% at 50% 100%, rgba(123,51,126,0.2) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 90% 10%, rgba(102,103,171,0.1) 0%, transparent 50%)
        `,
      }} />

      {/* Marquee */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', overflow: 'hidden', paddingTop: '80px', paddingBottom: '4px' }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 18s linear infinite' }}>
          {[...Array(2)].map((_, outer) => (
            <div key={outer} style={{ display: 'flex', flexShrink: 0 }}>
              {marqueeTexts.map((text, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: '"Rubik Doodle Shadow", cursive',
                    fontSize: 'clamp(15px, 2vw, 20px)',
                    color: '#F5D5E0',
                    opacity: 0.75,
                    userSelect: 'none',
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    paddingRight: '80px',
                  }}
                >
                  {text} &nbsp;&nbsp;
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div
        className="hero-layout"
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(24px, 4vw, 48px) clamp(20px, 6vw, 96px)',
          gap: '24px',
        }}
      >
        {/* Left — Text */}
        <div className="hero-text" style={{ width: '100%', maxWidth: '520px' }}>

          {/* Typing tag */}
          <div className="hero-tag" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', height: '28px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(245,213,224,0.4)', flexShrink: 0 }} />
            <span style={{
              fontFamily: '"Dancing Script", cursive',
              color: 'rgba(245,213,224,0.55)',
              fontSize: 'clamp(14px, 1.5vw, 17px)',
              letterSpacing: '0.05em',
            }}>
              {displayed}
              <span style={{
                display: 'inline-block',
                width: '2px',
                height: '15px',
                background: '#F5D5E0',
                marginLeft: '2px',
                verticalAlign: 'middle',
                opacity: showCursor ? 1 : 0,
                transition: 'opacity 0.12s',
              }} />
            </span>
          </div>

          {/* Heading */}
          <h1
            className="hero-h1"
            style={{
              fontFamily: '"Noto Serif", serif',
              fontSize: 'clamp(44px, 7.5vw, 92px)',
              color: '#ffffff',
              lineHeight: 0.95,
              marginBottom: '20px',
            }}
          >
            Creativity<br />
            <span style={{ color: '#F5D5E0', fontStyle: 'italic' }}>&amp; Coding</span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-sub"
            style={{
              fontFamily: 'Quicksand, sans-serif',
              fontSize: 'clamp(10px, 1.1vw, 12px)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(245,213,224,0.4)',
              marginBottom: '40px',
            }}
          >
            Designer &nbsp;·&nbsp; Developer &nbsp;·&nbsp; Mental Health Advocate
          </p>

          {/* Buttons */}
          <div
            className="hero-btns hero-btns-wrap"
            style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}
          >
            <Link to="/tech" className="btn-ghost">Tech Projects</Link>
            <Link to="/design" className="btn-solid"><span>Design Projects</span></Link>
          </div>
        </div>

        {/* Right — Lottie */}
        <div
          className="hero-lottie"
          style={{
            width: '100%',
            maxWidth: 'clamp(240px, 38vw, 460px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Player
            autoplay
            loop
            src={animationData}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>

      {/* Glowing divider */}
      <div
        className="hero-divider"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(245,213,224,0.2) 20%, rgba(123,51,126,0.8) 50%, rgba(245,213,224,0.2) 80%, transparent 100%)',
          boxShadow: '0 0 16px rgba(123,51,126,0.5), 0 0 40px rgba(123,51,126,0.2)',
        }}
      />

    </section>
  )
}

export default Hero