import React from 'react'

export default function Footer({ variation }) {
  const displayVariation = variation || 'evaluating...'

  return (
    <footer className="app-footer" aria-label="Demo notice and experiment status">
      <div className="footer-content">
        <span className="footer-pill">
          <span className="footer-pill-dot" aria-hidden="true" />
          Experiment: <strong>{displayVariation}</strong>
        </span>
        <span className="footer-note">Demo data. Courts are simulated.</span>
      </div>
    </footer>
  )
}
