import { inject, Injectable } from '@angular/core';
import { ReassignConnectionRequest } from './reassign-connection-request';
import { INodeModel } from '../../../../domain/flow/interface/i-node-model';
import { IFlowViewModel } from '../../../interface/i-flow-view-model';
import { IConnectionViewModel } from '../../../interface/i-connection-view-model';
import { CreateConnectionAction } from '../../../../domain/flow/create-connection/create-connection-action';
import { FlowUseCase } from '../../../../domain/flow/use-case/flow.use-case';

@Injectable({
  providedIn: 'root',
})
export class ReassignConnectionHandler {
  private readonly flowUseCase = inject(FlowUseCase);

  handle(request: ReassignConnectionRequest): IFlowViewModel {
    const outputNode = this.getOutputNode(request.flow, request.outputKey);

    const result = JSON.parse(JSON.stringify(request.flow));

    const connection = result.connections.find(
      (x: IConnectionViewModel) =>
        x.from === request.outputKey && x.to === request.oldInputKey
    );
    if (connection) {
      connection.to = request.newInputKey;
    }

    // TODO: store
    const action = new CreateConnectionAction(
      result.key,
      outputNode.key,
      request.outputKey,
      request.newInputKey
    );

    const flows = this.flowUseCase.state.flows();

    this.flowUseCase.createConnection(flows, action);

    return result;
  }

  private getOutputNode(flow: IFlowViewModel, outputKey: string): INodeModel {
    const result = flow.nodes.find((x) => {
      return x.outputs.some((y) => y.key === outputKey);
    });

    if (!result) {
      throw new Error('ノードが見つかりません');
    }

    return result;
  }
}
