import { useNavigate } from 'react-router-dom'
import Background3D from '../components/Background3D'

const techProjects = [
  {
    id: 1,
    title: 'PesaTrack',
    description: 'A comprehensive finance tracking application helping students/comrades manage their expenses, set budgets, and achieve financial goals.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    image: '/images/websites/PesaTrack.jpg',
    logo: '/images/Rang.png', 
    color: 'rgba(66,13,75,0.7)',
    link: 'https://your-live-link-here.com' 
  },
  {
    id: 2,
    title: 'Bantu Couture Fashion',
    description: 'Bantu Couture Fashion (BCF) is a web platform celebrating the richness of African fashion. From bold Ankara prints to intricate Kente weaves and Maasai beadwork, BCF brings traditional African artistry into a luxury digital experience.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    image: '/images/websites/BCF.jpg',
    logo: '/images/BantuCourtureFashionlogo.png',
    color: 'rgba(102,103,171,0.5)',
    link: 'https://bantucouturefashion.vercel.app/'
  },
  {
    id: 3,
    title: 'RangiCraft',
    description: 'An web application that helps designers and developers generate culturally-aware, ready-to-use color palettes tailored to their app category, target African market, brand mood, and preferred styling format.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    image: '/images/websites/RangiCraft.jpg',
    logo: '/images/RangiCraftlogo.png',
    color: 'rgba(123,51,126,0.5)',
    link: 'https://rangi-craft-frontend.vercel.app'
  },
  {
    id: 4,
    title: 'MoyoCheck',
    description: 'A web application for checking and managing emotional well-being of students especially comrades by providing a safe space for expression and support.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    image: '/images/websites/placeholder.jpg',
    logo: '/images/logos/MoyoCheck-logo.png',
    color: 'rgba(80,40,120,0.5)',
    link: 'https://your-live-link-here.com'
  }
]

function TechProjects() {
  const navigate = useNavigate()

  return (
    <section style={{
      width: '100%',
      minHeight: '100vh',
      background: '#0d0118',
      overflowX: 'hidden',
      position: 'relative',
      paddingBottom: '80px'
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

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          style={{
            alignSelf: 'flex-start',
            background: 'none',
            border: 'none',
            color: 'rgba(245,213,224,0.6)',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            marginBottom: '40px',
            transition: 'color 0.3s'
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#F5D5E0'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,213,224,0.6)'}
        >
          ← Back to Showcase
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div style={{ width: '30px', height: '1px', background: 'rgba(245,213,224,0.4)' }} />
          <span style={{ fontFamily: '"Dancing Script", cursive', color: 'rgba(245,213,224,0.5)', fontSize: '18px' }}>
            Deep dive
          </span>
          <div style={{ width: '30px', height: '1px', background: 'rgba(245,213,224,0.4)' }} />
        </div>
        
        <h1 style={{
          fontFamily: '"Noto Serif", serif',
          fontSize: 'clamp(32px, 5vw, 56px)',
          color: '#ffffff', 
          fontStyle: 'italic',
          lineHeight: 1.1, 
          marginBottom: '60px',
          textAlign: 'center',
        }}>
          Tech Portfolio
        </h1>

        {/* Projects Grid */}
        <div className="projects-grid">
          {techProjects.map((project) => (
            <div key={project.id} className="project-card">
              {/* Image Container */}
              <div className="card-image-wrapper" style={{ background: project.color }}>
                <img src={project.image} alt={project.title} />
                <div className="card-overlay">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="view-project-btn"
                  >
                    View Project
                  </a>
                </div>
              </div>

              {/* Content Container */}
              <div className="card-content">
                
                {/* Title & Logo Container */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  marginBottom: '12px' 
                }}>
                  {/* Render logo if it exists */}
                  {project.logo && (
                    <div style={{
                      width: '36px',
                      height: '36px',
                      flexShrink: 0,
                      borderRadius: '10px',
                      background: 'rgba(255,255,255,0.05)', 
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <img 
                        src={project.logo} 
                        alt={`${project.title} logo`} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'contain'
                        }} 
                      />
                    </div>
                  )}
                  <h3 style={{
                    fontFamily: 'Quicksand, sans-serif',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: 0 
                  }}>
                    {project.title}
                  </h3>
                </div>
                
                <p style={{
                  fontFamily: 'Quicksand, sans-serif',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.6)',
                  margin: '0 0 20px 0',
                  flexGrow: 1
                }}>
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.tags.map((tag, idx) => (
                    <span key={idx} style={{
                      fontFamily: 'Quicksand, sans-serif',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      color: '#F5D5E0',
                      background: 'rgba(123,51,126,0.2)',
                      border: '1px solid rgba(245,213,224,0.15)',
                      padding: '4px 10px',
                      borderRadius: '20px'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* CSS Grid Layout */
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
          width: 100%;
        }

        @media (min-width: 768px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
        }

        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Card Styling */
        .project-card {
          display: flex;
          flex-direction: column;
          background: rgba(80,40,120,0.1);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(245,213,224,0.1);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }

        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 40px rgba(102,103,171,0.2);
          border-color: rgba(180,140,255,0.4);
        }

        /* Image Wrapper */
        .card-image-wrapper {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
        }

        .card-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .project-card:hover .card-image-wrapper img {
          transform: scale(1.05);
        }

        /* Hover Overlay */
        .card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(13,1,24,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-card:hover .card-overlay {
          opacity: 1;
        }

        .view-project-btn {
          font-family: 'Quicksand', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #111;
          background: #F5D5E0;
          padding: 10px 24px;
          border-radius: 30px;
          text-decoration: none;
          transform: translateY(15px);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .project-card:hover .view-project-btn {
          transform: translateY(0);
        }

        .view-project-btn:hover {
          background: #fff;
          box-shadow: 0 0 15px rgba(245,213,224,0.6);
        }

        /* Content Area */
        .card-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
      `}</style>
    </section>
  )
}

export default TechProjects