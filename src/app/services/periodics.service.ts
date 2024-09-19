import { Injectable, signal } from '@angular/core';
import PeriodicElement from '../models/PeriodicElement';
import ELEMENT_DATA from '../data';

@Injectable({
  providedIn: 'root',
})
export class PeriodicsService {
  private periodicsData = signal<PeriodicElement[]>([]);
  private isDataFetched = signal<boolean>(false);
  periodics = this.periodicsData.asReadonly();
  isDataAvaiable = this.isDataFetched.asReadonly();

  fetchData() {
    setTimeout(() => {
      this.periodicsData.set(ELEMENT_DATA);
      this.isDataFetched.set(true);
    }, 2000);
  }

  updateElement(elementPosition: number, newElementData: PeriodicElement) {
    const hasSamePositionAsBefore = elementPosition === newElementData.position;
    const doesExistWithGivenPosition = this.periodicsData().some(
      (element) => element.position === newElementData.position
    );
    if (!hasSamePositionAsBefore && doesExistWithGivenPosition) {
      throw new Error('Element position is already taken');
    }

    this.periodicsData.update((prevState) => {
      const updatedPeriodicsData = [...prevState];
      const elementToUpdateIndex = updatedPeriodicsData.findIndex(
        (element) => element.position === elementPosition
      );
      updatedPeriodicsData[elementToUpdateIndex] = { ...newElementData };

      return updatedPeriodicsData;
    });
  }
}
