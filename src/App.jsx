import React, { useState, useEffect } from 'react'
import { useFlagsmith } from '@flagsmith/flagsmith/react'
import { courtsData } from './data/courts'
import SearchPage from './components/SearchPage'
import BookingPage from './components/BookingPage'
import SuccessScreen from './components/SuccessScreen'
import Footer from './components/Footer'

export default function App() {
  const flagsmith = useFlagsmith()

  // In-memory courts state for this tab session (no DB/localStorage needed)
  const [courts, setCourts] = useState(courtsData)

  // Screen routing state: 'search' | 'booking' | 'success'
  const [currentScreen, setCurrentScreen] = useState('search')
  const [selectedCourtAndSlot, setSelectedCourtAndSlot] = useState(null)
  const [completedBooking, setCompletedBooking] = useState(null)

  // Variation label reported up from SearchPage where useExperiment is called
  const [variation, setVariation] = useState(null)

  // Flush buffered events when the page is hidden (Flagsmith rule)
  useEffect(() => {
    const handlePageHide = () => {
      if (flagsmith && typeof flagsmith.flushEvents === 'function') {
        flagsmith.flushEvents()
      }
    }
    window.addEventListener('pagehide', handlePageHide)
    return () => {
      window.removeEventListener('pagehide', handlePageHide)
    }
  }, [flagsmith])

  const handleStartBooking = (court, slot) => {
    setSelectedCourtAndSlot({ court, slot })
    setCurrentScreen('booking')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBookingSuccess = (bookingInfo) => {
    // Mark the booked slot as closed/booked in this tab's memory state
    setCourts((prevCourts) =>
      prevCourts.map((c) => {
        if (c.id !== bookingInfo.court.id) return c
        return {
          ...c,
          slots: c.slots.map((s) =>
            s.time === bookingInfo.slot.time ? { ...s, open: false } : s
          )
        }
      })
    )
    setCompletedBooking(bookingInfo)
    setCurrentScreen('success')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToCourts = () => {
    setSelectedCourtAndSlot(null)
    setCompletedBooking(null)
    setCurrentScreen('search')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app-layout">
      <div className="app-body">
        {currentScreen === 'search' && (
          <SearchPage
            courts={courts}
            onBook={handleStartBooking}
            onVariationResolved={setVariation}
          />
        )}

        {currentScreen === 'booking' && selectedCourtAndSlot && (
          <BookingPage
            court={selectedCourtAndSlot.court}
            slot={selectedCourtAndSlot.slot}
            onBack={handleBackToCourts}
            onBookingSuccess={handleBookingSuccess}
          />
        )}

        {currentScreen === 'success' && completedBooking && (
          <SuccessScreen
            bookingInfo={completedBooking}
            onBackToCourts={handleBackToCourts}
          />
        )}
      </div>

      <Footer variation={variation} />
    </div>
  )
}
