import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import Background3D from '../components/Background3D'

const designPosters = [
  { 
    id: 1, 
    src: '/images/posters/JoyN.png',          
    label: 'JoyN Designs',
    category: 'Brand Identity',
    description: 'A minimalist and modern approach to fashion branding, focusing on clean typography and striking visual contrast.'
  },
  { 
    id: 2, 
    src: '/images/posters/urbanFlavors.png',   
    label: 'Urban Flavors',
    category: 'Event Poster',
    description: 'Vibrant, street-style aesthetics designed for a local food and culture festival. Bold colors to capture attention.'
  },
  { 
    id: 3, 
    src: '/images/posters/Magazine.png',       
    label: 'Magazine Cover',
    category: 'Editorial Design',
    description: 'Exploring grid systems, hierarchy, and typographic tension in print layout design.'
  },
  { 
    id: 4, 
    src: '/images/posters/azureCrown.png',       
    label: 'Azure Crown',
    category: 'Digital Art',
    description: 'A cyberpunk-inspired promotional poster utilizing heavy glow effects and 3D rendering concepts.'
  },
  { 
    id: 5, 
    src: '/images/posters/EddieHairDesigns.png',       
    label: 'Eddie Hair Designs',
    category: 'Brand Identity',
    description: 'Sleek and modern branding for a premium hair salon and barbershop.'
  },
  { 
    id: 6, 
    src: '/images/posters/EmmyHousehold.png',       
    label: 'Emmily Household',
    category: 'Digital Art',
    description: 'Clean and approachable design aesthetics for household product branding.'
  },
  { 
    id: 7, 
    src: '/images/posters/royalBites.png',       
    label: 'Royal Bites',
    category: 'Food & Beverage',
    description: 'Appetizing and luxurious promotional material for a high-end bakery and dessert brand.'
  },
  { 
    id: 8, 
    src: '/images/posters/LuxuryPerfume.png',       
    label: 'Luxury Perfumes',
    category: 'Product Design',
    description: 'Elegant and sophisticated layout highlighting the premium nature of boutique fragrances.'
  },
  { 
    id: 9, 
    src: '/images/posters/Birthday.png',       
    label: 'Birthday Bash',
    category: 'Event Poster',
    description: 'Fun, energetic, and typographic-heavy design for a private celebratory event.'
  },
]

