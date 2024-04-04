import { configureStore } from '@reduxjs/toolkit'
import codeStructureReducer  from './slices/CodeStructure'
import classesReducer  from './slices/Classes'

export const store = configureStore({
  reducer: {
    codeStructure: codeStructureReducer ,
    classes: classesReducer
  }
})