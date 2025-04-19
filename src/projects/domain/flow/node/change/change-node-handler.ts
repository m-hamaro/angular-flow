import { Injectable } from '@angular/core';
import { ChangeNodeRequest } from './change-node-request';
import { IFlowModel } from '../../interface/i-flow-model';

@Injectable({
  providedIn: 'root',
})
export class ChangeNodeHandler {
  handle(request: ChangeNodeRequest): IFlowModel[] {
    const flow = request.flows.find((x) => x.key === request.flowKey);

    if (!flow) {
      throw new Error('フローが見つかりません');
    }

    const node = flow.nodes.find((x) => x.key === request.nodeKey);

    if (!node) {
      throw new Error('ノードが見つかりません');
    }

    node.position = request.position;
    node.value = request.value;
    node.outputs = request.outputs;

    return request.flows;
  }
}
