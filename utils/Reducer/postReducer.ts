import { Action, postState } from '../../Interfaces/FeatureTypes';
import { Constants } from '../Constants/constants';

export default function postReducer(state: postState, action: Action) {
  switch (action.type) {
    case Constants.SET_TITLE:
      return { ...state, title: action.payload };
    case Constants.SET_CATEGORY:
      return { ...state, category: action.payload };
    case Constants.SET_POST:
      return { ...state, post: action.payload };
    case Constants.SET_IMGURL:
      return { ...state, imgUrl: action.payload };
    case Constants.SET_OTHER_IMAGES:
      return { ...state, otherImages: action.payload };
    default:
      return state;
  }
}
