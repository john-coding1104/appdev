import { call, put, takeLatest } from 'redux-saga/effects';
import { apiClient } from '../../api/apiClient';
import { loadBookingsRequest, loadBookingsSuccess, loadBookingsFailure } from '../../redux/bookingSlice';
import { Booking } from '../../types';

function* loadBookings() {
  try {
    const data: { bookings: Booking[] } = yield call(apiClient.get, '/bookings');
    yield put(loadBookingsSuccess(data.bookings));
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Failed to load bookings';
    yield put(loadBookingsFailure(errorMessage));
  }
}

export function* watchBookings() {
  yield takeLatest(loadBookingsRequest.type, loadBookings);
}
