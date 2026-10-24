import './style.css'
import { TRACKS } from './tracks'
import type { Q, Lesson, Track } from './types'

type Row = { icon: string; name: string; pts: number; lang?: string }
type St = {
  icon: string; name: string; cur: string
  fin: Record<string, number>
  passed: Record<string, boolean>; tries: Record<string, number>
  board: Row[]
  streak: { n: number; last: string }
  today: { d: string; n: number }
  mute: boolean; badges: Record<string, boolean>; theme: string
}

const KEY = 'bulut-akademi-v1'
let S: St = { icon: '', name: '', cur: 'py', fin: {}, passed: {}, tries: {}, board: [], streak: { n: 0, last: '' }, today: { d: '', n: 0 }, mute: false, badges: {}, theme: '' }
try { S = { ...S, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') } } catch { /* yoksay */ }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)) } catch { /* yoksay */ } }

// Temalar: renkler style.css içinde. Burada sadece liste ve uygulama var.
type Voice = { wave: OscillatorType; k: number; len: number; bell: boolean }
type Theme = { id: string; name: string; desc: string; say: string; meta: string; paper: string[]; v: Voice }
const THEMES: Theme[] = [
  { id: 'standart', name: 'Standart', desc: 'Kareli defter hali. Telefonun koyu moddaysa o da koyu olur.', say: 'Klasik kareli defter. Bunu çok severim.', meta: '',
    paper: ['#6a3df0', '#ffc933', '#0f9d7a', '#ff5d7a', '#37a3ff'], v: { wave: 'triangle', k: 1, len: 1, bell: false } },
  { id: 'terminal', name: 'Retro terminal', desc: 'Siyah ekran, yeşil yazı. Sanki gerçekten hacklıyorsun.', say: 'Hacker modu. 01001000', meta: '#040906',
    paper: ['#2cff7d', '#ffb000', '#5cffb0', '#ff5470', '#b8ffd0'], v: { wave: 'square', k: 1, len: 0.8, bell: false } },
  { id: 'sunset', name: 'Gün batımı', desc: 'Turuncu, pembe ve sarı. Sıcacık bir tema.', say: 'Ne güzel renkler, tam akşam üstü.', meta: '#fff1e3',
    paper: ['#d6336c', '#ffb627', '#ff7a45', '#ff9ec4', '#7b2d8e'], v: { wave: 'sine', k: 0.84, len: 1.6, bell: false } },
  { id: 'pastel', name: 'Pastel şeker', desc: 'Pembe, mor ve nane yeşili. Kalem kutusu gibi.', say: 'Şeker gibi oldu, tatlı mı tatlı.', meta: '#fff6fb',
    paper: ['#7a56d6', '#ffc4e1', '#9ff0cf', '#c9bdf0', '#ffd5a0'], v: { wave: 'sine', k: 1.25, len: 1.2, bell: true } },
]
let paper = THEMES[0].paper
let voice = THEMES[0].v, curTheme = 'standart'
function applyTheme(id: string) {
  const t = THEMES.find(x => x.id === id) ?? THEMES[0]
  const root = document.documentElement
  if (t.id === 'standart') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', t.id)
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach(m => {
    if (!m.dataset.orig) m.dataset.orig = m.content
    m.content = t.meta || m.dataset.orig
  })
  paper = t.paper; voice = t.v; curTheme = t.id
}
applyTheme(S.theme)

const app = document.getElementById('app')!
const el = (tag: string, cls = '', html = '') => { const e = document.createElement(tag); if (cls) e.className = cls; e.innerHTML = html; return e }
const txt = (tag: string, cls: string, t: string) => { const e = el(tag, cls); e.textContent = t; return e }
const btn = (t: string, fn: () => void, cls = 'btn') => { const b = txt('button', cls, t) as HTMLButtonElement; b.onclick = fn; return b }
function pick<T>(a: T[]): T { return a[Math.floor(Math.random() * a.length)] }
const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
let page = ''
let tmr = 0
const stop = () => clearInterval(tmr)
const go = (fn: () => void) => () => { stop(); fn() }

// Klavye kısayolları: her ekran kendi onKey fonksiyonunu verir, show() sıfırlar
let onKey: ((e: KeyboardEvent) => void) | null = null
document.addEventListener('keydown', e => {
  if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return
  const t = e.target
  if (t instanceof HTMLInputElement) return
  if (t instanceof HTMLButtonElement && e.key === 'Enter') return
  onKey?.(e)
})

// Nova: yardımcı yıldız maskot. Sayfalar değişse de ekranda kalır.
type Mood = 'happy' | 'wink' | 'sad' | 'think' | 'wow' | 'cheer'
const INK = '#1d1830'
const NOVA_SVG = '<svg viewBox="0 0 100 100" aria-hidden="true">'
  + '<path class="tail" d="M16 76 L3 91 M27 86 L17 98" fill="none" stroke="#ffb300" stroke-width="5" stroke-linecap="round"/>'
  + `<polygon points="50.0,12.0 62.3,37.0 89.9,41.0 70.0,60.5 74.7,88.0 50.0,75.0 25.3,88.0 30.0,60.5 10.1,41.0 37.7,37.0" fill="#ffc933" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`
  + '<circle cx="35" cy="62" r="4" fill="#ff8fa3" opacity=".65"/><circle cx="65" cy="62" r="4" fill="#ff8fa3" opacity=".65"/>'
  + `<g fill="${INK}" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">`
  + '<g class="m m-happy"><circle class="eye" cx="42" cy="54" r="3.2" stroke="none"/><circle class="eye" cx="58" cy="54" r="3.2" stroke="none"/><path d="M44 62 Q50 69 56 62" fill="none"/></g>'
  + '<g class="m m-wink"><circle class="eye" cx="42" cy="54" r="3.2" stroke="none"/><path d="M54 55 Q58 50 62 55" fill="none"/><path d="M44 62 Q50 69 56 62" fill="none"/></g>'
  + '<g class="m m-cheer"><path d="M37 56 Q42 49 47 56" fill="none"/><path d="M53 56 Q58 49 63 56" fill="none"/><path d="M43 61 Q50 75 57 61 Z"/></g>'
  + '<g class="m m-sad"><circle class="eye" cx="42" cy="54" r="3.2" stroke="none"/><circle class="eye" cx="58" cy="54" r="3.2" stroke="none"/><path d="M44 67 Q50 60 56 67" fill="none"/><path d="M66 57 q3.5 5 0 8 q-3.5 -3 0 -8z" fill="#5cc8ff" stroke="none"/></g>'
  + '<g class="m m-think"><circle cx="43" cy="52" r="3.2" stroke="none"/><circle cx="59" cy="52" r="3.2" stroke="none"/><path d="M46 65 H55" fill="none"/><circle cx="84" cy="22" r="2.6" fill="#ffc933" stroke="none"/><circle cx="91" cy="11" r="3.8" fill="#ffc933" stroke="none"/></g>'
  + '<g class="m m-wow"><circle cx="42" cy="54" r="4.8" stroke="none"/><circle cx="58" cy="54" r="4.8" stroke="none"/><ellipse cx="50" cy="66" rx="3.6" ry="4.6" stroke="none"/><path d="M72 30 q3.5 5 0 8 q-3.5 -3 0 -8z" fill="#5cc8ff" stroke="none"/></g>'
  + '</g></svg>'
const mascotBtn = el('button', 'mascot', NOVA_SVG) as HTMLButtonElement
mascotBtn.type = 'button'; mascotBtn.dataset.mood = 'happy'
mascotBtn.setAttribute('aria-label', 'Nova, yardımcı yıldız. Tıkla, bir şey söylesin.')
const bubble = el('div', 'nova-bubble'); bubble.setAttribute('role', 'status')
const mascotBox = el('div', 'nova-box'); mascotBox.append(bubble, mascotBtn)
document.body.append(mascotBox)
let hushT = 0
function mood(m: Mood) {
  mascotBtn.dataset.mood = m
  if (calm) return
  mascotBtn.classList.remove('hop'); void mascotBtn.offsetWidth; mascotBtn.classList.add('hop')
}
function say(t: string, m: Mood = 'happy', ms = 4800) {
  mood(m); bubble.textContent = t; bubble.classList.add('on')
  clearTimeout(hushT); hushT = window.setTimeout(() => bubble.classList.remove('on'), ms)
}
function quiet() { clearTimeout(hushT); bubble.classList.remove('on') }
const NOVA_LINES: Record<string, string[]> = {
  '': ['Merhaba! Ben Nova.', 'Kod yazmak büyü gibi, ama gerçek!', 'Hazırsan başlayalım!'],
  hub: ['Bugün ne öğreniyoruz?', 'Öğren kartı seni bekliyor!', 'Ben hep buradayım, takılırsan tıkla.'],
  learn: ['Kodu ezberleme, ne yaptığını anla.', 'Zor kısım kutusuna dikkat!', 'Hata yapmak öğrenmenin parçası.', 'Takılırsan bir önceki sayfaya dönebilirsin.'],
  games: ['Oyunlar yolda!', 'Yakında beraber oynarız.'],
}
mascotBtn.onclick = () => {
  const m = pick<Mood>(['happy', 'wink', 'cheer'])
  say(pick(NOVA_LINES[page] ?? NOVA_LINES['']), m, 3500); novaVoice(m)
}

const FLAME = '<svg class="flame" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">'
  + '<path d="M12 2s5.5 4.6 5.5 10.2A5.5 5.5 0 0 1 6.5 12.2c0-2 1-3.6 2.2-4.8.2 1.8.9 2.8 2 2.8C10.6 7.6 10 4.6 12 2z" fill="currentColor"/>'
  + '<path d="M12 21a3 3 0 0 1-3-3c0-1.6 1.3-2.4 2-3.6.5.8 1.2 1 1.8 1.8.5.7.2 1.5 1.2 1.8A3 3 0 0 1 12 21z" fill="#ffd84d"/></svg>'

// Her sayfanın üstündeki çubuk: logo, menü, seri, ses, kullanıcı
function chrome(): HTMLElement {
  const bar = el('div', 'bar-in')
  const logo = el('a', 'logo', '<span aria-hidden="true">{ }</span>Code Nova') as HTMLAnchorElement
  logo.href = '#'
  logo.onclick = e => { e.preventDefault(); stop(); if (S.name) hub(); else welcome() }
  bar.append(logo)
  if (S.name) {
    const nav = el('nav', 'nav'); nav.setAttribute('aria-label', 'Ana menü')
    ;([['learn', 'Öğren', home], ['games', 'Games', games]] as const).forEach(([k, t, fn]) => {
      const b = btn(t, go(fn), 'nl')
      if (page === k) b.setAttribute('aria-current', 'page')
      nav.append(b)
    })
    const snd = btn(S.mute ? 'Ses kapalı' : 'Ses açık', () => { S.mute = !S.mute; save(); snd.textContent = S.mute ? 'Ses kapalı' : 'Ses açık' }, 'nl')
    const back = page === 'learn' ? home : page === 'games' ? games : hub
    const thm = btn('Tema', go(() => themePick(back, back)), 'nl')
    const streak = el('span', 'streak', `${FLAME}<b>${S.streak.n}</b> gün`)
    streak.title = 'Üst üste giriş günü'
    bar.append(nav, streak, snd, thm, btn(`${S.icon} ${S.name}`, go(start), 'me'))
  }
  const h = el('header', 'bar'); h.append(bar); return h
}

const TIPS = [
  'Takıldığın yerde derse geri dönüp tekrar bakabilirsin.',
  'Hata yapmak öğrenmenin parçası. Kodcular her gün hata yapar.',
  'Kodu ezberleme, ne yaptığını anlamaya çalış.',
  'Soru zor geldiyse önce kodu satır satır oku.',
]
const TIP = pick(TIPS)
const TITLES: Record<string, string> = { learn: 'Öğren', hub: 'Ana menü', games: 'Games' }

const show = (...n: Node[]) => {
  onKey = null; quiet()
  document.body.classList.remove('welcome')
  document.title = page && TITLES[page] ? `${TITLES[page]} · Code Nova` : 'Code Nova'
  const main = el('main', 'main'); main.append(...n)
  app.replaceChildren(chrome(), main, txt('footer', 'foot', `Code Nova · ${TIP}`))
  window.scrollTo(0, 0)
}
const wrap = (cls: string, ...n: Node[]) => { const d = el('div', cls); d.append(...n); return d }
const ICONS = ['🦊', '🐙', '🚀', '🦄', '🐯', '🤖', '🐸', '🦉']

// Diller sırayla açılır. Bir dil: bütün dersler geçildi + final en az PASS/10.
const PASS = 7
const trackDone = (t: Track) => t.lessons.every(l => S.passed[l.id]) && (S.fin[t.id] ?? 0) >= PASS
const trackOpen = (i: number) => i === 0 || trackDone(TRACKS[i - 1])
const curTrack = (): Track => { const i = TRACKS.findIndex(t => t.id === S.cur); return TRACKS[i >= 0 && trackOpen(i) ? i : 0] }

// Gün hesabı (streak ve günlük görev için)
const day = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
function tick() {
  const t = day()
  if (S.streak.last === t) return
  const y = new Date(); y.setDate(y.getDate() - 1)
  S.streak = { n: S.streak.last === day(y) ? S.streak.n + 1 : 1, last: t }
  save()
  if (S.streak.n >= 3) award('streak3')
}

// ───────── Ses ─────────
// Hepsini tarayıcı üretir, dosya yok. Her temanın kendi "sesi" var (voice): defter = yumuşak, terminal = 8-bit, gün batımı = sıcak, pastel = çan.
type Sfx = 'click' | 'hover' | 'tab' | 'next' | 'back' | 'open' | 'start' | 'pick' | 'ok' | 'no' | 'win' | 'perfect' | 'badge'
  | 'tick' | 'stamp' | 'count' | 'type' | 'enter' | 'out' | 'copy' | 'nope' | 'theme'
const HOVER_SES = true // fare üstüne gelince çıkan çok hafif tıkırtı. Rahatsız ederse false yap.
let ac: AudioContext | undefined, out: GainNode | undefined, nbuf: AudioBuffer | undefined
function ctx(): AudioContext | undefined {
  if (S.mute) return undefined
  // Tarayıcı, kullanıcı sayfaya dokunmadan ses açtırmaz
  const ua = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation
  if (ua && !ua.hasBeenActive) return undefined
  try {
    if (!ac) {
      ac = new AudioContext()
      out = ac.createGain(); out.gain.value = 0.9
      const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 8000
      const cp = ac.createDynamicsCompressor(); cp.threshold.value = -20; cp.ratio.value = 4
      out.connect(lp); lp.connect(cp); cp.connect(ac.destination)
    }
    if (ac.state === 'suspended') void ac.resume()
    return ac
  } catch { return undefined }
}
type NoteOpt = { w?: OscillatorType; slide?: number; att?: number; len?: number; bell?: boolean; raw?: boolean }
// Tek nota: f Hz, t sn sonra başla, d sn sürsün, v ses seviyesi
function note(f: number, t = 0, d = 0.15, v = 0.1, o: NoteOpt = {}) {
  const a = ctx(); if (!a || !out) return
  const s = a.currentTime + t + 0.004
  const dur = Math.max(0.03, d * (o.len ?? voice.len))
  const fr = o.raw ? f : f * voice.k
  const wave = o.w ?? voice.wave
  const osc1 = (freq: number, vol: number, w: OscillatorType) => {
    const osc = a.createOscillator(), g = a.createGain(), att = o.att ?? 0.006
    osc.type = w; osc.frequency.setValueAtTime(freq, s)
    if (o.slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq * o.slide), s + dur)
    g.gain.setValueAtTime(0.0001, s)
    g.gain.linearRampToValueAtTime(vol, s + att)
    g.gain.exponentialRampToValueAtTime(0.0001, s + Math.max(dur, att + 0.02))
    osc.connect(g); g.connect(out!); osc.start(s); osc.stop(s + Math.max(dur, att + 0.02) + 0.03)
  }
  osc1(fr, v * (wave === 'square' || wave === 'sawtooth' ? 0.45 : 1), wave)
  if (o.bell ?? voice.bell) osc1(fr * 2.76, v * 0.25, 'sine')
}
// Gürültü patlaması: tıklama, yazı tuşu, "şak" gibi sesler için
function hiss(t = 0, d = 0.04, v = 0.06, f = 3000, q = 1, type: BiquadFilterType = 'bandpass', sweep = 0) {
  const a = ctx(); if (!a || !out) return
  if (!nbuf) {
    nbuf = a.createBuffer(1, Math.floor(a.sampleRate * 0.5), a.sampleRate)
    const d0 = nbuf.getChannelData(0)
    for (let i = 0; i < d0.length; i++) d0[i] = Math.random() * 2 - 1
  }
  const s = a.currentTime + t + 0.004
  const src = a.createBufferSource(), fl = a.createBiquadFilter(), g = a.createGain()
  src.buffer = nbuf; fl.type = type; fl.frequency.setValueAtTime(f, s); fl.Q.value = q
  if (sweep) fl.frequency.exponentialRampToValueAtTime(Math.max(60, f * sweep), s + d)
  g.gain.setValueAtTime(v, s); g.gain.exponentialRampToValueAtTime(0.0001, s + d)
  src.connect(fl); fl.connect(g); g.connect(out); src.start(s); src.stop(s + d + 0.02)
}
const SCALE = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16]
function sfx(k: Sfx, n = 0) {
  switch (k) {
    case 'click': hiss(0, 0.03, 0.06, 2600, 1.5); note(700, 0, 0.05, 0.035, { w: 'sine' }); break
    case 'hover': if (HOVER_SES) hiss(0, 0.018, 0.016, 6000, 0.8, 'highpass'); break
    case 'tab': note(660, 0, 0.07, 0.05); note(990, 0.045, 0.08, 0.045); break
    case 'next': note(520, 0, 0.07, 0.06); note(780, 0.05, 0.12, 0.06); break
    case 'back': note(780, 0, 0.07, 0.05); note(520, 0.05, 0.12, 0.05); break
    case 'open': hiss(0, 0.07, 0.05, 1200, 1, 'bandpass', 3); note(392, 0, 0.09, 0.06); note(587, 0.06, 0.14, 0.06); break
    case 'start': [392, 523, 659, 784].forEach((f, i) => note(f, i * 0.07, 0.22, 0.07)); break
    case 'pick': hiss(0, 0.02, 0.04, 3500, 2); note(440 * 2 ** (n / 12), 0, 0.1, 0.07); break
    case 'ok': {
      // Üst üste doğru bildikçe nota yükselir
      const f = 523.25 * 2 ** (SCALE[Math.min(n, SCALE.length - 1)] / 12)
      note(f, 0, 0.14, 0.09); note(f * 1.5, 0.07, 0.2, 0.08)
      if (n >= 2) note(f * 2, 0.14, 0.2, 0.05, { bell: true })
      break
    }
    case 'no': note(220, 0, 0.22, 0.09, { w: 'sine', slide: 0.72, len: 1 }); note(165, 0.09, 0.3, 0.07, { w: 'sine', slide: 0.8, len: 1 }); break
    case 'win':
      ;[523, 659, 784, 1047].forEach((f, i) => note(f, i * 0.1, 0.25, 0.08))
      ;[523, 659, 784, 1319].forEach(f => note(f, 0.4, 0.6, 0.05, { bell: f > 1000 }))
      break
    case 'perfect': [1568, 1976, 2349, 3136].forEach((f, i) => note(f, 0.5 + i * 0.07, 0.3, 0.04, { w: 'sine', bell: true, raw: true })); break
    case 'badge': [1319, 1760, 2093].forEach((f, i) => note(f, i * 0.09, 0.5, 0.06, { w: 'sine', bell: true, len: 1.4, raw: true })); break
    case 'tick': hiss(0, 0.02, 0.05, 3000, 3); note(700 + (5 - n) * 90, 0, 0.06, 0.06, { w: 'triangle', len: 1 }); break
    case 'stamp': note(120, 0, 0.22, 0.22, { w: 'sine', slide: 0.5, len: 1 }); hiss(0, 0.09, 0.12, 500, 0.7, 'lowpass'); break
    case 'count': note(500 + 800 * n, 0, 0.035, 0.03, { w: 'sine', len: 1 }); break
    case 'type':
      hiss(0, 0.014, 0.045, 3800 + Math.random() * 1800, 2.5)
      if (curTheme === 'terminal') note(1500 + Math.random() * 400, 0, 0.02, 0.025, { len: 1 })
      break
    case 'enter': hiss(0, 0.05, 0.07, 2000, 1.5); note(330, 0, 0.07, 0.05); break
    case 'out': note(880, 0, 0.05, 0.04, { w: 'sine' }); break
    case 'copy': note(988, 0, 0.05, 0.06); note(1319, 0.05, 0.08, 0.06); break
    case 'nope': note(180, 0, 0.09, 0.07, { w: 'triangle', slide: 0.8, len: 1 }); note(180, 0.11, 0.09, 0.07, { w: 'triangle', slide: 0.8, len: 1 }); break
    case 'theme':
      if (curTheme === 'terminal') { hiss(0, 0.06, 0.05, 4000, 1, 'highpass'); [220, 330, 440, 660, 880].forEach((f, i) => note(f, i * 0.05, 0.1, 0.07)) }
      else if (curTheme === 'sunset') [262, 330, 392, 523].forEach((f, i) => note(f, i * 0.02, 0.9, 0.06, { att: 0.12, len: 1 }))
      else if (curTheme === 'pastel') [523, 659, 784, 1047, 1319].forEach((f, i) => note(f, i * 0.07, 0.3, 0.06))
      else [392, 494, 587, 784].forEach((f, i) => note(f, i * 0.08, 0.2, 0.07))
      break
  }
}
// Nova'nın sesi: temadan bağımsız, hep aynı tatlı üçgen dalga
function novaVoice(m: Mood) {
  const o = { w: 'triangle' as OscillatorType, raw: true }
  if (m === 'cheer') [523, 659, 784, 1047].forEach((f, i) => note(f, i * 0.055, 0.1, 0.07, o))
  else if (m === 'wink') { note(880, 0, 0.06, 0.06, o); note(1175, 0.06, 0.08, 0.06, o) }
  else if (m === 'sad') { note(440, 0, 0.16, 0.07, { ...o, slide: 0.75 }); note(330, 0.14, 0.22, 0.06, o) }
  else if (m === 'think') { note(392, 0, 0.1, 0.06, o); note(392, 0.12, 0.1, 0.05, o); note(523, 0.26, 0.14, 0.06, o) }
  else if (m === 'wow') note(400, 0, 0.2, 0.08, { ...o, slide: 2.2 })
  else { note(660, 0, 0.08, 0.07, o); note(880, 0.07, 0.1, 0.07, o) }
}
// Üst/ses düğmesi: karşılama ve tema ekranında da ses açılıp kapanabilsin
function soundBtn(cls = 'btn alt'): HTMLButtonElement {
  const b = btn(S.mute ? 'Ses kapalı' : 'Ses açık', () => { S.mute = !S.mute; save(); b.textContent = S.mute ? 'Ses kapalı' : 'Ses açık' }, cls)
  return b
}

