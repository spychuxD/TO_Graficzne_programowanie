import { configureStore } from '@reduxjs/toolkit'
import codeStructureReducer  from './slices/CodeStructure'

export const store = configureStore({
  reducer: {
    codeStructure: codeStructureReducer ,
  }
})