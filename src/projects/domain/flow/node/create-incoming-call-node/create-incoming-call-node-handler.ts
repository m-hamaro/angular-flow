import { Injectable } from '@angular/core';
import { NodeType } from '../../../../types/node-type';
import { INodeModel } from '../../interface/i-node-model';
import { CreateIncomingCallNodeRequest } from './create-incoming-call-node-request';

@Injectable({
  providedIn: 'root',
})
export class CreateIncomingCallNodeHandler {
  handle(request: CreateIncomingCallNodeRequest): INodeModel {
    return {
      key: crypto.randomUUID(),

      outputs: [
        {
          key: crypto.randomUUID(),
          name: '',
        },
      ],

      position: request.position,

      type: NodeType.IncomingCall,

      value: null,
    };
  }
}
