import { useEffect, useRef, useState, useCallback } from 'react'
import Background3D from '../components/Background3D'


const slides = [
  { id: 'photo',      tag: 'heyy there ',      heading: "Intro",    content: 'photo'      },
  { id: 'bio',        tag: 'about me ',          heading: 'Who I Am',   content: 'bio'        },
  { id: 'skills',     tag: 'what i know ',       heading: 'My Skills',  content: 'skills'     },
  { id: 'experience', tag: 'where i have been ', heading: 'Experience', content: 'experience' },
  { id: 'education',  tag: 'my journey ',        heading: 'Education',  content: 'education'  },
  {id:'Cv' , tag:'my cv ', heading:'My CV', content:'cv'},
  { id: 'facts',      tag: 'wanna know more about me',         heading: 'Fun Facts',  content: 'facts'      },
  
]

const LABELS = ["I'm Joy", "Who I Am", "My Skills", "Experience", "Education", "Fun Facts", "My CV"]
const TOTAL  = slides.length

function About() {
  const [current, setCurrent] = useState(0)
  const [paused,  setPaused]  = useState(false)
  const timerRef              = useRef(null)
  const touchStartX           = useRef(null)

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TOTAL)
    }, 4000)
  }, [])

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  useEffect(() => {
    if (paused) clearInterval(timerRef.current)
    else startTimer()
  }, [paused, startTimer])

  const goTo = (i) => {
    setCurrent(((i % TOTAL) + TOTAL) % TOTAL)
    startTimer()
  }

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1))
    touchStartX.current = null
  }

  const getCardStyle = (i) => {
    const angle   = ((i - current + TOTAL) % TOTAL) * (360 / TOTAL)
    const rad     = angle * (Math.PI / 180)
    const rx      = 400
    const ry      = 130
    const x       = Math.sin(rad) * rx
    const z       = Math.cos(rad) * ry
    const normZ   = (z + ry) / (2 * ry)
    const isActive = i === current
    const scale   = isActive ? 1.06 : 0.68 + normZ * 0.2
    const opacity = isActive ? 1    : 0.2 + normZ * 0.38
    const zIndex  = isActive ? 10   : Math.round(normZ * 8)
    const blur    = isActive ? 0    : (1 - normZ) * 5

    return {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${z * 0.25}px)) scale(${scale})`,
      opacity,
      zIndex,
      filter: blur > 0 ? `blur(${blur}px)` : 'none',
      transition: 'all 0.85s cubic-bezier(0.65, 0, 0.15, 1)',
      cursor: isActive ? 'default' : 'pointer',
      width: 'min(500px, 82vw)',
    }
  }

  const renderContent = (slide) => {
    switch (slide.content) {

     case 'photo':
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
      {/* 3D image with reflection */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        {/* Glow behind */}
        <div style={{
          position: 'absolute',
          inset: '-8px',
          borderRadius: '20px',
          background: 'rgba(123,51,126,0.3)',
          filter: 'blur(16px)',
          zIndex: 0,
        }} />

        {/* Main image */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(245,213,224,0.2)',
         boxShadow: `
  0 25px 50px rgba(0,0,0,0.6),
  0 10px 20px rgba(0,0,0,0.4),
  0 0 0 1px rgba(245,213,224,0.08)
