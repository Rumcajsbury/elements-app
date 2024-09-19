import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { TableComponent } from '../common/table/table.component';

import PeriodicElement from '../../models/PeriodicElement';
import StringMap from '../../models/StringMap';
import { MatDialog } from '@angular/material/dialog';
import { EditElementComponent } from '../edit-element/edit-element.component';
import { updatePeriodicAction$ } from '../../elements-store/elements.actions';

@Component({
  selector: 'app-elements-table',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './elements-table.component.html',
  styleUrl: './elements-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementsTableComponent {
  dataSource = input<PeriodicElement[]>([]);
  displayedColumns = signal<string[]>(['position', 'name', 'weight', 'symbol']);
  columnLabels = signal<StringMap>({
    position: 'Number',
    name: 'Name',
    weight: 'Weight',
    symbol: 'Symbol',
  });

  private dialog = inject(MatDialog);

  editElement(element: PeriodicElement) {
    const dialogRef = this.dialog.open(EditElementComponent, {
      width: '400px',
      height: '400px',
      data: { ...element },
    });

    dialogRef.afterClosed().subscribe((newElementData) => {
      if (newElementData) {
        const elementPosition = element.position;
        updatePeriodicAction$.next({
          elementPosition,
          newElementData,
        });
      }
    });
  }
}
