/**
 * Conexus-Tech - Retail Companion AT&T
 * https://conexustech.com/
 * @flow
 */

// import {} from '../actions/Current';
// import _ from 'lodash'

// My FakeData
import { FakeProduct } from '../store/ProductFakeData';
import { FakeCompare } from '../store/CompareFakeData';

const initialState = {
  allAreas: [],
  position: {},
  product: {},
  lastCompare: 0,
  compare: [],
  discoverNum: 0,
  location: null,
  zoneId: null,
  showZonPopup: false,
  enteredZoneAutomaticallyForFirstTime: false
};

const setCompareData = (state, payload) => {
  if (state.compare.length === 2) {
    return {
      ...state,
      compare: state.compare.map(obj => {
        return ((obj.item !== payload.item) ? obj : payload);
      })
    };
  };

  if ((state.compare.length === 1) && (state.compare[0].item !== payload.item)) {
    return {
      ...state,
      compare: state.compare.concat(payload)
    };
  };

  return { ...state, compare: [payload] };
};

export default current = (state = initialState, action) => {
  let newState = Object.assign({}, state); // _.merge({}, state)
  switch (action.type) {
    case 'SET_CURRENT_ZONE_POPUP':
      return {
        ...state,
        showZonPopup: action.payload
      }
    case 'SET_CURRENT_ZONE':
      return {
        ...state,
        zoneId: action.payload
      }
    case 'SET_CURRENT_LOCATION':
      return {
        ...state,
        location: action.payload
      }
    case 'SET_AUTOMATIC_ZONE_ENTRY':
      return {
        ...state,
        enteredZoneAutomaticallyForFirstTime: action.payload
      }
    case 'UPDATE_LOCATION':
      return {
        ...state,
        position: action.payload
      }
      break;
    case 'UPDATE_PRODUCT_INFO':
      return {
        ...state,
        product: action.payload
      }
      break;
    case 'UPDATE_PRODUCT_ACCS_INFO':
      return {
        ...state,
        product: {
          ...state.product,
          compatibleAccessories: action.payload
        }
      }
      break;
    case 'UPDATE_AREA_INFO':
      return {
        ...state,
        allAreas: action.payload
      }
      break;
    case 'UPDATE_DISCOVER_NUMBER':
      return {
        ...state,
        discoverNum: action.payload
      }
      break;
    case 'UPDATE_COMPARE_INFO':
      return setCompareData(state, action.payload);
      break;
    case 'SET_LAST_COMPARE_INFO':
      return {
        ...state,
        lastCompare: action.payload
      }
      break;
    default:
      return newState;
  }
  return newState;
};
