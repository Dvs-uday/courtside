import React from 'react'

export default function SuccessScreen({ bookingInfo, onBackToCourts }) {
  const { court, slot, guestName, bookingId } = bookingInfo

  return (
    <div className="success-page-container">
      <main className="success-card">
        <div className="success-icon-wrap" aria-hidden="true">
          <div className="success-checkmark">&#10003;</div>
        </div>

        <h1 className="success-title">Booking Confirmed!</h1>
        <p className="success-subtitle">
          See you on the court, <strong>{guestName}</strong>!
        </p>

        <div className="success-details-box">
          <div className="success-detail-row">
            <span className="detail-label">Booking Reference</span>
            <span className="detail-value detail-code">{bookingId}</span>
          </div>

          <div className="success-detail-row">
            <span className="detail-label">Court</span>
            <span className="detail-value">{court.name}</span>
          </div>

          <div className="success-detail-row">
            <span className="detail-label">Location</span>
            <span className="detail-value">{court.area}</span>
          </div>

          <div className="success-detail-row">
            <span className="detail-label">Time Slot</span>
            <span className="detail-value highlight-slot">{slot.time} (Today)</span>
          </div>

          <div className="success-detail-row">
            <span className="detail-label">Status</span>
            <span className="detail-value text-success">Confirmed &amp; Reserved</span>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-full"
          onClick={onBackToCourts}
        >
          &larr; Back to courts
        </button>
      </main>
    </div>
  )
}
