import { initialState } from '@pages/Home/reducer';
import { createSelector } from 'reselect';

const selectHomeState = (state) => state.home || initialState;

export const selectStep = createSelector(selectHomeState, (state) => state.step);
export const selectInfo = createSelector(selectHomeState, (state) => state.info);
export const selectPlanType = createSelector(selectHomeState, (state) => state.planType);
export const selectPlanDuration = createSelector(selectHomeState, (state) => state.planDuration);
export const selectPlanAddOns = createSelector(selectHomeState, (state) => state.planAddOns);
export const selectMainPrices = createSelector(selectHomeState, (state) => state.mainPrices);
export const selectAddOnPrices = createSelector(selectHomeState, (state) => state.addOnPrices);
export const selectAddOns = createSelector(selectHomeState, (state) => state.addOns);
