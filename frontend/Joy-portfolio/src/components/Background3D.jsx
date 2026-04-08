import Spline from '@splinetool/react-spline'

function Herobackground3D() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'auto',
      opacity: 0.3,
    }}>
      <Spline
scene= "https://prod.spline.design/JXqyCnfHeM6PSMbf/scene.splinecode" 
     
 
        style={{ width: '100%', height: '100%' }}
      />
</div>
  )
}

export default Herobackground3D