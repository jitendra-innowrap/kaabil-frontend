import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { PiBellBold } from 'react-icons/pi';
import Popup from 'reactjs-popup';
import { clearSessionData, getSessionData } from '../utils/deviceId';
import api from '@/Services/Apiservice';
import { showToast } from '../utils';
import { useDispatch } from 'react-redux';
import { signOut } from '@/redux/userSlice';
import { setProgress } from '@/redux/progressSlice';

interface Notification {
  company_logo: string;
  company_name: string;
  created_date: string;
  id: string;
  is_removed: string;
  job_id: string;
  notification_created_date: string;
  photo_url: string;
  photo_url_user_id: string;
  read_status: string;
  routsId: string;
  status: string;
  text: string;
  user_id: string;
}

const NotificationCard = ({ 
  notification,
  onRead,
  onDelete
}: {
  notification: Notification;
  onRead: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) => {
  const router = useRouter();
  
  const handleRead = async () => {
    await onRead(notification.id);
    if (notification.routsId === "3") {
      router.push('/jobs');
    }
  };

  return (
    <div 
      key={notification.id} 
      className={`notification-card border rounded-lg flex p-2 3xl:p-3 gap-3 ${
        notification.read_status === "0" ? "bg-[#F9D1D754]" : "bg-white"
      }`}
      onClick={handleRead}
    >
      <Image 
        className='size-14 3xl:size-[70px]' 
        src={notification.photo_url || notification.company_logo || '/new-assets/icons/notification-profile-placeholder.svg'} 
        width={140} 
        height={140} 
        alt='profile photo' 
      />
      <div className="3xl:pt-3 flex-1">
        <div className="flex gap-5">
          <p className='text-[10px] 3xl:text-xs text-[#4D4D4F] line-clamp-2 flex-1'>
            {notification.text}
          </p>
          <IoClose
            tabIndex={1}
            className="hover:scale-125 transition-all duration-150 size-3 flex-shrink-0 cursor-pointer 3xl:-translate-y-3"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(notification.id);
            }}
          />
        </div>
        <p className='text-[#4D4D4FB2] text-end mt-4 text-[10px] leading-[100%]'>
          {new Date(notification.created_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default function Notification() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[] | null>(null);
  const [unreadNotification, setUnreadNotification] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
    getNotifications();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getNotifications = useCallback(async () => {
    const { deviceId, secret, salt } = getSessionData();
    const payload = { page: '1' };

    if (!deviceId || !secret || !salt) {
      console.log("Session data not available, retrying...");
      setTimeout(getNotifications, 1000);
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      const response = await api.post(
        `/Chat/getNotification`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response?.data?.code === 1) {
        setNotifications(response.data.notification as Notification[]);
        setUnreadNotification(response.data.unReadNotiCount);
      } else {
        setNotifications(null);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const readNotification = useCallback(async (note_id: string) => {
    try {
      const formData = new FormData();
      formData.append("note_id", note_id);
      formData.append("flag", '2');

      const response = await api.post(
        `/Chat/readNotification`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data?.code === 1) {
        // Update the notification status locally
        setNotifications(prev => 
          prev?.map(n => 
            n.id === note_id ? { ...n, read_status: "1" } : n
          ) || null
        );
        setUnreadNotification(prev => Math.max(0, prev - 1));
      } else if (response.data?.message === "Invalid Hash Request") {
        handleSessionExpired();
      }
    } catch (error) {
      console.error('Error reading notification:', error);
    }
  }, []);

  const readAllNotifications = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append("note_id", "");
      formData.append("flag", '1');

      const response = await api.post(
        `/Chat/readNotification`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data?.code === 1) {
        // Mark all notifications as read locally
        setNotifications(prev => 
          prev?.map(n => ({ ...n, read_status: "1" })) || null
        );
        setUnreadNotification(0);
      } else if (response.data?.message === "Invalid Hash Request") {
        handleSessionExpired();
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  }, []);

  const deleteNotification = useCallback(async (note_id: string) => {
    try {
      const formData = new FormData();
      formData.append("note_id", note_id);
      formData.append("flag", '3');

      const response = await api.post(
        `/Chat/readNotification`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data?.code === 1) {
        showToast('Notification removed!');
        // Remove the notification locally
        setNotifications(prev => 
          prev?.filter(n => n.id !== note_id) || null
        );
        setUnreadNotification(prev => 
          prev > 0 ? prev - 1 : 0
        );
      } else if (response.data?.message === "Invalid Hash Request") {
        handleSessionExpired();
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  }, []);

  const handleSessionExpired = () => {
    showToast("Session Expired Please login!", true);
    dispatch(signOut());
    dispatch(setProgress(1));
    clearSessionData();
  };

  useEffect(() => {
    if (open) {
      getNotifications();
    }
  }, [open, getNotifications]);

  return (
    <>
      <div className="relative cursor-pointer" tabIndex={0} onClick={handleOpen}>
        {unreadNotification > 0 && (
          <span className="size-3 xl:size-[14px] 3xl:size-[16px] bg-success text-white rounded-full absolute text-[8px] md:text-[10px] grid place-items-center leading-none -top-[4px] -right-[4px] border-[1.5px] border-white">
            {unreadNotification > 9 ? '9+' : unreadNotification}
          </span>
        )}
        <PiBellBold className="size-4 3xl:size-5" />
      </div>

      <Popup
        open={open}
        onClose={handleClose}
        modal
        lockScroll
        className="notification relative logout"
        overlayStyle={{
          background: "#4D4D4DC2",
          padding: "20px",
          overflow: "hidden",
        }}
      >
        <div className="bg-white rounded 2xl:rounded-xl 3xl:rounded-2xl p-3 3xl:p-8">
          <div className="flex justify-between items-center">
            <div className='font-medium 2xl:text-lg 3xl:text-2xl leading-5 flex gap-1 items-center'>
              Notification
              {unreadNotification > 0 && (
                <span className="size-[14px] xl:size-[16px] 3xl:size-5 bg-success text-white rounded-full text-[10px] grid place-items-center leading-none -top-[4px] -right-[4px] border-[1.5px] border-white">
                  {unreadNotification > 9 ? '9+' : unreadNotification}
                </span>
              )}
            </div>
            <IoClose
                tabIndex={1}
              className="size-4 hover:scale-110 transition-all duration-150 3xl:size-6 cursor-pointer -translate-y-1"
              onClick={handleClose}
            />
          </div>
          
          {notifications && notifications.length > 0 && (
            <div className="flex mt-2 2xl:mt-3 mb-2 2xl:mb-[9px] justify-end">
              <button 
                className='transition-all duration-150 font-medium text-end text-[11px] leading-[100%] bg-transparent text-black p-0 hover:bg-transparent hover:underline'
                onClick={readAllNotifications}
              >
                MARK ALL READ
              </button>
            </div>
          )}

          <div className="flex flex-col gap-[6px] 3xl:gap-2 h-[323px] xl:h-[393px] 2xl:h-[423px] 3xl:h-[614px] overflow-auto -mr-[6px] notification-list">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin h-7 w-7 rounded-full border-l-0 border-b-0 border-red border-[3px]"></div>
              </div>
            ) : notifications && notifications.length > 0 ? (
              notifications.map((noti) => (
                <NotificationCard
                  key={noti.id}
                  notification={noti}
                  onRead={readNotification}
                  onDelete={deleteNotification}
                />
              ))
            ) : (
              <div className="flex flex-col justify-center items-center h-full">
                <Image 
                  className='w-14 3xl:w-[85px] h-auto' 
                  src={'/new-assets/icons/no-notifications-yet.svg'} 
                  width={160} 
                  height={170} 
                  alt='No notifications' 
                />
                <h3 className='font-medium text-base 2xl:text-xl mt-4 mb-3 3xl:mb-4 3xl:mt-12 3xl:text-2xl 3xl:leading-[27px]'>
                  No Notification yet
                </h3>
                <p className='text-sm 3xl:text-base max-w-[200px] 3xl:max-w-[343px] text-center'>
                  You have no notification right now. Come back later
                </p>
              </div>
            )}
          </div>
        </div>
      </Popup>
    </>
  );
}