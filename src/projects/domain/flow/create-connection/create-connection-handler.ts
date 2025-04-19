import { Injectable } from '@angular/core';
import { CreateConnectionRequest } from './create-connection-request';
import { IFlowModel } from '../interface/i-flow-model';

@Injectable({
  providedIn: 'root',
})
export class CreateConnectionHandler {
  handle(request: CreateConnectionRequest): IFlowModel[] {
    const flow = request.flows.find((x) => x.key === request.flowKey);

    if (!flow) {
      throw new Error('フローが見つかりません');
    }

    const outputNode = flow.nodes.find((x) => x.key === request.outputNodeKey);

    if (!outputNode) {
      throw new Error('ノードが見つかりません');
    }

    const output = outputNode.outputs.find((x) => x.key === request.outputKey);

    if (!output) {
      throw new Error('出力が見つかりません');
    }

    output.connectedTo = request.inputKey;

    return request.flows;
  }
}
