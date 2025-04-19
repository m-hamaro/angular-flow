import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IBuilderValueControlViewModel } from '../../interface/i-builder-value-control-view-model';
import { MatFormField } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'outputs-select-control-presentational',
  templateUrl: 'outputs-select-control.presentational.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatFormField, ReactiveFormsModule, MatOption, MatSelectModule],
})
export class OutputsSelectControlPresentational {
  viewModel = input.required<IBuilderValueControlViewModel>();

  protected options: { key: number; name: string }[] = [
    {
      key: 1,
      name: '1',
    },
    {
      key: 2,
      name: '2',
    },
    {
      key: 3,
      name: '3',
    },
    {
      key: 4,
      name: '4',
    },
    {
      key: 5,
      name: '5',
    },
    {
      key: 6,
      name: '6',
    },
    {
      key: 7,
      name: '7',
    },
    {
      key: 8,
      name: '8',
    },
    {
      key: 9,
      name: '9',
    },
  ];
}
