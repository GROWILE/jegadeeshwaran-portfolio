import { motion } from 'framer-motion'
import './About.css'

const highlights = [
  {
    title: 'MY MINDSET',
    content: <>Always curious.<br />Always learning.<br />Always building.</>,
  },
  {
    title: 'MY APPROACH',
    content: 'Combining thoughtful design, technology, and practical problem-solving.',
  },
  {
    title: 'MY VISION',
    content: 'Building digital products that create lasting value and make everyday work simpler.',
  },
]

const stats = [
  { id: 'experience', value: '02', label: <>years<br />experience</> },
  { id: 'projects', value: '02', label: <>Ongoing<br />Projects</> },
  { id: 'curiosity', value: '∞', label: <>curiosity for<br />what comes next</> },
]

export default function About() {
  return (
    <motion.section
      className="services about-section about-page wrap"
      id="about"
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8 }}
    >
      <div className="about-intro">
        <p className="section-kicker">A LITTLE ABOUT ME</p>
        <h2>
          Ideas into<br />
          <span>meaningful</span><br />
          experiences.
        </h2>
      </div>

      <div className="about-content">
        <p>
          I&apos;m someone who enjoys turning ideas into meaningful digital experiences.
          My interest lies at the intersection of technology, design, and business —
          where creativity meets practical solutions.
        </p>
        <p>
          My journey started with a curiosity about how websites and digital products
          work. Over time, that curiosity grew into a passion for building things,
          exploring new technologies, and creating solutions that make a difference.
        </p>
        <p>
          Today, I focus on developing modern web experiences, building digital
          products, and exploring ideas that have the potential to grow into something
          bigger.
        </p>
        <p>
          As the founder of Growile, I&apos;m working towards building a connected
          ecosystem of digital tools designed to simplify everyday workflows and solve
          real-world problems.
        </p>
        <p>
          I believe great products are built through curiosity, consistency, attention
          to detail, and a willingness to keep learning.
        </p>
        <p>
          For me, this is more than just writing code. It&apos;s about creating something
          valuable, making ideas happen, and continuously pushing what&apos;s possible.
        </p>

        <div className="about-highlights">
          {highlights.map((highlight) => (
            <article key={highlight.title}>
              <b>{highlight.title}</b>
              <h3>{highlight.content}</h3>
            </article>
          ))}
        </div>

      </div>
    </motion.section>
  )
}
