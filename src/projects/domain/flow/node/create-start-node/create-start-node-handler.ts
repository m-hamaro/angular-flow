import { Injectable } from '@angular/core';
import { NodeType } from '../../../../types/node-type';
import { INodeModel } from '../../interface/i-node-model';
import { CreateStartNodeRequest } from './create-start-node-request';

@Injectable({
  providedIn: 'root',
})
export class CreateStartNodeHandler {
  handle(request: CreateStartNodeRequest): INodeModel {
    return {
      key: crypto.randomUUID(),

      outputs: [
        {
          key: crypto.randomUUID(),
          name: '',
        },
      ],

      position: request.position,

      type: NodeType.Start,

      value: null,
    };
  }
}
