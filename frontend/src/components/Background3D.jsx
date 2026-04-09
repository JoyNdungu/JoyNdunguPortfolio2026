import Spline from '@splinetool/react-spline'

const isMobile = typeof navigator !== 'undefined' && (
  /Mobi|Android/i.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
);

function Background3D() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'auto',
      opacity: 0.5,
    }}>
      {!isMobile ? (
        <Spline
          scene="https://prod.spline.design/JXqyCnfHeM6PSMbf/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <img
          src="/images/3d-fallback.png"
          alt="Background"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
        />
      )}
    </div>
  )
}

export default Background3D