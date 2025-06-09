'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import AdminPage from '../../components/AdminPage'  // your existing admin UI

export default function AdminRoute() {
  const router = useRouter()

  // Local state
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Guard: listen for auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, u => {
      setUser(u)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  // If still checking, show spinner
  if (loading) {
    return <p className="p-8 text-center">Loading…</p>
  }

  // If signed in but not the admin, kick out
  const ADMIN_UID = process.env.NEXT_PUBLIC_ADMIN_UID
  if (user && user.uid !== ADMIN_UID) {
    // you could router.replace('/') or show “Not allowed”
    router.replace('/')
    return null
  }

  // Show login form if nobody’s signed in
  if (!user) {
    async function handleLogin(e: FormEvent) {
      e.preventDefault()
      setError(null)
      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (err: unknown) {
        setError((err as Error).message)
      }
    }

    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl mb-4">Admin Sign-In</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
      </div>
    )
  }

  return <AdminPage />
}
