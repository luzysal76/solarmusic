import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { quizSteps } from '../data/mbtiData'
import ProgressBar from '../components/ProgressBar'

export default function Quiz() {
  const { step } = useParams()
  const navigate = useNavigate()
  const stepNum = parseInt(step)
  const currentStep = quizSteps[stepNum - 1]
  const [selected, setSelected] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [pageIn, setPageIn] = useState(false)

  useEffect(() => {
    setSelected(null)
    setPageIn(false)
    const t = setTimeout(() => setPageIn(true), 50)
    return () => clearTimeout(t)
  }, [stepNum])

  if (!currentStep) {
    navigate('/')
    return null
  }

  const handleSelect = (letter) => {
    if (animating) return
    setSelected(letter)
    setAnimating(true)

    setTimeout(() => {
      // Save answer to sessionStorage
      const answers = JSON.parse(sessionStorage.getItem('mbti_answers') || '{}')
      answers[currentStep.dimension] = letter
      sessionStorage.setItem('mbti_answers', JSON.stringify(answers))

      if (stepNum < 4) {
        navigate(`/quiz/${stepNum + 1}`)
      } else {
        // Build MBTI type
        const type =
          (answers.EI || letter) +
          (answers.SN || '') +
          (answers.TF || '') +
          (answers.JP || '')
        navigate(`/result/${type}`)
      }
      setAnimating(false)
    }, 600)
  }

  const handleBack = () => {
    if (stepNum > 1) {
      navigate(`/quiz/${stepNum - 1}`)
    } else {
      navigate('/')
    }
  }

  const CardSide = ({ side, isSelected }) => (
    <div
      onClick={() => handleSelect(side.letter)}
      className={`
        relative flex flex-col items-center justify-center
        rounded-2xl p-8 md:p-10 cursor-pointer
        transition-all duration-300 select-none
        min-h-[340px] md:min-h-[420px]
        ${isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'}
      `}
      style={{
        background: isSelected
          ? 'linear-gradient(145deg, rgba(201,168,76,0.18), rgba(201,168,76,0.08))'
          : 'rgba(255,255,255,0.03)',
        border: isSelected
          ? '2px solid #C9A84C'
          : '2px solid rgba(201,168,76,0.12)',
        boxShadow: isSelected
          ? '0 0 30px rgba(201,168,76,0.25), inset 0 0 30px rgba(201,168,76,0.05)'
          : '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      {/* Letter badge */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-5 text-3xl font-bold font-serif transition-all duration-300"
        style={{
          background: isSelected
            ? 'linear-gradient(135deg, #C9A84C, #E4C76B)'
            : 'rgba(201,168,76,0.08)',
          color: isSelected ? '#1A1208' : '#C9A84C',
          boxShadow: isSelected ? '0 0 20px rgba(201,168,76,0.4)' : 'none',
        }}
      >
        {side.letter}
      </div>

      {/* Emoji */}
      <div className="text-4xl mb-4">{side.emoji}</div>

      {/* Label */}
      <h3
        className="font-serif text-xl mb-5 font-semibold"
        style={{ color: isSelected ? '#C9A84C' : '#FAF7F2' }}
      >
        {side.label}
      </h3>

      {/* Keywords */}
      <div className="flex flex-col gap-2 w-full">
        {side.keywords.map((kw, i) => (
          <div
            key={i}
            className="text-center text-sm py-1 rounded-full transition-all duration-300"
            style={{
              color: isSelected ? 'rgba(201,168,76,0.9)' : 'rgba(250,247,242,0.5)',
              background: isSelected ? 'rgba(201,168,76,0.08)' : 'transparent',
            }}
          >
            {kw}
          </div>
        ))}
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div
          className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center text-dark text-xs font-bold"
          style={{ background: '#C9A84C' }}
        >
          ✓
        </div>
      )}
    </div>
  )

  return (
    <div
      className={`min-h-screen bg-dark flex flex-col transition-all duration-500 ${pageIn ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-2">
        <button
          onClick={handleBack}
          className="text-gold/60 hover:text-gold transition-colors duration-200 flex items-center gap-2 text-sm font-sans"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          이전
        </button>
        <div className="flex items-center gap-2">
          <img
            src={`${import.meta.env.BASE_URL}로고.png`}
            alt="SolLa Music"
            className="h-8 object-contain"
          />
        </div>
        <div className="w-12" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 max-w-2xl mx-auto w-full">
        <ProgressBar currentStep={stepNum} totalSteps={4} />

        {/* Question */}
        <div className="text-center mb-8">
          <p className="text-gold/60 text-xs tracking-[0.3em] uppercase font-sans mb-2">
            Step {stepNum} — {currentStep.dimension.split('').join(' vs ')}
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-cream font-semibold">
            {currentStep.question}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <CardSide
            side={currentStep.left}
            isSelected={selected === currentStep.left.letter}
          />
          <CardSide
            side={currentStep.right}
            isSelected={selected === currentStep.right.letter}
          />
        </div>

        {/* Hint */}
        <p className="mt-6 text-cream/25 text-xs font-sans text-center">
          카드를 선택하면 다음 단계로 이동합니다
        </p>
      </div>
    </div>
  )
}
