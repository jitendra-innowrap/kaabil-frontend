import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { PiBellBold } from 'react-icons/pi';
import Popup from 'reactjs-popup';
import { clearSessionData, getSessionData } from '../utils/deviceId';
import api from '@/Services/Apiservice';
import { formatNotificationDate, showToast } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { RefreshProfileData, signOut, updateUnreadNotiCount } from '@/redux/userSlice';
import { setProgress } from '@/redux/progressSlice';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { firebaseConfig } from '@/config/firebase'; // Your Firebase config
import { RootState } from '@/redux/store';

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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = typeof window !== 'undefined' ? getMessaging(firebaseApp) : null;

const NotificationCard = ({ 
  notification,
  onRead,
  onDelete,
  handleClose
}: {
  notification: Notification;
  onRead: (id: string) => Promise<void>;
  onDelete: (id: string, status:string) => Promise<void>;
  handleClose: () => void;
}) => {
  const router = useRouter();
  const {token, name, id, photo_url} = useSelector((state: RootState) => state.user);
  const handleRead = async () => {
    if(notification?.read_status==="0") await onRead(notification.id, );
    if (notification?.routsId === "3" && notification?.job_id) {
      handleClose();
      router.push(`/jobs/detail/${notification?.job_id}`);
    }
    if (notification?.routsId === "2" && notification?.job_id) {
      handleClose();
      router.push(`https://meuat.kaam.com/jobseeker/inbox?admin_id=17&token=${token}&user_id=${id}&user_name=${name}&user_photo_url=${photo_url}`);
    }
  };

  return (
    <div 
      key={notification.id} 
      className={`notification-card cursor-pointer border rounded-lg flex p-2 3xl:p-3 gap-3 ${
        notification.read_status === "0" ? "bg-[#F9D1D754]" : "bg-white"
      }`}
      onClick={handleRead}
    >
      <Image 
        className={`size-14 3xl:size-[70px] rounded-full ${(notification.photo_url || notification.company_logo)?" border-2":"border-2"}`} 
        src={notification.photo_url || notification.company_logo || '/new-assets/logos/kaabil-logo.svg'} 
        width={140} 
        height={140} 
        alt='profile photo' 
      />
      <div className="3xl:pt-3 flex-1">
        <div className="flex gap-5">
          <p className='text-[10px] 3xl:text-xs text-[#4D4D4F] flex-1'>
            {notification.text}
          </p>
          <IoClose
            tabIndex={1}
            className="hover:scale-125 transition-all duration-150 size-3 flex-shrink-0 cursor-pointer 3xl:-translate-y-3"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(notification.id, notification.read_status);
            }}
          />
        </div>
        <p className='text-[#4D4D4FB2] text-end mt-4 text-[10px] leading-[100%]'>
          {notification?.notification_created_date}
        </p>
      </div>
    </div>
  );
};

export default function Notification() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const currentPageRef = useRef(1);
  const notificationListRef = useRef<HTMLDivElement>(null);
  const {unreadNotifications, isProfileUpdate} = useSelector((state: RootState) => state.user);
  const [unreadNotification, setUnreadNotification] = useState(unreadNotifications);
  const [notifications, setNotifications] = useState<Notification[] | null>(null);

  const handleOpen = () => {
    setOpen(true);
    refreshNotifications();
  };

  const handleClose = () => {
    setOpen(false);
  };

 // Update the Firebase initialization and message handling
