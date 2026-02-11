import api from '../utils/api';
import { io } from 'socket.io-client';
import { toast } from 'sonner';

// Socket connection
let socket = null;

// Notification callbacks
const notificationCallbacks = {
  newNotification: [],
  unreadCount: []
};

// Initialize socket connection
export const initializeSocket = (userId) => {
  if (socket) {
    return socket;
  }

  const socketUrl = import.meta.env?.VITE_SOCKET_URL || 
    (window.location.hostname === 'localhost' ? 'http://localhost:8000' : window.location.origin);

  socket = io(socketUrl, {
    withCredentials: true,
    transports: ['websocket', 'polling']
  });

  socket.on('connect', () => {
    console.log('Notification socket connected');
    
    // Join user's personal notification room
    if (userId) {
      socket.emit('join_user_room', { userId });
    }
  });

  socket.on('disconnect', () => {
    console.log('Notification socket disconnected');
  });

  socket.on('new_notification', (notification) => {
    console.log('New notification received:', notification);
    
    // Show toast notification
    toast(notification.title, {
      description: notification.message,
      duration: 5000,
      action: notification.actionUrl ? {
        label: 'View',
        onClick: () => {
          if (notification.actionUrl) {
            window.location.href = notification.actionUrl;
          }
        }
      } : undefined
    });
    
    // Trigger callbacks
    notificationCallbacks.newNotification.forEach(callback => {
      callback(notification);
    });
  });

  socket.on('notification_count', (data) => {
    notificationCallbacks.unreadCount.forEach(callback => {
      callback(data.count);
    });
  });

  return socket;
};

// Get socket instance
export const getSocket = () => socket;

// Subscribe to new notifications
export const onNewNotification = (callback) => {
  notificationCallbacks.newNotification.push(callback);
  return () => {
    const index = notificationCallbacks.newNotification.indexOf(callback);
    if (index > -1) {
      notificationCallbacks.newNotification.splice(index, 1);
    }
  };
};

// Subscribe to unread count updates
export const onUnreadCountUpdate = (callback) => {
  notificationCallbacks.unreadCount.push(callback);
  return () => {
    const index = notificationCallbacks.unreadCount.indexOf(callback);
    if (index > -1) {
      notificationCallbacks.unreadCount.splice(index, 1);
    }
  };
};

// Fetch notifications from API
export const fetchNotifications = async (options = {}) => {
  try {
    const { page = 1, limit = 20, unreadOnly = false } = options;
    const response = await api.get('/api/notifications', {
      params: { page, limit, unreadOnly }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

// Get unread count
export const fetchUnreadCount = async () => {
  try {
    const response = await api.get('/api/notifications/unread-count');
    return response.data.unreadCount;
  } catch (error) {
    console.error('Error fetching unread count:', error);
    throw error;
  }
};

// Mark notification as read
export const markAsRead = async (notificationId) => {
  try {
    const response = await api.put(`/api/notifications/${notificationId}/read`);
    return response.data;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

// Mark all as read
export const markAllAsRead = async () => {
  try {
    const response = await api.put('/api/notifications/read-all');
    return response.data;
  } catch (error) {
    console.error('Error marking all as read:', error);
    throw error;
  }
};

// Delete notification
export const deleteNotification = async (notificationId) => {
  try {
    const response = await api.delete(`/api/notifications/${notificationId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
};

// Get notification preferences
export const fetchPreferences = async () => {
  try {
    const response = await api.get('/api/notifications/preferences');
    return response.data.preferences;
  } catch (error) {
    console.error('Error fetching preferences:', error);
    throw error;
  }
};

// Update notification preferences
export const updatePreferences = async (preferences) => {
  try {
    const response = await api.put('/api/notifications/preferences', preferences);
    return response.data;
  } catch (error) {
    console.error('Error updating preferences:', error);
    throw error;
  }
};

// Request browser push notification permission
export const requestPushPermission = async () => {
  if (!('Notification' in window)) {
    console.log('Browser does not support notifications');
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

// Send browser push notification
export const sendPushNotification = (title, options = {}) => {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    console.log('Push notifications not available');
    return;
  }

  try {
    const notification = new Notification(title, {
      icon: '/assets/logo.png',
      badge: '/favicon.ico',
      ...options
    });

    notification.onclick = () => {
      if (options.onClick) {
        options.onClick();
      } else {
        window.focus();
      }
      notification.close();
    };

    return notification;
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
};

// Disconnect socket
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
