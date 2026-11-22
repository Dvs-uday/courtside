import React from 'react'

export default function NudgeCard({ court, slot, onBook }) {
  if (!court || !slot) return null

  return (
    <aside className="nudge-card" aria-label="Recommended court near you">
      <div className="nudge-badge-row">
        <span className="nudge-badge">
          <span className="nudge-pulse" aria-hidden="true"></span>
          Court available near you
        </span>
        <span className="nudge-distance">{court.distanceKm} km away</span>
      </div>

      <div className="nudge-content">
        <div className="nudge-details">
          <h2 className="nudge-title">Court 3 at {court.name} is free at {slot.time}</h2>
          <p className="nudge-meta">
            {court.indoor ? 'Indoor Court' : 'Outdoor Court'} &bull; {court.area} &bull; <strong className="nudge-price">₹{court.pricePerHour}/hr</strong>
          </p>
        </div>

        <button
          type="button"
          className="btn btn-nudge"
          onClick={() => onBook(court, slot)}
        >
          Book now &rarr;
        </button>
      </div>
    </aside>
  )
}