useEffect(() => {
    let unsubscribe: () => void;
  
    const initializeFirebase = async () => {
      try {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator && messaging) {
          const permission = await window.Notification.requestPermission();
          if (permission === 'granted') {
            const token = await getToken(messaging, {
              vapidKey: firebaseConfig.vapidKey,
            });
            
            if (token) {
              await updateFCMToken(token);
              // console.log('FCM token registered🍃🍃🍃', token);
  
              // Set up message listener
              unsubscribe = onMessage(messaging, (payload) => {
                // console.log('New message received:', payload);
                handleNewNotification();
              });
            }
          }
        }
      } catch (error) {
        console.error('Error initializing Firebase:', error);
      }
    };
  
    initializeFirebase();
  
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Define the handler function separately so we can reference it
    const handleServiceWorkerMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'NEW_NOTIFICATION') {
        dispatch(RefreshProfileData());
      }
    };
  
    // Add event listener
    navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);
  
    // Cleanup - must pass the same function reference
    return () => {
      navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage);
    };
  }, [dispatch]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Tab lost focus - close your notification popup
        handleClose();
      }else if (document.visibilityState === 'visible') {
        refreshNotifications();
      }
    };
  
    document.addEventListener('visibilitychange', handleVisibilityChange);
  
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleClose]);

  
  // New notification handler
  const handleNewNotification = () => {
    refreshNotifications();    
    dispatch(RefreshProfileData());
    // Play notification sound
    // playNotificationSound();
    showToast('New notification received');
  }
  // Audio player utility
  const playNotificationSound = () => {
    const audio = new Audio('/assets/sounds/google-chat-notification-sound.mp3');
    audio.volume = 0.3; // 30% volume
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  const updateFCMToken = async (token: string) => {
    try {
      const formData = new FormData();
      formData.append('token', token);
      formData.append('device', 'web');
      
      await api.post('/Auth/updateToken', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    } catch (error) {
      console.error('Error updating FCM token:', error);
    }
  };


  const refreshNotifications = () => {
    setCurrentPage(1);
    currentPageRef.current = 1;
    setHasMore(true);
    getNotifications(1, true);
  };

  const getNotifications = async (page: number, isRefresh = false) => {
    const { deviceId, secret, salt } = getSessionData();
    const payload = { page: page.toString() };

    if (!deviceId || !secret || !salt) {
      // console.log("Session data not available, retrying...");
      setTimeout(() => getNotifications(page, isRefresh), 1000);
      return;
    }

    try {
      if (isRefresh) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      const response = await api.post(
        `/Chat/getNotification`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response?.data?.code == 1) {
        if (isRefresh) {
          setNotifications(response.data.notification as Notification[]);
        } else {
          setNotifications(prev => [...(prev || []), ...(response.data.notification || [])]);
        }
        
        setUnreadNotification(response.data.unReadNotiCount || 0);
        dispatch(updateUnreadNotiCount(response.data.unReadNotiCount || 0))
        setHasMore(response.data.notification?.length > 0);
      } else {
        if (isRefresh) {
          setNotifications(null);
        }
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }
  
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const loadMoreNotifications = () => {
    if (debounceTimerRef.current) return;
  
    debounceTimerRef.current = setTimeout(() => {
      debounceTimerRef.current = null;
  
      if (!isLoadingMore && hasMore && notificationListRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = notificationListRef.current;
        const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 50;
  
        if (isNearBottom) {
          const nextPage = currentPageRef.current + 1;
          setCurrentPage(nextPage);
          currentPageRef.current = nextPage;
          getNotifications(nextPage); // <-- This will now always be up to date
        }
      }
    }, 300);
  };
  


useEffect(() => {
    if (open && notificationListRef.current) {
      const listElement = notificationListRef.current;
      listElement.addEventListener('scroll', loadMoreNotifications);
      return () => listElement.removeEventListener('scroll', loadMoreNotifications);
    }
  }, [open, loadMoreNotifications]);
  

  const readNotification = async (note_id: string) => {
    try {
      const formData = new FormData();
      formData.append("note_id", note_id);
      formData.append("flag", '2');

      const response = await api.post(
        `/Chat/readNotification`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data?.code == 1) {
        setNotifications(prev => 
          prev?.map(n => 
            n.id === note_id ? { ...n, read_status: "1" } : n
          ) || null
        );
        setUnreadNotification(prev => Math.max(0, prev - 1));
        dispatch(updateUnreadNotiCount(Math.max(0, unreadNotifications - 1)))
      } else if (response.data?.message === "Invalid Hash Request") {
        handleSessionExpired();
      }
    } catch (error) {
      console.error('Error reading notification:', error);
    }
  }

  const readAllNotifications = async () => {
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
        setNotifications(prev => 
          prev?.map(n => ({ ...n, read_status: "1" })) || null
        );
        setUnreadNotification(0);
        dispatch(updateUnreadNotiCount(0))
      } else if (response.data?.message === "Invalid Hash Request") {
        handleSessionExpired();
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  }

  const deleteNotification = async (note_id: string, status:string) => {
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
        setNotifications(prev => 
          prev?.filter(n => n.id !== note_id) || null
        );
        setUnreadNotification(prev => 
          prev > 0 ? prev - 1 : 0
        );
        if(status=="0"){
            dispatch(updateUnreadNotiCount(Math.max(0, unreadNotifications - 1)))
        }
      } else if (response.data?.message === "Invalid Hash Request") {
        handleSessionExpired();
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  }

  const handleSessionExpired = () => {
    showToast("Session Expired Please login!", true);
    dispatch(signOut());
    dispatch(setProgress(1));
    clearSessionData();
  };

  useEffect(() => {
    if (open) {
      refreshNotifications();
    }
  }, [open]);

  

  return (
    <>
      <div className="relative cursor-pointer" tabIndex={0} onClick={handleOpen}>
        {unreadNotifications > 0 && (
          <div className="size-3 xl:size-[14px] 3xl:size-[18px] bg-success text-white rounded-full absolute flex items-center justify-center -top-[4px] -right-[4px] border-[1.5px] border-white">
            <span className='text-[8px] xl:text-[9px] 3xl:text-[11px] leading-none xl:translate-y-[1px]'>{unreadNotifications}</span>
          </div>
        )}
        {/* <PiBellBold className="size-4 xl:size-5 2xl:size-7" /> */}
        <Image className="size-4 xl:size-[18px] 2xl:size-5 3xl:size-7" src={'/new-assets/icons/bell-icon.svg'} alt='bell icon' width={28} height={28} />
      </div>

      <Popup
        open={open}
        onClose={handleClose}
        modal
        lockScroll
        className="notification"
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
              {/* {JSON.stringify([hasMore, isLoading, isLoadingMore])} */}
              {unreadNotifications > 0 && (
                <span className="size-[14px] xl:size-[16px] 3xl:size-5 bg-success text-white rounded-full text-[10px] grid place-items-center leading-none -top-[4px] -right-[4px] border-[1.5px] border-white">
                  {unreadNotifications}
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

          <div 
            ref={notificationListRef}
            className="flex flex-col gap-[6px] 3xl:gap-2 h-[323px] hidden-scrollbar xl:h-[393px] 2xl:h-[423px] 3xl:h-[614px] overflow-auto notification-list"
          >
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin h-7 w-7 rounded-full border-l-0 border-b-0 border-red border-[3px]"></div>
              </div>
            ) : notifications && notifications.length > 0 ? (
              <>
                {notifications.map((noti) => (
                  <NotificationCard
                    key={noti.id}
                    notification={noti}
                    onRead={readNotification}
                    onDelete={deleteNotification}
                    handleClose={handleClose}
                  />
                ))}
                {isLoadingMore && (
                    <div className="flex justify-center p-4">
                    <div className="animate-spin h-5 w-5 rounded-full border-l-0 border-b-0 border-red border-[3px]"></div>
                    </div>
                )}{ !hasMore && !isLoading && !isLoadingMore && (
                    <div className="text-center py-4 text-sm text-gray-500">
                    No more notifications available
                    </div>
                )}
              </>
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
                <p className='text-xs 2xl:text-sm 3xl:text-base text-center'>
                  You have no notification right now. <br />come back later
                </p>
              </div>
            )}
          </div>
        </div>
      </Popup>
    </>
  );
}