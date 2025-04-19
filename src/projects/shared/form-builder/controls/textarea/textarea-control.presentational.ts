import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IBuilderValueControlViewModel } from '../../interface/i-builder-value-control-view-model';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'textarea-control',
  templateUrl: 'textarea-control.presentational.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormField, MatInput, ReactiveFormsModule],
})
export class TextareaControlPresentational {
  viewModel = input.required<IBuilderValueControlViewModel>();
}
