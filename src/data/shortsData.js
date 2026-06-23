import { mbtiResults } from './mbtiData'

export const shortsData = [
  { type: 'ENFP', videoId: 'gfqcJca_DIU', url: 'https://youtube.com/shorts/gfqcJca_DIU?feature=share' },
  { type: 'INTJ', videoId: 'Jq5BqkHQII0', url: 'https://youtube.com/shorts/Jq5BqkHQII0?feature=share' },
  { type: 'INFJ', videoId: 'ifDgK0ozDY8', url: 'https://youtube.com/shorts/ifDgK0ozDY8?feature=share' },
  { type: 'ISFJ', videoId: 'w65pgyqvoko', url: 'https://youtube.com/shorts/w65pgyqvoko?feature=share' },
  { type: 'INFJ', videoId: 'Lwk6sedpUgI', url: 'https://youtube.com/shorts/Lwk6sedpUgI?feature=share' },
  { type: 'ISTJ', videoId: 'HYm2R2TzqYU', url: 'https://youtube.com/shorts/HYm2R2TzqYU?feature=share' },
  { type: 'INFP', videoId: 'DqVTkSIxqeA', url: 'https://youtube.com/shorts/DqVTkSIxqeA?feature=share' },
  { type: 'ESTJ', videoId: 'gVYjFgUpeAw', url: 'https://youtube.com/shorts/gVYjFgUpeAw?feature=share' },
].map((item, idx) => ({
  ...item,
  id: `${item.type}-${idx}`,
  mbti: mbtiResults[item.type] || null,
}))
