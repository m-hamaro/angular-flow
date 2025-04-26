import { Injectable } from '@angular/core';
import { UpdateFlowRequest } from './update-flow-request';
import { IFlowModel } from '../interface/i-flow-model';

@Injectable({
  providedIn: 'root',
})
export class UpdateFlowHandler {
  handle(request: UpdateFlowRequest) {
    const existingFlow: IFlowModel | undefined = request.flows.find(
      (x) => x.key === request.key
    );

    if (!existingFlow) {
      throw new Error('指定されたフローが見つかりません');
    }

    existingFlow.name = request.name;

    return request.flows;
  }
}
