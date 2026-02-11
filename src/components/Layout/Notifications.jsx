import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBell, FiCheck, FiTrash2, FiSettings, FiX } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';
import {
  initializeSocket,
  fetchNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  onNewNotification,
  onUnreadCountUpdate,
  requestPushPermission,
  sendPushNotification
} from '../../services/notificationService';
import { formatDistanceToNow } from 'date-fns';

const Notifications = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    pushEnabled: false,
    betWin: true,
    betLoss: true,
    levelUp: true,
    bonusReceived: true
  });

  // Initialize socket connection
  useEffect(() => {
    if (user) {
      const socket = initializeSocket(user.id || user._id);
      
      // Listen for new notifications
      const unsubscribeNew = onNewNotification((notification) => {
        setNotifications(prev => [notification, ...prev.slice(0, 9)]);
        setUnreadCount(prev => prev + 1);
        
        // Show browser push notification if enabled
        if (preferences.pushEnabled) {
          sendPushNotification(notification.title, {
            body: notification.message,
            onClick: () => {
              if (notification.actionUrl) {
                navigate(notification.actionUrl);
              }
            }
          });
        }
      });
      
      // Listen for unread count updates
      const unsubscribeCount = onUnreadCountUpdate((count) => {
        setUnreadCount(count);
      });
      
      // Fetch initial data
      loadNotifications();
      fetchUnreadCount();
      
      return () => {
        unsubscribeNew();
        unsubscribeCount();
      };
    }
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetchNotifications({ limit: 10 });
      if (response.success) {
        setNotifications(response.notifications || []);
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await api.get('/api/notifications/unread-count');
      if (response.data.success) {
        setUnreadCount(response.data.unreadCount);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(n => n._id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await deleteNotification(notificationId);
      const wasUnread = notifications.find(n => n._id === notificationId && !n.read);
      setNotifications(prev => prev.filter(n => n._id !== notificationId));
      if (wasUnread) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      handleMarkAsRead(notification._id);
    }
    
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
    setIsOpen(false);
  };

  const handleEnablePush = async () => {
    const granted = await requestPushPermission();
    if (granted) {
      setPreferences(prev => ({ ...prev, pushEnabled: true }));
    }
  };

  const getNotificationIcon = (type) => {
    const icons = {
      bet_win: '🎉',
      bet_loss: '😔',
      level_up: '⭐',
      bonus_received: '🎁',
      deposit_success: '💰',
      withdrawal_success: '💸',
      affiliate_commission: '💵',
      game_invite: '🎮',
      system: '📢'
    };
    return icons[type] || '🔔';
  };

  const getTimeAgo = (date) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return 'recently';
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-[#1a2c38] transition-colors"
      >
        <FiBell className="w-5 h-5 text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-[#0f212e] rounded-xl shadow-2xl border border-[#1a2c38] z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#1a2c38]">
            <h3 className="text-white font-semibold">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <FiCheck className="w-3 h-3" />
                  Mark all read
                </button>
              )}
            </div>
          </div>

          {/* Push Notification Settings */}
          <div className="p-3 border-b border-[#1a2c38] bg-[#071824]">
            {!preferences.pushEnabled ? (
              <button
                onClick={handleEnablePush}
                className="w-full text-sm text-blue-400 hover:text-blue-300 flex items-center justify-center gap-2"
              >
                <FiBell className="w-4 h-4" />
                Enable browser notifications
              </button>
            ) : (
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <FiBell className="w-4 h-4" />
                  Browser notifications enabled
                </span>
                <FiSettings className="w-4 h-4 cursor-pointer hover:text-white" />
              </div>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <FiBell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-[#1a2c38]">
                {notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`p-3 hover:bg-[#1a2c38] cursor-pointer transition-colors ${
                      !notification.read ? 'bg-[#071824]' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`text-sm ${!notification.read ? 'font-semibold text-white' : 'text-gray-300'}`}>
                            {notification.title}
                          </p>
                          <span className="text-xs text-gray-500 flex-shrink-0">
                            {getTimeAgo(notification.createdAt)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 truncate mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(notification._id);
                            }}
                            className="text-gray-500 hover:text-red-400"
                          >
                            <FiTrash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-[#1a2c38]">
            <button
              onClick={() => {
                navigate('/notifications');
                setIsOpen(false);
              }}
              className="w-full text-center text-sm text-blue-400 hover:text-blue-300"
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
