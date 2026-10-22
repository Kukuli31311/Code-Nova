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
}

const KEY = 'bulut-akademi-v1'
let S: St = { icon: '', name: '', cur: 'py', fin: {}, passed: {}, tries: {}, board: [], streak: { n: 0, last: '' }, today: { d: '', n: 0 } }
try { S = { ...S, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') } } catch { /* yoksay */ }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)) } catch { /* yoksay */ } }

const app = document.getElementById('app')!
const el = (tag: string, cls = '', html = '') => { const e = document.createElement(tag); if (cls) e.className = cls; e.innerHTML = html; return e }
const txt = (tag: string, cls: string, t: string) => { const e = el(tag, cls); e.textContent = t; return e }
const btn = (t: string, fn: () => void, cls = 'btn') => { const b = txt('button', cls, t) as HTMLButtonElement; b.onclick = fn; return b }
const show = (...n: Node[]) => { document.body.classList.remove('welcome'); app.replaceChildren(...n) }
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
}

const SNIPS = ['print("Merhaba")', '{ }', '</>', 'for i in range(3):', 'if x > 5:', 'def nova():', '0101 1100', 'x = 42', 'import nova', 'while True:', '# kod yaz', '[ ]']

function welcome() {
  const hero = el('div', 'hero')
  SNIPS.forEach((t, i) => { const s = txt('span', `sn s${i}`, t); s.setAttribute('aria-hidden', 'true'); hero.append(s) })
  hero.append(txt('h1', 'nova', 'Welcome to Code Nova'), txt('p', 'sub', 'Kodlamayı oyun oynar gibi öğren.'),
    btn('Ana sayfaya git', () => (S.name ? home() : start()), 'btn go'))
  show(hero)
  document.body.classList.add('welcome')
}

function start() {
  let icon = S.icon || ICONS[0]
  const inp = el('input') as HTMLInputElement
  inp.maxLength = 14; inp.placeholder = 'Takma adın'; inp.value = S.name; inp.setAttribute('aria-label', 'Takma ad')
  const grid = el('div', 'icons')
  ICONS.forEach(i => {
    const b = btn(i, () => { icon = i; [...grid.children].forEach(c => c.setAttribute('aria-pressed', String(c === b))) }, 'ic')
    b.setAttribute('aria-pressed', String(i === icon)); grid.append(b)
  })
  show(wrap('lv', txt('h1', '', 'Code Nova'), txt('p', 'sub', 'Kodlamayı öğren, final yarışmasında puan topla. Önce bir ikon ve takma ad seç.'), grid, inp,
    btn('Başla', () => { const n = inp.value.trim(); if (!n) { inp.focus(); return } S.icon = icon; S.name = n; save(); home() })))
}

function board() {
  const w = el('section', 'board', '<h2>Skor tablosu</h2>')
  if (!S.board.length) { w.append(txt('p', 'sub', 'Henüz skor yok. Finali bitirince burada görünür.')); return w }
  const ol = el('ol')
  S.board.slice(0, 5).forEach(r => ol.append(txt('li', '', `${r.icon} ${r.name}${r.lang ? ` (${r.lang})` : ''}: ${r.pts} puan`)))
  w.append(ol); return w
}

function home() {
  tick()
  const T = curTrack()
  const ti = TRACKS.indexOf(T)
  const all = T.lessons.every(l => S.passed[l.id])
  const doneToday = S.today.d === day() && S.today.n >= 1

  const streak = el('span', 'streak', `🔥 <b>${S.streak.n}</b>`)
  streak.title = 'Üst üste giriş günü'; streak.setAttribute('aria-label', `${S.streak.n} gün üst üste`)
  const top = wrap('top', txt('h1', '', `${S.icon} ${S.name}`), streak)

  const tasks = el('section', 'tasks', '<h2>Bugünün görevleri</h2>')
  const ul = el('ul')
  ul.append(txt('li', 'done', '✅ Siteye gir'), txt('li', doneToday ? 'done' : '', `${doneToday ? '✅' : '⬜'} Bugün en az 1 konuyu bitir (${doneToday ? 1 : 0}/1)`))
  tasks.append(ul)
  if (doneToday) tasks.append(txt('p', 'sub', 'Harika! Bugünün görevleri tamam.'))

  const tabs = el('div', 'tabs')
  TRACKS.forEach((t, i) => {
    const open = trackOpen(i)
    const b = btn(`${open ? t.icon : '🔒'} ${t.name}${trackDone(t) ? ' ✅' : ''}`, () => { S.cur = t.id; save(); home() }, 'tab')
    b.setAttribute('aria-pressed', String(t.id === T.id)); b.disabled = !open
    if (!open) b.title = `${TRACKS[i - 1].name} dersleri ve finali (en az ${PASS}/10) bitince açılır`
    tabs.append(b)
  })

  const next = TRACKS[ti + 1]
  const best = S.fin[T.id]
  const info = `${T.name}: ${T.lessons.length} ders. Her dersten sonra 5 soruluk alıştırma var.`
    + (best !== undefined ? ` En iyi final: ${best}/10.` : '')
    + (next ? ` Sıradaki dil ${next.name}: açmak için tüm dersleri bitir ve finalde en az ${PASS}/10 yap.` : '')

  const list = el('div', 'lessons')
  T.lessons.forEach((l, i) => {
    const open = i === 0 || S.passed[T.lessons[i - 1].id]
    const b = btn(`${S.passed[l.id] ? '✅' : open ? '▶️' : '🔒'} ${l.t}`, () => lesson(l, 0), 'card')
    b.disabled = !open; list.append(b)
  })
  const f = btn(`${all ? '🏆' : '🔒'} ${T.name} final yarışması (10 soru, süreli)`, () => finalQ(T), 'card gold')
  f.disabled = !all
  show(top, tasks, tabs, txt('p', 'sub', info), list, f, board(), btn('Adı veya ikonu değiştir', start, 'btn alt'))
}

function lesson(l: Lesson, i: number) {
  const s = l.slides[i], last = i === l.slides.length - 1
  const row = el('div', 'row')
  row.append(btn('Geri', () => (i ? lesson(l, i - 1) : home()), 'btn alt'), btn(last ? 'Alıştırmaya geç' : 'İleri', () => (last ? exercise(l) : lesson(l, i + 1))))
  const pre = el('pre', 'codebox'); const c = el('code'); c.textContent = s.code; pre.append(c)
  show(wrap('lv mid', txt('p', 'sub', `${l.t} · ${i + 1}/${l.slides.length}`), txt('h2', '', s.h), el('div', 'slide', s.b), pre,
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
    const next = TRACKS[TRACKS.indexOf(T) + 1]
    const msg = ok < PASS ? `Geçmek için en az ${PASS} doğru gerekir. Konuları tekrar edip finali yeniden dene.`
      : next ? `Tebrikler! ${next.name} dili açıldı.` : 'Tebrikler! Bütün dilleri bitirdin.'
    show(wrap('lv', el('div', 'res', `<div class="big">${pts}</div>`), txt('p', '', `${ok}/10 doğru. Puan, doğru cevap ve hız bonusundan oluşur.`), txt('p', 'sub', msg), board(), btn('Derslere dön', home)))
  })
}

function run(title: string, qs: Q[], timed: boolean, done: (ok: number, pts: number) => void) {
  let i = 0, ok = 0, pts = 0, timer = 0
  const ask = () => {
    const q = qs[i]; let left = 20, locked = false; const picked = new Set<number>()
    const tm = txt('b', 'tm', timed ? `⏱ ${left}` : '')
    const box = el('div', 'opts'), fb = el('div')
    const answer = (c: Set<number>) => {
      if (locked) return; locked = true; clearInterval(timer)
      const right = c.size === q.a.length && q.a.every(n => c.has(n))
      if (right) { ok++; if (timed) pts += 500 + left * 25 }
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
    if (timed) timer = window.setInterval(() => { left--; tm.textContent = `⏱ ${left}`; if (left <= 0) answer(new Set()) }, 1000)
    show(wrap('lv', el('div', 'qk', `<span>${title}</span><span>Soru ${i + 1}/${qs.length}</span>`), tm, txt('h3', '', q.q),
      q.k === 'ms' ? txt('p', 'sub', 'İki doğru şıkkı işaretle.') : el('span'), box, fb))
  }
  ask()
}

welcome()
