import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { shortsData } from '../data/shortsData'

export default function Home() {
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  // 홈에서 미리보기로 보여줄 4개
  const previewShorts = shortsData.slice(0, 4)

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
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full opacity-5"
            style={{ height: '1px', background: '#C9A84C', top: `${20 + i * 6}%` }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col items-center text-center w-full max-w-xl mx-auto transition-all duration-1000 ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Logo */}
        <div className="mb-8 fade-in-up">
          <img
            src={`${import.meta.env.BASE_URL}로고.png`}
            alt="SolLa Music"
            className="h-28 md:h-36 object-contain drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.4))' }}
          />
        </div>

        {/* Main Title — 골드 대형, 클릭 시 퀴즈 이동 */}
        <div
          onClick={() => navigate('/quiz/1')}
          className="fade-in-up-delay-1 cursor-pointer group select-none mb-3 w-full"
        >
          {/* 이모지 + 작은 레이블 */}
          <p className="text-cream/40 text-xs tracking-[0.35em] uppercase font-sans mb-3">
            🎼 &nbsp; S o l L a &nbsp; M u s i c
          </p>

          {/* 메인 골드 타이틀 */}
          <h1
            className="font-serif font-bold leading-tight transition-all duration-300 group-hover:scale-[1.02]"
            style={{
              fontSize: 'clamp(2rem, 8vw, 3.8rem)',
              color: '#C9A84C',
              textShadow: '0 0 40px rgba(201,168,76,0.5), 0 2px 8px rgba(0,0,0,0.8)',
            }}
          >
            MBTI로 만나는<br />
            <span style={{ color: '#E4C76B' }}>나의 클래식 음악</span>
          </h1>

          {/* 언더라인 장식 */}
          <div className="flex justify-center mt-3">
            <div
              className="h-0.5 rounded-full transition-all duration-500 group-hover:w-48"
              style={{
                width: '80px',
                background: 'linear-gradient(90deg, transparent, #C9A84C, #E4C76B, #C9A84C, transparent)',
              }}
            />
          </div>

          {/* 클릭 유도 힌트 */}
          <p className="text-gold/50 text-xs font-sans mt-2 tracking-widest group-hover:text-gold/80 transition-colors duration-200">
            탭하여 시작하기 ↓
          </p>
        </div>

        {/* Subtitle */}
        <p className="fade-in-up-delay-2 text-cream/50 text-sm md:text-base mb-10 leading-relaxed font-serif-kr font-light">
          당신의 성격 유형에 맞는 클래식 음악을 찾아드립니다
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

        <p className="mt-4 text-cream/30 text-sm font-sans fade-in-up-delay-4">
          4가지 질문으로 나의 클래식을 발견하세요
        </p>

        {/* ─── Shorts 섹션 ─── */}
        <div className="fade-in-up-delay-4 w-full mt-14">
          {/* 섹션 헤더 */}
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <div
                className="px-2 py-0.5 rounded-full text-xs font-sans font-semibold"
                style={{ background: 'rgba(255,0,0,0.15)', color: '#FF6B6B', border: '1px solid rgba(255,0,0,0.25)' }}
              >
                ▶ Shorts
              </div>
              <span className="text-cream/60 text-sm font-serif-kr">MBTI 클래식 미리듣기</span>
            </div>
            <button
              onClick={() => navigate('/shorts')}
              className="text-gold text-xs font-sans hover:underline transition-all"
            >
              전체 보기 →
            </button>
          </div>

          {/* 썸네일 가로 스크롤 */}
          <div className="grid grid-cols-4 gap-2.5">
            {previewShorts.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate('/shorts')}
                className="relative overflow-hidden rounded-xl group"
                style={{ aspectRatio: '9/16' }}
              >
                <img
                  src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                  alt={item.type}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`
                  }}
                />
                {/* dark overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, rgba(26,18,8,0.3) 0%, transparent 40%, rgba(26,18,8,0.75) 100%)' }}
                />
                {/* MBTI badge */}
                <div className="absolute top-2 left-0 right-0 flex justify-center">
                  <span
                    className="text-xs font-serif font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'linear-gradient(135deg,#C9A84C,#E4C76B)', color: '#1A1208' }}
                  >
                    {item.type}
                  </span>
                </div>
                {/* play icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(201,168,76,0.9)' }}
                  >
                    <svg className="w-3.5 h-3.5 ml-0.5" fill="#1A1208" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* 전체 보기 버튼 */}
          <button
            onClick={() => navigate('/shorts')}
            className="w-full mt-3 py-3 rounded-xl text-sm font-sans font-medium transition-all duration-200 hover:opacity-80 flex items-center justify-center gap-2"
            style={{
              background: 'rgba(201,168,76,0.07)',
              border: '1px solid rgba(201,168,76,0.18)',
              color: 'rgba(201,168,76,0.8)',
            }}
          >
            <span>전체 {shortsData.length}개 Shorts 보기</span>
            <span>→</span>
          </button>
        </div>
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
