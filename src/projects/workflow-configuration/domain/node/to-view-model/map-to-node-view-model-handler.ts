import { Injectable } from '@angular/core';
import { INodeModel } from '../../../../domain/flow/interface/i-node-model';
import { NODE_STATIC_MAP } from '../../../../types/node-static-map';
import { INodeViewModel } from '../../../interface/i-node-view-model';
import { MapToNodeViewModelRequest } from './map-to-node-view-model-request';

// TODO: root?
@Injectable()
export class MapToNodeViewModelHandler {
  public handle(request: MapToNodeViewModelRequest): INodeViewModel {
    const result = this.map(request.entity);

    return result;
  }

  private map(entity: INodeModel): INodeViewModel<string> {
    const result = {
      key: entity.key,
      icon: NODE_STATIC_MAP[entity.type].icon,
      color: NODE_STATIC_MAP[entity.type].color,
      name: NODE_STATIC_MAP[entity.type].name,
      description: entity.description || '',
      isExpanded: entity.isExpanded || false,
      isExpandable: NODE_STATIC_MAP[entity.type].isExpandable,
      input: entity.input,
      outputs: entity.outputs.map((output) => {
        return {
          key: output.key,
          name: output.name,
        };
      }),
      type: entity.type,
      position: entity.position,
      value: entity.value,
    };

    return result;
  }
}
