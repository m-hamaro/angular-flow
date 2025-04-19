import { signal } from '@angular/core';
import { SignalState } from '../../../../app/state/signal-state';
import { IFlowModel } from '../interface/i-flow-model';

interface IFlowState {
  flows: IFlowModel[];
}

export class FlowState implements SignalState<IFlowState> {
  flows = signal<IFlowModel[]>([]);

  asReadonly() {
    return {
      flows: this.flows.asReadonly(),
    };
  }
}
