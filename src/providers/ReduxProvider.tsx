'use client'; // Mark this as a Client Component

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/redux/store';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore(); // Create the store instance once
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}