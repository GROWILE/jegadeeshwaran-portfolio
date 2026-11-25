import { motion } from 'framer-motion'
import './Projects.css'

const projects = [
  {
    number: '01',
    title: 'MJ Catering',
    type: 'Web experience / 2026',
    color: 'blue',
    detail: 'A polished digital experience for memorable catering and events.',
    url: 'https://mj-catering-wheat.vercel.app',
  },
  {
    number: '02',
    title: 'Invoice Generator',
    type: 'Product tool / 2026',
    color: 'orange',
    detail: 'A simple workflow for creating professional invoices in seconds.',
    url: 'https://growile.com/invoice',
  },
  {
    number: '03',
    title: 'PDF Tools',
    type: 'Utility platform / 2026',
    color: 'blue',
    detail: 'Useful PDF utilities designed to keep everyday work moving.',
    url: 'https://growile.com/pdf',
  },
  {
    number: '04',
    title: 'Growile',
    type: 'Digital product / 2026',
    color: 'orange',
    detail: 'A focused product experience built for sustainable growth.',
    url: 'https://growile.com/',
  },
]

export default function Projects() {
  return (
    <motion.section
      className="work projects-page wrap"
      id="work"
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8 }}
    >
      <div className="section-head">
        <p className="section-kicker">PROJECTS LIST</p>
        <p className="muted">(04 PROJECTS)</p>
      </div>

      <div className="project-list">
        {projects.map((project, index) => (
          <motion.a
            className={`project ${project.color}`}
            key={project.number}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, delay: index * 0.12 }}
            whileHover={{
              x: 10,
              y: -5,
              rotateX: 2.5,
              rotateY: -2.5,
              scale: 1.012,
            }}
            style={{ transformPerspective: 1000 }}
          >
            <div className="project-number">{project.number}</div>
            <div className="project-title">
              <h3>{project.title}</h3>
              <p>{project.type}</p>
            </div>
            <p className="project-detail">{project.detail}</p>
            <span className="project-arrow">↗</span>
          </motion.a>
        ))}
      </div>
    </motion.section>
  )
}