`,
          transform: 'perspective(600px) rotateY(-8deg) rotateX(2deg)',
          transition: 'transform 0.4s ease',
          width: '160px',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1.03)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'perspective(600px) rotateY(-8deg) rotateX(2deg)'}
        >
          <img
            src="/images/me.jpg"
            alt="Joy Gathoni Ndung'u"
            style={{
              width: '160px',
              height: '200px',
              objectFit: 'cover',
              display: 'block',
              
            }}
          />
          {/* Shine overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
            pointerEvents: 'none',
          }} />
        </div>

       {/* Reflection */}
<div style={{
  position: 'relative',
  zIndex: 1,
  marginTop: '6px',
  borderRadius: '0 0 80% 80%',
  overflow: 'hidden',
  width: '160px',
  height: '60px',
  transform: 'perspective(600px) rotateY(-8deg) rotateX(2deg)',

 WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, transparent 80%)',
  maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, transparent 80%)',
  
}}>
  <img
    src="/images/me.jpg"
    alt=""
    style={{
      width: '160px',
      height: '200px',
      objectFit: 'cover',
      display: 'block',
      transform: 'scaleY(-1)',
      marginTop: '-140px',

      /*  MAGIC PART */
      filter: 'blur(3px) opacity(0.5)',
    }}
  />

  {/* Soft fade */}
  <div style={{
    position: 'absolute',
    inset: 0,
    background: `
      linear-gradient(
        180deg,
        rgba(13,1,24,0.2) 0%,
        rgba(13,1,24,0.7) 50%,
        rgba(13,1,24,1) 100%
      )
    `,
  }} />
</div>
      </div>

      {/* Text */}
      <p style={{
        fontFamily: '"Noto Serif", serif', fontSize: '15px',
        fontStyle: 'italic', fontWeight: 300,
        color: 'rgba(245,213,224,0.75)', lineHeight: 1.8,
        flex: 1, minWidth: '160px',
      }}>
        A creative at the intersection of technology and design — building things that are both{' '}
        <span style={{ color: '#F5D5E0' }}>beautiful</span> and{' '}
        <span style={{ color: '#F5D5E0' }}>functional</span>.
      </p>
    </div>
  )

      case 'bio':
        return (
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              
              "Dedicated web developer with a background in Business Information Technology, focused on frontend development and transforming ideas into interactive digital experiences.",
              "Currently enhancing backend skills with Node.js and MongoDB — always eager to learn new technologies.",
              "Passionate about empowering communities through tech, especially in sustainability and mental health.",
            ].map((para, idx) => (
              <p key={idx} style={{
                fontFamily: '"Noto Serif", serif', fontSize: '14px',
                fontWeight: 300, fontStyle: 'italic',
                color: 'rgba(245,213,224,0.7)', lineHeight: 1.8, margin: 0,
              }}>
                {para}
              </p>
            ))}
          </div>
        )

      case 'skills':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { category: 'Frontend', items: ['React', 'JavaScript', 'TypeScript', 'Tailwind', 'HTML/CSS'] },
              { category: 'Backend',  items: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'Python'] },
              { category: 'Tools',    items: ['Git', 'Figma', 'Postman', 'VS Code', 'Vite'] },
            ].map((group) => (
              <div key={group.category}>
                <p style={{ fontFamily: '"Noto Serif", serif', fontSize: '13px', fontStyle: 'italic', color: '#F5D5E0', marginBottom: '8px' }}>
                  {group.category}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {group.items.map((skill) => (
                    <span key={skill} style={{
                      fontFamily: 'Quicksand, sans-serif', fontSize: '11px',
                      color: 'rgba(245,213,224,0.65)',
                      background: 'rgba(102,103,171,0.2)',
                      border: '1px solid rgba(102,103,171,0.3)',
                      padding: '3px 11px', borderRadius: '20px',
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )

      case 'experience':
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              <div>
                <p style={{ fontFamily: '"Noto Serif", serif', fontSize: '22px', fontStyle: 'italic', color: '#F5D5E0', marginBottom: '5px' }}>
                  IT Attachée
                </p>
                <p style={{ fontFamily: 'Quicksand, sans-serif', fontSize: '13px', color: 'rgba(245,213,224,0.5)' }}>
                  Nyeri County Government — Governor's Office
                </p>
              </div>
              <span style={{
                fontFamily: 'Quicksand, sans-serif', fontSize: '10px', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#F5D5E0', background: 'rgba(123,51,126,0.4)',
                border: '1px solid rgba(123,51,126,0.6)',
                padding: '4px 14px', borderRadius: '20px', whiteSpace: 'nowrap',
              }}>
                Mar 2026 — Present
              </span>
            </div>
            <p style={{
              fontFamily: '"Noto Serif", serif', fontSize: '14px',
              fontWeight: 300, fontStyle: 'italic',
              color: 'rgba(245,213,224,0.65)', lineHeight: 1.85,
            }}>
              Gaining hands-on experience in government ICT systems, digital operations,
              and technology solutions within a public sector environment at the
              Nyeri County Governor's Office.
            </p>
          </div>
        )

      case 'education':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { degree: 'BSc. Business Information Technology', school: 'Dedan Kimathi University of Technology', period: '2022 — 2026', active: true },
              { degree: 'KCSE Certificate', school: 'Karima Girls High School', period: '2019 — 2022', active: false },
              { degree: 'KCPE Certificate', school: 'Gituamba Primary School', period: '2011 — 2018', active: false },
            ].map((edu) => (
              <div key={edu.school} style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', flexWrap: 'wrap', gap: '8px',
                padding: '14px 18px', borderRadius: '14px',
                background: edu.active ? 'rgba(123,51,126,0.2)' : 'rgba(66,13,75,0.2)',
                border: `1px solid ${edu.active ? 'rgba(123,51,126,0.45)' : 'rgba(245,213,224,0.06)'}`,
              }}>
                <div>
                  <p style={{ fontFamily: '"Noto Serif", serif', fontSize: '14px', fontStyle: 'italic', color: '#F5D5E0', marginBottom: '3px' }}>
                    {edu.degree}
                  </p>
                  <p style={{ fontFamily: 'Quicksand, sans-serif', fontSize: '11px', color: 'rgba(245,213,224,0.4)' }}>
                    {edu.school}
                  </p>
                </div>
                <span style={{
                  fontFamily: 'Quicksand, sans-serif', fontSize: '10px', fontWeight: 600,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: edu.active ? '#F5D5E0' : 'rgba(245,213,224,0.35)',
                  whiteSpace: 'nowrap',
                }}>
                  {edu.period}
                </span>
              </div>
            ))}
          </div>
        )


case 'cv':
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      marginTop: '20px',
    }}>
      <p style={{
        fontFamily: '"Noto Serif", serif',
        fontSize: '15px',
        fontStyle: 'italic',
        fontWeight: 300,
        color: 'rgba(245,213,224,0.6)',
        textAlign: 'center',
        lineHeight: 1.7,
        marginBottom: '8px',
      }}>
        Download my CV or Resume to learn more about my experience and skills.
      </p>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Ghost button */}
        <a
          href="/JoyGathoniNdungu CV.pdf"
          download
          style={{
            position: 'relative',
            padding: '14px 32px',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#F5D5E0',
            border: '1px solid rgba(245,213,224,0.25)',
            borderRadius: '10px',
            textDecoration: 'none',
            textAlign: 'center',
            display: 'inline-block',
            transition: 'all 0.3s ease',
            background: 'rgba(245,213,224,0.04)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(245,213,224,0.5)'
            e.currentTarget.style.background = 'rgba(245,213,224,0.09)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(245,213,224,0.25)'
            e.currentTarget.style.background = 'rgba(245,213,224,0.04)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Download CV
        </a>

        {/* Solid button */}
        <a
          href="/JoyGathoniNdunguFullstackDeveloperResume.pdf"
          download
          style={{
            position: 'relative',
            padding: '14px 32px',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#ffffff',
            borderRadius: '10px',
            textDecoration: 'none',
            textAlign: 'center',
            display: 'inline-block',
            background: 'linear-gradient(135deg, #7B337E 0%, #6667AB 100%)',
            transition: 'all 0.3s ease',
            border: 'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 28px rgba(102,103,171,0.4)'
            e.currentTarget.style.background = 'linear-gradient(135deg, #8a3d8e 0%, #7778bb 100%)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.background = 'linear-gradient(135deg, #7B337E 0%, #6667AB 100%)'
          }}
        >
          Download Resume
        </a>
      </div>
    </div>
  )

      case 'facts':
        return (<>
          <style>{`.btn-ghost {
          position: relative;
          padding: 12px 32px;
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
          padding: 12px 32px;
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
`}</style>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { emoji: '🎹', fact: 'Piano player — music is my reset button' },
              { emoji: '💜', fact: 'Good design should feel like magic' },
              { emoji: '🌱', fact: 'Passionate about sustainability & mental health tech' },
              { emoji: '🇰🇪', fact: 'Proudly Kenyan, building for the world' },
              { emoji: '🌙', fact: 'Best ideas come at midnight' },
              { emoji: '☕', fact: 'Powered by tea and curiosity' },
            ].map((item) => (
              <div key={item.fact} style={{
                display: 'flex', alignItems: 'flex-start', gap: '8px',
                padding: '12px', borderRadius: '12px',
                background: 'rgba(66,13,75,0.3)',
                border: '1px solid rgba(245,213,224,0.07)',
              }}>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>{item.emoji}</span>
                <p style={{
                  fontFamily: '"Noto Serif", serif', fontSize: '12px',
                  fontWeight: 300, fontStyle: 'italic',
                  color: 'rgba(245,213,224,0.65)', lineHeight: 1.6, margin: 0,
                }}>
                  {item.fact}
                </p>
              </div>
            ))}
          </div>
          </>
        )




      default: return null
    }
  }

  return (
    <section id="about"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#0d0118',
      }}
    >
      {/* Spline background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Background3D />
       
      </div>

      {/* Extra glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 70% 50% at 50% 50%, rgba(123,51,126,0.1) 0%, transparent 65%)
        `,
      }} />

      {/* ── Circular rotating tab names ── */}
      <div style={{
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 20,
  height: '64px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}}>
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transform: `translateX(-${current * 100}%)`,
    transition: 'transform 0.7s cubic-bezier(0.65, 0, 0.15, 1)',
  }}>
          {[...Array(3)].map((_, copy) =>
            LABELS.map((label, i) => {
              const globalIdx    = copy * TOTAL + i
              const distFromActive = globalIdx - (copy * TOTAL + current)
              const isActive     = distFromActive === 0
              const absDist      = Math.abs(distFromActive)
              const opacity      = absDist === 0 ? 1 : absDist === 1 ? 0.5 : absDist === 2 ? 0.25 : 0.1
              const scale        = absDist === 0 ? 1.1 : absDist === 1 ? 0.9 : 0.75

              return (
                <button
                className="hero-btns hero-btns-wrap btn-ghost"
                  key={`${copy}-${label}`}
                  onClick={() => goTo(i)}
                 style={{
                      fontFamily: 'Quicksand, sans-serif',
                      fontSize: 'clamp(9px, 2.5vw, 11px)',
                      fontWeight: isActive ? 700 : 400,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: isActive ? '#F5D5E0' : 'rgba(245,213,224,0.5)',
                      background: isActive ? 'rgba(123,51,126,0.35)' : 'transparent',
                      border: isActive ? '1px solid rgba(245,213,224,0.2)' : '1px solid transparent',
                      borderRadius: '20px',
                      padding: '6px 14px',
                      cursor: 'pointer',
                      transition: 'all 0.4s ease',
                      opacity,
                      transform: `scale(${scale})`,
                      flexShrink: 0,
                      backdropFilter: isActive ? 'blur(6px)' : 'none',
                      boxShadow: isActive ? '0 0 16px rgba(123,51,126,0.25)' : 'none',
                      whiteSpace: 'nowrap',
                    }}
                >
                  {label}
                </button>
              )
            })
          )}
        </div>

        {/* Fade edges */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: '120px',
          background: 'linear-gradient(90deg, #0d0118 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 1,
        }} />
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: '120px',
          background: 'linear-gradient(270deg, #0d0118 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 1,
        }} />
      </div>

      {/* ── Wheel carousel ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginTop: '60px',
      }}>
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            style={getCardStyle(i)}
            onClick={() => i !== current && goTo(i)}
          >
            <div style={{
              background: i === current
                ? 'rgba(19, 5, 28, 0.88)'
                : 'rgba(25,3,42,0.55)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: i === current
                ? '1px solid rgba(245,213,224,0.22)'
                : '1px solid rgba(245,213,224,0.07)',
              borderRadius: '28px',
              padding: '36px',
              boxShadow: i === current
                ? '0 0 80px rgba(123,51,126,0.3), 0 32px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)'
                : '0 8px 24px rgba(0,0,0,0.25)',
              transition: 'all 0.85s cubic-bezier(0.65, 0, 0.15, 1)',
              minHeight: '480px',
            }}>
              {/* Tag */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '18px', height: '1px', background: 'rgba(245,213,224,0.3)', flexShrink: 0 }} />
                <span style={{
                  fontFamily: '"Dancing Script", cursive',
                  color: 'rgba(245,213,224,0.4)', fontSize: '15px',
                }}>
                  {slide.tag}
                </span>
              </div>

              {/* Heading */}
              <h2 style={{
                fontFamily: '"Noto Serif", serif',
                fontSize: 'clamp(24px, 3vw, 36px)',
                color: '#ffffff', fontStyle: 'italic',
                lineHeight: 1.0, marginBottom: '28px',
              }}>
                {slide.heading}
              </h2>

              {/* Content */}
              {renderContent(slide)}
            </div>
          </div>
        ))}
      </div>

      {/* Nav arrows */}
      {[
        { side: 'left',  dir: -1 },
        { side: 'right', dir:  1 },
      ].map(({ side, dir }) => (
        <button
          key={side}
          onClick={() => goTo(current + dir)}
          style={{
            position: 'absolute',
            [side]: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            background: 'rgba(66,13,75,0.45)',
            border: '1px solid rgba(245,213,224,0.12)',
            borderRadius: '50%',
            width: '46px', height: '46px',
            color: '#F5D5E0', fontSize: '22px',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(12px)',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(123,51,126,0.55)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(66,13,75,0.45)'}
        >
          {side === 'left' ? '‹' : '›'}
        </button>
      ))}

      {/* Glowing divider */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(245,213,224,0.2) 20%, rgba(123,51,126,0.8) 50%, rgba(245,213,224,0.2) 80%, transparent 100%)',
        boxShadow: '0 0 16px rgba(123,51,126,0.5)',
      }} />

    </section>
  )
}

export default About