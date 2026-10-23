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
  mute: boolean; badges: Record<string, boolean>
}

const KEY = 'bulut-akademi-v1'
let S: St = { icon: '', name: '', cur: 'py', fin: {}, passed: {}, tries: {}, board: [], streak: { n: 0, last: '' }, today: { d: '', n: 0 }, mute: false, badges: {} }
try { S = { ...S, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') } } catch { /* yoksay */ }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)) } catch { /* yoksay */ } }

const app = document.getElementById('app')!
const el = (tag: string, cls = '', html = '') => { const e = document.createElement(tag); if (cls) e.className = cls; e.innerHTML = html; return e }
const txt = (tag: string, cls: string, t: string) => { const e = el(tag, cls); e.textContent = t; return e }
const btn = (t: string, fn: () => void, cls = 'btn') => { const b = txt('button', cls, t) as HTMLButtonElement; b.onclick = fn; return b }
let page = ''
let tmr = 0
const stop = () => clearInterval(tmr)
const go = (fn: () => void) => () => { stop(); fn() }

// Her sayfanin ustundeki cubuk: logo, menu, seri, ses, kullanici
function chrome(): HTMLElement {
  const bar = el('div', 'bar-in')
  const logo = txt('a', 'logo', 'Code Nova') as HTMLAnchorElement
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
    const streak = el('span', 'streak', `🔥 <b>${S.streak.n}</b> gün`)
    streak.title = 'Üst üste giriş günü'
    bar.append(nav, streak, snd, btn(`${S.icon} ${S.name}`, go(start), 'me'))
  }
  const h = el('header', 'bar'); h.append(bar); return h
}
const show = (...n: Node[]) => {
  document.body.classList.remove('welcome')
  const main = el('main', 'main'); main.append(...n)
  app.replaceChildren(chrome(), main, txt('footer', 'foot', 'Code Nova: ortaokul için kodlama dersleri.'))
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

// Ses efektleri (dosya gerekmez, tarayici uretir)
let ac: AudioContext | undefined
function tone(f: number, t = 0, d = 0.15) {
  if (S.mute) return
  try {
    if (!ac) ac = new AudioContext()
    if (ac.state === 'suspended') void ac.resume()
    const o = ac.createOscillator(), g = ac.createGain(), s = ac.currentTime + t
    o.type = 'triangle'; o.frequency.value = f
    g.gain.setValueAtTime(0.15, s); g.gain.exponentialRampToValueAtTime(0.001, s + d)
    o.connect(g); g.connect(ac.destination); o.start(s); o.stop(s + d)
  } catch { /* yoksay */ }
}
function sfx(k: 'ok' | 'no' | 'win') {
  if (k === 'ok') { tone(660); tone(880, 0.1) }
  else if (k === 'no') tone(180, 0, 0.3)
  else [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.2))
}

// Konfeti
function confetti() {
  const c = el('div', 'confetti'); c.setAttribute('aria-hidden', 'true')
  for (let i = 0; i < 28; i++) {
    const p = txt('span', '', ['🎉', '⭐', '✨', '💜'][i % 4])
    p.style.left = `${Math.random() * 100}%`
    p.style.animationDelay = `${Math.random() * 0.8}s`
    p.style.fontSize = `${18 + Math.random() * 18}px`
    c.append(p)
  }
  document.body.append(c); setTimeout(() => c.remove(), 3500)
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
  const t = txt('div', 'toast', `${b.i} Yeni rozet: ${b.n}`); t.setAttribute('role', 'status')
  document.body.append(t); setTimeout(() => t.remove(), 3200)
}
function badges() {
  const w = el('section', 'tasks', '<h2>Rozetlerim</h2>'), d = el('div', 'badges')
  BADGES.forEach(b => { const x = txt('span', S.badges[b.id] ? 'bd' : 'bd lock', S.badges[b.id] ? `${b.i} ${b.n}` : `🔒 ${b.d}`); x.title = b.d; d.append(x) })
  w.append(d); return w
}

function welcome() {
  stop(); page = ''
  const win = el('div', 'win', '<div class="win-bar"><i></i><i></i><i></i><span>merhaba.py</span></div>'
    + '<pre><code>isim = "Code Nova"\nfor i in range(3):\n    print("Merhaba", isim)</code></pre>'
    + '<div class="out"><span>Çıktı</span><pre>Merhaba Code Nova\nMerhaba Code Nova\nMerhaba Code Nova</pre></div>')
  win.setAttribute('aria-hidden', 'true')
  const t = wrap('hero-t', txt('h1', 'nova', 'Welcome to Code Nova'),
    txt('p', 'sub', 'Python, Kotlin, Swift ve C# öğren. Her dersten sonra alıştırma çöz, sonunda final yarışmasında puan topla.'),
    btn('Ana sayfaya git', () => (S.name ? hub() : start()), 'btn go'))
  app.replaceChildren(wrap('hero', t, win))
  document.body.classList.add('welcome')
}

function start() {
  stop(); page = ''
  let icon = S.icon || ICONS[0]
  const inp = el('input') as HTMLInputElement
  inp.maxLength = 14; inp.placeholder = 'Takma adın'; inp.value = S.name; inp.setAttribute('aria-label', 'Takma ad')
  const grid = el('div', 'icons')
  ICONS.forEach(i => {
    const b = btn(i, () => { icon = i; [...grid.children].forEach(c => c.setAttribute('aria-pressed', String(c === b))) }, 'ic')
    b.setAttribute('aria-pressed', String(i === icon)); grid.append(b)
  })
  show(wrap('lv', txt('h1', '', 'Code Nova'), txt('p', 'sub', 'Kodlamayı öğren, final yarışmasında puan topla. Önce bir ikon ve takma ad seç.'), grid, inp,
    btn('Başla', () => { const n = inp.value.trim(); if (!n) { inp.focus(); return } S.icon = icon; S.name = n; save(); hub() })))
}

function board() {
  const w = el('section', 'board', '<h2>Skor tablosu</h2>')
  if (!S.board.length) { w.append(txt('p', 'sub', 'Henüz skor yok. Finali bitirince burada görünür.')); return w }
  const ol = el('ol')
  S.board.slice(0, 5).forEach(r => ol.append(txt('li', '', `${r.icon} ${r.name}${r.lang ? ` (${r.lang})` : ''}: ${r.pts} puan`)))
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
}

// Ana menu: Ogren ve Games arasinda gecis
function hub() {
  tick(); page = 'hub'
  const tile = (t: string, s: string, fn: () => void, cls: string) => {
    const b = btn('', fn, `tile ${cls}`); b.append(txt('b', '', t), txt('span', '', s)); return b
  }
  show(txt('h1', '', `Merhaba ${S.name}`), txt('p', 'sub', 'Bugün ne yapmak istersin?'),
    wrap('tiles', tile('Öğren', 'Dersler, alıştırmalar ve final yarışmaları', home, 'learn'), tile('Games', 'Oyunlar çok yakında', games, 'games')))
}

function games() {
  page = 'games'
  const ul = el('ul', 'soonlist')
  ;['Kod Bulmaca', 'Hızlı Quiz', 'Hata Avcısı'].forEach(t => { const li = el('li'); li.append(txt('b', '', t), txt('span', '', 'Yakında')); ul.append(li) })
  show(txt('h1', '', 'Games'), txt('p', 'sub', 'Oyunlar hazırlanıyor. Hazır olunca burada görünecek.'), ul)
}

function lesson(l: Lesson, i: number) {
  const s = l.slides[i], last = i === l.slides.length - 1
  const row = el('div', 'row')
  row.append(btn('Geri', () => (i ? lesson(l, i - 1) : home()), 'btn alt'), btn(last ? 'Alıştırmaya geç' : 'İleri', () => (last ? exercise(l) : lesson(l, i + 1))))
  const pre = el('pre', 'codebox'); const c = el('code'); c.textContent = s.code; pre.append(c)
  show(wrap('lv mid', txt('p', 'sub', `${l.t}: sayfa ${i + 1}/${l.slides.length}`), txt('h2', '', s.h), el('div', 'slide', s.b), pre,
    el('div', 'hard', `<b>Dikkat, zor kısım:</b> ${s.hard}`), row))
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
    if (good) { award('first'); sfx('win'); if (ok === 5) { award('perfect'); confetti() } }
    const msg = ok === 5 ? 'Tam puan! Konuyu çok iyi anlamışsın.' : good ? 'Çok iyi! Küçük bir hata var ama devam edebilirsin.' : 'Bu konuya kısa bir tekrar bakalım.'
    show(wrap('lv', el('div', 'res', `<div class="big">${ok}/5</div>`), txt('p', '', msg), good ? btn('Derslere dön', home) : btn('Tekrar konusuna git', () => review(l))))
  })
}

