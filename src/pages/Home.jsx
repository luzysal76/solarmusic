import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Home() {
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }}
        />
        {/* Music staff lines */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full opacity-5"
            style={{
              height: '1px',
              background: '#C9A84C',
              top: `${20 + i * 6}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className={`relative z-10 flex flex-col items-center text-center max-w-xl mx-auto transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Logo */}
        <div className="mb-8 fade-in-up">
          <img
            src={`${import.meta.env.BASE_URL}로고.png`}
            alt="SolLa Music"
            className="h-28 md:h-36 object-contain drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.4))' }}
          />
        </div>

        {/* Decorative line */}
        <div className="flex items-center gap-4 mb-6 fade-in-up-delay-1">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-sans">Classical Music</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
        </div>

        {/* Title */}
        <h1 className="fade-in-up-delay-2 font-serif text-3xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: '#FAF7F2' }}>
          MBTI로 만나는<br />
          <span className="gold-shimmer">나의 클래식 음악</span>
        </h1>

        {/* Subtitle */}
        <p className="fade-in-up-delay-3 text-cream/60 text-base md:text-lg mb-12 leading-relaxed font-serif-kr font-light">
          당신의 성격 유형에 맞는 클래식 음악을<br className="hidden md:block" />
          찾아드립니다
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate('/quiz/1')}
          className="fade-in-up-delay-4 relative group px-10 py-4 text-dark font-serif text-lg font-semibold tracking-wider transition-all duration-300 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #C9A84C, #E4C76B, #C9A84C)',
            clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
          }}
        >
          <span className="relative z-10">시작하기</span>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(135deg, #E4C76B, #C9A84C, #E4C76B)' }}
          />
        </button>

        {/* Subtitle under button */}
        <p className="mt-6 text-cream/30 text-sm font-sans fade-in-up-delay-4">
          4가지 질문으로 나의 클래식을 발견하세요
        </p>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: i === 0 ? '#C9A84C' : 'rgba(201,168,76,0.2)' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
