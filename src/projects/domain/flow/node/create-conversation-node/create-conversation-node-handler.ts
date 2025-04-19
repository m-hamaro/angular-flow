import { Injectable } from '@angular/core';
import { CreateConversationNodeRequest } from './create-conversation-node-request';
import { NodeType } from '../../../../types/node-type';
import { INodeModel } from '../../interface/i-node-model';

@Injectable({
  providedIn: 'root',
})
export class CreateConversationNodeHandler {
  handle(request: CreateConversationNodeRequest): INodeModel {
    return {
      key: crypto.randomUUID(),

      input: `${crypto.randomUUID()}_input`,

      outputs: [
        {
          key: crypto.randomUUID(),
          name: 'Call Ended',
        },
      ],

      position: request.position,

      type: NodeType.ToOperator,

      value: null,
    };
  }
}
