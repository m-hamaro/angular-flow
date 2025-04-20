import { Injectable } from '@angular/core';
import { MapToConnectionViewModelRequest } from './map-to-connection-view-model-request';
import { INodeModel } from '../../../../domain/flow/interface/i-node-model';
import { IConnectionViewModel } from '../../../interface/i-connection-view-model';

// TODO: root?
@Injectable()
export class MapToConnectionViewModelHandler {
  handle(request: MapToConnectionViewModelRequest): IConnectionViewModel[] {
    const result = this.map(request.entity);

    return result;
  }

  private map(node: INodeModel): IConnectionViewModel[] {
    const result = node.outputs
      .filter((x) => !!x.connectedTo)
      .map((x) => {
        return {
          key: crypto.randomUUID(),
          from: x.key,
          to: x.connectedTo,
          name: x.name,
        } as IConnectionViewModel;
      });

    return result;
  }
}
