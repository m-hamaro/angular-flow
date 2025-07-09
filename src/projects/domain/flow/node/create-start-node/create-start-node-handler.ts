import { Injectable } from '@angular/core';
import { NodeType } from '../../../../types/node-type';
import { INodeModel } from '../../interface/i-node-model';
import { CreateStartNodeRequest } from './create-start-node-request';
import { v7 as uuidv7 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CreateStartNodeHandler {
  handle(request: CreateStartNodeRequest): INodeModel {
    return {
      key: uuidv7(),

      outputs: [
        {
          key: uuidv7(),
          name: '',
        },
      ],

      position: request.position,

      type: NodeType.Start,

      value: null,
    };
  }
}
