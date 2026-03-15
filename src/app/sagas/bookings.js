import { call, put, takeLatest } from 'redux-saga/effects';
import { apiClient } from '../../api/apiClient';
import { loadBookingsRequest, loadBookingsSuccess, loadBookingsFailure } from '../../redux/bookingSlice';

function* loadBookings() {
  try {
    const data = yield call(apiClient.get, '/bookings');
    yield put(loadBookingsSuccess(data));
  } catch (e) {
    yield put(loadBookingsFailure(e.message || 'Failed to load bookings'));
  }
}

export function* watchBookings() {
  yield takeLatest(loadBookingsRequest.type, loadBookings);
}
