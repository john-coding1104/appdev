import { all, fork } from 'redux-saga/effects';
import { watchAuth } from './auth';
import { watchBookings } from './bookings';

export default function* rootSaga() {
  yield all([
    fork(watchAuth),
    fork(watchBookings),
  ]);
}
