import { SET_INFO, SET_PLAN_ADD_ONS, SET_PLAN_DURATION, SET_PLAN_TYPE, SET_STEP } from './constants';

export const setStep = (step) => ({
  type: SET_STEP,
  step,
});

export const setInfo = (info) => ({
  type: SET_INFO,
  info,
});

export const setPlanType = (planType) => ({
  type: SET_PLAN_TYPE,
  planType,
});

export const setPlanDuration = (planDuration) => ({
  type: SET_PLAN_DURATION,
  planDuration,
});

export const setPlanAddOns = (planAddOns) => ({
  type: SET_PLAN_ADD_ONS,
  planAddOns,
});
