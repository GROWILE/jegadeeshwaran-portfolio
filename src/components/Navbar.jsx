import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="nav wrap">
      <a className="logo" href="#top">
        Jegadeeshwaran S<span>.</span>
      </a>

      <div className="nav-links">
        <a href="#work">Projects</a>
        <a href="#about">About</a>
        <a className="nav-cta" href="#contact">
          Let&apos;s talk <span>↗</span>
        </a>
      </div>
    </nav>
  )
}