// Tüm site için ortak sesler: her buton tıklaması ve fareyle üstüne gelme
document.addEventListener('click', e => {
  if (!(e.target instanceof Element)) return
  const b = e.target.closest('button, a') as HTMLElement | null
  if (!b || (b as HTMLButtonElement).disabled) return
  const c = b.classList
  if (c.contains('opt') || c.contains('tp-card') || c.contains('mascot')) return // bunların sesi kendi kodunda
  const t = b.textContent ?? ''
  if (c.contains('ic')) sfx('pick', 2 * [...(b.parentElement?.children ?? [])].indexOf(b))
  else if (c.contains('go') || t === 'Tamam, bu olsun' || t === 'Başla') sfx('start')
  else if (/^(İleri|Alıştırmaya geç|Sonraki soru|Sonucu gör)$/.test(t)) sfx('next')
  else if (/^(Geri|Vazgeç)$/.test(t)) sfx('back')
  else if (c.contains('nl') || c.contains('tab')) sfx('tab')
  else if (c.contains('cp')) sfx('copy')
  else if (c.contains('tile') || c.contains('step') || c.contains('final') || c.contains('me')) sfx('open')
  else sfx('click')
})
let lastHover: Element | null = null
document.addEventListener('pointerover', e => {
  if (e.pointerType !== 'mouse' || !(e.target instanceof Element)) return
  const t = e.target.closest('.tile,.step,.tp-card,.final,.btn,.nl,.tab')
  if (t === lastHover) return
  lastHover = t
  if (t && !(t as HTMLButtonElement).disabled) sfx('hover')
})

