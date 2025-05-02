import { inject, Injectable, Injector } from '@angular/core';
import { IFlowModel } from '../../interface/i-flow-model';
import { INodeModel } from '../../interface/i-node-model';
import { CreateWebSearchNodeHandler } from '../create-web-search-node/create-web-search-node-handler';
import { CreateWebSearchNodeRequest } from '../create-web-search-node/create-web-search-node-request';
import { CreateEndNodeHandler } from '../create-end-node/create-end-node-handler';
import { CreateEndNodeRequest } from '../create-end-node/create-end-node-request';
import { CreateStartNodeHandler } from '../create-start-node/create-start-node-handler';
import { CreateStartNodeRequest } from '../create-start-node/create-start-node-request';
import { CreatePlayTextNodeHandler } from '../create-play-text-node/create-play-text-node-handler';
import { CreatePlayTextNodeRequest } from '../create-play-text-node/create-play-text-node-request';
import { CreateNodeRequest } from './create-node-request';
import { NodeType } from '../../../../types/node-type';
import { CreateIvrNodeHandler } from '../create-ivr-node/create-ivr-node-handler';
import { CreateIvrNodeRequest } from '../create-ivr-node/create-ivr-node-request';
import { CreateKnowledgeNodeHandler } from '../create-knowledge-node/create-knowledge-node-handler';
import { CreateKnowledgeNodeRequest } from '../create-knowledge-node/create-knowledge-node-request';

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
    switch (request.type) {
      case NodeType.Start:
        return this.injector
          .get(CreateStartNodeHandler)
          .handle(new CreateStartNodeRequest(request.position));

      case NodeType.PlayText:
        return this.injector
          .get(CreatePlayTextNodeHandler)
          .handle(new CreatePlayTextNodeRequest(request.position));

      case NodeType.UserInput:
        return this.injector
          .get(CreateIvrNodeHandler)
          .handle(new CreateIvrNodeRequest(request.position));

      case NodeType.Knowledge:
        return this.injector
          .get(CreateKnowledgeNodeHandler)
          .handle(new CreateKnowledgeNodeRequest(request.position));

      case NodeType.WebSearch:
        return this.injector
          .get(CreateWebSearchNodeHandler)
          .handle(new CreateWebSearchNodeRequest(request.position));

      case NodeType.End:
        return this.injector
          .get(CreateEndNodeHandler)
          .handle(new CreateEndNodeRequest(request.position));

      default:
        throw new Error('Unknown node type');
    }
  }
}
