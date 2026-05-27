import React from 'react';
import { useOffline } from '../../hooks/useOffline';
import { UI_CONSTANTS } from '../../constants';
import './OfflineBanner.css';

export const OfflineBanner: React.FC = () => {
  const isOffline = useOffline();

  if (!isOffline) {
    return null;
  }

  return (
    <div className="offline-banner" role="alert">
      <span className="offline-icon">Alert</span>
      <span className="offline-text">{UI_CONSTANTS.OFFLINE_BANNER_TEXT}</span>
    </div>
  );
};

export default OfflineBanner;