// Konfeti: renkli kağıt parçaları (renkler temadan gelir)
function confetti() {
  if (calm) return
  const c = el('div', 'confetti'); c.setAttribute('aria-hidden', 'true')
  for (let i = 0; i < 44; i++) {
    const p = el('span')
    p.style.left = `${Math.random() * 100}%`
    p.style.background = paper[i % paper.length]
    p.style.width = `${6 + Math.random() * 6}px`
    p.style.height = `${10 + Math.random() * 8}px`
    p.style.animationDelay = `${Math.random() * 0.8}s`
    p.style.animationDuration = `${1.8 + Math.random() * 1.4}s`
    c.append(p)
  }
  document.body.append(c); setTimeout(() => c.remove(), 4000)
}

// Sayıyı 0'dan hedefe sayarak göster
function count(node: HTMLElement, to: number) {
  if (calm || to === 0) { node.textContent = String(to); return }
  const t0 = performance.now()
  let lastT = 0
  const step = (t: number) => {
    const p = Math.min(1, (t - t0) / 900)
    if (p < 1 && t - lastT > 75) { lastT = t; sfx('count', p) }
    node.textContent = String(Math.round(to * (1 - (1 - p) ** 3)))
    if (p < 1 && node.isConnected) requestAnimationFrame(step)
    else node.textContent = String(to)
  }
  node.textContent = '0'
  requestAnimationFrame(step)
}

