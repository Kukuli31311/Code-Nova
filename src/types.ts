export type Q = { k: 'tf' | 'mc' | 'ms'; q: string; o: string[]; a: number[]; x: string }
export type Lesson = { id: string; t: string; slides: { h: string; b: string; code: string; hard: string }[]; review: string; ex: Q[][] }
export type Track = { id: string; name: string; icon: string; lessons: Lesson[]; final: Q[] }

export const tf = (q: string, yes: boolean, x: string): Q => ({ k: 'tf', q, o: ['Doğru', 'Yanlış'], a: [yes ? 0 : 1], x })
export const mc = (q: string, o: string[], a: number, x: string): Q => ({ k: 'mc', q, o, a: [a], x })
export const ms = (q: string, o: string[], a: [number, number], x: string): Q => ({ k: 'ms', q, o, a, x })
