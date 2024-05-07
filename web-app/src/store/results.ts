import { create } from 'zustand'

interface ResultsState {
  results: any
  setResults: (results: any) => void
}

export const useResults = create <ResultsState>()((set) => ({
  results: null,
  setResults: (results: any) => {
    set({ results })
  }
}))
