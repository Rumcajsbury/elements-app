import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import PeriodicElement from '../../models/PeriodicElement';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-element',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatError,
  ],
  templateUrl: './edit-element.component.html',
  styleUrl: './edit-element.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditElementComponent {
  dialogRef = inject(MatDialogRef<EditElementComponent>);
  currentElement: PeriodicElement = inject(MAT_DIALOG_DATA);

  formBuilder = inject(FormBuilder);
  elementForm: FormGroup;

  constructor() {
    this.elementForm = this.formBuilder.group({
      position: [
        this.currentElement.position,
        [Validators.required, Validators.min(1)],
      ],
      name: [this.currentElement.name, Validators.required],
      weight: [
        this.currentElement.weight,
        [Validators.required, Validators.min(0)],
      ],
      symbol: [
        this.currentElement.symbol,
        [Validators.required, Validators.maxLength(2)],
      ],
    });
  }

  onSubmit() {
    if (!this.elementForm.valid) return;

    this.currentElement = this.elementForm.value;

    this.dialogRef.close(this.currentElement);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
