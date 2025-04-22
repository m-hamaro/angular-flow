import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { IBuilderValueControlViewModel } from '../../interface/i-builder-value-control-view-model';

@Component({
  selector: 'input-control-presentational',
  templateUrl: 'input-control.presentational.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormField, MatInputModule, ReactiveFormsModule],
})
export class InputControlPresentational {
  @Input({ required: true })
  viewModel!: IBuilderValueControlViewModel;
}
