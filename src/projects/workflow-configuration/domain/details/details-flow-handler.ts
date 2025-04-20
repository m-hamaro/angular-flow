import { Injectable } from '@angular/core';
import { IFlowModel } from '../../../domain/flow/interface/i-flow-model';
import { IFlowViewModel } from '../../interface/i-flow-view-model';
import { DetailsFlowRequest } from './details-flow-request';
import { MapToFlowViewModelHandler } from '../to-view-model/map-to-flow-view-model-handler';
import { MapToFlowViewModelRequest } from '../to-view-model/map-to-flow-view-model-request';

@Injectable({
  providedIn: 'root',
})
export class DetailsFlowHandler {
  // TODO
  handle(flows: IFlowModel[], request: DetailsFlowRequest): IFlowViewModel {
    const flow = this.getFlow(flows, request.key);
    const result = new MapToFlowViewModelHandler().handle(
      new MapToFlowViewModelRequest(flow)
    );

    return result;
  }

  private getFlow(flows: IFlowModel[], key: string): IFlowModel {
    const result = flows.find((x) => x.key === key);
    if (!result) {
      throw new Error(`指定されたフローが見つかりません key: ${key}`);
    }
    return result;
  }
}
