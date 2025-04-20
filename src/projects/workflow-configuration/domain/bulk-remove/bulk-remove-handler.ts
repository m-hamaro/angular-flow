import { Injectable } from '@angular/core';
import { BulkRemoveRequest } from './bulk-remove-request';
import { IFlowViewModel } from '../../interface/i-flow-view-model';
import { IConnectionViewModel } from '../../interface/i-connection-view-model';
import { BulkRemoveItemsAction } from '../../../domain/flow/bulk-remove-items/bulk-remove-items-action';

@Injectable({
  providedIn: 'root',
})
export class BulkRemoveHandler {
  constructor() {}

  handle(request: BulkRemoveRequest): IFlowViewModel {
    const connectionKeys: string[] = request.connectionKeys || [];

    request.nodeKeys.forEach((x) => {
      const keys: string[] = this.findAllConnectionsForNode(request.flow, x);

      connectionKeys.push(...keys);

      this.removeNode(request.flow, x);
    });

    const outputKeys: string[] = connectionKeys
      .map((x: string) => {
        return this.removeConnection(request.flow, x);
      })
      .filter((value: string | undefined) => value !== undefined);

    const result = JSON.parse(JSON.stringify(request.flow));

    // TODO store
    const action = new BulkRemoveItemsAction(
      result.key,
      request.nodeKeys,
      outputKeys
    );

    return result;
  }

  private findAllConnectionsForNode(
    flow: IFlowViewModel,
    key: string
  ): string[] {
    const node = flow.nodes.find((x) => x.key === key);

    const result: string[] = [];

    if (node) {
      node.outputs.forEach((output) => {
        const connections = flow.connections
          .filter((c) => c.from === output.key)
          .map((c) => c.key);
        if (connections.length) {
          result.push(...connections);
        }
      });
      const connections = flow.connections
        .filter((c) => c.to === node.input)
        .map((c) => c.key);
      if (connections.length) {
        result.push(...connections);
      }
    }

    return result;
  }

  private removeConnection(
    flow: IFlowViewModel,
    key: string
  ): string | undefined {
    const index = flow.connections.findIndex(
      (x: IConnectionViewModel) => x.key === key
    );
    if (index === -1) {
      return undefined;
    }
    const result = flow.connections[index].from;

    if (index > -1) {
      flow.connections.splice(index, 1);
    }
    return result;
  }

  private removeNode(flow: IFlowViewModel, key: string): void {
    const index = flow.nodes.findIndex((y) => y.key === key);
    if (index > -1) {
      flow.nodes.splice(index, 1);
    }
  }
}
