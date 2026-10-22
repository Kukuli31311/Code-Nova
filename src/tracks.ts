import type { Track } from './types'
import { LESSONS as PY, FINAL as PYF } from './content'
import { KT, KTF } from './kotlin'
import { SW, SWF } from './swift'
import { CS, CSF } from './csharp'

// Sıra önemli: bir dil, bir önceki dil bitince açılır.
export const TRACKS: Track[] = [
  { id: 'py', name: 'Python', icon: '🐍', lessons: PY, final: PYF },
  { id: 'kt', name: 'Kotlin', icon: '🤖', lessons: KT, final: KTF },
  { id: 'sw', name: 'Swift', icon: '🐦', lessons: SW, final: SWF },
  { id: 'cs', name: 'C#', icon: '🎮', lessons: CS, final: CSF },
]
