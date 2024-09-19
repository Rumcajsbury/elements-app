import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { FilterInput } from './components/common/filter-input/filter-input.component';
import { LoadingSpinnerComponent } from './components/common/loading-spinner/loading-spinner.component';
import { ElementsTableComponent } from './components/elements-table/elements-table.component';
import PeriodicElement from './models/PeriodicElement';
import {
  setIsDataFetchedAction$,
  setPeriodicsAction$,
} from './elements-store/elements.actions';
import { PeriodicsService } from './services/periodics.service';
import ElementsStore from './elements-store/element.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FilterInput, ElementsTableComponent, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private periodicsService = inject(PeriodicsService);
  private elementsStore = inject(ElementsStore);

  elementsList: Signal<PeriodicElement[]> = this.elementsStore.periodicElements;
  isDataAvaiable: Signal<boolean> = this.elementsStore.isDataFetched;

  private filterValue = signal<string>('');
  displayedElementsList = computed(() => {
    const elementsToDisplay = [...this.elementsList()].sort(
      (a, b) => a.position - b.position
    );
    if (this.filterValue() === '') return elementsToDisplay;

    const seaechValue = this.filterValue().toLowerCase();
    const filteredElements = elementsToDisplay
      .filter((element) => this.searchInElement(element, seaechValue))
      .sort((a, b) => a.position - b.position);

    return filteredElements;
  });

  ngOnInit(): void {
    setIsDataFetchedAction$.next(false);
    this.periodicsService.fetchData().subscribe((data) => {
      setPeriodicsAction$.next(data);
      setIsDataFetchedAction$.next(true);
    });
  }

  handleFilterChange(value: string) {
    this.filterValue.set(value);
  }

  private searchInElement(element: PeriodicElement, value: string) {
    return (
      element.name.toLowerCase().includes(value) ||
      element.symbol.toLowerCase().includes(value) ||
      element.position.toString().includes(value) ||
      element.weight.toString().includes(value)
    );
  }
}
