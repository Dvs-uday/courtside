import React, { useState, useEffect } from 'react'

export default function CourtCard({ court, onBook }) {
  const openSlots = court.slots.filter((s) => s.open)
  const isOpen = openSlots.length > 0

  // Default selected slot to the first available open slot
  const [selectedSlotTime, setSelectedSlotTime] = useState(openSlots[0]?.time || null)

  // Keep selected slot valid if slots change (e.g. after booking in this tab)
  useEffect(() => {
    if (!openSlots.some((s) => s.time === selectedSlotTime)) {
      setSelectedSlotTime(openSlots[0]?.time || null)
    }
  }, [court.slots])

  const selectedSlot =
    court.slots.find((s) => s.time === selectedSlotTime && s.open) ||
    openSlots[0] ||
    null

  return (
    <article className={`court-card ${isOpen ? 'is-open' : 'is-booked'}`}>
      <div className="court-card-header">
        <div>
          <h3 className="court-name">{court.name}</h3>
          <p className="court-location">
            {court.area} &bull; {court.distanceKm} km away
          </p>
        </div>
        <span className={`status-badge ${isOpen ? 'badge-open' : 'badge-booked'}`}>
          {isOpen ? 'Open' : 'Booked'}
        </span>
      </div>

      <div className="court-card-body">
        <div className="court-amenity">
          <span className="amenity-tag">
            {court.indoor ? 'Indoor Court' : 'Outdoor Court'}
          </span>
          <span className="court-price">
            <strong>₹{court.pricePerHour}</strong> / hr
          </span>
        </div>

        {/* Time slot selector for manual booking */}
        <div className="court-slots-container">
          <div className="slot-section-header">
            <span className="slot-section-title">Select Time Slot:</span>
            {isOpen && (
              <span className="slot-open-count">
                {openSlots.length} available
              </span>
            )}
          </div>

          <div className="slot-chips-grid" role="group" aria-label="Available time slots">
            {court.slots.map((s) => {
              const isSelected = selectedSlot?.time === s.time

              if (!s.open) {
                return (
                  <button
                    key={s.time}
                    type="button"
                    className="slot-chip slot-chip-booked"
                    disabled
                    title={`${s.time} is already booked`}
                  >
                    <span className="slot-chip-time">{s.time}</span>
                    <span className="slot-chip-tag">Booked</span>
                  </button>
                )
              }

              return (
                <button
                  key={s.time}
                  type="button"
                  className={`slot-chip slot-chip-open ${isSelected ? 'slot-chip-selected' : ''}`}
                  onClick={() => setSelectedSlotTime(s.time)}
                  aria-pressed={isSelected}
                  title={`Select ${s.time}`}
                >
                  <span className="slot-chip-time">{s.time}</span>
                  <span className="slot-chip-tag">{isSelected ? '✓ Picked' : 'Available'}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="court-card-footer">
        {isOpen && selectedSlot ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onBook(court, selectedSlot)}
          >
            Book Slot ({selectedSlot.time}) &rarr;
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-disabled"
            disabled
          >
            No Open Slots
          </button>
        )}
      </div>
    </article>
  )
}