function DesignProjects() {
  const navigate = useNavigate()
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = () => {
    if (!scrollRef.current) return
    
    const container = scrollRef.current
    const scrollCenter = container.scrollLeft + container.clientWidth / 2
    const items = container.children

    let closestIndex = 0
    let minDistance = Infinity

    Array.from(items).forEach((item, index) => {
      const actualIndex = index - 1 
      if (actualIndex >= 0 && actualIndex < designPosters.length) {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2
        const distance = Math.abs(scrollCenter - itemCenter)

        if (distance < minDistance) {
          minDistance = distance
          closestIndex = actualIndex
        }
      }
    })

    setActiveIndex(closestIndex)
  }

  useEffect(() => {
    const container = scrollRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
    }
    return () => {
      if (container) container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const activePoster = designPosters[activeIndex]

  return (
    <section style={{
      width: '100%',
      height: '100vh',
      background: '#0d0118',
      overflow: 'hidden', 
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Background layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Background3D />
        <div style={{
          position: 'absolute', 
          inset: 0, 
          background: 'rgba(13,1,24,0.85)', 
        }} />
      </div>

      {/* Top Header Section */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none'
      }}>
        <button 
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            left: '20px',
            top: '40px',
            background: 'none',
            border: 'none',
            color: 'rgba(245,213,224,0.6)',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            pointerEvents: 'auto',
            transition: 'color 0.3s'
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#F5D5E0'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,213,224,0.6)'}
        >
          ← Back
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div style={{ width: '20px', height: '1px', background: 'rgba(245,213,224,0.4)' }} />
          <span style={{ fontFamily: '"Dancing Script", cursive', color: 'rgba(245,213,224,0.5)', fontSize: '16px' }}>
            The Gallery
          </span>
          <div style={{ width: '20px', height: '1px', background: 'rgba(245,213,224,0.4)' }} />
        </div>
        
        <h1 style={{
          fontFamily: '"Noto Serif", serif',
          fontSize: 'clamp(24px, 4vw, 40px)',
          color: '#ffffff', 
          fontStyle: 'italic',
          lineHeight: 1.1, 
          margin: 0,
          textAlign: 'center',
        }}>
          Design Projects
        </h1>
      </div>

      {/* Cinematic Horizontal Scroll Track */}
      <div 
        ref={scrollRef}
        className="gallery-track"
      >
        <div className="gallery-spacer" />

        {designPosters.map((poster, index) => {
          const isActive = index === activeIndex
          
          return (
            <div 
              key={poster.id} 
              className={`gallery-item ${isActive ? 'is-active' : ''}`}
            >
              <div className="poster-frame">
                <img src={poster.src} alt={poster.label} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 40%)',
                  pointerEvents: 'none'
                }} />
              </div>
            </div>
          )
        })}

        <div className="gallery-spacer" />
      </div>

      {/* Bottom Info Section */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        padding: '30px 20px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(to top, rgba(13,1,24,1) 0%, rgba(13,1,24,0.85) 60%, transparent 100%)',
        pointerEvents: 'none' /* Let swipes pass through to the track below if needed */
      }}>
        
        <div className="info-container" key={activePoster.id}>
          <span style={{
            display: 'inline-block',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#F5D5E0',
            marginBottom: '8px'
          }}>
            {activePoster.category}
          </span>
          
          <h2 style={{
            fontFamily: '"Noto Serif", serif',
            fontSize: 'clamp(20px, 3vw, 32px)',
            color: '#ffffff',
            margin: '0 0 12px 0'
          }}>
            {activePoster.label}
          </h2>
          
          <p style={{
            fontFamily: 'Quicksand, sans-serif',
            fontSize: 'clamp(12px, 2vw, 15px)',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '500px',
            margin: 0,
            textAlign: 'center'
          }}>
            {activePoster.description}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
          {designPosters.map((_, i) => (
            <div 
              key={i} 
              style={{
                width: i === activeIndex ? '24px' : '6px',
                height: '6px',
                borderRadius: '6px',
                background: i === activeIndex ? '#F5D5E0' : 'rgba(245,213,224,0.2)',
                transition: 'all 0.4s ease'
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        /* Setup CSS variables for bulletproof responsive math */
        :root {
          --card-width: clamp(240px, 65vw, 420px);
          --track-gap: clamp(15px, 3vw, 40px);
        }

        .gallery-track {
          display: flex;
          align-items: center;
          height: 100%;
          width: 100vw;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          gap: var(--track-gap);
          /* Push the track up slightly so the bottom text doesn't cover the posters */
          padding-bottom: 120px; 
          box-sizing: border-box;
          
          -ms-overflow-style: none;  
          scrollbar-width: none;  
        }
        .gallery-track::-webkit-scrollbar {
          display: none;
        }

        /* Perfectly centers the first and last items */
        .gallery-spacer {
          flex-shrink: 0;
          width: calc(50vw - (var(--card-width) / 2) - (var(--track-gap) / 2));
          height: 1px;
        }

        .gallery-item {
          scroll-snap-align: center;
          flex-shrink: 0;
          width: var(--card-width);
          /* Slightly reduced height to fit better on mobile screens */
          height: clamp(320px, 55vh, 600px); 
          transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          transform-origin: center center;
          
          opacity: 0.3;
          transform: scale(0.85);
          filter: grayscale(40%) blur(2px);
        }

        .gallery-item.is-active {
          opacity: 1;
          transform: scale(1);
          filter: grayscale(0%) blur(0px);
          z-index: 5;
        }

        .poster-frame {
          width: 100%;
          height: 100%;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          background: rgba(13,1,24,0.4); 
          border: 1px solid rgba(255,255,255,0.05);
          position: relative;
        }

        .poster-frame img {
          width: 100%;
          height: 100%;
          object-fit: contain; 
          display: block;
        }

        .gallery-item.is-active .poster-frame {
          box-shadow: 0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(123,51,126,0.2);
          border-color: rgba(245,213,224,0.2);
        }

        .info-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fadeUp 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

export default DesignProjects