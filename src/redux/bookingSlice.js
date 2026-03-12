import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: { bookings: [] },
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
  },
});

export const { addBooking, cancelBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
