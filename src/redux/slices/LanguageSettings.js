import { createSlice } from "@reduxjs/toolkit";

const languageSettingsSlice = createSlice({
  name: "languageSettings",
  initialState: {
    isLanguage: "cpp",
  },
  reducers: {
    changeLanguage(state, action) {
      state.isLanguage = action.payload;
    },
    setLanguageSlice(state,action){
      state.isLanguage=action.payload.data.isLanguage;
    }
  },
});

export const { changeLanguage,setLanguageSlice } = languageSettingsSlice.actions;
export default languageSettingsSlice.reducer;
