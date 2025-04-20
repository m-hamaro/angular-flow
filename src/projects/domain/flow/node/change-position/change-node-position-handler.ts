import { Injectable } from '@angular/core';
import { IFlowModel } from '../../interface/i-flow-model';
import { ChangeNodePositionRequest } from './change-node-position-request';

@Injectable({
  providedIn: 'root',
})
export class ChangeNodePositionHandler {
  public handle(request: ChangeNodePositionRequest): IFlowModel[] {
    const flow = request.flows.find((x) => x.key === request.flowKey);
    if (!flow) {
      throw new Error('フローが見つかりません');
    }

    const node = flow.nodes.find((x) => x.key === request.nodeKey);
    if (!node) {
      throw new Error('ノードが見つかりません');
    }

    node.position = request.position;

    return request.flows;
  }
}
