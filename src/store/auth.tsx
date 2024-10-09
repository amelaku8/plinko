import toast from 'react-hot-toast'
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: "",
    balance: 100,
    isAuth: false,

  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.name
      state.isAuth = true
      state.balance = action.payload.balance
    },
    decrementBalance: (state, action) => {
      state.balance = state.balance - action.payload

    },
    incrementBalance: (state, action) => {
      state.balance = state.balance - action.payload
    },

    redeemGift: (state, action) => {
      state.balance = action.payload

    }

  }
})

export default userSlice.reducer
export const { setUser, incrementBalance, decrementBalance, redeemGift } = userSlice.actions
