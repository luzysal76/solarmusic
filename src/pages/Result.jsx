import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { mbtiResults } from '../data/mbtiData'

function getYouTubeId(url) {
  const match = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  return match ? match[1] : null
}

export default function Result() {
  const { type } = useParams()
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const result = mbtiResults[type?.toUpperCase()]

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  if (!result) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center text-cream p-8">
        <p className="text-gold mb-4 text-xl font-serif">결과를 찾을 수 없습니다</p>
        <button
          onClick={() => navigate('/')}
          className="text-gold/60 hover:text-gold underline font-sans"
        >
          처음으로 돌아가기
        </button>
      </div>
    )
  }

  const videoId = getYouTubeId(result.youtubeUrl)
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null

  const handleRestart = () => {
    sessionStorage.removeItem('mbti_answers')
    navigate('/')
  }

  return (
    <div
      className={`min-h-screen bg-dark pb-16 transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6">
        <button
          onClick={handleRestart}
          className="text-gold/60 hover:text-gold transition-colors duration-200 flex items-center gap-2 text-sm font-sans"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          처음으로
        </button>
        <img
          src={`${import.meta.env.BASE_URL}로고.png`}
          alt="SolLa Music"
          className="h-8 object-contain"
        />
        <div className="w-16" />
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-4 pt-8">

        {/* Result announcement */}
        <div className="text-center mb-10 fade-in-up">
          <p className="text-gold/60 text-xs tracking-[0.4em] uppercase font-sans mb-3">당신의 유형은</p>
          <div
            className="inline-block px-6 py-2 rounded-full mb-4 font-serif text-sm font-semibold"
            style={{ background: 'rgba(201,168,76,0.12)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}
          >
            {result.title}
          </div>
          <h1 className="font-serif text-6xl md:text-8xl font-bold gold-shimmer mb-2">
            {result.type}
          </h1>
        </div>

        {/* Music card */}
        <div
          className="rounded-2xl overflow-hidden mb-6"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(201,168,76,0.2)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* YouTube thumbnail / player */}
          <div
            className="relative w-full overflow-hidden cursor-pointer group"
            style={{ aspectRatio: '16/9' }}
            onClick={() => setShowVideo(true)}
          >
            {showVideo && videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={result.piece}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <>
                {thumbnailUrl ? (
                  <img
                    src={thumbnailUrl}
                    alt={result.piece}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                    }}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #2A1E0A, #1A1208)' }}
                  >
                    <div className="text-gold/30 text-6xl">♪</div>
                  </div>
                )}
                {/* Dark overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(26,18,8,0.8) 0%, rgba(26,18,8,0.2) 60%, transparent 100%)' }}
                />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(201,168,76,0.9)', boxShadow: '0 0 30px rgba(201,168,76,0.5)' }}
                  >
                    <svg className="w-7 h-7 text-dark ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {/* YouTube label */}
                <div className="absolute bottom-3 right-3">
                  <div
                    className="text-xs font-sans px-2 py-1 rounded"
                    style={{ background: 'rgba(0,0,0,0.7)', color: '#FAF7F2' }}
                  >
                    YouTube에서 재생
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Music info */}
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-gold/60 text-xs tracking-widest uppercase font-sans mb-1">{result.composerEn}</p>
                <h2 className="font-serif text-xl md:text-2xl font-bold text-cream leading-tight">
                  {result.piece}
                </h2>
                <p className="text-cream/50 text-sm font-serif-kr mt-1">{result.composer}</p>
              </div>
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg"
                style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}
              >
                🎵
              </div>
            </div>

            {/* Description */}
            <p
              className="text-base leading-relaxed font-serif-kr border-l-2 pl-4 italic"
              style={{ color: 'rgba(250,247,242,0.7)', borderColor: 'rgba(201,168,76,0.4)' }}
            >
              {result.description}
            </p>
          </div>
        </div>

        {/* External YouTube link */}
        <a
          href={result.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl mb-4 transition-all duration-200 hover:opacity-80"
          style={{ background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.2)', color: '#FF6B6B' }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
          </svg>
          <span className="font-sans text-sm font-medium">YouTube에서 전체 감상하기</span>
        </a>

        {/* Share & Retry buttons */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <button
            onClick={() => {
              const text = `나의 MBTI는 ${result.type}!\n어울리는 클래식은 "${result.piece}" — ${result.composer}\n\nhttps://luzysal76.github.io/solarmusic/`
              if (navigator.share) {
                navigator.share({ title: 'SolLa Music', text })
              } else {
                navigator.clipboard.writeText(text).then(() => alert('클립보드에 복사되었습니다!'))
              }
            }}
            className="py-3.5 rounded-xl font-sans text-sm font-medium transition-all duration-200 hover:opacity-80"
            style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
          >
            📤 공유하기
          </button>
          <button
            onClick={() => navigate('/quiz/1')}
            className="py-3.5 rounded-xl font-sans text-sm font-medium transition-all duration-200 hover:opacity-80"
            style={{ background: 'rgba(250,247,242,0.06)', border: '1px solid rgba(250,247,242,0.1)', color: 'rgba(250,247,242,0.7)' }}
          >
            🔄 다시 하기
          </button>
        </div>

        {/* All types section */}
        <div className="mt-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gold/10" />
            <p className="text-cream/30 text-xs font-sans tracking-widest uppercase">모든 유형 보기</p>
            <div className="h-px flex-1 bg-gold/10" />
          </div>
          <AllTypesGrid currentType={type} />
        </div>
      </div>
    </div>
  )
}

function AllTypesGrid({ currentType }) {
  const navigate = useNavigate()
  const types = Object.keys(mbtiResults)

  return (
    <div className="grid grid-cols-4 gap-2">
      {types.map((t) => (
        <button
          key={t}
          onClick={() => navigate(`/result/${t}`)}
          className="py-2.5 rounded-lg text-sm font-serif font-semibold transition-all duration-200 hover:scale-105"
          style={{
            background: t === currentType?.toUpperCase()
              ? 'linear-gradient(135deg, #C9A84C, #E4C76B)'
              : 'rgba(255,255,255,0.04)',
            color: t === currentType?.toUpperCase() ? '#1A1208' : 'rgba(250,247,242,0.5)',
            border: t === currentType?.toUpperCase()
              ? '1px solid #C9A84C'
              : '1px solid rgba(201,168,76,0.08)',
            boxShadow: t === currentType?.toUpperCase() ? '0 0 12px rgba(201,168,76,0.3)' : 'none',
          }}
        >
          {t}
        </button>
      ))}
    </div>
  )
}
