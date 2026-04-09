import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Background3D from '../components/Background3D'

const projects = [
  { image: '/images/websites/BCF.jpg',       color: 'rgba(102,103,171,0.5)' },
  { image: '/images/websites/RangiCraft.jpg', color: 'rgba(123,51,126,0.5)'  },
  { image: '/images/websites/PesaTrack.jpg',  color: 'rgba(66,13,75,0.7)'    },
]

const posters = [
  { src: '/images/posters/JoyN.png',          label: 'JoyN Designs'    },
  { src: '/images/posters/urbanFlavors.png',   label: 'Urban Flavors'   },
  { src: '/images/posters/Magazine.png',       label: 'Magazine Cover'  },
]

function Showcase() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const carouselRef = useRef(null)
  const rafRef      = useRef(null)
  const stateRef    = useRef({
    angle: 0, targetAngle: 0,
    hovered: false, dragging: false,
    lastX: 0, lastTouchX: 0, speed: 0.35,
  })

  const n = posters.length

  // Dynamically calculate radius to prevent 3D clipping on small screens
  const getRadius = () => {
    const w = window.innerWidth
    if (w < 680) return 110  // Slightly reduced radius to prevent extreme pop-out
    if (w < 1024) return 180 
    return 220               
  }
  
  const [radius, setRadius] = useState(getRadius)

  useEffect(() => {
    const onResize = () => setRadius(getRadius())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const s = stateRef.current

    const onMouseMove  = (e) => { if (!s.dragging) return; s.targetAngle += (e.clientX - s.lastX) * 0.4; s.lastX = e.clientX }
    const onMouseUp    = ()  => { s.dragging = false }
    const onTouchMove  = (e) => { if (!s.dragging) return; s.targetAngle += (e.touches[0].clientX - s.lastTouchX) * 0.4; s.lastTouchX = e.touches[0].clientX }
    const onTouchEnd   = ()  => { s.dragging = false }

    window.addEventListener('mousemove',  onMouseMove)
    window.addEventListener('mouseup',    onMouseUp)
    window.addEventListener('touchmove',  onTouchMove, { passive: true })
    window.addEventListener('touchend',   onTouchEnd)

    const tick = () => {
      if (!s.hovered && !s.dragging) s.targetAngle -= s.speed
      s.angle += (s.targetAngle - s.angle) * 0.06
      if (carouselRef.current) carouselRef.current.style.transform = `rotateY(${s.angle}deg)`
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove',  onMouseMove)
      window.removeEventListener('mouseup',    onMouseUp)
      window.removeEventListener('touchmove',  onTouchMove)
      window.removeEventListener('touchend',   onTouchEnd)
    }
  }, [])

  return (
    <section id="showcase" style={{
      width: '100%',
      minHeight: '100vh',
      background: '#0d0118',
      overflowX: 'hidden',
      position: 'relative',
    }}>
      {/* Spline background */}
      <div style={{
         position: 'absolute',
         inset: 0,
         zIndex: 0 }}>
        <Background3D />

        <div style={{
          position: 'absolute', 
          inset: 0, 
          zIndex: 1,
          background: 'rgba(13,1,24,0.65)',
        }} />
      </div>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', 
        inset: 0, 
        zIndex: 2,
        pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 40% 60% at 25% 50%, rgba(102,103,171,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 40% 60% at 75% 50%, rgba(123,51,126,0.1)  0%, transparent 60%)
        `,
      }} />

      {/* Glowing vertical divider */}
      <div className="glow-divider" style={{
        display: 'none',
        position: 'absolute',
        left: '50%', top: '10%',
        width: '1.5px', height: '80%',
        transform: 'translateX(-50%)',
        background: 'linear-gradient(to bottom, transparent 0%, rgba(168,85,247,0.7) 30%, rgba(236,72,153,0.6) 60%, transparent 100%)',
        boxShadow: '0 0 18px 4px rgba(168,85,247,0.4), 0 0 40px 8px rgba(236,72,153,0.25)',
        zIndex: 10, pointerEvents: 'none', borderRadius: '2px',
      }} />

      {/* Main wrapper */}
      <div className="showcase-wrapper" style={{
        display: 'flex', 
        flexDirection: 'column',
        width: '100%', 
        minHeight: '100vh',
        position: 'relative',
        zIndex: 3,
      }}>

        {/* ── LEFT — TECH FOLDER ── */}
        <div className="showcase-half" style={{
          flex: 1,
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 20px 40px', 
          position: 'relative',
        }}>

          {/* Section label */}
          <div className="section-tag" style={{
             display: 'flex',
             alignItems: 'center', 
             gap: '10px',
             marginBottom: '12px' }}>
            <div style={{ 
              width: '20px', 
              height: '1px', 
              background: 'rgba(245,213,224,0.4)' }} />
            <span style={{
               fontFamily: '"Dancing Script", cursive', 
               color: 'rgba(245,213,224,0.5)', fontSize: '16px' }}>
             My projects
            </span>
          </div>
          <h2 className="projects-label" style={{
            fontFamily: '"Noto Serif", serif',
            fontSize: 'clamp(24px, 3.5vw, 44px)',
            color: '#ffffff', 
            fontStyle: 'italic',
            lineHeight: 1.0, 
            marginBottom: '40px',
            textAlign: 'center',
          }}>
            Tech Projects
          </h2>

          {/* Folder - REDUCED SIZE */}
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              position: 'relative',
              width: 'min(270px, 75vw)', // <-- Reduced from 300px, 80vw
              cursor: 'pointer',
              transform: hovered ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 0.4s',
              animation: 'folderFloat 5s ease-in-out infinite',
            }}
          >
            {/* Tab */}
            <div style={{
              position: 'absolute', 
              top: 0, 
              left: 0,
              width: '170px', // <-- Reduced from 200px
              height: '28px',
              background: 'rgba(102,103,171,0.2)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(245,213,224,0.2)',
              borderBottom: 'none',
              borderRadius: '10px 10px 0 0',
            }} />

            {/* Body */}
            <div style={{
              marginTop: '22px',
              padding: 'clamp(12px, 3vw, 24px)', // <-- Slightly tighter padding
              borderRadius: '0 16px 16px 16px',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              background: 'rgba(80,40,120,0.15)',
              border: hovered ? '1px solid rgba(180,140,255,0.5)' : '1px solid rgba(180,140,255,0.25)',
              boxShadow: hovered
                ? '0 0 80px rgba(102,103,171,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
                : '0 0 40px rgba(102,103,171,0.2), inset 0 1px 0 rgba(255,255,255,0.07)',
              transition: 'all 0.4s',
              position: 'relative',
            }}>
              {/* Shine */}
              <div style={{
                position: 'absolute', 
                inset: 0, 
                borderRadius: 'inherit',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06), transparent)',
                pointerEvents: 'none',
              }} />

              {/* Cards - SCALED DOWN */}
              <div style={{
                display: 'flex', 
                gap: '5px',
                justifyContent: 'center', alignItems: 'flex-end',
                height: 'clamp(60px, 16vw, 130px)', // <-- Reduced max height
              }}>
                {projects.map((p, i) => {
                  const rotations = [-10, -3, 5]
                  const baseY  = [25, 29, 27][i] // <-- Tweaked base Y to match new size
                  const hoverY = [-45, -55, -50][i]
                  return (
                    <div key={i} style={{
                      width:  'clamp(55px, 14vw, 85px)', // <-- Reduced from 95px max
                      height: 'clamp(55px, 14vw, 150px)', // <-- Reduced from 170px max
                      borderRadius: '10px', overflow: 'hidden',
                      position: 'relative', flexShrink: 0,
                      background: p.color,
                      border: '1px solid rgba(245,213,224,0.15)',
                      transform: hovered
                        ? `rotate(${rotations[i]}deg) translateY(${hoverY}px)`
                        : `rotate(${rotations[i]}deg) translateY(${baseY}px)`,
                      transition: `transform ${0.4 + i * 0.05}s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                      boxShadow: hovered ? '0 16px 32px rgba(0,0,0,0.5)' : '0 4px 16px rgba(0,0,0,0.3)',
                    }}>
                      <img src={p.image} alt="" style={{
                        width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                        filter: hovered ? 'brightness(1.05)' : 'brightness(0.85)',
                        transition: 'filter 0.4s',
                      }} />
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.07), transparent)',
                        pointerEvents: 'none',
                      }} />
                    </div>
                  )
                })}
              </div>

              {/* Mask */}
              <div style={{
                position: 'absolute', 
                bottom: 0, 
                left: 0,
                right: 0,
                height: '60%', 
                zIndex: 4, 
                pointerEvents: 'none',
                background: 'rgba(70,30,110,0.2)',
                backdropFilter: 'blur(8px)',
                borderRadius: '0 0 16px 16px',
              }} />

              {/* Bottom bar */}
              <div style={{
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                zIndex: 5,
                marginTop: '18px',
              }}>
                
                <div
                  onClick={() => navigate('/tech')}
                  style={{
                    fontFamily: 'Quicksand, sans-serif', 
                    fontSize: '11px',
                    fontWeight: 600, 
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: hovered ? '#F5D5E0' : 'rgba(245,213,224,0.45)',
                    transition: 'color 0.3s, transform 0.3s',
                    transform: hovered ? 'translateX(4px)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  View all →
                </div>
              </div>
            </div>

            {/* Glow puddle */}
            <div style={{
              position: 'absolute', bottom: '-18px', left: '50%',
              transform: 'translateX(-50%)',
              width: '70%', height: '24px',
              background: `radial-gradient(ellipse, ${hovered ? 'rgba(123,51,126,0.5)' : 'rgba(123,51,126,0.25)'} 0%, transparent 70%)`,
              filter: 'blur(10px)', transition: 'background 0.4s', pointerEvents: 'none',
            }} />
          </div>

        </div>

        {/* ── RIGHT — POSTER CAROUSEL ── */}
        <div className="showcase-half" style={{
          flex: 1,
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '40px 20px 80px', 
          position: 'relative',
        }}>

          {/* Section label */}
          <div className="section-tag" style={{
            display: 'flex', 
            alignItems: 'center',
            gap: '10px', 
            marginBottom: '12px' }}>
            <div style={{ 
              width: '20px', 
              height: '1px', 
              background: 'rgba(245,213,224,0.4)' }} />
            <span style={{ 
              fontFamily: '"Dancing Script", cursive', 
              color: 'rgba(245,213,224,0.5)', fontSize: '16px' }}>
              My designs 
            </span>
          </div>
          <h2 className="projects-label" style={{
            fontFamily: '"Noto Serif", serif',
            fontSize: 'clamp(24px, 3.5vw, 44px)',
            color: '#ffffff',
            fontStyle: 'italic',
            lineHeight: 1.0,
            marginBottom: '40px', 
            textAlign: 'center',
          }}>
            Design Projects
          </h2>

          {/* 3D Carousel Container */}
          <div
            onMouseEnter={() => { stateRef.current.hovered = true  }}
            onMouseLeave={() => { stateRef.current.hovered = false }}
            className="carousel-container"
            style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div style={{ 
              perspective: 1000, 
              display: 'flex', 
              justifyContent: 'center', 
            }}>
              <div
                ref={carouselRef}
                className="carousel-3d"
                style={{
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  cursor: 'grab',
                }}
                onMouseDown={e => { stateRef.current.dragging = true; stateRef.current.lastX = e.clientX }}
                onTouchStart={e => { stateRef.current.dragging = true; stateRef.current.lastTouchX = e.touches[0].clientX }}
              >
                {posters.map((poster, i) => (
                  <div key={i} className="poster-card" style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '12px', 
                    overflow: 'hidden',
                    backfaceVisibility: 'hidden',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    transform: `rotateY(${(360 / n) * i}deg) translateZ(${radius}px)`,
                  }}>
                    <img src={poster.src} alt={poster.label} style={{
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      display: 'block', 
                      userSelect: 'none',
                    }} />
                    {/* Label overlay */}
                    <div style={{
                      position: 'absolute', 
                      bottom: 0, 
                      left: 0, 
                      right: 0,
                      padding: '18px 14px 14px',
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
                    }}>
                      <p style={{
                        fontFamily: 'Quicksand, sans-serif', 
                        fontSize: '10px',
                        fontWeight: 600, letterSpacing: '0.1em',
                        textTransform: 'uppercase', color: 'rgba(245,213,224,0.8)',
                        margin: 0,
                      }}>
                        {poster.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Helper Text - TIGHTENED MARGIN */}
            <p className="poster-helper-text" style={{
              position: 'relative',
              zIndex: 10,
              fontFamily: 'Quicksand, sans-serif', fontSize: '10px',
              color: 'rgba(255, 255, 255, 0.37)', letterSpacing: '0.06em',
              marginTop: '10px', // <-- Reduced from 15px
              marginBottom: '0',
            }}>
              hover to pause · drag to spin
            </p>

            {/* Button - TIGHTENED MARGIN */}
            <div
              className="poster-view-btn"
              onClick={() => navigate('/design')}
              style={{
                position: 'relative',
                zIndex: 10,
                marginTop: '10px', // <-- Reduced from 20px
                padding: '10px 20px', 
                fontFamily: 'Quicksand, sans-serif', fontSize: '11px',
                fontWeight: 600, 
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#F5D5E0', 
                cursor: 'pointer',
                transition: 'opacity 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              View all →
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes folderFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes hintPulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 0.75; }
        }
        
        /* Desktop layout */
        @media (min-width: 680px) {
          .showcase-wrapper {
            flex-direction: row !important;
            height: 100vh;
            overflow: hidden;
            gap: 2px;
          }
          .glow-divider {
            display: block !important;
          }
        }

        /* Scaled Carousel Sizing */
        .carousel-3d {
          width: 150px !important;
          height: 260px !important;
          margin-bottom: 30px; 
        }

        @media (min-width: 680px) {
          .carousel-3d {
            width: 180px !important;
            height: 280px !important;
            margin-bottom: 40px;
          }
        }

        @media (min-width: 1024px) {
          .carousel-3d {
            width: 220px !important;
            height: 300px !important;
            margin-bottom: 50px;
          }
        }

        /* Mobile specific fixes */
        @media (max-width: 679px) {
          /* Hide the tiny "My projects" subheader to save vertical space */
          .section-tag {
            display: none !important;
          }

          /* Shrink the main header cleanly */
          .projects-label {
            font-size: 28px !important;
            margin-bottom: 20px !important;
          }
          
          /* FIX THE HUGE GAP: Turn off equal flex stretching and reduce padding */
          .showcase-half {
             flex: none !important;
             justify-content: flex-start !important;
          }

          /* Tighten the padding of the Tech Projects top half */
          .showcase-half:first-of-type {
             padding-top: 60px !important;
             padding-bottom: 10px !important; 
          }

          /* Tighten the padding of the Design Projects bottom half */
          .showcase-half:last-of-type {
             padding-top: 10px !important;
             padding-bottom: 100px !important;
          }

          /* PULL THE VIEW ALL CONTENT UP */
          .carousel-3d {
             margin-bottom: 5px !important; /* Heavily reduced margin below the carousel */
          }
          .poster-helper-text {
             margin-top: 5px !important; 
          }
          .poster-view-btn {
             margin-top: 5px !important;
          }
        }

        .poster-card {
          border-radius: 10px;
          overflow: hidden;
        } 
      `}</style>
    </section>
  )
}

export default Showcase