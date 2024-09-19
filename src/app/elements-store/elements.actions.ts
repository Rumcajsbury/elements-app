import { Subject } from 'rxjs';
import PeriodicElement from '../models/PeriodicElement';

export interface UpdateElementActionModel {
  elementPosition: number;
  newElementData: PeriodicElement;
}

export const setPeriodicsAction$ = new Subject<PeriodicElement[]>();
export const setIsDataFetchedAction$ = new Subject<boolean>();
export const updatePeriodicAction$ = new Subject<UpdateElementActionModel>();
