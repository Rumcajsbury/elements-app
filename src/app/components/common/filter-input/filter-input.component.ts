import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-filter-input',
  standalone: true,
  imports: [MatInputModule],
  templateUrl: './filter-input.component.html',
  styleUrl: './filter-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterInput implements AfterViewInit {
  inputLabel = input('Filter');
  inputPlaceholder = input('');
  delayTime = input(0);
  inputValueChange = output<string>();
  inputField = viewChild<ElementRef<HTMLInputElement>>('inputField');
  destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    const subscription = fromEvent(this.inputField()!.nativeElement, 'input')
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(this.delayTime()),
        distinctUntilChanged()
      )
      .subscribe((value: string) => {
        this.inputValueChange.emit(value);
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
