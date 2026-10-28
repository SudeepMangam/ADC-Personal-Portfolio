import { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import './App.css'

type CardData = {
  id: string
  title: string
  subtitle: string
  date: string
  description: string
  link?: string
}


const experiences: CardData[] = [
  {
    id: 'nih',
    title: 'Intern at the NIH',
    subtitle: 'National Institutes of Health',
    date: 'Summer 2025',
    description:
      'Developed tools for exploring spatial single-cell datasets using Python, Shiny, and data visualization libraries.',
    link: 'https://github.com/FNLCR-DMAP/SPAC_Shiny',
  },
  {
    id: 'urtc',
    title: 'Research Presenter at MIT',
    subtitle: 'IEEE MIT URTC',
    date: '2026',
    description:
      'Presented research on an SE(3)-constrained recurrent language model designed to use constant-size inference state.',
    link: 'https://github.com/SudeepMangam/SE3Model'
  },
  {
    id: 'appdev',
    title: 'Web Dev Bootcamp',
    subtitle: 'App Dev Club @ UMD',
    date: '2026',
    description:
      'Developing full-stack engineering skills through React, TypeScript, and collaborative software projects.',
    link: 'https://github.com/SudeepMangam/App-Dev-Club-Web-Dev-Bootcamp-',
  },
]

const projects: CardData[] = [
  {
    id: 'se3',
    title: 'SE(3) Recurrent Language Model Paper',
    subtitle: 'Research Paper',
    date: '2026',
    description:
      'Developed a novel SE(3) constrainted SSM and published at IEEE MIT URTC',
    link: 'https://github.com/SudeepMangam/SE3Model'
  },
  {
    id: 'kan',
    title: 'KAN Architecture Paper',
    subtitle: 'Research Paper',
    date: '2025',
    description:
      'Compared Kolmogorov-Arnold Networks with traditional architectures for medical image classification.',
    link: 'https://www.techrxiv.org/doi/full/10.36227/techrxiv.175979362.28702856/v1'
  },
  {
    id: 'spac',
    title: 'Forest Fire Spread Model',
    subtitle: 'Project on Fire-Spread Modeling',
    date: '2026',
    description:
      'Modeled ambient and fire-induced airflow as vector fields and applied coordinate transformations between hex-grid and Cartesian space',
    link: '',
  },
]

function ProfilePicture() {
  const [failed, setFailed] = useState(false)

  return (
    <div className="picture portrait">
      {!failed ? (
        <img
          src="/profile.jpg"
          alt="Portrait of Sudeep"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="picture-placeholder">
          <span aria-hidden="true">✳</span>
          <small>ADD PROFILE PHOTO</small>
        </div>
      )}
    </div>
  )
}

function PortfolioCard({ item }: { item: CardData }) {
  return (
    <article className="portfolio-card">
      <div className="card-body">
        <div className="card-meta">
          <span>{item.subtitle}</span>
          <span>{item.date}</span>
        </div>

        <h3>{item.title}</h3>
        <p>{item.description}</p>

        {item.link && (
          <a
            href={item.link}
            className="card-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub ↗
          </a>
        )}
      </div>
    </article>
  )
}

function CardSection({
  id,
  eyebrow,
  title,
  items,
}: {
  id: string
  eyebrow: string
  title: string
  items: CardData[]
}) {
  return (
    <section className="section" id={id}>
      <div className="section-title-row">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>
            {title}
            <span className="title-period">.</span>
          </h2>
        </div>
      </div>

      <div className="card-grid">
        {items.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      return localStorage.getItem('portfolio-theme') === 'dark'
        ? 'dark'
        : 'light'
    } catch {
      return 'light'
    }
  })

  const [accent, setAccent] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-accent')
      return saved || 'orange'
    } catch {
      return 'orange'
    }
  })

  const [isGlitching, setIsGlitching] = useState(false)
  const glitchTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null
  )
  const glitchFrame = useRef<number | null>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme

    try {
      localStorage.setItem('portfolio-theme', theme)
    } catch {
      // Local storage may be unavailable
    }
  }, [theme])

  useEffect(() => {
    document.documentElement.dataset.accent = accent

    try {
      localStorage.setItem('portfolio-accent', accent)
    } catch {
      // Local storage may be unavailable
    }
  }, [accent])

  function triggerGlitch() {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    setIsGlitching(false)

    if (glitchTimeout.current !== null) {
      clearTimeout(glitchTimeout.current)
    }

    if (glitchFrame.current !== null) {
      cancelAnimationFrame(glitchFrame.current)
    }

    glitchFrame.current = requestAnimationFrame(() => {
      glitchFrame.current = requestAnimationFrame(() => {
        setIsGlitching(true)

        glitchTimeout.current = setTimeout(() => {
          setIsGlitching(false)
        }, 650)
      })
    })
  }

  useEffect(() => {
    return () => {
      if (glitchTimeout.current !== null) {
        clearTimeout(glitchTimeout.current)
      }

      if (glitchFrame.current !== null) {
        cancelAnimationFrame(glitchFrame.current)
      }
    }
  }, [])

  return (
    <div className="site-shell" id="top">
      {/* GREETING APPEARS AFTER 1 SECOND */}
      <div className="welcome-banner">
        <div className="page-container">
          <h1>
            Hey, I'm{' '}
            <button
              type="button"
              className={`glitch-name ${
                isGlitching ? 'glitch-active' : ''
              }`}
              data-text="Sudeep!"
              onMouseEnter={triggerGlitch}
              onClick={triggerGlitch}
              aria-label="Sudeep! Play glitch animation"
            >
              Sudeep!
            </button>
          </h1>
        </div>
      </div>

      {/* REST OF PAGE APPEARS AT 4 SECONDS */}
      <div className="delayed-content">
        <Navbar
          theme={theme}
          accent={accent}
          onToggleTheme={() =>
            setTheme((previous) =>
              previous === 'light' ? 'dark' : 'light'
            )
          }
          onChangeAccent={setAccent}
        />

        <main className="page-container">
          {/* ABOUT */}
          <section className="intro" id="about">
            <div className="intro-copy">
              <span className="eyebrow">
                About me
              </span>


              <p>
                I'm a Computer Science student at the
                University of Maryland, College Park,
                interested in the intersection of
                mathematics, artificial intelligence,
                and software development.
              </p>

              <p>
                My work ranges from writing front-end software from 
                an NIH dashboard, conducting novel research
                SE(3) constrained models and a publication and 
                presentation at MIT, to developing a
                fire simulation application dependent on 
                ambient and fire-induced airflow implemented 
                in vector hexgrids. I enjoy turning ideas into reality.
              </p>

              <a href="#experience" className="text-link">
                Explore my experience <span>↘</span>
              </a>
            </div>

            {/* THE ONLY PHOTO ON THE WEBSITE */}
            <div className="portrait-frame">
              <ProfilePicture />
              <span className="portrait-caption">
                ABOUT ME
              </span>
            </div>
          </section>

          {/* EXPERIENCE — NO PHOTOS */}
          <CardSection
            id="experience"
            eyebrow="WHAT I'VE DONE"
            title="Experience"
            items={experiences}
          />

          {/* PROJECTS — NO PHOTOS */}
          <CardSection
            id="projects"
            eyebrow="WHAT I'VE MADE"
            title="Projects & Papers"
            items={projects}
          />
        </main>

        {/* FOOTER */}
        <footer className="footer" id="contact">
          <div className="page-container footer-content">
            <div className="footer-links">
              <a
                href="https://github.com/SudeepMangam"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>

              <a
                href="https://www.linkedin.com/in/sudeep-mangam-5110063b4"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Résumé ↗
              </a>
            </div>

            <p>Made with love & code ♡</p>

            <a href="#top" className="footer-signature">
              © {new Date().getFullYear()} Sudeep Mangam ↑
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
