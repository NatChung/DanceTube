import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  youtubeVideoSave: ['video'],
  facebookVideoSave: ['video']
})

export const YoutubeVideoTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  youtube: null,
  facebook: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const youtubeSave = (state, { video }) => state.merge({youtube:{ ...state.youtube, ...video}} )
export const facebookSave = (state, { video }) => state.merge({facebook:{ ...state.facebook, ...video}} )


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.YOUTUBE_VIDEO_SAVE]: youtubeSave,
  [Types.FACEBOOK_VIDEO_SAVE]: facebookSave
})
