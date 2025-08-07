import { User } from '../model/types'
import { X } from 'lucide-react'

type UserModalProps = {
  user: User
  onClose: () => void
}

type InfoRowProps = {
  label: string
  value?: string
}

const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="flex">
    <span className="w-40 shrink-0 text-lg">{label}</span>
    <span className="text-[#8189A2] text-base">{value || '-'}</span>
  </div>
)

export const UserModal = ({ user, onClose }: UserModalProps) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm min-w-[320px] sm:min-w-[500px] "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-8 max-w-md w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl mb-6 text-brand-blue">{user.name}</h2>

        <div className="mt-10 space-y-3  text-[#262C40]">
          <InfoRow label="Телефон:" value={user.phone} />
          <InfoRow label="Почта:" value={user.email} />
          <InfoRow label="Дата приёма:" value={user.hire_date} />
          <InfoRow label="Должность:" value={user.position_name} />
          <InfoRow label="Подразделение:" value={user.department} />

          <div className="mt-10">
            <p className="text-lg">Дополнительная информация:</p>
            <p className="mt-3 text-[#8189A2]">{user.address}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
