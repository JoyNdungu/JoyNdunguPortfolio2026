import Header from '../components/Header'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Contact from '../sections/Contact'
import Showcase from '../sections/Showcase'

function Home() {
  return (
    <div style={{
      height: '100vh',
      overflowY: 'scroll',
      scrollSnapType: 'y mandatory',
      scrollBehavior: 'smooth',
    }}>
      <Header />

      <div style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', height: '100vh', overflow: 'hidden' }}>
        <Hero />
      </div>

      <div style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', height: '100vh', overflow: 'hidden' }}>
        <About />
      </div>

       <div style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', height: '100vh', overflow: 'hidden' }}>
        <Showcase />
      </div>


      <div style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', height: '100vh', overflow: 'hidden' }}>
        <Contact />
      </div>  

    </div>
  )
}

export default Home