import { Injectable } from '@angular/core';
import { IFlowModel } from '../../../domain/flow/interface/i-flow-model';
import { IConnectionViewModel } from '../../interface/i-connection-view-model';
import { IFlowViewModel } from '../../interface/i-flow-view-model';
import { INodeViewModel } from '../../interface/i-node-view-model';
import { MapToConnectionViewModelRequest } from '../connection/to-view-model/map-to-connection-view-model-request';
import { MapToNodeViewModelHandler } from '../node/to-view-model/map-to-node-view-model-handler';
import { MapToNodeViewModelRequest } from '../node/to-view-model/map-to-node-view-model-request';
import { MapToFlowViewModelRequest } from './map-to-flow-view-model-request';
import { MapToConnectionViewModelHandler } from '../connection/to-view-model/map-to-connection-view-model-handler';

// TODO: root?
@Injectable()
export class MapToFlowViewModelHandler {
  handle(request: MapToFlowViewModelRequest): IFlowViewModel {
    const result = this.map(request.entity);

    return result;
  }

  private map(entity: IFlowModel): IFlowViewModel {
    const nodes = this.mapNodes(entity);

    const connections: IConnectionViewModel[] = this.mapConnections(entity);

    return {
      key: entity.key,
      nodes: nodes,
      connections: connections,
    };
  }

  private mapNodes(entity: IFlowModel): INodeViewModel[] {
    const result = entity.nodes.map((x) =>
      new MapToNodeViewModelHandler().handle(new MapToNodeViewModelRequest(x))
    );

    return result;
  }

  private mapConnections(entity: IFlowModel): IConnectionViewModel[] {
    const result = entity.nodes.reduce(
      (allConnections: IConnectionViewModel[], node) => {
        const connections: IConnectionViewModel[] =
          new MapToConnectionViewModelHandler().handle(
            new MapToConnectionViewModelRequest(node)
          );

        return allConnections.concat(connections);
      },
      []
    );

    return result;
  }
}
