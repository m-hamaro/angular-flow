import { inject, Injectable, Injector } from '@angular/core';
import { IFlowModel } from '../../interface/i-flow-model';
import { INodeModel } from '../../interface/i-node-model';
import { CreateConversationNodeHandler } from '../create-conversation-node/create-conversation-node-handler';
import { CreateConversationNodeRequest } from '../create-conversation-node/create-conversation-node-request';
import { CreateDisconnectNodeHandler } from '../create-disconnect-node/create-disconnect-node-handler';
import { CreateDisconnectNodeRequest } from '../create-disconnect-node/create-disconnect-node-request';
import { CreateIncomingCallNodeHandler } from '../create-incoming-call-node/create-incoming-call-node-handler';
import { CreateIncomingCallNodeRequest } from '../create-incoming-call-node/create-incoming-call-node-request';
import { CreatePlayTextNodeHandler } from '../create-play-text-node/create-play-text-node-handler';
import { CreatePlayTextNodeRequest } from '../create-play-text-node/create-play-text-node-request';
import { CreateNodeRequest } from './create-node-request';
import { NodeType } from '../../../../types/node-type';
import { CreateIvrNodeHandler } from '../create-ivr-node/create-ivr-node-handler';
import { CreateIvrNodeRequest } from '../create-ivr-node/create-ivr-node-request';

@Injectable({
  providedIn: 'root',
})
export class CreateNodeHandler {
  private readonly injector = inject(Injector);

  public handle(request: CreateNodeRequest): IFlowModel[] {
    const flow = request.flows.find((x) => x.key === request.flowKey);
    if (!flow) {
      throw new Error('Flow not found');
    }

    const node = this.getNodeModel(request);

    flow.nodes.push(node);

    return request.flows;
  }

  private getNodeModel(request: CreateNodeRequest): INodeModel {
    let result: INodeModel | undefined;

    switch (request.type) {
      case NodeType.IncomingCall:
        result = this.injector
          .get(CreateIncomingCallNodeHandler)
          .handle(new CreateIncomingCallNodeRequest(request.position));
        break;
      case NodeType.PlayText:
        result = this.injector
          .get(CreatePlayTextNodeHandler)
          .handle(new CreatePlayTextNodeRequest(request.position));
        break;
      case NodeType.UserInput:
        result = this.injector
          .get(CreateIvrNodeHandler)
          .handle(new CreateIvrNodeRequest(request.position));
        break;
      case NodeType.ToOperator:
        result = this.injector
          .get(CreateConversationNodeHandler)
          .handle(new CreateConversationNodeRequest(request.position));
        break;
      case NodeType.Disconnect:
        result = this.injector
          .get(CreateDisconnectNodeHandler)
          .handle(new CreateDisconnectNodeRequest(request.position));
        break;
      default:
        throw new Error('Unknown node type');
    }
    return result;
  }
}
