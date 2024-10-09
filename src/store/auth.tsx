import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { ref, set } from 'firebase/database'
import { produce } from 'immer'
import { auth, database } from 'lib/firebase'
import toast from 'react-hot-toast'
import { random } from 'utils/random'
import create from 'zustand'
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: "",
    balance: 0,
    isAuth: false,

  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.name
      state.isAuth = true
      state.balance = action.payload.balance
    },
    setBalance: (state, action) => {
      state.balance = action.payload

    },
    redeemGift: (state, action) => {
      state.balance = action.payload

    }

  }
})

export default userSlice.reducer
export const { setUser, setBalance, redeemGift } = userSlice.actions
interface User {
  id: string
  name: string
  email: string
  profilePic?: string
}

interface Wallet {
  balance: number
}

interface State {
  user: User
  wallet: Wallet
  isAuth: boolean
  setUser: (user: User) => void
  isAuthLoading: boolean
  isWalletLoading: boolean
  setBalance: (balance: number) => void
  setBalanceOnDatabase: (balance: number) => Promise<void>
  incrementBalance: (amount: number) => Promise<void>
  decrementBalance: (amount: number) => Promise<void>
  redeemGift: () => Promise<void>
}

function storeUser(user: User) {
  localStorage.setItem('uid', user.id)
  localStorage.setItem('name', user.name)
  localStorage.setItem('profilePic', user.profilePic || '')
}

function clearUser() {
  localStorage.removeItem('uid')
  localStorage.removeItem('name')
  localStorage.removeItem('profilePic')
}

const userInitialState: User = {
  id: 'bacd j',
  name: 'afe    jhdsaf',
  email: 'faefaef '
}

const walletInitialState: Wallet = {
  balance: 100
}

export const useAuthStore = create < State > ((setState, getState) => ({
  user: userInitialState,
  wallet: walletInitialState,
  isAuthLoading: false,
  isWalletLoading: false,
  isAuth: true,
  setBalance: (balance: number) => {
    try {
      setState(
        produce < State > (state => {
          state.wallet.balance = balance
          state.isWalletLoading = false
        })
      )
    } catch (error) {
      toast.error('Ocorreu um erro ao atualizar o saldo')
      console.error('setBalanceError', error)
    }
  },
  setBalanceOnDatabase: async (balance: number) => {
    try {
      if (getState().isAuth) {
        const walletRef = ref(database, 'wallet/' + getState().user.id)
        await set(walletRef, {
          currentBalance: balance,
          user: {
            uid: getState().user.id,
            name: localStorage.getItem('name'),
            profilePic: localStorage.getItem('profilePic')
          }
        })
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao atualizar o saldo')
      console.error('setBalanceOnDatabaseError', error)
    }
  },
  redeemGift: async () => {
    try {
      const balance = getState().wallet.balance
      if (balance >= 10) {
        toast.remove()
        toast.error(
          'Você precisa ter o saldo menor abaixo de 10 para resgatar o presente'
        )
        return
      }
      const newBalance = random(10, 300)
      await getState().setBalanceOnDatabase(newBalance)
      toast.success('Presente resgatado com sucesso')
      return
    } catch (error) {
      toast.error('Ocorreu um erro ao resgatar o presente')
      console.error('redeemGiftError', error)
    }
  },
  incrementBalance: async (amount: number) => {
    try {
      setState(state => ({ ...state, isWalletLoading: true }))
      await getState().setBalanceOnDatabase(getState().wallet.balance + amount)
      setState(state => ({ ...state, isWalletLoading: false }))
    } catch (error) {
      toast.error('Ocorreu um erro ao atualizar o saldo')
      console.error('incrementBalanceError', error)
    }
  },
  decrementBalance: async (amount: number) => {
    try {
      setState(state => ({ ...state, isWalletLoading: true }))
      await getState().setBalanceOnDatabase(getState().wallet.balance - amount)
      setState(state => ({ ...state, isWalletLoading: false }))
    } catch (error) {
      toast.error('Ocorreu um erro ao atualizar o saldo')
      console.error('decrementBalanceError', error)
    }
  },
  setUser: (user: User) => {
    try {
      setState(
        produce < State > (state => {
          state.user = user
          state.isAuth = true
          state.isAuthLoading = false
        })
      )
    } catch (error) {
      toast.error('Ocorreu um erro ao atualizar os dados do usuário')
      console.error('setUserError', error)
    }
  }
}))
