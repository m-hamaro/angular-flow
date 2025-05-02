import { Injectable } from '@angular/core';
import { CreateWebSearchNodeRequest } from './create-web-search-node-request';
import { NodeType } from '../../../../types/node-type';
import { INodeModel } from '../../interface/i-node-model';

@Injectable({
  providedIn: 'root',
})
export class CreateWebSearchNodeHandler {
  handle(request: CreateWebSearchNodeRequest): INodeModel {
    return {
      key: crypto.randomUUID(),

      input: `${crypto.randomUUID()}_input`,

      outputs: [
        {
          key: crypto.randomUUID(),
          name: 'ウェブ検索結果',
        },
      ],

      position: request.position,

      type: NodeType.WebSearch,

      value: null,
    };
  }
}
