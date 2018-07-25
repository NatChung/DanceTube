import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  youtubeVideoSave: ['video']
})

export const YoutubeVideoTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({})

/* ------------- Reducers ------------- */

// request the data from an api
export const save = (state, { video }) => state.merge({ ...state, ...video} )


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.YOUTUBE_VIDEO_SAVE]: save
})