function review(l: Lesson) {
  show(wrap('lv', txt('h2', '', 'Hızlı tekrar'), txt('p', 'slide', l.review), btn('Yeni alıştırmayı çöz', () => exercise(l))))
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
    show(wrap('lv', el('div', 'res', `<div class="big">${pts}</div>`), txt('p', '', `${ok}/10 doğru. Puan, doğru cevap ve hız bonusundan oluşur.`), txt('p', 'sub', msg), board(), btn('Derslere dön', home)))
  })
}

function run(title: string, qs: Q[], timed: boolean, done: (ok: number, pts: number) => void) {
  let i = 0, ok = 0, pts = 0
  const ask = () => {
    const q = qs[i]; let left = 20, locked = false; const picked = new Set<number>()
    const tm = txt('b', 'tm', timed ? `⏱ ${left}` : '')
    const box = el('div', 'opts'), fb = el('div')
    const answer = (c: Set<number>) => {
      if (locked) return; locked = true; clearInterval(tmr)
      const right = c.size === q.a.length && q.a.every(n => c.has(n))
      if (right) { ok++; if (timed) pts += 500 + left * 25 }
      sfx(right ? 'ok' : 'no')
      ;[...box.children].forEach((b, j) => { (b as HTMLButtonElement).disabled = true; if (q.a.includes(j)) b.classList.add('ok'); else if (c.has(j)) b.classList.add('no') })
      const f = el('p', 'fb'); f.append(txt('b', '', right ? 'Doğru! ' : 'Olmadı. '), document.createTextNode(q.x))
      fb.replaceChildren(f, btn(i + 1 < qs.length ? 'Sonraki soru' : 'Sonucu gör', () => { i++; if (i < qs.length) ask(); else done(ok, pts) }))
    }
    q.o.forEach((t, j) => {
      const b = btn(t, () => {
        if (locked) return
        if (q.k === 'ms') { if (picked.has(j)) picked.delete(j); else picked.add(j); b.classList.toggle('sel') } else answer(new Set([j]))
      }, 'opt')
      box.append(b)
    })
    if (q.k === 'ms') fb.append(btn('Cevabı kontrol et', () => { if (picked.size === 2) answer(picked) }))
    if (timed) tmr = window.setInterval(() => { left--; tm.textContent = `⏱ ${left}`; if (left <= 0) answer(new Set()) }, 1000)
    show(wrap('lv', el('div', 'qk', `<span>${title}</span><span>Soru ${i + 1}/${qs.length}</span>`), tm, txt('h3', '', q.q),
      q.k === 'ms' ? txt('p', 'sub', 'İki doğru şıkkı işaretle.') : el('span'), box, fb))
  }
  ask()
}

welcome()
