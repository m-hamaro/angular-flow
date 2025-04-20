import { Component, inject } from '@angular/core';
import { WorkflowListPresentational } from '../presentational/workflow-list.presentational';
import { WorkflowListUseCase } from '../use-case/workflow-list.use-case';
import { CreateFlowAction } from '../../../../domain/flow/create/create-flow-action';

@Component({
  selector: 'workflow-list-container',
  templateUrl: 'workflow-list.container.html',
  standalone: true,
  imports: [WorkflowListPresentational],
})
export class WorkflowListContainer {
  readonly useCase = inject(WorkflowListUseCase);

  onCreateFlow(action: CreateFlowAction): void {
    this.useCase.createFlow(action);
  }
}
