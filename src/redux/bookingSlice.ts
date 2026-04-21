import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingState, Booking } from '../types';

const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
};

interface AddBookingPayload {
  packageId: number;
  packageName: string;
  price: number;
  eventDate: string;
  venue: string;
  guestCount: string;
  notes?: string;
  customerUsername?: string;
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addBooking(state, action: PayloadAction<AddBookingPayload>) {
      const newBooking: Booking = {
        ...action.payload,
        id: Date.now().toString(),
        status: 'Pending',
        createdAt: new Date().toLocaleDateString('en-PH', {
          year: 'numeric', month: 'long', day: 'numeric',
        }),
      };
      state.bookings.unshift(newBooking);
    },
    cancelBooking(state, action: PayloadAction<string>) {
      const booking = state.bookings.find(b => b.id === action.payload);
      if (booking) booking.status = 'Cancelled';
    },
    loadBookingsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loadBookingsSuccess(state, action: PayloadAction<Booking[]>) {
      state.loading = false;
      state.bookings = action.payload;
    },
    loadBookingsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addBooking, cancelBooking, loadBookingsRequest, loadBookingsSuccess, loadBookingsFailure } = bookingSlice.actions;
export default bookingSlice.reducer;
