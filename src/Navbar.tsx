
import { useState } from 'react'

type NavbarProps = {
  theme: 'light' | 'dark'
  accent: string
  onToggleTheme: () => void
  onChangeAccent: (accent: string) => void
}

const colors = [
  { name: 'Orange', value: 'orange', hex: '#e18b66' },
  { name: 'Blue', value: 'blue', hex: '#6699e8' },
  { name: 'Purple', value: 'purple', hex: '#a78bfa' },
  { name: 'Green', value: 'green', hex: '#65b99a' },
  { name: 'Pink', value: 'pink', hex: '#ec8cba' },
]

function Navbar({
  theme,
  accent,
  onToggleTheme,
  onChangeAccent,
}: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [showColors, setShowColors] = useState(false)

  return (
    <header className="site-header">
      <nav
        className="page-container navbar"
        aria-label="Main navigation"
      >
        <a
          href="#top"
          className="wordmark"
          onClick={() => setOpen(false)}
        >
          Sudeep
        </a>

        <button
          type="button"
          className="mobile-menu"
          onClick={() => setOpen((previous) => !previous)}
          aria-expanded={open}
          aria-controls="nav-links"
        >
          {open ? 'Close ✕' : 'Menu ☰'}
        </button>

        <div
          id="nav-links"
          className={`nav-links ${open ? 'is-open' : ''}`}
        >
          <a href="#about" onClick={() => setOpen(false)}>
            About
          </a>

          <a href="#experience" onClick={() => setOpen(false)}>
            Experience
          </a>

          <a href="#projects" onClick={() => setOpen(false)}>
            Projects
          </a>

          <a href="#contact" onClick={() => setOpen(false)}>
            Contact
          </a>

          {/* ACCENT COLOR CHANGER */}
          <div className="color-picker-wrapper">
            <button
              type="button"
              className="color-toggle"
              onClick={() =>
                setShowColors((previous) => !previous)
              }
              aria-expanded={showColors}
              aria-controls="color-popover"
            >
              Colors
            </button>

            {showColors && (
              <div className="color-popover" id="color-popover">

                <div className="color-options">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      className={`color-swatch ${
                        accent === color.value ? 'selected' : ''
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      aria-label={`Use ${color.name}`}
                      aria-pressed={accent === color.value}
                      onClick={() => {
                        onChangeAccent(color.value)
                        setShowColors(false)
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* LIGHT / DARK SWITCH */}
          <button
            type="button"
            className="theme-button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${
              theme === 'light' ? 'dark' : 'light'
            } mode`}
          >
            <span aria-hidden="true">
              {theme === 'light' ? '☾' : '☀'}
            </span>
            <span>
              {theme === 'light' ? 'Dark' : 'Light'}
            </span>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
