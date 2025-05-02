import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IBuilderValueControlViewModel } from '../../interface/i-builder-value-control-view-model';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { IEntitySummary } from '../../interface/i-entity-summary';

@Component({
  selector: 'knowledge-select-control-presentational',
  templateUrl: 'knowledge-select-control.presentational.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormField, ReactiveFormsModule, MatOption, MatSelectModule],
})
export class KnowledgeSelectControlPresentational {
  @Input({ required: true })
  viewModel!: IBuilderValueControlViewModel;

  @Input() knowledgeList: IEntitySummary<string>[] = [];
}
