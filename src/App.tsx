import { lazy, Suspense, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './styles.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

const HeroPage = lazy(() => import('./pages/Hero'))
const AboutPage = lazy(() => import('./pages/About'))
const ProjectsPage = lazy(() => import('./pages/Projects'))

function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = cursor.current
    if (!element) return undefined

    const move = (event: MouseEvent) => {
      element.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
    }

    const setHover = (event: Event) => {
      const target = event.target as HTMLElement
      element.classList.toggle('is-hovering', target.closest('a, article, button') !== null)
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', setHover)
    document.addEventListener('mouseout', setHover)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', setHover)
      document.removeEventListener('mouseout', setHover)
    }
  }, [])

  return (
    <div className="custom-cursor" ref={cursor} aria-hidden="true">
      <span />
    </div>
  )
}

function GithubIcon() {
  return (
    <a
      className="github-link"
      href="https://github.com/GROWILE?tab=repositories"
      target="_blank"
      rel="noreferrer"
      aria-label="Open GitHub repositories"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.84 2.8 1.31 3.48 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.45 11.45 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.57A12.01 12.01 0 0 0 24 12C24 5.37 18.63 0 12 0Z" />
      </svg>
    </a>
  )
}

function LinkedinIcon() {
  return (
    <a
      className="linkedin-link"
      href="https://www.linkedin.com/in/jegadeeshwaran-selvakumar-5583ab296?utm_source=share_via&utm_content=profile&utm_medium=member_android"
      target="_blank"
      rel="noreferrer"
      aria-label="Open LinkedIn profile"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.54 20.45H7.1V9H3.54v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
      </svg>
    </a>
  )
}

function Contact() {
  return (
    <motion.section
      className="contact wrap"
      id="contact"
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8 }}
    >
      <p className="section-kicker">HAVE A GOOD ONE?</p>
      <h2>
        Let&apos;s make<br />
        <em>something</em> happen<span className="dot">.</span>
      </h2>
      <a className="contact-link" href="mailto:jegadeeshwaran.growile@gmail.com">
        jegadeeshwaran.growile@gmail.com <span>↗</span>
      </a>
      <div className="contact-socials">
        <a
          className="whatsapp-link"
          href="https://wa.me/918754021440"
          target="_blank"
          rel="noreferrer"
          aria-label="Open WhatsApp chat"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L.2 24l6.4-1.7a11.8 11.8 0 0 0 5.5 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.3-6.2-3.5-8.4ZM12.1 21.7h-.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 8.5 4.7Zm5.4-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.7.1-.2.1-.4 0-.6 0-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5 4.5 1.9.8 2.6.9 3.5.7.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4Z" />
          </svg>
        </a>
        <GithubIcon />
        <LinkedinIcon />
      </div>
    </motion.section>
  )
}

function App() {
  return (
    <main>
      <CustomCursor />
      <Navbar />
      <Suspense fallback={<div className="page-loader" aria-label="Loading portfolio" />}>
        <HeroPage />
        <ProjectsPage />
        <AboutPage />
      </Suspense>
      <Contact />
      <Footer />
    </main>
  )
}

export default App
