import { Navbar } from 'layouts/DefaultLayout/components/Navbar'

import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Footer } from './components/Footer'
import { Loading } from './components/Loading'

export function DefaultLayout() {
  // const isLoading = useAuthStore(state => state.isAuthLoading)
  // const setCurrentBalance = useAuthStore(state => state.setBalance)
  //const balance = useSelector(state => state.user.balance)


  return (
    <div className="flex relative min-h-screen w-full flex-col justify-between bg-background">
      <Navbar />
      <div className="flex h-full w-full max-w-[1400px] flex-1 overflow-auto overflow-x-hidden pt-4 lg:mx-auto">
        <div className="flex-1"> <Outlet /></div>
      </div>
      <Footer />
    </div>
  )
}
