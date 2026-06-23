export default function ProgressBar({ currentStep, totalSteps = 4 }) {
  const stepLabels = ['에너지', '인식', '판단', '생활양식']

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      {/* Step labels */}
      <div className="flex justify-between mb-3">
        {stepLabels.map((label, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-500"
              style={{
                background: i < currentStep ? '#C9A84C' : i === currentStep - 1 ? '#C9A84C' : 'rgba(201,168,76,0.15)',
                color: i < currentStep ? '#1A1208' : 'rgba(201,168,76,0.5)',
                boxShadow: i === currentStep - 1 ? '0 0 12px rgba(201,168,76,0.5)' : 'none',
              }}
            >
              {i < currentStep - 1 ? '✓' : i + 1}
            </div>
            <span
              className="text-xs font-sans"
              style={{ color: i < currentStep ? '#C9A84C' : 'rgba(250,247,242,0.3)' }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Progress line */}
      <div className="relative h-0.5 bg-gold/10 rounded-full overflow-visible mt-1">
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            background: 'linear-gradient(90deg, #C9A84C, #E4C76B)',
            boxShadow: '0 0 8px rgba(201,168,76,0.6)',
          }}
        />
      </div>

      {/* Step counter */}
      <div className="text-right mt-2">
        <span className="text-xs font-sans text-gold/50">
          {currentStep} / {totalSteps}
        </span>
      </div>
    </div>
  )
}
