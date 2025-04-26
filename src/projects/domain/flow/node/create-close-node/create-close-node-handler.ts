import { Injectable } from '@angular/core';
import { NodeType } from '../../../../types/node-type';
import { INodeModel } from '../../interface/i-node-model';
import { CreateCloseNodeRequest } from './create-close-node-request';

@Injectable({
  providedIn: 'root',
})
export class CreateCloseNodeHandler {
  handle(request: CreateCloseNodeRequest): INodeModel {
    return {
      key: crypto.randomUUID(),

      input: `${crypto.randomUUID()}_input`,

      outputs: [],

      position: request.position,

      type: NodeType.Close,

      value: null,
    };
  }
}
