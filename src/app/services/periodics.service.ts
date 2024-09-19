import { Injectable } from '@angular/core';
import ELEMENT_DATA from '../data';
import { delay, of } from 'rxjs';
import { setIsDataFetchedAction$ } from '../elements-store/elements.actions';

@Injectable({
  providedIn: 'root',
})
export class PeriodicsService {
  fetchData() {
    setIsDataFetchedAction$.next(false);
    return of([...ELEMENT_DATA]).pipe(delay(2000));
  }
}
