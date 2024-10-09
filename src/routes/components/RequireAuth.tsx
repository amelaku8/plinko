import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

export function RequireAuth() {
  const isAuth = useSelector(state => state.user.isAuth)
  const setUser = useSelector(state => state.user)
  return <Outlet />
}
