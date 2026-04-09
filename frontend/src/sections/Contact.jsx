import { useState } from 'react'
import Background3D from '../components/Background3D'

function Contact() {
  const [emailSent, setEmailSent] = useState(false)
  const [message, setMessage] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const handleSend = async () => {
    if (!message.trim()) return
    
    setIsSending(true)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR_ACCESS_KEY_HERE", 
          subject: "New Message from Portfolio",
          from_name: "Portfolio Visitor",
          message: message,
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        setEmailSent(true)
        setMessage('')
        setTimeout(() => { 
          setEmailSent(false)
          setShowForm(false) 
        }, 3000)
      } else {
        console.error("Submission failed", result)
        alert("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section id="contactme" style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh', 
      overflowX: 'hidden', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px', 
    }}>

      {/* Background layer - Changed to fixed so it stays pinned behind scrolling content */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#0d0118' }}>
        <Background3D />
        <div style={{
          position: 'absolute', 
          inset: 0, 
          background: 'rgba(13,1,24,0.85)', 
        }} />
      </div>
      
      {/* Ambient glow - Changed to fixed */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `
          radial-gradient(ellipse 60% 60% at 50% 50%, rgba(102,103,171,0.13) 0%, transparent 65%),
          radial-gradient(ellipse 30% 40% at 20% 80%, rgba(123,51,126,0.09) 0%, transparent 50%)
        `,
      }} />

      {/* Heading */}
      <h2 style={{
        fontFamily: '"Noto Serif", serif',
        fontSize: 'clamp(28px, 4vw, 52px)',
        color: '#ffffff', fontStyle: 'italic',
        lineHeight: 1.0, marginBottom: '40px',
        textAlign: 'center', zIndex: 2,
      }}>
        Contact Me
      </h2>

      {/* ── Glassy Card ── */}
      <div style={{
        position: 'relative',
        width: 'min(400px, 100%)', // Allows it to fill the padded space nicely on mobile
        zIndex: 2,
      }}>

        {/* Outer glow ring */}
        <div style={{
          position: 'absolute',
          inset: '-2px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, "#0a0a0a" 0%, rgba(123,51,126,0.4) 50%, rgba(102,103,171,0.6) 100%)',
          filter: 'blur(1px)',
          zIndex: -1,
        }} />

        {/* Card body */}
        <div style={{
          background: 'rgba(30,10,50,0.45)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          borderRadius: '22px',
          border: '1px solid rgba(180,140,255,0.3)',
          padding: 'clamp(24px, 6vw, 36px) clamp(20px, 5vw, 32px)', // Fluid padding for mobile
          boxShadow: `
            0 0 0 1px rgba(180,140,255,0.1),
            0 0 80px rgba(102,103,171,0.35),
            0 0 160px rgba(123,51,126,0.2),
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.2)
          `,
        }}>

          {/* Inner shine */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '22px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 45%, rgba(0,0,0,0.08) 100%)',
            pointerEvents: 'none',
          }} />

          {/* Name */}
          <h3 style={{
            fontFamily: '"Noto Serif", serif',
            fontSize: 'clamp(20px, 5vw, 22px)',
            fontStyle: 'italic',
            color: '#ffffff', textAlign: 'center',
            margin: '0 0 4px',
          }}>
            Joy Ndung'u
          </h3>

          {/* Title */}
          <p style={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: 'clamp(14px, 4vw, 15px)',
            color: 'rgba(245,213,224,0.55)',
            textAlign: 'center', margin: '0 0 20px',
          }}>
            Designer & Developer
          </p>

          {/* Divider */}
          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(180,140,255,0.4), transparent)',
            marginBottom: '20px',
          }} />

          {/* Social links */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', // Added wrap
            marginBottom: '20px',
          }}>
            {/* GitHub */}
            <a
              href="https://github.com/JoyNdungu"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', flex: '1 1 auto', justifyContent: 'center'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
              </svg>
              <span>GitHub</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/ndung-u-joy-gathoni-5682aa355/" 
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', flex: '1 1 auto', justifyContent: 'center'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.23 0H1.77C.792 0 0 .774 0 1.73v20.54C0 23.226.792 24 1.77 24h20.46c.978 0 1.77-.774 1.77-1.73V1.73C24 .774 23.208 0 22.23 0zM7.09 20.452H3.545V9h3.545v11.452zM5.318 7.433a2.055 2.055 0 1 1 0-4.11 2.055 2.055 0 0 1 0 4.11zM20.452 20.452h-3.545v-5.605c0-1.336-.027-3.057-1.863-3.057-1.864 0-2.15 1.456-2.15 2.963v5.699h-3.544V9h3.404v1.561h.048c.474-.9 1.632-1.85 3.359-1.85 3.593 0 4.256 2.366 4.256 5.444v6.296z"/>
              </svg>  
             <span>LinkedIn</span>
            </a>
          </div>

          {/* Divider */}
          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(180,140,255,0.3), transparent)',
            marginBottom: '20px',
          }} />

          {/* Email section */}
          {!showForm ? (
            <div
              onClick={() => setShowForm(true)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                cursor: 'pointer', opacity: 0.6,
                transition: 'opacity 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0.6}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(245,213,224,0.8)" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span style={{
                fontFamily: 'Quicksand, sans-serif',
                fontSize: '11px', fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#F5D5E0',
              }}>
                Send me a message
              </span>
              <span style={{ color: '#F5D5E0', fontSize: '13px' }}>→</span>
            </div>
          ) : emailSent ? (
            <p style={{
              textAlign: 'center', fontFamily: '"Dancing Script", cursive',
              fontSize: '16px', color: 'rgba(180,140,255,0.9)',
            }}>
              Message sent successfully!
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Write your message..."
                rows={4} // Slightly taller for better typing experience
                disabled={isSending}
                style={{
                  width: '100%',
                  background: 'rgba(102,103,171,0.12)',
                  border: '1px solid rgba(180,140,255,0.25)',
                  borderRadius: '10px',
                  padding: '12px',
                  color: 'rgba(245,213,224,0.85)',
                  fontFamily: '"Noto Serif", serif',
                  fontSize: '14px', // Slightly larger for mobile readability
                  resize: 'none',
                  outline: 'none',
                  boxSizing: 'border-box',
                  opacity: isSending ? 0.5 : 1,
                }}
              />
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '4px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setShowForm(false)}
                  className="btn-ghost"
                  disabled={isSending}
                  style={{ opacity: isSending ? 0.5 : 1, flex: '1 1 auto' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSend}
                  className="btn-solid"
                  disabled={isSending}
                  style={{ opacity: isSending ? 0.5 : 1, flex: '1 1 auto' }}
                >
                  <span>{isSending ? 'Sending...' : 'Send →'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom glow */}
        <div style={{
          position: 'absolute',
          bottom: '-28px', 
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70%', 
          height: '30px',
          background: 'radial-gradient(ellipse, rgba(123,51,126,0.5) 0%, transparent 70%)',
          filter: 'blur(12px)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Bottom divider - Locked to the bottom of the viewport or content */}
      <div style={{
        position: 'absolute',
        bottom: 0, 
        left: 0, 
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(245,213,224,0.2) 20%, rgba(123,51,126,0.8) 50%, rgba(245,213,224,0.2) 80%, transparent 100%)',
        boxShadow: '0 0 16px rgba(123,51,126,0.5)',
      }} />

      {/* Button Styles from Hero */}
      <style>{`
        .btn-ghost {
          position: relative;
          padding: 10px 24px;
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
          cursor: pointer;
          background: transparent;
        }
        .btn-ghost::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(245,213,224,0.04);
          transition: background 0.35s ease;
        }
        .btn-ghost:hover:not(:disabled) {
          border-color: rgba(245,213,224,0.5);
          transform: translateY(-2px);
        }
        .btn-ghost:hover:not(:disabled)::before { background: rgba(245,213,224,0.09); }

        .btn-solid {
          position: relative;
          padding: 10px 24px;
          font-family: Quicksand, sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #fff;
          border-radius: 10px;
          border: none;
          overflow: hidden;
          text-decoration: none;
          text-align: center;
          background: linear-gradient(135deg, #7B337E 0%, #6667AB 100%);
          transition: transform 0.25s ease, box-shadow 0.35s ease;
          display: inline-block;
          cursor: pointer;
        }
        .btn-solid::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #8a3d8e 0%, #7778bb 100%);
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .btn-solid:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(102,103,171,0.35);
        }
        .btn-solid:hover:not(:disabled)::before { opacity: 1; }
        .btn-solid span { position: relative; z-index: 1; }
      `}</style>
    </section>
  )
}

export default Contact