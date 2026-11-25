import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import './Hero.css'

function RevealPortrait() {
  const reveal = useRef(null)

  useEffect(() => {
    const hero = document.querySelector('.hero-page')
    const element = reveal.current
    if (!hero || !element) return undefined

    const revealAt = (event) => {
      const bounds = hero.getBoundingClientRect()
      const x = `${event.clientX - bounds.left}px`
      const y = `${event.clientY - bounds.top}px`

      element.style.setProperty('--reveal-x', x)
      element.style.setProperty('--reveal-y', y)
      hero.setAttribute('style', `--reveal-x: ${x}; --reveal-y: ${y}`)

      const title = hero.querySelector('.hero-title-wrap')
      if (title) {
        const titleBounds = title.getBoundingClientRect()
        title.style.setProperty('--title-reveal-x', `${event.clientX - titleBounds.left}px`)
        title.style.setProperty('--title-reveal-y', `${event.clientY - titleBounds.top}px`)
      }

      element.classList.add('is-visible')
    }

    const move = (event) => revealAt(event)
    const press = (event) => revealAt(event)
    const leave = (event) => {
      // Touch screens have no hover state, so keep the portrait visible after a tap.
      if (event.pointerType !== 'touch') element.classList.remove('is-visible')
    }

    hero.addEventListener('pointermove', move)
    hero.addEventListener('pointerdown', press)
    hero.addEventListener('pointerleave', leave)

    return () => {
      hero.removeEventListener('pointermove', move)
      hero.removeEventListener('pointerdown', press)
      hero.removeEventListener('pointerleave', leave)
    }
  }, [])

  return <div className="reveal-image" ref={reveal} aria-hidden="true" />
}

function ParticleField() {
  const points = useRef(null)
  const { pointer } = useThree()

  const { positions, anchors, radii } = useMemo(() => {
    const count = 2100
    const current = new Float32Array(count * 3)
    const base = new Float32Array(count * 3)
    const ringRadii = new Float32Array(count)

    for (let i = 0; i < count; i += 1) {
      const ring = Math.floor(Math.random() * 13)
      const radius = 0.85 + ring * 0.24 + (Math.random() - 0.5) * 0.1
      const angle = Math.random() * Math.PI * 2 + ring * 0.16
      const depth = (Math.random() - 0.5) * 0.22

      current[i * 3] = base[i * 3] = Math.cos(angle) * radius
      current[i * 3 + 1] = base[i * 3 + 1] = Math.sin(angle) * radius
      current[i * 3 + 2] = base[i * 3 + 2] = depth + Math.sin(angle * 3 + ring) * 0.08
      ringRadii[i] = radius
    }

    return { positions: current, anchors: base, radii: ringRadii }
  }, [])

  useFrame((state, delta) => {
    if (!points.current) return

    const position = points.current.geometry.attributes.position.array
    const elapsed = state.clock.elapsedTime
    const mouseX = pointer.x * 3.5
    const mouseY = pointer.y * 2.4

    for (let i = 0; i < radii.length; i += 1) {
      const index = i * 3
      const radius = radii[i]
      const angle = Math.atan2(anchors[index + 1], anchors[index]) + elapsed * (0.07 + (i % 13) * 0.002)
      const targetX = Math.cos(angle) * radius
      const targetY = Math.sin(angle) * radius
      const targetZ = anchors[index + 2] + Math.sin(elapsed * 0.7 + i) * 0.035
      const dx = position[index] - mouseX
      const dy = position[index + 1] - mouseY
      const distance = Math.sqrt(dx * dx + dy * dy) || 0.001
      const force = Math.max(0, 1 - distance / 1.45) ** 2 * 0.42
      const positionSpeed = Math.min(1, delta * 7)
      const depthSpeed = Math.min(1, delta * 5)

      position[index] += (targetX + (dx / distance) * force - position[index]) * positionSpeed
      position[index + 1] += (targetY + (dy / distance) * force - position[index + 1]) * positionSpeed
      position[index + 2] += (targetZ + force * 0.5 - position[index + 2]) * depthSpeed
    }

    points.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#aebcff"
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.88}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function HeroObject() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <ParticleField />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        enableDamping
        dampingFactor={0.04}
      />
    </>
  )
}

function OrbitControls({ enableZoom, enablePan, autoRotate, enableDamping, dampingFactor }) {
  const { camera, gl } = useThree()
  const controls = useMemo(() => {
    const instance = new ThreeOrbitControls(camera, gl.domElement)
    instance.enableZoom = enableZoom
    instance.enablePan = enablePan
    instance.autoRotate = autoRotate
    instance.enableDamping = enableDamping
    instance.dampingFactor = dampingFactor
    return instance
  }, [autoRotate, camera, dampingFactor, enableDamping, enablePan, enableZoom, gl])

  useEffect(() => () => controls.dispose(), [controls])

  useFrame(() => controls.update())
  return null
}

export default function Hero() {
  const setCtaHover = (isHovering) => {
    document.querySelector('.hero-page')?.classList.toggle('is-cta-hover', isHovering)
    document.querySelector('.nav')?.classList.toggle('is-hero-reveal', isHovering)
  }

  return (
    <section className="hero hero-page wrap" id="top">
      <RevealPortrait />

      <div className="hero-copy">
        <div className="hero-title-wrap">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
          >
            Hi, I&apos;m<br />
            <em>Jegadeeshwaran.</em>
          </motion.h1>
          <h1 className="hero-title-reveal" aria-hidden="true">
            Hi, I&apos;m<br />
            <em>Jegadeeshwaran.</em>
          </h1>
        </div>

        <motion.p
          className="hero-role"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
        >
          Developer <i>·</i> Product Builder <i>·</i> Founder
        </motion.p>
        <motion.p
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.72 }}
        >
          I design and build digital experiences that turn ideas into meaningful products.
        </motion.p>
        <motion.a
          className="text-link"
          href="#work"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
        >
          Explore my work <span>↘</span>
        </motion.a>
      </div>

      <div
        className="hero-visual"
        aria-label="Interactive particle field with hidden portrait reveal"
      >
        <Canvas camera={{ position: [0, 0, 5.4], fov: 42 }} dpr={[1, 1.5]}>
          <HeroObject />
        </Canvas>
      </div>
    </section>
  )
}
