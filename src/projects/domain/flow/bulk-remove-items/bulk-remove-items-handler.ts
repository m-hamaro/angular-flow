import { Injectable } from '@angular/core';
import { BulkRemoveItemsRequest } from './bulk-remove-items-request';
import { IFlowModel } from '../interface/i-flow-model';

@Injectable({
  providedIn: 'root',
})
export class BulkRemoveItemsHandler {
  handle(request: BulkRemoveItemsRequest): IFlowModel[] {
    const flow = request.flows.find((x) => x.key === request.flowKey);

    if (!flow) {
      throw new Error('フローが見つかりません');
    }

    request.outputKeys.forEach((x) => {
      this.clearOutput(flow, x);
    });

    request.nodeKeys.forEach((x) => {
      this.removeNode(flow, x);
    });

    return request.flows;
  }

  private removeNode(flow: IFlowModel, key: string): void {
    flow.nodes = flow.nodes.filter((x) => x.key !== key);
  }

  private clearOutput(flow: IFlowModel, outputKey: string): void {
    const node = flow.nodes.find((x) =>
      x.outputs.some((y) => y.key === outputKey)
    );
    if (!node) {
      throw new Error('ノードが見つかりません');
    }
    const output = node.outputs.find((x) => x.key === outputKey);
    if (!output) {
      throw new Error('出力が見つかりません');
    }
    output.connectedTo = undefined;
  }
}
