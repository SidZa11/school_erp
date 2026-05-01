import React, { useMemo } from 'react';
import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';

interface NotificationMessageProps {
  message: React.ReactNode;
  icon?: React.ReactNode;
  description?: React.ReactNode;
  placement?: NotificationArgsProps['placement'];
  duration?: number; // Duration in seconds (0 for persistent)
}

const Context = React.createContext({ name: 'Default' });

const NotificationMessage: React.FC<NotificationMessageProps> = ({
  message,
  icon,
  description,
  placement = 'topLeft', // Default placement
  duration = 4.5, // Default duration
}) => {
  const [api, contextHolder] = notification.useNotification();

  const triggerNotification = () => {
    api.info({
      message,
      description,
      placement,
      duration,
      icon,
    });
  };

  // Return a function to trigger the notification, but for simplicity, trigger on mount
  React.useEffect(() => {
    triggerNotification();
  }, [message, description, placement, duration, icon, api]);
  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
    </Context.Provider>
  );
};

export default NotificationMessage;   