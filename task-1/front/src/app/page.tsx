'use client'

import { useState, useEffect } from 'react'
import { User } from '@/entities/User/model/types'
import { UserCard } from '@/entities/User/ui/UserCard'
import { SearchBar } from '@/shared/ui/SearchBar/SearchBar'
import { UserModal } from '@/entities/User/ui/UserModal'

export default function Home() {
  const [term, setTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState(term)
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(term)
    }, 300)

    return () => clearTimeout(handler)
  }, [term])

  useEffect(() => {
    const controller = new AbortController()

    const fetchUsers = async () => {
      const url = debouncedTerm
        ? `http://localhost:3000?term=${debouncedTerm}`
        : 'http://localhost:3000'
      const res = await fetch(url, { signal: controller.signal })
      const data = await res.json()
      setUsers(data.data)
    }

    fetchUsers().catch(() => {})

    return () => controller.abort()
  }, [debouncedTerm])

  return (
    <main className="min-h-screen bg-gray-50 px-20 py-16">
      <div className="">
        <SearchBar value={term} onChange={setTerm} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onClick={() => setSelectedUser(user)}
            />
          ))}
        </div>

        {selectedUser && (
          <UserModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </div>
    </main>
  )
}
