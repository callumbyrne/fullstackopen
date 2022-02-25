import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (!notification) {
    return null
  }

  const colorStyle =
    notification.type === 'success'
      ? 'bg-green-100 text-green-600'
      : 'bg-red-100 text-red-600'

  return (
    <div className={`${colorStyle}`}>
      <div className="max-w-7xl mx-auto py-5 px-4 font-medium text-lg">
        {notification.message}
      </div>
    </div>
  )
}

export default Notification
