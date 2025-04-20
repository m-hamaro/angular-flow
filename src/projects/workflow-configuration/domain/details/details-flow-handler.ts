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
  constructor() {}

  // TODO
  handle(request: DetailsFlowRequest) {
    // const flow = this.getFlow(request.key);
    // const result = new MapToFlowViewModelHandler().handle(
    //   new MapToFlowViewModelRequest(flow)
    // );
    // return result;
  }

  //   private getFlow(key: string): IFlowModel {
  //     const entities: IFlowModel[] = this.store.selectSnapshot(
  //       (x) => x.flows.flows
  //     );

  //     const result = entities.find((x) => x.key === key);
  //     if (!result) {
  //       throw new Error(`Flow with key ${key} not found`);
  //     }
  //     return result;
  //   }
}
