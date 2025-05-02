import { Injectable } from '@angular/core';
import { NodeType } from '../../../../types/node-type';
import { INodeModel } from '../../interface/i-node-model';
import { CreateEndNodeRequest } from './create-end-node-request';

@Injectable({
  providedIn: 'root',
})
export class CreateEndNodeHandler {
  handle(request: CreateEndNodeRequest): INodeModel {
    return {
      key: crypto.randomUUID(),

      input: `${crypto.randomUUID()}_input`,

      outputs: [],

      position: request.position,

      type: NodeType.End,

      value: null,
    };
  }
}
