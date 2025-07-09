import { Injectable } from '@angular/core';
import { NodeType } from '../../../../types/node-type';
import { INodeModel } from '../../interface/i-node-model';
import { CreateEndNodeRequest } from './create-end-node-request';
import { v7 as uuidv7 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CreateEndNodeHandler {
  handle(request: CreateEndNodeRequest): INodeModel {
    return {
      key: uuidv7(),

      input: `${uuidv7()}_input`,

      outputs: [],

      position: request.position,

      type: NodeType.End,

      value: null,
    };
  }
}
