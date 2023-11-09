import { produce } from 'immer';
import { SET_INFO, SET_PLAN_ADD_ONS, SET_PLAN_DURATION, SET_PLAN_TYPE, SET_STEP } from './constants';

export const initialState = {
  step: 0,
  info: {
    name: '',
    email: '',
    phoneNumber: '',
  },
  planType: 'arcade',
  planDuration: 'monthly',
  planAddOns: [],
  mainPrices: {
    monthly: {
      arcade: 9,
      advanced: 12,
      pro: 15,
    },
    yearly: {
      arcade: 90,
      advanced: 120,
      pro: 150,
    },
  },
  addOnPrices: [
    {
      monthly: 1,
      yearly: 10,
    },
    {
      monthly: 2,
      yearly: 20,
    },
    {
      monthly: 2,
      yearly: 20,
    },
  ],
  addOns: [
    {
      name: 'Online service',
      desc: 'app_pick_online_service_desc',
    },
    {
      name: 'Larger storage',
      desc: 'app_pick_larger_storage_desc',
    },
    {
      name: 'Customizable profile',
      desc: 'app_pick_customizable_desc',
    },
  ],
};

export const storedKey = ['step', 'info', 'planType', 'planDuration', 'planAddOns'];

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_STEP:
        draft.step = action.step;
        break;

      case SET_INFO:
        draft.info = action.info;
        break;

      case SET_PLAN_TYPE:
        draft.planType = action.planType;
        break;

      case SET_PLAN_DURATION:
        draft.planDuration = action.planDuration;
        break;

      case SET_PLAN_ADD_ONS:
        draft.planAddOns = action.planAddOns;
        break;
    }
  });

export default homeReducer;
