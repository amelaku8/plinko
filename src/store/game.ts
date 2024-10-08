import { createSlice } from "@reduxjs/toolkit"

const gameSlice = createSlice({
  name: "Game",
  initialState: 0,
  reducers: {
    setGamesRunning: (state, action) => {

      return action.payload
    },
    incrementGamesRunning: (state, action) => {
      if ((action.payload + state) < 0) {
        return 1
      }
      return (state + 1)
    },
    decrementGamesRunning: (state, action) => {
      if ((action.payload - state) < 0) {
        return 0
      }
      return (state - 1)
    }


  }
})
export default gameSlice.reducer
export const { setGamesRunning, incrementGamesRunning, decrementGamesRunning } = gameSlice.actions
