import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: { bookings: [], loading: false, error: null },
  reducers: {
    addBooking(state, action) {
      state.bookings.unshift({
        ...action.payload,
        id: Date.now().toString(),
        status: 'Pending',
        createdAt: new Date().toLocaleDateString('en-PH', {
          year: 'numeric', month: 'long', day: 'numeric',
        }),
      });
    },
    cancelBooking(state, action) {
      const b = state.bookings.find(b => b.id === action.payload);
      if (b) b.status = 'Cancelled';
    },
    loadBookingsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loadBookingsSuccess(state, action) {
      state.loading = false;
      state.bookings = action.payload;
    },
    loadBookingsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addBooking, cancelBooking, loadBookingsRequest, loadBookingsSuccess, loadBookingsFailure } = bookingSlice.actions;
export default bookingSlice.reducer;
