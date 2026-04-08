import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [menuOpen])

  const links = [
    { label: 'About Me', to: '/#about' },
    { label: 'Projects', to: '/#showcase' },
    { label: 'Contact', to: '/#contactme' },
  ]

  // Smart click handler for smooth scrolling
  const handleNavClick = (e, to) => {
    setMenuOpen(false) // Always close mobile menu on click

    // If it's a hash link
    if (to.startsWith('/#')) {
      const targetId = to.substring(2) // Extracts 'about' from '/#about'
      
      // If we are already on the homepage, prevent default router behavior and scroll smoothly
      if (location.pathname === '/') {
        e.preventDefault()
        const elem = document.getElementById(targetId)
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' })
        }
      }
      // If we are on another page (like /tech), let the <Link> navigate naturally.
    }
  }

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        flex items-center justify-between
        px-5 md:px-12 py-4 md:py-5
        transition-all duration-500
        
        ${
          scrolled
            ? 'md:bg-[rgba(33,6,53,0.75)] md:backdrop-blur-xl md:border-b md:border-[rgba(245,213,224,0.1)]'
            : 'bg-transparent'
        }
      `}
    >
      {/* Logo */}
      <Link
        to="/"
        className="font-serif text-base md:text-xl text-[#F5D5E0] tracking-wide hover:opacity-80 transition-opacity"
      >
        JoyN Designs
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-9">
        {links.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            onClick={(e) => handleNavClick(e, link.to)}
            className="font-body text-[12px] font-medium uppercase tracking-widest text-[rgba(245,213,224,0.7)] hover:text-[#F5D5E0] transition-colors duration-200 relative group"
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#F5D5E0] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Link>
        ))}
      </nav>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex flex-col gap-[5px] cursor-pointer z-50"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span
          className={`block w-6 h-px bg-[#F5D5E0] transition-all duration-300 ${
            menuOpen ? 'rotate-45 translate-y-[6px]' : ''
          }`}
        />
        <span
          className={`block w-6 h-px bg-[#F5D5E0] transition-all duration-300 ${
            menuOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-px bg-[#F5D5E0] transition-all duration-300 ${
            menuOpen ? '-rotate-45 -translate-y-[6px]' : ''
          }`}
        />
      </button>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden fixed inset-0
          flex flex-col items-center justify-center gap-8
          bg-[rgba(24, 1, 22, 0.96)] backdrop-blur-xl
          transition-transform duration-400 ease-in-out
          ${menuOpen ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        {links.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            onClick={(e) => handleNavClick(e, link.to)}
            className="font-body text-[14px] font-medium uppercase tracking-widest text-[rgba(245,213,224,0.7)] hover:text-[#F5D5E0] transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  )
}

export default Header