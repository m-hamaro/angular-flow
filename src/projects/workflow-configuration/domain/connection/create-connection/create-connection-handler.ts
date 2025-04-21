import { inject, Injectable } from '@angular/core';
import { CreateConnectionRequest } from './create-connection-request';
import { IFlowViewModel } from '../../../interface/i-flow-view-model';
import { INodeModel } from '../../../../domain/flow/interface/i-node-model';
import { IConnectionViewModel } from '../../../interface/i-connection-view-model';
import { CreateConnectionAction } from '../../../../domain/flow/create-connection/create-connection-action';
import { FlowUseCase } from '../../../../domain/flow/use-case/flow.use-case';

@Injectable({
  providedIn: 'root',
})
export class CreateConnectionHandler {
  private readonly flowUseCase = inject(FlowUseCase);

  handle(request: CreateConnectionRequest): IFlowViewModel {
    const outputNode = this.getOutputNode(request.flow, request.outputKey);

    const output = outputNode!.outputs.find((x) => x.key === request.outputKey);

    const result = JSON.parse(JSON.stringify(request.flow));

    console.log(result);

    result.connections.push(
      this.createConnection(request.outputKey, request.inputKey, output!.name)
    );

    // TODO store
    const action = new CreateConnectionAction(
      result.key,
      outputNode!.key,
      request.inputKey,
      output!.name
    );

    // const flows = this.flowUseCase.state.flows();

    // this.flowUseCase.createConnection(flows, action);

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

  private createConnection(
    outputKey: string,
    inputKey: string,
    outputName: string
  ): IConnectionViewModel {
    const result = {
      key: crypto.randomUUID(),
      from: outputKey,
      to: inputKey,
      name: outputName,
    };

    return result;
  }
}
