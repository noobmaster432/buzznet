import { BsTwitter } from 'react-icons/bs';
import React, { useEffect } from 'react'
import useCurrentUser from '../hooks/useCurrentUser'
import useNotifications from '../hooks/useNotifications';

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  },[mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
        <div className="p-6 text-center text-xl text-neutral-600">
            No notifications
        </div>
    )
  }

  return (
    <div className='flex flex-col'>
        {fetchedNotifications.map((notification: Record<string, any>) => (
            <div key={notification.id} className='flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800'>
                <BsTwitter color="white" size={28} />
                <p>{notification.body}</p>
            </div>
        ))}
    </div>
  )
}

export default NotificationsFeed