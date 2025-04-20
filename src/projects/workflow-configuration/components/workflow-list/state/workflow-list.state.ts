import { signal } from '@angular/core';
import { SignalState } from '../../../../../app/state/signal-state';
import { IFlowModel } from '../../../../domain/flow/interface/i-flow-model';
import { INodeModel } from '../../../../domain/flow/interface/i-node-model';

interface IWorkflowListState {
  flow: IFlowModel | undefined;

  node: INodeModel | undefined;
}

export class WorkflowListState implements SignalState<IWorkflowListState> {
  flow = signal<IFlowModel | undefined>(undefined);

  node = signal<INodeModel | undefined>(undefined);

  asReadonly() {
    return {
      flow: this.flow.asReadonly(),
      node: this.node.asReadonly(),
    };
  }
}
