import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import StringMap from '../../../models/StringMap';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatTooltipModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> {
  dataSource = input.required<T[]>();
  displayedColumns = input.required<string[]>();
  columnLabels = input.required<StringMap>();
  rowTooltip = input<string>('');
  rowClicked = output<T>();

  handleRowClick(rowData: T) {
    this.rowClicked.emit(rowData);
  }
}
