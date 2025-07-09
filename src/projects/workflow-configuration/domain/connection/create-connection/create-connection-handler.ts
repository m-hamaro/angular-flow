import { Injectable } from '@angular/core';
import { CreateConnectionRequest } from './create-connection-request';
import { IFlowViewModel } from '../../../interface/i-flow-view-model';
import { INodeModel } from '../../../../domain/flow/interface/i-node-model';
import { IConnectionViewModel } from '../../../interface/i-connection-view-model';
import { CreateConnectionAction } from '../../../../domain/flow/create-connection/create-connection-action';
import { v7 as uuidv7 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CreateConnectionHandler {
  handle(request: CreateConnectionRequest): {
    flow: IFlowViewModel;
    action: CreateConnectionAction;
  } {
    const outputNode = this.getOutputNode(request.flow, request.outputKey);

    const output = outputNode!.outputs.find((x) => x.key === request.outputKey);

    const result = JSON.parse(JSON.stringify(request.flow));

    result.connections.push(
      this.createConnection(request.outputKey, request.inputKey, output!.name)
    );

    const action = new CreateConnectionAction(
      result.key,
      outputNode!.key,
      request.outputKey,
      request.inputKey
    );

    return {
      flow: result,
      action,
    };
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
      key: uuidv7(),
      from: outputKey,
      to: inputKey,
      name: outputName,
    };

    return result;
  }
}
