import React, { useState, useEffect } from 'react'
import { useFlagsmith } from '@flagsmith/flagsmith/react'

export default function BookingPage({ court, slot: initialSlot, onBack, onBookingSuccess }) {
  const flagsmith = useFlagsmith()
  const [selectedSlot, setSelectedSlot] = useState(initialSlot)
  const [guestName, setGuestName] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const availableSlots = court.slots.filter((s) => s.open)

  // Flagsmith touchpoint 2: trackEvent('booking_started')
  // Fired ONCE per opening of the booking screen (via empty dependency array on mount).
  useEffect(() => {
    flagsmith.trackEvent('booking_started')
  }, [flagsmith])

  const handleConfirm = (e) => {
    e.preventDefault()
    if (!guestName.trim()) {
      setErrorMsg('Please enter your name to confirm the booking')
      return
    }

    // Flagsmith touchpoint 3: trackEvent('booking_completed')
    // Fired when the visitor confirms a booking (records conversion and court booking value)
    flagsmith.trackEvent('booking_completed', { value: court.pricePerHour })

    onBookingSuccess({
      court,
      slot: selectedSlot,
      guestName: guestName.trim(),
      bookingId: 'CS-' + Math.floor(100000 + Math.random() * 900000)
    })
  }

  return (
    <div className="booking-page-container">
      <header className="page-header">
        <button
          type="button"
          className="btn-back"
          onClick={onBack}
          aria-label="Back to courts search"
        >
          &larr; Back
        </button>
        <h1 className="page-title">Confirm Booking</h1>
        <div className="page-header-spacer" />
      </header>

      <main className="booking-main">
        {/* Booking Summary Card */}
        <section className="booking-summary-card">
          <div className="summary-court-badge">Pickleball Court</div>
          <h2 className="summary-court-name">{court.name}</h2>
          <p className="summary-location">
            {court.area} &bull; {court.distanceKm} km away &bull;{' '}
            {court.indoor ? 'Indoor' : 'Outdoor'}
          </p>

          <hr className="summary-divider" />

          {/* Reserved slot display & switcher if multiple slots open */}
          <div className="summary-row-block">
            <div className="summary-row">
              <span className="summary-label">Reserved Slot</span>
              <span className="summary-value highlight-slot">{selectedSlot.time} (Today)</span>
            </div>

            {availableSlots.length > 1 && (
              <div className="booking-slot-switcher">
                <span className="switcher-label">Change slot:</span>
                <div className="switcher-chips">
                  {availableSlots.map((s) => (
                    <button
                      key={s.time}
                      type="button"
                      className={`switcher-chip ${s.time === selectedSlot.time ? 'switcher-chip-active' : ''}`}
                      onClick={() => setSelectedSlot(s)}
                    >
                      {s.time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="summary-row">
            <span className="summary-label">Court Duration</span>
            <span className="summary-value">60 minutes</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Rate per hour</span>
            <span className="summary-value">₹{court.pricePerHour}</span>
          </div>

          <hr className="summary-divider" />

          <div className="summary-total-row">
            <span className="total-label">Total Payable</span>
            <span className="total-price">₹{court.pricePerHour}</span>
          </div>
        </section>

        {/* Guest Details Form */}
        <form className="booking-form" onSubmit={handleConfirm} noValidate>
          <div className="form-group">
            <label htmlFor="guest-name" className="form-label">
              Your Full Name <span className="required-star">*</span>
            </label>
            <input
              id="guest-name"
              type="text"
              className={`text-input ${errorMsg ? 'input-error' : ''}`}
              placeholder="e.g. Rahul Sharma"
              value={guestName}
              onChange={(e) => {
                setGuestName(e.target.value)
                if (errorMsg) setErrorMsg('')
              }}
              autoFocus
            />
            {errorMsg && <p className="error-text">{errorMsg}</p>}
          </div>

          <p className="demo-notice">
            Free simulated booking. No payment or card required.
          </p>

          <button type="submit" className="btn btn-confirm">
            Confirm booking &rarr;
          </button>
        </form>
      </main>
    </div>
  )
}
