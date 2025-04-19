import { Injectable } from '@angular/core';
import { NodeType } from '../../../../types/node-type';
import { INodeModel } from '../../interface/i-node-model';
import { CreateDisconnectNodeRequest } from './create-disconnect-node-request';

@Injectable({
  providedIn: 'root',
})
export class CreateDisconnectNodeHandler {
  handle(request: CreateDisconnectNodeRequest): INodeModel {
    return {
      key: crypto.randomUUID(),

      input: `${crypto.randomUUID()}_input`,

      outputs: [],

      position: request.position,

      type: NodeType.Disconnect,

      value: null,
    };
  }
}
