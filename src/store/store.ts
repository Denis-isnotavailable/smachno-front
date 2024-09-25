import { combineReducers, configureStore } from '@reduxjs/toolkit';
import currentProductReducer from './features/currentProduct/currentProductSlice';
import { reviewApi } from './features/services/reviewService';
import { productApi } from './features/services/productService';
import { authApi } from './features/services/authService';
import authReducer from './features/authSlice/authSlice';
import cartReducer from './features/cartSlice/cartSlice';
import { persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { postApi } from './features/services/postService';
import { emailApi } from './features/services/emailService';
import { addressApi } from './features/services/addressService';
import { orderApi } from './features/services/orderService';
import searchReducer from './features/searchSlice/searchSlice';
import openCartReducer from './features/cartSlice/openCartSlice';
import adminPagePositionReducer from './features/adminPagePositionSlice/adminPagePositionSlice';
import orderPaymentStatusReducer from './features/orderPaymentStatus/orderPaymentStatus';
import { ratingApi } from './features/services/ratingService';

const createNoopStorage = () => {
    return {
        getItem(_key: string): Promise<null> {
            return Promise.resolve(null);
        },
        setItem<T>(_key: string, value: T): Promise<T> {
            return Promise.resolve(value);
        },
        removeItem(_key: string): Promise<void> {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window !== 'undefined'
        ? createWebStorage('local')
        : createNoopStorage();

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token'],
};

const cartPersistConfig = {
    key: 'cart',
    storage,
    whitelist: ['cartProducts', 'totalPrice', 'totalAmount'],
};

const adminPagePositionConfig = {
    key: 'pagePosition',
    storage,
    whitelist: ['position'],
};

const rootReducer = combineReducers({
    currentProduct: currentProductReducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    cart: persistReducer(cartPersistConfig, cartReducer),
    auth: persistReducer(authPersistConfig, authReducer),
    [postApi.reducerPath]: postApi.reducer,
    [emailApi.reducerPath]: emailApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    search: searchReducer,
    openCart: openCartReducer,
    adminPagePosition: persistReducer(adminPagePositionConfig, adminPagePositionReducer),
    orderPaymentStatus: orderPaymentStatusReducer,
    [ratingApi.reducerPath]: ratingApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(reviewApi.middleware)
            .concat(productApi.middleware)
            .concat(authApi.middleware)
            .concat(postApi.middleware)
            .concat(emailApi.middleware)
            .concat(addressApi.middleware)
            .concat(orderApi.middleware)
            .concat(ratingApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
