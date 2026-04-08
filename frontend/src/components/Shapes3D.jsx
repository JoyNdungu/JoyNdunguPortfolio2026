import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function Shapes3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const width = mount.clientWidth
    const height = mount.clientHeight

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 6

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Glassmorphic blob material factory
    const makeMaterial = (color, opacity) =>
      new THREE.MeshPhysicalMaterial({
        color,
        transparent: true,
        opacity,
        roughness: 0.05,
        metalness: 0.1,
        transmission: 0.9,
        thickness: 1.5,
        reflectivity: 0.8,
        wireframe: false,
        side: THREE.DoubleSide,
      })

    // Blob configs
    const blobConfigs = [
      { radius: 1.4, detail: 4, color: 0x7B337E, opacity: 0.18, x: -3.5, y: 1.5,  z: -1 },
      { radius: 1.0, detail: 3, color: 0x6667AB, opacity: 0.15, x:  3.0, y: -1.5, z: -2 },
      { radius: 1.6, detail: 4, color: 0x420D4B, opacity: 0.20, x:  0.5, y:  2.0, z: -3 },
      { radius: 0.8, detail: 3, color: 0xF5D5E0, opacity: 0.10, x: -2.0, y: -2.5, z: -1 },
      { radius: 1.2, detail: 4, color: 0x7B337E, opacity: 0.14, x:  4.0, y:  0.5, z: -2 },
      { radius: 0.9, detail: 3, color: 0x6667AB, opacity: 0.12, x: -4.5, y: -0.5, z: -1 },
      { radius: 1.1, detail: 4, color: 0xF5D5E0, opacity: 0.08, x:  1.5, y: -3.0, z: -3 },
    ]

    // Create blobs — use IcosahedronGeometry for organic blob feel
    const blobs = blobConfigs.map((cfg) => {
      const geo = new THREE.IcosahedronGeometry(cfg.radius, cfg.detail)

      // Deform vertices for organic blob shape
      const pos = geo.attributes.position
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i)
        const y = pos.getY(i)
        const z = pos.getZ(i)
        const noise = (Math.random() - 0.5) * 0.35
        pos.setXYZ(i, x + noise, y + noise, z + noise)
      }
      geo.computeVertexNormals()

      const mat = makeMaterial(cfg.color, cfg.opacity)
      const mesh = new THREE.Mesh(geo, mat)

      mesh.position.set(cfg.x, cfg.y, cfg.z)
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )

      // Store animation data
      mesh.userData = {
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.003,
          y: (Math.random() - 0.5) * 0.004,
          z: (Math.random() - 0.5) * 0.002,
        },
        floatAmp:    Math.random() * 0.4 + 0.2,
        floatSpeed:  Math.random() * 0.4 + 0.3,
        driftSpeed:  (Math.random() - 0.5) * 0.0008,
        floatOffset: Math.random() * Math.PI * 2,
        originX:     cfg.x,
        originY:     cfg.y,
      }

      scene.add(mesh)
      return mesh
    })

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const pLight1 = new THREE.PointLight(0x7B337E, 2, 30)
    pLight1.position.set(4, 4, 4)
    scene.add(pLight1)

    const pLight2 = new THREE.PointLight(0x6667AB, 1.5, 30)
    pLight2.position.set(-4, -3, 3)
    scene.add(pLight2)

    const pLight3 = new THREE.PointLight(0xF5D5E0, 0.8, 20)
    pLight3.position.set(0, 5, 2)
    scene.add(pLight3)

    // Mouse parallax
    let mouseX = 0
    let mouseY = 0
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.8
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.8
    }
    window.addEventListener('mousemove', onMouseMove)

    // Animation
    let frameId
    const clock = new THREE.Clock()

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      blobs.forEach((blob) => {
        const ud = blob.userData

        // Rotate
        blob.rotation.x += ud.rotSpeed.x
        blob.rotation.y += ud.rotSpeed.y
        blob.rotation.z += ud.rotSpeed.z

        // Float up and down
        blob.position.y = ud.originY + Math.sin(t * ud.floatSpeed + ud.floatOffset) * ud.floatAmp

        // Drift left and right
        blob.position.x = ud.originX + Math.cos(t * ud.floatSpeed * 0.6 + ud.floatOffset) * 0.5
      })

      // Camera subtle mouse follow
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.03
      camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.03
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    animate()

    // Resize
    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

export default Shapes3D