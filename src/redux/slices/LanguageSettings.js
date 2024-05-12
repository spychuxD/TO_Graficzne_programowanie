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
  },
});

export const { changeLanguage } = languageSettingsSlice.actions;
export default languageSettingsSlice.reducer;
