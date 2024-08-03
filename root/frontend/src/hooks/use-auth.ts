import { api } from '@/lib/axios'
import { useNavigate } from 'react-router-dom'
import { getCookie, removeCookie, setCookie } from 'typescript-cookie'

export function useAuth() {
  const navigate = useNavigate()

  const isAuthenticated = Boolean(getCookie('_auth'))
  const username = String(getCookie('user_name'))

  async function signIn({
    email,
    password,
  }: {
    email: string
    password: string
  }) {
    const singinResponse = await api.post('/login', {
      email,
      password,
    })

    const jwt = singinResponse.data.token
    setCookie('_auth', jwt, { expires: 30, secure: true })
    setCookie('user_name', singinResponse.data.username)

    navigate(`/bookshelf`)

    return {
      email: singinResponse.data.email,
      username: singinResponse.data.username,
    }
  }

  function signOut() {
    removeCookie('_auth')
    removeCookie('user_name')

    navigate('/login')
  }

  async function signUp({
    username,
    email,
    password,
  }: {
    username: string
    email: string
    password: string
  }) {
    await api.post('/register', {
      username,
      email,
      password,
    })

    await signIn({ email, password })
  }

  return {
    username,
    isAuthenticated,
    signIn,
    signOut,
    signUp,
  }
}
