import { Component, computed, inject } from '@angular/core';
import { WorkflowListPresentational } from '../presentational/workflow-list.presentational';
import { CreateFlowAction } from '../../../../domain/flow/create/create-flow-action';
import { FlowUseCase } from '../../../../domain/flow/use-case/flow.use-case';
import { RemoveFlowAction } from '../../../../domain/flow/remove/remove-flow-action';
import { Router } from '@angular/router';

@Component({
  selector: 'workflow-list-container',
  templateUrl: 'workflow-list.container.html',
  styleUrls: ['workflow-list.container.scss'],
  standalone: true,
  imports: [WorkflowListPresentational],
})
export class WorkflowListContainer {
  private readonly router = inject(Router);

  readonly flowUseCase = inject(FlowUseCase);

  private readonly flows = computed(() => this.flowUseCase.state.flows());

  onCreateFlow(action: CreateFlowAction): void {
    this.flowUseCase.create(this.flows(), action);
  }

  onRemoveFlow(action: RemoveFlowAction): void {
    this.flowUseCase.remove(this.flows(), action);

    if (this.flows().length) {
      this.router.navigateByUrl(`/flow/${this.flows()[0].key}`);
    } else {
      this.router.navigateByUrl(`/flow`);
    }
  }
}
