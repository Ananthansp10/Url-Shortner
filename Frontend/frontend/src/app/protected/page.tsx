'use client'

import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white px-6">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center">
          <div className="bg-white/10 p-6 rounded-full border border-white/20 shadow-lg">
            <Lock className="w-16 h-16 text-purple-300" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold">
          Unauthorized Access
        </h1>

        <p className="text-purple-200 max-w-md mx-auto">
          You don’t have permission to view this page. Please sign in to
          continue.
        </p>

        <button
          onClick={() => router.push('/auth/user/signin')}
          className="mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
        >
          Go to Sign In
        </button>
      </div>
    </div>
  )
}
