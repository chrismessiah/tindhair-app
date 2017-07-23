import { LOGIN_TRY, LOGIN_SUCCESS, LOGIN_FAIL } from '../constants'
const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false
}

export default function dataReducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN_TRY:
      return {
        ...state,
        data: [],
        isFetching: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false,
      }
    case LOGIN_FAIL:
      return {
        ...state,
        data: action.data,
        isFetching: false,
        error: true,
      }



    // case FETCHING_DATA:
    //   return {
    //     ...state,
    //     data: [],
    //     isFetching: true
    //   }
    // case FETCHING_DATA_SUCCESS:
    //   return {
    //     ...state,
    //     isFetching: false,
    //     data: action.data
    //   }
    // case FETCHING_DATA_FAILURE:
    //   return {
    //     ...state,
    //     isFetching: false,
    //     error: true
    //   }
    default:
      return state
  }
}
