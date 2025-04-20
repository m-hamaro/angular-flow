import { Injectable } from '@angular/core';
import { WorkflowListState } from '../state/workflow-list.state';
import { CreateFlowAction } from '../../../../domain/flow/create/create-flow-action';

@Injectable()
export class WorkflowListUseCase {
  state = new WorkflowListState();

  #state = this.state.asReadonly();

  createFlow(action: CreateFlowAction): void {
    this.state.flow.set(action);
  }
}
