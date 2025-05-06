// components/PermanentIOSZoomLock.tsx
'use client';

import { useEffect } from 'react';

export function IOSZoomFix() {
  useEffect(() => {
    if (!/iPad|iPhone|iPod/.test(navigator.userAgent)) return;

    const lockViewportPermanently = () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        // Permanent lock - never reverts
        viewport.setAttribute('content', 
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
        
        // Remove all event listeners after first interaction
        document.removeEventListener('touchstart', lockViewportPermanently);
        document.removeEventListener('click', lockViewportPermanently);
      }
    };

    // Capture both touch and click for all devices
    document.addEventListener('touchstart', lockViewportPermanently, { once: true });
    document.addEventListener('click', lockViewportPermanently, { once: true });

    return () => {
      document.removeEventListener('touchstart', lockViewportPermanently);
      document.removeEventListener('click', lockViewportPermanently);
    };
  }, []);

  return null;
}