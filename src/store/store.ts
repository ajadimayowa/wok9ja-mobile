// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Example slice import (adjust according to your actual slices)
import UserSlice from './slices/userSlice'

const store = configureStore({
  reducer: {
    userslice: UserSlice, // Add your slices here
  },
});

// Types for dispatch and selector
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Typed hooks for useDispatch and useSelector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
