import { UpdateElementActionModel } from './elements.actions';
import PeriodicElement from '../models/PeriodicElement';
import { ElementsStoreState } from './element.store';

export const setPeriodics = (
  state: ElementsStoreState,
  periodics: PeriodicElement[]
) => {
  return { ...state, periodics };
};

export const setIsDataFetched = (
  state: ElementsStoreState,
  isDataFetched: boolean
) => {
  return { ...state, isDataFetched };
};

export const updatePeriodic = (
  state: ElementsStoreState,
  data: UpdateElementActionModel
) => {
  const { elementPosition, newElementData } = data;
  const hasSamePositionAsBefore = elementPosition === newElementData.position;
  const doesExistWithGivenPosition = state.periodics.some(
    (element) => element.position === newElementData.position
  );
  if (!hasSamePositionAsBefore && doesExistWithGivenPosition) {
    throw new Error('Element position is already taken');
  }

  const updatedPeriodicsData = [...state.periodics];
  const elementToUpdateIndex = updatedPeriodicsData.findIndex(
    (element) => element.position === elementPosition
  );
  updatedPeriodicsData[elementToUpdateIndex] = { ...newElementData };

  return { ...state, periodics: updatedPeriodicsData };
};
