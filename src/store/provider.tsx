'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Loading } from '@/components/Loading';

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>
        <PersistGate loading={
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
                }}
            >
                <Loading />
            </div>
        } persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>;
};
