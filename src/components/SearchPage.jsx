import React, { useState, useEffect, useMemo } from 'react'
import { useExperiment, useFlagsmith } from '@flagsmith/flagsmith/react'
import { courtsData } from '../data/courts'
import Filters from './Filters'
import CourtCard from './CourtCard'
import NudgeCard from './NudgeCard'

export default function SearchPage({ courts = courtsData, onBook, onVariationResolved }) {
  // Flagsmith touchpoint 1: useExperiment
  // Evaluates the 'court_discovery' flag and records exposure ($flag_exposure) for enrolled visitors.
  // Called ONLY here on the search/home page where the experiment UI is viewed.
  const flag = useExperiment('court_discovery')
  const flagsmith = useFlagsmith()

  // Graceful fallback if Flagsmith is unreachable or taking longer than expected
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimedOut(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Report variation label up to parent for the discreet footer
  useEffect(() => {
    if (flag) {
      onVariationResolved?.(flag.value || 'search_only')
    } else if (timedOut) {
      onVariationResolved?.('search_only (offline/fallback)')
    }
  }, [flag, timedOut, onVariationResolved])

  // Filter & Search states
  const [area, setArea] = useState('Hyderabad')
  const [date, setDate] = useState('Today')
  const [timeOfDay, setTimeOfDay] = useState('All')
  const [courtType, setCourtType] = useState('all')
  const [maxPrice, setMaxPrice] = useState(1000)
  const [sortBy, setSortBy] = useState('distance')

  const handleResetFilters = () => {
    setDate('Today')
    setTimeOfDay('All')
    setCourtType('all')
    setMaxPrice(1000)
    setSortBy('distance')
  }

  // Find nearest OPEN court in the currently selected area for the nudge card
  const nearestOpenCourtInfo = useMemo(() => {
    const openInArea = courts
      .filter((c) => c.area === area && c.slots.some((s) => s.open))
      .sort((a, b) => a.distanceKm - b.distanceKm)

    if (openInArea.length === 0) return null

    const court = openInArea[0]
    const slot = court.slots.find((s) => s.open)
    return { court, slot }
  }, [courts, area])

  // Filter courts for the list
  const filteredCourts = useMemo(() => {
    return courts
      .filter((court) => {
        // Area filter
        if (court.area !== area) return false

        // Type filter
        if (courtType === 'indoor' && !court.indoor) return false
        if (courtType === 'outdoor' && court.indoor) return false

        // Max price filter
        if (court.pricePerHour > maxPrice) return false

        // Time of day filter (if specific time chosen, check slots matching window)
        if (timeOfDay !== 'All') {
          const hasMatchingSlot = court.slots.some((s) => {
            const isPM = s.time.includes('PM')
            const hour = parseInt(s.time.split(':')[0], 10)
            const militaryHour = isPM && hour !== 12 ? hour + 12 : !isPM && hour === 12 ? 0 : hour

            if (timeOfDay === 'Morning') return militaryHour < 12
            if (timeOfDay === 'Afternoon') return militaryHour >= 12 && militaryHour < 17
            if (timeOfDay === 'Evening') return militaryHour >= 17
            return true
          })
          if (!hasMatchingSlot) return false
        }

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'distance') {
          return a.distanceKm - b.distanceKm
        }
        if (sortBy === 'price') {
          return a.pricePerHour - b.pricePerHour
        }
        if (sortBy === 'soonest') {
          const aFirstOpen = a.slots.find((s) => s.open)
          const bFirstOpen = b.slots.find((s) => s.open)
          if (aFirstOpen && !bFirstOpen) return -1
          if (!aFirstOpen && bFirstOpen) return 1
          if (!aFirstOpen && !bFirstOpen) return 0
          return a.distanceKm - b.distanceKm
        }
        return 0
      })
  }, [courts, area, courtType, maxPrice, timeOfDay, sortBy])

  // While flag is null and not timed out, show a loading skeleton to prevent UI flicker
  const isFlagLoading = flag === null && !timedOut
  if (isFlagLoading) {
    return (
      <div className="search-page-container">
        <header className="app-header">
          <div className="brand">
            <h1 className="logo">Courtside</h1>
            <p className="tagline">Find and book pickleball courts near you</p>
          </div>
        </header>

        <main className="main-content">
          <div className="skeleton skeleton-banner" aria-label="Loading experiment..." />
          <div className="skeleton skeleton-filters" />
          <div className="court-grid">
            <div className="skeleton skeleton-card" />
            <div className="skeleton skeleton-card" />
            <div className="skeleton skeleton-card" />
          </div>
        </main>
      </div>
    )
  }

  // Flag evaluation: only show nudge card if flag value is explicitly 'nearby_nudge'
  // Control ('search_only') or anything else renders standard search only
  const showNearbyNudge = flag?.value === 'nearby_nudge'

  return (
    <div className="search-page-container">
      <header className="app-header">
        <div className="brand">
          <div className="logo-row">
            <span className="logo-ball" aria-hidden="true">&#9679;</span>
            <h1 className="logo">Courtside</h1>
          </div>
          <p className="tagline">Find and book pickleball courts near you</p>
        </div>
      </header>

      <main className="main-content">
        {/* VARIATION ONLY: Prominent nearby nudge card pinned above filters */}
        {showNearbyNudge && nearestOpenCourtInfo && (
          <NudgeCard
            court={nearestOpenCourtInfo.court}
            slot={nearestOpenCourtInfo.slot}
            onBook={onBook}
          />
        )}

        {/* Search & Filters */}
        <Filters
          area={area}
          setArea={setArea}
          date={date}
          setDate={setDate}
          timeOfDay={timeOfDay}
          setTimeOfDay={setTimeOfDay}
          courtType={courtType}
          setCourtType={setCourtType}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onReset={handleResetFilters}
        />

        {/* Court Results List */}
        <section className="court-results-section" aria-label="Courts list">
          <div className="results-header">
            <h2 className="results-count">
              Available Courts in {area} ({filteredCourts.length})
            </h2>
            <span className="results-badge">{date}</span>
          </div>

          {filteredCourts.length === 0 ? (
            <div className="empty-results-card">
              <p className="empty-title">No courts match your filters</p>
              <p className="empty-subtitle">
                Try widening your price range or clearing time-of-day filters.
              </p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleResetFilters}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="court-grid">
              {filteredCourts.map((court) => (
                <CourtCard key={court.id} court={court} onBook={onBook} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
