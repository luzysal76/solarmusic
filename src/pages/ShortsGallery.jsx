import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { shortsData } from '../data/shortsData'

function ShortsCard({ item, priority = false }) {
  const navigate = useNavigate()
  const [playing, setPlaying] = useState(false)
  const [thumbError, setThumbError] = useState(false)

  const thumb = thumbError
    ? `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`

  return (
    <div className="flex flex-col gap-2">
      {/* Vertical card */}
      <div
        className="relative overflow-hidden rounded-2xl cursor-pointer group"
        style={{ aspectRatio: '9/16' }}
        onClick={() => setPlaying(true)}
      >
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0&playsinline=1`}
            title={item.mbti?.piece || item.type}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
          />
        ) : (
          <>
            {/* Thumbnail */}
            <img
              src={thumb}
              alt={item.mbti?.piece || item.type}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setThumbError(true)}
            />

            {/* Gradient overlays */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(26,18,8,0.5) 0%, transparent 35%, transparent 55%, rgba(26,18,8,0.85) 100%)',
              }}
            />

            {/* MBTI badge — top left */}
            <div className="absolute top-3 left-3">
              <div
                className="px-2.5 py-1 rounded-full text-xs font-serif font-bold"
                style={{ background: 'linear-gradient(135deg,#C9A84C,#E4C76B)', color: '#1A1208' }}
              >
                {item.type}
              </div>
            </div>

            {/* Shorts badge — top right */}
            <div className="absolute top-3 right-3">
              <div
                className="px-2 py-0.5 rounded-full text-xs font-sans font-semibold"
                style={{ background: 'rgba(255,0,0,0.85)', color: '#fff' }}
              >
                ▶ Shorts
              </div>
            </div>

            {/* Play button — center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: 'rgba(201,168,76,0.88)', boxShadow: '0 0 24px rgba(201,168,76,0.5)' }}
              >
                <svg className="w-5 h-5 ml-0.5" fill="#1A1208" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Piece name — bottom */}
            {item.mbti && (
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-cream/90 text-xs font-serif leading-snug line-clamp-2">
                  {item.mbti.piece}
                </p>
                <p className="text-gold/70 text-xs font-sans mt-0.5 truncate">
                  {item.mbti.composer}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Below card: navigate to result */}
      <button
        onClick={() => navigate(`/result/${item.type}`)}
        className="w-full py-2 rounded-xl text-xs font-sans font-medium transition-all duration-200 hover:opacity-80"
        style={{
          background: 'rgba(201,168,76,0.08)',
          border: '1px solid rgba(201,168,76,0.2)',
          color: '#C9A84C',
        }}
      >
        {item.type} 결과 보기 →
      </button>
    </div>
  )
}

export default function ShortsGallery() {
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className={`min-h-screen bg-dark pb-20 transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <button
          onClick={() => navigate('/')}
          className="text-gold/60 hover:text-gold transition-colors duration-200 flex items-center gap-2 text-sm font-sans"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          홈으로
        </button>
        <img
          src={`${import.meta.env.BASE_URL}로고.png`}
          alt="SolLa Music"
          className="h-8 object-contain"
        />
        <div className="w-14" />
      </div>

      {/* Hero */}
      <div className="text-center px-5 pt-6 pb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="text-gold/60 text-xs tracking-[0.35em] uppercase font-sans">SolLa Music</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/50" />
        </div>
        <h1 className="font-serif text-2xl md:text-4xl font-bold text-cream mb-2">
          MBTI 클래식 <span className="gold-shimmer">Shorts</span>
        </h1>
        <p className="text-cream/40 text-sm font-sans">
          나의 유형을 탭해서 클래식을 미리 들어보세요
        </p>
      </div>

      {/* Grid */}
      <div className="px-4 max-w-2xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {shortsData.map((item, idx) => (
            <ShortsCard key={item.id} item={item} priority={idx < 4} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12 px-5">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-gold/10" />
          <span className="text-cream/20 text-xs font-sans">나의 MBTI를 모른다면?</span>
          <div className="h-px flex-1 bg-gold/10" />
        </div>
        <button
          onClick={() => navigate('/quiz/1')}
          className="inline-flex items-center gap-2 px-8 py-3.5 font-serif text-dark font-semibold rounded-xl transition-all duration-200 hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #C9A84C, #E4C76B)' }}
        >
          MBTI 퀴즈 하러 가기 →
        </button>
      </div>
    </div>
  )
}
