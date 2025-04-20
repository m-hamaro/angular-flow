import { Component, inject } from '@angular/core';
import { WorkflowListPresentational } from '../presentational/workflow-list.presentational';
import { WorkflowListUseCase } from '../use-case/workflow-list.use-case';
import { CreateFlowAction } from '../../../../domain/flow/create/create-flow-action';
import { FlowUseCase } from '../../../../domain/flow/use-case/flow.use-case';

@Component({
  selector: 'workflow-list-container',
  templateUrl: 'workflow-list.container.html',
  styleUrls: ['workflow-list.container.scss'],
  standalone: true,
  imports: [WorkflowListPresentational],
})
export class WorkflowListContainer {
  readonly useCase = inject(WorkflowListUseCase);

  readonly flowUseCase = inject(FlowUseCase);

  onCreateFlow(action: CreateFlowAction): void {
    this.useCase.createFlow(action);

    this.flowUseCase.create(this.flowUseCase.state.flows(), action);
  }
}
