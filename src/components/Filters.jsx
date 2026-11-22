import React from 'react'

export default function Filters({
  area,
  setArea,
  date,
  setDate,
  timeOfDay,
  setTimeOfDay,
  courtType,
  setCourtType,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  onReset
}) {
  const areas = ['Hyderabad', 'Vizag', 'Bengaluru']
  const dates = ['Today', 'Tomorrow']
  const times = ['All', 'Morning', 'Afternoon', 'Evening']
  const types = [
    { label: 'All', value: 'all' },
    { label: 'Indoor', value: 'indoor' },
    { label: 'Outdoor', value: 'outdoor' }
  ]

  return (
    <section className="filters-container" aria-label="Court filters">
      {/* Area Selector (Stand-in for Near You) */}
      <div className="filter-group-top">
        <div className="filter-item area-select-wrap">
          <label htmlFor="area-select" className="filter-label">
            Area (Location)
          </label>
          <select
            id="area-select"
            className="select-control"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          >
            {areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        {/* Sort selector */}
        <div className="filter-item sort-select-wrap">
          <label htmlFor="sort-select" className="filter-label">
            Sort by
          </label>
          <select
            id="sort-select"
            className="select-control"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="distance">Distance (Nearest first)</option>
            <option value="price">Price (Lowest first)</option>
            <option value="soonest">Soonest Available</option>
          </select>
        </div>
      </div>

      {/* Date chips */}
      <div className="filter-row">
        <span className="filter-label">Date:</span>
        <div className="chip-group" role="group" aria-label="Date selection">
          {dates.map((d) => (
            <button
              type="button"
              key={d}
              className={`chip ${date === d ? 'chip-active' : ''}`}
              onClick={() => setDate(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Time of day chips */}
      <div className="filter-row">
        <span className="filter-label">Time of Day:</span>
        <div className="chip-group" role="group" aria-label="Time of day selection">
          {times.map((t) => (
            <button
              type="button"
              key={t}
              className={`chip ${timeOfDay === t ? 'chip-active' : ''}`}
              onClick={() => setTimeOfDay(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Indoor/Outdoor toggle */}
      <div className="filter-row">
        <span className="filter-label">Type:</span>
        <div className="segmented-control" role="group" aria-label="Court type selection">
          {types.map((item) => (
            <button
              type="button"
              key={item.value}
              className={`segment-btn ${courtType === item.value ? 'segment-active' : ''}`}
              onClick={() => setCourtType(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Max Price slider */}
      <div className="filter-row price-slider-row">
        <div className="slider-header">
          <span className="filter-label">Max Price:</span>
          <span className="slider-val">₹{maxPrice}/hr</span>
        </div>
        <input
          type="range"
          min="400"
          max="1000"
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="range-input"
          aria-label="Maximum price per hour"
        />
        <div className="slider-limits">
          <span>₹400</span>
          <span>₹1000</span>
        </div>
      </div>

      <div className="filter-reset-wrap">
        <button type="button" className="btn-text-reset" onClick={onReset}>
          Reset all filters
        </button>
      </div>
    </section>
  )
}
