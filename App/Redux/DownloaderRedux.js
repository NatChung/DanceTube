import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  downloaderRequest: ['data'],
  downloaderSuccess: ['payload'],
  downloaderFailure: null,
  downloaderProgress: ['progress']
})

export const DownloaderTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  progress: 0
})

/* ------------- Selectors ------------- */

export const DownloaderSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const progress = (state, {progress}) => state.merge({progress})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DOWNLOADER_REQUEST]: request,
  [Types.DOWNLOADER_SUCCESS]: success,
  [Types.DOWNLOADER_FAILURE]: failure,
  [Types.DOWNLOADER_PROGRESS]: progress,
})