// Kod renklendirme: yorum, yazı, sayı, anahtar kelime
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const TOK = /(\/\/.*|#.*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|(\b\d+(?:\.\d+)?\b)|(\b(?:if|else|elif|for|while|in|def|return|val|var|fun|let|func|class|import|and|or|not|True|False|None|true|false|when|switch|case|foreach|using|static|void|public|new|int|string|bool|double)\b)/g
function hl(src: string) {
  return esc(src).replace(TOK, (m: string, c?: string, s?: string, n?: string) =>
    c ? `<i class="tc">${m}</i>` : s ? `<i class="ts">${m}</i>` : n ? `<i class="tn">${m}</i>` : `<i class="tk">${m}</i>`)
}

// Rozetler
const BADGES = [
  { id: 'first', i: '🌱', n: 'İlk Adım', d: 'İlk konuyu bitir' },
  { id: 'perfect', i: '💯', n: 'Tam Puan', d: 'Bir alıştırmada 5/5 yap' },
  { id: 'streak3', i: '🔥', n: 'Ateşli', d: '3 gün üst üste gir' },
  { id: 'finalist', i: '🏆', n: 'Finalist', d: 'Bir finali geç' },
  { id: 'champ', i: '👑', n: 'Şampiyon', d: 'Finalde 8000 puan yap' },
]
function award(id: string) {
  if (S.badges[id]) return
  const b = BADGES.find(x => x.id === id)
  if (!b) return
  S.badges[id] = true; save()
  setTimeout(() => sfx('badge'), 900)
  const t = txt('div', 'toast', `${b.i} Yeni rozet: ${b.n}`); t.setAttribute('role', 'status')
  document.body.append(t); setTimeout(() => t.remove(), 3200)
}
function badges() {
  const w = el('section', 'tasks', '<h2>Rozetlerim</h2>'), d = el('div', 'badges')
  BADGES.forEach(b => { const x = txt('span', S.badges[b.id] ? 'bd' : 'bd lock', S.badges[b.id] ? `${b.i} ${b.n}` : `🔒 ${b.d}`); x.title = b.d; d.append(x) })
  w.append(d); return w
}

// Tema seçici: ilk girişte ve "Tema" düğmesinden açılır. Karta tıklayınca tema hemen denenir.
const MINI = '<span class="m-bar"><i>{ }</i>Code Nova</span>'
  + '<span class="m-body"><span class="m-tile">Öğren</span>'
  + '<span class="m-side"><span class="m-chip">3 gün</span><span class="m-code"><b>for</b> i <b>in</b> 3:<br>print(<u>"selam"</u>)</span></span></span>'
function themePick(done: () => void, back?: () => void) {
  stop(); page = ''; onKey = null; quiet()
  document.body.classList.remove('welcome')
  document.title = 'Tema seç · Code Nova'
  const before = S.theme || 'standart'
  let sel = before
  const grid = el('div', 'tp-grid'); grid.setAttribute('role', 'group'); grid.setAttribute('aria-label', 'Tema')
  const cards: [string, HTMLButtonElement][] = []
  THEMES.forEach(t => {
    const b = el('button', 'tp-card') as HTMLButtonElement; b.type = 'button'
    const mini = el('span', 'tp-mini', MINI); mini.dataset.theme = t.id; mini.setAttribute('aria-hidden', 'true')
    b.append(mini, txt('span', 'tp-name', t.name), txt('span', 'tp-desc', t.desc))
    b.setAttribute('aria-pressed', String(t.id === sel))
    b.onclick = () => {
      sel = t.id; applyTheme(sel); sfx('theme')
      cards.forEach(([id, c]) => c.setAttribute('aria-pressed', String(id === sel)))
      say(t.say, 'wink', 3500)
    }
    cards.push([t.id, b]); grid.append(b)
  })
  const row = el('div', 'row')
  row.append(btn('Tamam, bu olsun', () => { S.theme = sel; save(); done() }))
  if (back) row.append(btn('Vazgeç', () => { applyTheme(before); back() }, 'btn alt'))
  app.replaceChildren(wrap('tp', txt('h1', '', 'Hangi temayı istiyorsun?'),
    txt('p', 'sub', 'Birine tıkla, hemen dener. Beğenmezsen sonra üstteki Tema düğmesinden değiştirirsin.'), grid, row), wrap('tp-fabs', soundBtn()))
  window.scrollTo(0, 0)
  say('Hangisi senin tarzın? Tıkla, bakalım nasıl duruyor.', 'wink', 6000)
}

function welcome() {
  stop(); page = ''; onKey = null
  document.title = 'Code Nova'
  const src = 'isim = "Code Nova"\nfor i in range(3):\n    print("Merhaba", isim)'
  const outLines = ['Merhaba Code Nova', 'Merhaba Code Nova', 'Merhaba Code Nova']
  const codeEl = el('code'), outPre = el('pre')
  const code = el('pre'); code.append(codeEl)
  const out = el('div', 'out', '<span>Çıktı</span>'); out.append(outPre)
  const win = el('div', 'win', '<div class="win-bar"><i></i><i></i><i></i><span>merhaba.py</span></div>')
  win.append(code, out)
  win.setAttribute('aria-hidden', 'true')

  // Yazma animasyonu: ekran değişirse kendiliğinden durur
  const live = () => win.isConnected && document.body.classList.contains('welcome')
  const caret = '<span class="caret"></span>'
  if (calm) {
    codeEl.innerHTML = hl(src); outPre.textContent = outLines.join('\n')
  } else {
    let k = 0, j = 0
    const printOut = () => {
      if (!live()) return
      j++; sfx('out'); outPre.textContent = outLines.slice(0, j).join('\n')
      if (j < outLines.length) setTimeout(printOut, 380)
    }
    const typeNext = () => {
      if (!live()) return
      k++
      { const ch = src[k - 1]; if (ch === '\n') sfx('enter'); else if (ch !== ' ') sfx('type') }
      codeEl.innerHTML = hl(src.slice(0, k)) + caret
      if (k < src.length) setTimeout(typeNext, src[k - 1] === '\n' ? 280 : 40 + Math.random() * 55)
      else setTimeout(() => { if (live()) { codeEl.innerHTML = hl(src); printOut() } }, 550)
    }
    codeEl.innerHTML = caret
    setTimeout(typeNext, 700)
  }

  // Arka planda yavaşça süzülen kod işaretleri
  const deco = el('div', 'deco'); deco.setAttribute('aria-hidden', 'true')
  ;[['{', 6, 14], ['}', 90, 12], [';', 12, 80], ['=>', 84, 84], ['</>', 52, 6], ['[ ]', 93, 52], ['( )', 3, 48], ['#', 62, 92], ['0 1', 36, 88]].forEach(([c, x, y], i) => {
    const s = txt('span', '', String(c)); s.style.left = `${x}%`; s.style.top = `${y}%`; s.style.animationDelay = `${-i * 0.9}s`; deco.append(s)
  })

  const h = el('h1', 'nova', 'Welcome to <span class="hl">Code Nova</span>')
  const t = wrap('hero-t', h,
    txt('p', 'sub', 'Python, Kotlin, Swift ve C# öğren. Her dersten sonra alıştırma çöz, sonunda final yarışmasında puan topla.'),
    btn('Ana sayfaya git', () => (S.name ? hub() : start()), 'btn go'))
  app.replaceChildren(wrap('hero', deco, t, win), wrap('tp-fabs', soundBtn(), btn('Tema', () => themePick(welcome, welcome), 'btn alt')))
  document.body.classList.add('welcome')
  say('Merhaba! Ben Nova. Beraber kod yazacağız!', 'cheer', 6000)
}

function start() {
  stop(); page = ''
  let icon = S.icon || ICONS[0]
  const inp = el('input') as HTMLInputElement
  inp.maxLength = 14; inp.placeholder = 'Takma adın'; inp.value = S.name; inp.setAttribute('aria-label', 'Takma ad')
  const pv = el('p', 'preview')
  const upd = () => { const n = inp.value.trim(); pv.textContent = `${icon} ${n || 'takma adın'}`; pv.classList.toggle('empty', !n) }
  const grid = el('div', 'icons')
  ICONS.forEach(i => {
    const b = btn(i, () => { icon = i; [...grid.children].forEach(c => c.setAttribute('aria-pressed', String(c === b))); upd() }, 'ic')
    b.setAttribute('aria-pressed', String(i === icon)); grid.append(b)
  })
  const begin = () => {
    const n = inp.value.trim()
    if (!n) { sfx('nope'); inp.classList.remove('shake'); void inp.offsetWidth; inp.classList.add('shake'); inp.focus(); return }
    S.icon = icon; S.name = n; save(); hub()
  }
  inp.oninput = upd
  inp.onkeydown = e => { if (e.key === 'Enter') begin() }
  upd()
  show(wrap('lv', txt('h1', '', 'Code Nova'), txt('p', 'sub', 'Kodlamayı öğren, final yarışmasında puan topla. Önce bir ikon ve takma ad seç.'), grid, inp,
    txt('p', 'sub', 'Skor tablosunda böyle görüneceksin:'), pv, btn('Başla', begin)))
  say('Bir ikon seç, takma adını yaz. Ben de seni tanıyayım!', 'wink')
}

function board() {
  const w = el('section', 'board', '<h2>Skor tablosu</h2>')
  if (!S.board.length) { w.append(txt('p', 'sub', 'Henüz skor yok. Finali bitirince adın buraya yazılır.')); return w }
  const ol = el('ol')
  S.board.slice(0, 5).forEach(r => {
    const li = el('li', r.name === S.name && r.icon === S.icon ? 'me' : '')
    li.append(txt('span', 'who', `${r.icon} ${r.name}`))
    if (r.lang) li.append(txt('small', '', `(${r.lang})`))
    li.append(txt('b', '', String(r.pts)))
    ol.append(li)
  })
  w.append(ol); return w
}

function home() {
  tick(); page = 'learn'
  const T = curTrack()
  const ti = TRACKS.indexOf(T)
  const all = T.lessons.every(l => S.passed[l.id])
  const doneToday = S.today.d === day() && S.today.n >= 1

  const tasks = el('section', 'tasks', '<h2>Bugünün görevleri</h2>')
  const ul = el('ul')
  ul.append(txt('li', 'done', 'Siteye gir'), txt('li', doneToday ? 'done' : '', `Bugün en az 1 konuyu bitir (${doneToday ? 1 : 0}/1)`))
  tasks.append(ul)
  if (doneToday) tasks.append(txt('p', 'sub', 'Harika! Bugünün görevleri tamam.'))

  const tabs = el('div', 'tabs'); tabs.setAttribute('role', 'group'); tabs.setAttribute('aria-label', 'Programlama dili')
  TRACKS.forEach((t, i) => {
    const open = trackOpen(i)
    const b = btn(`${t.name}${trackDone(t) ? ' ✓' : ''}${open ? '' : ' (kilitli)'}`, () => { S.cur = t.id; save(); home() }, 'tab')
    b.setAttribute('aria-pressed', String(t.id === T.id)); b.disabled = !open
    if (!open) b.title = `${TRACKS[i - 1].name} dersleri ve finali (en az ${PASS}/10) bitince açılır`
    tabs.append(b)
  })

  const next = TRACKS[ti + 1]
  const best = S.fin[T.id]
  const info = `${T.name}: ${T.lessons.length} ders. Her dersten sonra 5 soruluk alıştırma var.`
    + (best !== undefined ? ` En iyi final: ${best}/10.` : '')
    + (next ? ` Sıradaki dil ${next.name}: açmak için tüm dersleri bitir ve finalde en az ${PASS}/10 yap.` : '')

  const list = el('ol', 'steps')
  T.lessons.forEach((l, i) => {
    const open = i === 0 || S.passed[T.lessons[i - 1].id]
    const done = S.passed[l.id]
    const b = btn('', () => lesson(l, 0), `step ${done ? 'done' : open ? 'now' : 'lock'}`)
    b.append(txt('span', 'n', done ? '✓' : String(i + 1)), txt('span', 't', l.t), txt('span', 's', done ? 'Tamamlandı' : open ? 'Başla' : 'Kilitli'))
    b.disabled = !open
    const li = el('li'); li.append(b); list.append(li)
  })
  const f = btn('', () => finalQ(T), 'final')
  f.append(txt('span', 't', `${T.name} final yarışması`), txt('span', 's', all ? '10 soru, süreli' : 'Tüm dersleri bitirince açılır'))
  f.disabled = !all

  show(txt('h1', '', 'Öğren'), wrap('cols', wrap('col', tabs, txt('p', 'sub', info), list, f), wrap('col', tasks, board(), badges())))
  const doneCount = T.lessons.filter(l => S.passed[l.id]).length
  if (!doneCount) say('İlk dersten başlayalım, kolay gelsin!', 'happy')
  else if (all) say('Bütün dersler tamam! Final seni bekliyor.', 'cheer')
  else mood('happy')
}

// Ana menü: Öğren ve Games arasında geçiş
function hub() {
  tick(); page = 'hub'
  const h = new Date().getHours()
  const hi = h < 5 ? 'İyi geceler' : h < 12 ? 'Günaydın' : h < 18 ? 'İyi günler' : h < 22 ? 'İyi akşamlar' : 'İyi geceler'
  const T = curTrack(), n = T.lessons.filter(l => S.passed[l.id]).length
  const tile = (t: string, s: string, fn: () => void, cls: string) => {
    const b = btn('', fn, `tile ${cls}`); b.append(txt('b', '', t), txt('span', '', s)); return b
  }
  const title = el('h1'); title.append(document.createTextNode(`${hi} `), txt('span', 'wavy', S.name))
  const lines = ['Bugün ne yapmak istersin?', 'Hazırsan başlayalım.', 'Bugün hangi konuyu yenelim?']
  if (S.streak.n >= 2) lines.push(`${S.streak.n} gündür üst üste geliyorsun, böyle devam!`)
  show(title, txt('p', 'sub', pick(lines)),
    wrap('tiles', tile('Öğren', `${T.name}: ${n}/${T.lessons.length} ders tamam`, home, 'learn'), tile('Games', 'Oyunlar çok yakında', games, 'games')))
  if (S.streak.n >= 3) say(`${S.streak.n} gün üst üste! Süpersin ${S.name}!`, 'cheer')
  else say(`Selam ${S.name}! Bugün ne öğreniyoruz?`, 'wink')
}

function games() {
  page = 'games'
  const ul = el('ul', 'soonlist')
  ;['Kod Bulmaca', 'Hızlı Quiz', 'Hata Avcısı'].forEach(t => { const li = el('li'); li.append(txt('b', '', t), txt('span', '', 'Yakında')); ul.append(li) })
  show(txt('h1', '', 'Games'), txt('p', 'sub', 'Oyunlar hazırlanıyor. Hazır olunca burada görünecek.'), ul)
  say('Oyunlar yolda! Yakında beraber oynarız.', 'wink')
}

function lesson(l: Lesson, i: number) {
  const s = l.slides[i], last = i === l.slides.length - 1
  const row = el('div', 'row')
  row.append(btn('Geri', () => (i ? lesson(l, i - 1) : home()), 'btn alt'), btn(last ? 'Alıştırmaya geç' : 'İleri', () => (last ? exercise(l) : lesson(l, i + 1))))
  const dots = el('div', 'dots'); dots.setAttribute('aria-hidden', 'true')
  l.slides.forEach((_, j) => dots.append(el('i', j < i ? 'on' : j === i ? 'cur' : '')))

  const cp = btn('Kopyala', () => {
    navigator.clipboard?.writeText(s.code).then(() => {
      cp.textContent = 'Kopyalandı ✓'; setTimeout(() => { cp.textContent = 'Kopyala' }, 1400)
    }, () => { /* yoksay */ })
  }, 'cp')
  const bar = el('div', 'code-bar', '<i></i><i></i><i></i><span>kod</span>'); bar.append(cp)
  const c = el('code'); c.innerHTML = hl(s.code)
  const pre = el('pre'); pre.append(c)
  const box = el('div', 'code'); box.append(bar, pre)

  show(wrap('lv mid', dots, txt('p', 'sub', `${l.t}: sayfa ${i + 1}/${l.slides.length}`), txt('h2', '', s.h), el('div', 'slide', s.b), box,
    el('div', 'hard', `<b>Dikkat, zor kısım:</b> ${s.hard}`), row, el('p', 'hint', '<kbd>←</kbd> <kbd>→</kbd> tuşlarıyla da gezinebilirsin')))
  if (i === 0) say('Kırmızı kutudaki zor kısma özellikle dikkat et!', 'think')
  else mood('happy')
  onKey = e => {
    if (e.key === 'ArrowRight') { sfx('next'); if (last) exercise(l); else lesson(l, i + 1) }
    else if (e.key === 'ArrowLeft') { sfx('back'); if (i) lesson(l, i - 1); else home() }
  }
}

function exercise(l: Lesson) {
  const n = S.tries[l.id] ?? 0
  // Her denemede farklı bir soru seti gelir
  run(`${l.t} alıştırması`, l.ex[n % l.ex.length], false, ok => {
    const good = ok >= 4
    if (good) {
      if (!S.passed[l.id]) { const t = day(); S.today = { d: t, n: (S.today.d === t ? S.today.n : 0) + 1 } }
      S.passed[l.id] = true
    } else S.tries[l.id] = n + 1
    save()
    if (good) { award('first'); sfx('win'); if (ok === 5) { award('perfect'); sfx('perfect'); confetti() } }
    const msg = ok === 5 ? pick(['Tam puan! Konuyu çok iyi anlamışsın.', 'Hiç hata yok! Harikasın.', 'Kusursuz! Sıradaki konuya hazırsın.'])
      : good ? 'Çok iyi! Küçük bir hata var ama devam edebilirsin.' : 'Bu konuya kısa bir tekrar bakalım.'
    const num = el('span'), big = el('div', 'big'); big.append(num, txt('span', 'of', '/5'))
    show(wrap('lv end', txt('div', `stamp ${good ? 'yes' : 'no'}`, good ? (ok === 5 ? 'Tam puan!' : 'Geçtin!') : 'Bir daha!'),
      wrap('res', big, txt('p', '', msg)), good ? btn('Derslere dön', home) : btn('Tekrar konusuna git', () => review(l))))
    count(num, ok); setTimeout(() => sfx('stamp'), 260)
    if (good) say(ok === 5 ? 'Tam puan! Muhteşemsin!' : 'Aferin, geçtin!', 'cheer', 5000)
    else say('Olsun! Kısa bir tekrardan sonra yaparsın.', 'think', 5000)
  })
}

function review(l: Lesson) {
  show(wrap('lv', txt('h2', '', 'Hızlı tekrar'), txt('p', 'slide note', l.review), btn('Yeni alıştırmayı çöz', () => exercise(l))))
  say('Bu notu bir oku, sonra tekrar dene!', 'think')
}

function finalQ(T: Track) {
  run(`${T.name} final yarışması`, T.final, true, (ok, pts) => {
    S.fin[T.id] = Math.max(S.fin[T.id] ?? 0, ok)
    S.board.push({ icon: S.icon, name: S.name, pts, lang: T.name }); S.board.sort((a, b) => b.pts - a.pts); S.board = S.board.slice(0, 10); save()
    if (ok >= PASS) { award('finalist'); sfx('win'); confetti() }
    if (pts >= 8000) award('champ')
    const next = TRACKS[TRACKS.indexOf(T) + 1]
    const msg = ok < PASS ? `Geçmek için en az ${PASS} doğru gerekir. Konuları tekrar edip finali yeniden dene.`
      : next ? `Tebrikler! ${next.name} dili açıldı.` : 'Tebrikler! Bütün dilleri bitirdin.'
    const big = el('div', 'big')
    show(wrap('lv end', txt('div', `stamp ${ok >= PASS ? 'yes' : 'no'}`, ok >= PASS ? 'Final geçildi!' : 'Az kaldı!'),
      wrap('res', big), txt('p', '', `${ok}/10 doğru. Puan, doğru cevap ve hız bonusundan oluşur.`), txt('p', 'sub', msg), board(), btn('Derslere dön', home)))
    count(big, pts); setTimeout(() => sfx('stamp'), 260)
    if (ok >= PASS) say('Final geçildi! Çok iyisin!', 'cheer', 6000)
    else say('Az kaldı! Tekrar deneyince olur.', 'think', 5000)
  })
}

function run(title: string, qs: Q[], timed: boolean, done: (ok: number, pts: number) => void) {
  let i = 0, ok = 0, pts = 0, combo = 0
  const ask = () => {
    const q = qs[i]; let left = 20, locked = false; const picked = new Set<number>()
    const tm = txt('b', 'tm', timed ? `${left} sn` : '')
    const tfill = el('i'), tbar = el('div', 'tbar'); tbar.append(tfill)
    const box = el('div', 'opts'), fb = el('div'), hint = txt('p', 'sub', '')
    fb.setAttribute('aria-live', 'polite')
    const nextQ = () => { i++; if (i < qs.length) ask(); else done(ok, pts) }
    const opts: HTMLButtonElement[] = []
    const answer = (c: Set<number>, late = false) => {
      if (locked) return; locked = true; clearInterval(tmr)
      tfill.style.transition = 'none'; tfill.style.width = `${(left / 20) * 100}%`
      const right = c.size === q.a.length && q.a.every(n => c.has(n))
      if (right) { ok++; if (timed) pts += 500 + left * 25 }
      combo = right ? combo + 1 : 0
      sfx(right ? 'ok' : 'no', combo - 1)
      if (late) say('Süre doldu! Bir dahaki sefere.', 'sad', 3000)
      else if (right) say(pick(['Doğru!', 'Harika!', 'Aynen öyle!', 'Süpersin!']), 'cheer', 2200)
      else say(pick(['Sorun değil, açıklamayı oku.', 'Olsun, bundan öğreniriz.', 'Yaklaştın!']), 'sad', 3000)
      box.classList.add('done')
      opts.forEach((b, j) => { b.disabled = true; if (q.a.includes(j)) b.classList.add('ok'); else if (c.has(j)) b.classList.add('no') })
      const f = el('p', 'fb'); f.append(txt('b', '', late ? 'Süre doldu. ' : right ? pick(['Doğru! ', 'Aferin! ', 'Süper! ']) : 'Olmadı. '), document.createTextNode(q.x))
      const nb = btn(i + 1 < qs.length ? 'Sonraki soru' : 'Sonucu gör', nextQ)
      fb.replaceChildren(f, nb); nb.focus()
      onKey = e => { if (e.key === 'ArrowRight') { sfx('next'); nextQ() } }
    }
    q.o.forEach((t, j) => {
      const b = btn('', () => {
        if (locked) return
        if (q.k === 'ms') { if (picked.has(j)) picked.delete(j); else picked.add(j); b.classList.toggle('sel'); sfx('pick', picked.has(j) ? 7 : 2); b.setAttribute('aria-pressed', String(picked.has(j))); hint.textContent = '' } else answer(new Set([j]))
      }, 'opt')
      b.append(txt('span', 'k', 'ABCD'[j] ?? ''), txt('span', 't', t))
      opts.push(b); box.append(b)
    })
    const check = () => { if (picked.size === 2) answer(picked); else hint.textContent = 'İki doğru şıkkı da işaretlemelisin.' }
    if (q.k === 'ms') fb.append(hint, btn('Cevabı kontrol et', check))
    if (timed) {
      tmr = window.setInterval(() => {
        left--; tm.textContent = `${left} sn`
        tfill.style.width = `${(Math.max(0, left - 1) / 20) * 100}%`
        if (left <= 5) { tm.classList.add('warn'); tbar.classList.add('warn') }
        if (left <= 5 && left > 0) sfx('tick', left)
        if (left === 5) say('Acele et, son 5 saniye!', 'wow', 2500)
        if (left <= 0) answer(new Set(), true)
      }, 1000)
      setTimeout(() => { if (!locked) tfill.style.width = `${((left - 1) / 20) * 100}%` }, 30)
    }
    const prog = el('div', 'dots full'); prog.setAttribute('aria-hidden', 'true')
    qs.forEach((_, j) => prog.append(el('i', j < i ? 'on' : j === i ? 'cur' : '')))
    show(wrap('lv', prog, el('div', 'qk', `<span>${title}</span><span>Soru ${i + 1}/${qs.length}</span>`), ...(timed ? [tm, tbar] : [tm]), txt('h3', '', q.q),
      q.k === 'ms' ? txt('p', 'sub', 'İki doğru şıkkı işaretle.') : el('span'), box, fb,
      el('p', 'hint', '<kbd>1</kbd>–<kbd>4</kbd> ya da <kbd>A</kbd>–<kbd>D</kbd> tuşlarıyla da seçebilirsin')))
    if (timed && i === 0) say('Süre var ama sakin ol, acele etme!', 'wink')
    else mood('think')
    onKey = e => {
      if (locked) return
      const k = e.key.toLowerCase()
      const j = '1234'.includes(k) && k.length === 1 ? '1234'.indexOf(k) : 'abcd'.includes(k) && k.length === 1 ? 'abcd'.indexOf(k) : -1
      if (j >= 0 && j < opts.length) opts[j].click()
      else if (e.key === 'Enter' && q.k === 'ms') check()
    }
  }
  ask()
}

console.log('%cCode Nova%c Konsolu açtın, tam bir kodcu gibisin!', 'background:#6a3df0;color:#fff;padding:2px 8px;border-radius:4px;font-weight:700', '')
if (S.theme) welcome(); else themePick(welcome)
