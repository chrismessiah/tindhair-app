import * as c from '../constants'
import AppNavigator from '../router'
import { START_SCREEN } from '../constants'
import * as _ from 'lodash';

let initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams(START_SCREEN));
initialState = {
    ...initialState,
    // index,  // reserved for react-navigation
    // routes, // reserved for react-navigation
    screenKeys: [],
    isLoading: false,
    error: false,
    alertMessage: null,
    access_token: null,
    refresh_token: null,
    hairstyles: null,
    myHairstyles: null,
    likedHairstyles: null,
    hairstyleIndex: null,
    user: null,
    uploading: false,
    tab: null,
    mainRoute: null,
    loggedOut: null,
};

export default function dataReducer (state = initialState, action) {
  let tempState, nextState, nextScreenKeys, likedHairstyles, myHairstyles, hairstyleIndex;

  console.log('state');
  console.log(state);
  switch (action.type) {



    // ****************** NAVIGATION ************************
    case "Navigation/NAVIGATE":
      tempState = AppNavigator.router.getStateForAction(action, state);
      const lastRouteKey = tempState.routes[tempState.routes.length-1].key;
      nextScreenKeys = tempState.screenKeys;
      nextScreenKeys.push(lastRouteKey);
      return {
        ...tempState,
        screenKeys: nextScreenKeys,
        mainRoute: action.routeName,
      }
    case "Navigation/BACK":
      tempState = AppNavigator.router.getStateForAction(action, state);
      nextScreenKeys = tempState.screenKeys;
      if (action.key) {
        nextScreenKeys = tempState.screenKeys;
        let indexToPopTo = nextScreenKeys.indexOf(action.key);
        if (indexToPopTo === -1) throw 'Error: given key not in screenKeys';
        const start = nextScreenKeys.length;
        for (var i = start; i > indexToPopTo; i--) {
          nextScreenKeys.pop();
        }
      } else {
        nextScreenKeys.pop();
      }
      return {
        ...tempState,
        screenKeys: nextScreenKeys
      }


    // ****************** DATA ************************
    case c.UPDATE_INDEX_TRY:
      hairstyleIndex = _.findIndex(state.hairstyles, o => {return o.id === action.data});
      return {
        ...state,
        hairstyleIndex: hairstyleIndex,
      }
    case c.UPDATE_INDEX_SUCCESS:
      return {
        ...state,
        hairstyleIndex: null,
      }
    case c.CHANGE_GENDER_SUCCESS:
      return {
        ...state,
        user: {...state.user, gender: action.data.gender}
      }
    case c.FETCH_MY_HAIRSTYLES_SUCCESS:
      return {
        ...state,
        myHairstyles: action.data.hairstyles
      }
    case c.SEND_HAIRSTYLE_TRY:
      return {
        ...state,
        uploading: true,
      }
    case c.SEND_HAIRSTYLE_FAIL:
      return {
        ...state,
        uploading: false,
      }
    case c.DELETE_HAIRSTYLE_SUCCESS:
      myHairstyles = _.filter(state.myHairstyles, o => {return o.id !== action.data.id})
      return {
        ...state,
        myHairstyles: myHairstyles,
      }
    case c.SEND_HAIRSTYLE_SUCCESS:
      myHairstyles = state.myHairstyles;
      myHairstyles.unshift(action.data);
      return {
        ...state,
        myHairstyles: myHairstyles,
        uploading: false,
        tab: 2,
      }
    case c.STORE_ME:
      console.log(action.data);
      return {
        ...state,
        user: {
          id: action.data.id,
          gender: action.data.gender,
          fullname: action.data.fullname,
        },
      }
    case c.FETCH_LIKED_HAIRSTYLES_SUCCESS:
      return {
        ...state,
        likedHairstyles: action.data.result,
      }
    case c.LIKE_SUCCESS:
      let index = _.findIndex(state.hairstyles, el => {return el.id == action.data.haristyle_id});
      let hairstyles = _.cloneDeep(state.hairstyles || []);
      hairstyles[index].likes += 1;

      likedHairstyles = _.cloneDeep(state.likedHairstyles || []);
      likedHairstyles.unshift(hairstyles[index])
      hairstyles.splice(index, 1);
      return {
        ...state,
        hairstyles: hairstyles,
        likedHairstyles: likedHairstyles,
      }
    case c.RESET_TAB:
      return {
        ...state,
        tab: null,
      }
    case c.REMOVE_LIKE_SUCCESS:
      likedHairstyles = _.filter(state.likedHairstyles, o => {return o.id !== action.data.hairstyle_id})
      return {
        ...state,
        likedHairstyles: likedHairstyles,
      }
    case c.CLEAR_TOKENS:
      return {
        ...state,
        access_token: null,
        refresh_token: null,
      };
    case c.CLEAR_STORE:
      return {
        initialState,
        screenKeys: state.screenKeys,
        index: state.index,   // from react-navigation
        routes: state.routes,   // from react-navigation
      };
    case c.FETCH_HAIRSTYLES_TRY:
      return {
        ...state,
        isLoading: true,
      }
    case c.FETCH_HAIRSTYLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hairstyles: action.data.hairstyles,
      }
    case c.STORE_ACCESS_TOKEN:
      return {
        ...state,
        access_token: action.data
      }
    case c.STORE_REFRESH_TOKEN:
      return {
        ...state,
        refresh_token: action.data
      }
    case c.SET_MESSAGE:
      return {
        ...state,
        alertMessage: {
          title: action.data.title,
          message: action.data.message,
          type: action.data.type,
          duration: action.data.duration || 3000,
        }
      }
    case c.HIGHLIGHT_LOG_IN:
      return {
        ...state,
        highlight: 'L'
      }
    case c.NULLIFY_MESSAGE:
      return {
        ...state,
        alertMessage: null,
      }
    case c.LOGIN_TRY:
      return {
        ...state,
        isLoading: true,
      }
    case c.LOGOUT_SUCCESS:
      return {
        ...state,
        loggedOut: true,
      }
    case c.NOT_LOGGED_IN: {
      return {
        ...state,
        loggedOut: false,
      }
    }
    case c.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loggedOut: false,
      }
    case c.LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: true,
      }
    case c.STORE_SIGNUP_DETAILS:
      return {
        ...state,
        fullname: action.data.fullname,
        email: action.data.email,
        password: action.data.password,
      }
    case c.SIGNUP_TRY:
      return {
        ...state,
        isLoading: true,
      }
    case c.SIGNUP_FAIL:
      return {
        ...state,
        signupSuccess: false,
        isLoading: false,
      }
    case c.SIGNUP_SUCCESS:
      return {
        ...state,
        signupSuccess: true,
        isLoading: false,
      }
    default:
      return state
  }
}
