import { Injectable } from '@angular/core';
import { rxState } from '@rx-angular/state';

import PeriodicElement from '../models/PeriodicElement';
import {
  setIsDataFetchedAction$,
  setPeriodicsAction$,
  updatePeriodicAction$,
} from './elements.actions';
import {
  setIsDataFetched,
  setPeriodics,
  updatePeriodic,
} from './elements.reducers';

export interface ElementsStoreState {
  periodics: PeriodicElement[];
  isDataFetched: boolean;
}

@Injectable()
export default class ElementsStore {
  private state = rxState<ElementsStoreState>(({ set, connect }) => {
    set({ periodics: [], isDataFetched: false });
    connect(setPeriodicsAction$, setPeriodics);
    connect(setIsDataFetchedAction$, setIsDataFetched);
    connect(updatePeriodicAction$, updatePeriodic);
  });

  readonly periodicElements = this.state.signal('periodics');
  readonly isDataFetched = this.state.signal('isDataFetched');
}
