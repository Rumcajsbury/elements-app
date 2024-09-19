import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { TableComponent } from '../common/table/table.component';

import PeriodicElement from '../../models/PeriodicElement';
import StringMap from '../../models/StringMap';
import { MatDialog } from '@angular/material/dialog';
import { EditElementComponent } from '../edit-element/edit-element.component';
import { PeriodicsService } from '../../services/periodics.service';

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
  periodicsService = inject(PeriodicsService);
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

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const previouseElementPosition = element.position;
        this.periodicsService.updateElement(previouseElementPosition, result);
      }
    });
  }
}
