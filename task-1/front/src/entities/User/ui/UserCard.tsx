import { Phone, Mail } from 'lucide-react'
import { User } from '@/entities/User/model/types'

type UserCardProps = {
  user: User
  onClick?: () => void
}

export const UserCard = ({ user, onClick }: UserCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md p-6 w-full min-h-[314px]"
    >
      <h3 className="text-2xl font-semibold mb-6 text-brand-blue">
        {user.name}
      </h3>
      <div className="flex items-center mb-3 text-brand-gray text-[14px]">
        <Phone className="w-6 h-6 mr-3 text-violet-700" />
        {user.phone}
      </div>
      <div className="flex items-center text-brand-gray text-[14px]">
        <Mail className="w-6 h-6 mr-3 text-violet-700" />
        {user.email}
      </div>
    </div>
  )
}
