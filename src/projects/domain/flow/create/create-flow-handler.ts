import { inject, Injectable, Injector } from '@angular/core';
import { CreateFlowRequest } from './create-flow-request';
import { IFlowModel } from '../interface/i-flow-model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateFlowHandler {
  private readonly injector = inject(Injector);

  handle(request: CreateFlowRequest) {
    const existingFlow: IFlowModel | undefined = request.flows.find(
      (x) => x.name === request.name
    );

    if (existingFlow) {
      throwError(() => new Error('そのフローは既に登録されています'));
    }

    const height = window.innerHeight;

    const width = window.innerWidth;

    // const incomingCallNode = this.injector.get(CreateInComingCall)
  }
}
