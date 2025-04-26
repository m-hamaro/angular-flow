import { inject, Injectable, Injector } from '@angular/core';
import { CreateFlowRequest } from './create-flow-request';
import { IFlowModel } from '../interface/i-flow-model';
import { CreateStartNodeHandler } from '../node/create-start-node/create-start-node-handler';
import { CreateStartNodeRequest } from '../node/create-start-node/create-start-node-request';
import { CreateCloseNodeHandler } from '../node/create-close-node/create-close-node-handler';
import { CreateCloseNodeRequest } from '../node/create-close-node/create-close-node-request';

@Injectable({
  providedIn: 'root',
})
export class CreateFlowHandler {
  private readonly injector = inject(Injector);

  handle(request: CreateFlowRequest): IFlowModel {
    const existingFlow: IFlowModel | undefined = request.flows.find(
      (x) => x.key === request.key
    );

    if (existingFlow) {
      throw new Error('そのフローは既に登録されています');
    }

    const height: number = window.innerHeight;

    const width: number = window.innerWidth;

    const startNode = this.injector
      .get(CreateStartNodeHandler)
      .handle(
        new CreateStartNodeRequest({ x: width / 2, y: (height / 8) * 2 })
      );

    const closeNode = this.injector
      .get(CreateCloseNodeHandler)
      .handle(
        new CreateCloseNodeRequest({ x: width / 2, y: (height / 8) * 6 })
      );

    if (startNode.outputs.length) {
      startNode.outputs[0].connectedTo = closeNode.input;
    }

    return {
      key: request.key,
      name: request.name,
      nodes: [startNode, closeNode],
    };
  }
}
