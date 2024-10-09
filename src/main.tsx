import './styles/global.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Routes } from 'routes'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import gameSlice from './store/game'
import userSlice from './store/auth.jsx'
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')
const store = configureStore({
  reducer: {
    games: gameSlice,
    user: userSlice
  }
})

const root = createRoot(container)

root.render(
  <Provider store={store}>
    <Routes />
    <Toaster />
  </Provider >
)
