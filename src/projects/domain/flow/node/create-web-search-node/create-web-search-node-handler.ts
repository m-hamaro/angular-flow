import { Injectable } from '@angular/core';
import { CreateWebSearchNodeRequest } from './create-web-search-node-request';
import { NodeType } from '../../../../types/node-type';
import { INodeModel } from '../../interface/i-node-model';
import { v7 as uuidv7 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CreateWebSearchNodeHandler {
  handle(request: CreateWebSearchNodeRequest): INodeModel {
    return {
      key: uuidv7(),

      input: `${uuidv7()}_input`,

      outputs: [
        {
          key: uuidv7(),
          name: 'ウェブ検索結果',
        },
      ],

      position: request.position,

      type: NodeType.WebSearch,

      value: null,
    };
  }
}
