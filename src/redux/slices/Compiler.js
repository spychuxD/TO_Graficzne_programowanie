import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export async function sendRequest(lang, code) {
  const clientId = "1eaefd0b0dfaf838b46484901278a7db";
  const clientSecret ="f8a5a9a17ffd66f0078bd02c58f7d0c964881b1a7fbf8da0305e0c757b8fadb0";

  debugger;
  const data = {
    clientId: clientId,
    clientSecret: clientSecret,
    script: code,
    language: lang,
    versionIndex: "0",
  };

  try {
    const response = await axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://api.jdoodle.com/v1/execute",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      debugger
      return response.data;
  } catch (error) {
    console.error("Error executing code:", error);
  }
}

const compilerSlice = createSlice({
  name: "compiler",
  initialState: {
    compileResult: "test",
  },
  reducers: {
    saveResut(state, action) {
      debugger
      const { result } = action.payload;
      state.compileResult = result;
    },
  },
});

export const { saveResut } = compilerSlice.actions;
export default compilerSlice.reducer;
