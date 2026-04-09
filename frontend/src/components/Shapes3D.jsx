import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// ─── Mobile detection ────────────────────────────────────────────────────────
const isMobile = () =>
  window.innerWidth < 768 || navigator.maxTouchPoints > 0

// ─── CSS-only fallback for mobile ─────────────────────────────────────────────
function CSSBlobs() {
  return (
    <>
      <style>{`
        @keyframes floatA {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(20px,-30px) scale(1.05); }
        }
        @keyframes floatB {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-15px,25px) scale(0.95); }
        }
        @keyframes floatC {
          0%,100% { transform: translate(0,0) scale(1); }
          33%     { transform: translate(10px,20px) scale(1.08); }
          66%     { transform: translate(-10px,-15px) scale(0.97); }
        }
        .css-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          will-change: transform;
        }
      `}</style>
      <div className="css-blob" style={{
        width: 280, height: 280, background: 'rgba(123,51,126,0.25)',
        top: '-60px', left: '-80px', animation: 'floatA 8s ease-in-out infinite',
      }}/>
      <div className="css-blob" style={{
        width: 220, height: 220, background: 'rgba(102,103,171,0.20)',
        top: '40%', right: '-60px', animation: 'floatB 10s ease-in-out infinite',
      }}/>
      <div className="css-blob" style={{
        width: 200, height: 200, background: 'rgba(66,13,75,0.22)',
        bottom: '-40px', left: '30%', animation: 'floatC 12s ease-in-out infinite',
      }}/>
      <div className="css-blob" style={{
        width: 150, height: 150, background: 'rgba(245,213,224,0.15)',
        top: '20%', left: '20%', animation: 'floatB 9s ease-in-out infinite 2s',
      }}/>
    </>
  )
}

// ─── Three.js scene for desktop ───────────────────────────────────────────────
function ThreeBlobs({ mountRef }) {
  useEffect(() => {
    const mount = mountRef.current
    const width = mount.clientWidth
    const height = mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const makeMaterial = (color, opacity) =>
      new THREE.MeshPhysicalMaterial({
        color, transparent: true, opacity,
        roughness: 0.05, metalness: 0.1,
        transmission: 0.9, thickness: 1.5,
        reflectivity: 0.8, wireframe: false,
        side: THREE.DoubleSide,
      })

    const blobConfigs = [
      { radius: 1.4, detail: 4, color: 0x7B337E, opacity: 0.18, x: -3.5, y: 1.5,  z: -1 },
      { radius: 1.0, detail: 3, color: 0x6667AB, opacity: 0.15, x:  3.0, y: -1.5, z: -2 },
      { radius: 1.6, detail: 4, color: 0x420D4B, opacity: 0.20, x:  0.5, y:  2.0, z: -3 },
      { radius: 0.8, detail: 3, color: 0xF5D5E0, opacity: 0.10, x: -2.0, y: -2.5, z: -1 },
      { radius: 1.2, detail: 4, color: 0x7B337E, opacity: 0.14, x:  4.0, y:  0.5, z: -2 },
      { radius: 0.9, detail: 3, color: 0x6667AB, opacity: 0.12, x: -4.5, y: -0.5, z: -1 },
      { radius: 1.1, detail: 4, color: 0xF5D5E0, opacity: 0.08, x:  1.5, y: -3.0, z: -3 },
    ]

    const blobs = blobConfigs.map((cfg) => {
      const geo = new THREE.IcosahedronGeometry(cfg.radius, cfg.detail)
      const pos = geo.attributes.position
      for (let i = 0; i < pos.count; i++) {
        const noise = (Math.random() - 0.5) * 0.35
        pos.setXYZ(i, pos.getX(i) + noise, pos.getY(i) + noise, pos.getZ(i) + noise)
      }
      geo.computeVertexNormals()

      const mesh = new THREE.Mesh(geo, makeMaterial(cfg.color, cfg.opacity))
      mesh.position.set(cfg.x, cfg.y, cfg.z)
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
      mesh.userData = {
        rotSpeed:    { x: (Math.random()-0.5)*0.003, y: (Math.random()-0.5)*0.004, z: (Math.random()-0.5)*0.002 },
        floatAmp:    Math.random() * 0.4 + 0.2,
        floatSpeed:  Math.random() * 0.4 + 0.3,
        floatOffset: Math.random() * Math.PI * 2,
        originX:     cfg.x,
        originY:     cfg.y,
      }
      scene.add(mesh)
      return mesh
    })

    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const pLight1 = new THREE.PointLight(0x7B337E, 2, 30)
    pLight1.position.set(4, 4, 4); scene.add(pLight1)
    const pLight2 = new THREE.PointLight(0x6667AB, 1.5, 30)
    pLight2.position.set(-4, -3, 3); scene.add(pLight2)
    const pLight3 = new THREE.PointLight(0xF5D5E0, 0.8, 20)
    pLight3.position.set(0, 5, 2); scene.add(pLight3)

    let mouseX = 0, mouseY = 0
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.8
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.8
    }
    window.addEventListener('mousemove', onMouseMove)

    let frameId
    const clock = new THREE.Clock()
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      blobs.forEach((blob) => {
        const ud = blob.userData
        blob.rotation.x += ud.rotSpeed.x
        blob.rotation.y += ud.rotSpeed.y
        blob.rotation.z += ud.rotSpeed.z
        blob.position.y = ud.originY + Math.sin(t * ud.floatSpeed + ud.floatOffset) * ud.floatAmp
        blob.position.x = ud.originX + Math.cos(t * ud.floatSpeed * 0.6 + ud.floatOffset) * 0.5
      })
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.03
      camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.03
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return null
}

// ─── Main export ──────────────────────────────────────────────────────────────
function Shapes3D() {
  const mountRef = useRef(null)
  const [mobile] = useState(() => isMobile())

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.9,
      }}
    >
      {mobile ? <CSSBlobs /> : <ThreeBlobs mountRef={mountRef} />}
    </div>
  )
}

export default Shapes3D