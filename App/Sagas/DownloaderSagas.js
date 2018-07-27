/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put, take } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import DownloaderActions from '../Redux/DownloaderRedux'
import RNFetch from 'react-native-fetch-blob'
// import { DownloaderSelectors } from '../Redux/DownloaderRedux'

const downloaderSagaHelper = (vid, url) => eventChannel(emitter => {

  const task = RNFetch
    .config({fileCache: true})
    .fetch('GET', url)
    .progress({ interval: 200 }, (received, total) => {
      const progress = received / total * 100   
      console.log('Should send emitter')
      emitter({
        type: 'progress',
        payload: progress,
      })
    })
    .then(res => {
      console.log('Should send Success, ', res.path())

      emitter({
        type: 'success',
        payload: { vid, path: res.path() },
      });
      // END event has to be sent to signal that we are done with this channel
      emitter(END);
    })
    .catch(error => {throw error})



  return () => {
    // task.cancel(err => {});
  };
});


export function * getDownloader (action) {
  const { data } = action
  
  const channel = yield call(downloaderSagaHelper, data.vid, data.url)
  try {
    while (true) {
      const action = yield take(channel)

      if(action.type === 'progress') yield put(DownloaderActions.downloaderProgress(action.payload))
      else yield put(DownloaderActions.downloaderSuccess(action.payload))
    }
  } catch (error) {
    console.log('error:', error)
  } 
}
