import { create } from "zustand"
import { nanoid } from "nanoid"

// Maintain settings regarding current sessions,
// such as the selected scale and key, the chords
// currently loaded up, etc.

const INITIAL_STATE = {
  scale: 'major',
  key: 'C',
  chords: []
}

const store = create((set, get) => {
  const setScale = (scale) => {
    set({ scale })
  }

  const setKey = (key) => {
    set({ key })
  }

  const insertChord = (options) => {
    const chord = {
      id: nanoid(),
      name: options.name,
      length: 1,
      octave: 3,
      voicing: 'close',
      inversion: null,
      pattern: 'sustain',
      deQuarantize: 4,
      velocity: 80,
      velocitySpan: -20,
    }

    const oldChords = get().chords
    const chords = oldChords.splice(options.atIndex, 0, chord)
    set({ chords })
  }

  const removeChord = (index) => {
    const oldChords = get().chords
    const chords = oldChords.splice(options.atIndex, 1)
    set({ chords })
  }

  const resetSession = () => {
    set(INITIAL_STATE)
  }

  return {
    ...INITIAL_STATE,
    setScale,
    setKey,
    insertChord,
    removeChord
  }
})
