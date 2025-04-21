import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  model,
  OnChanges,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { EFConnectableSide, FFlowModule } from '@foblex/flow';
import { FormBuilderDirective } from '../../../../shared/form-builder/form-builder.directive';
import { INodeViewModel } from '../../../interface/i-node-view-model';
import { IEntitySummary } from '../../../../shared/form-builder/interface/i-entity-summary';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { INodeValueModel } from '../../../../domain/flow/interface/i-node-value-model';
import { MatIcon } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'workflow-node-presentational',
  styleUrls: ['workflow-node.presentational.scss'],
  templateUrl: 'workflow-node.presentational.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FFlowModule, FormBuilderDirective, MatIcon, ReactiveFormsModule],
  host: {
    '[style.border-top-color]': 'model().color',
  },
})
export class WorkflowNodePresentational
  implements OnInit, OnChanges, OnDestroy
{
  private subscription$: Subscription = Subscription.EMPTY;

  model = model.required<INodeViewModel>();

  isBodyVisible = signal<boolean>(false);

  eFConnectableSide = EFConnectableSide;

  outputs = signal<IEntitySummary<string>[]>([]);

  form = signal<FormControl>(new FormControl());

  valueChange = output<INodeValueModel>();

  removeConnection = output<string>();

  private readonly cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.form.set(new FormControl(this.model()?.value));

    this.isBodyVisible.set(this.model()?.isExpanded || false);

    this.subscription$ = this.subscribeToFormChanges();
  }

  private subscribeToFormChanges(): Subscription {
    return this.form().valueChanges.subscribe((value) => {
      this.valueChange.emit(value);
      setTimeout(() => {
        this.outputs.set((this.model()?.outputs || []).slice().reverse());
      });
    });
  }

  ngOnChanges(): void {
    this.outputs.set((this.model()?.outputs || []).slice().reverse());
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  onRemoveConnection(key: string): void {
    this.removeConnection.emit(key);
  }

  onToggleBodyClick(): void {
    this.isBodyVisible.set(!this.isBodyVisible());

    this.model.update((prev) => {
      return {
        ...prev,
        isExpanded: this.isBodyVisible(),
      };
    });

    this.cd.markForCheck();
  }
}
