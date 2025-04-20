import { Injectable } from '@angular/core';
import { FlowState } from '../state/flow.state';

@Injectable()
export class FlowUseCase {
  state = new FlowState();

  #state = this.state.asReadonly();
}
