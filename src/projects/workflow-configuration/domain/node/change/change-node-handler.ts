import { inject, Injectable } from '@angular/core';
import { INodeOutputModel } from '../../../../domain/flow/interface/i-node-output-model';
import { INodeValueModel } from '../../../../domain/flow/interface/i-node-value-model';
import { ChangeNodeAction } from '../../../../domain/flow/node/change/change-node-action';
import { IConnectionViewModel } from '../../../interface/i-connection-view-model';
import { IFlowViewModel } from '../../../interface/i-flow-view-model';
import { INodeViewModel } from '../../../interface/i-node-view-model';
import { ChangeNodeRequest } from './change-node-request';
import { FormBuilderControlType } from '../../../../types/form-builder-control-type';
import { IEntitySummary } from '../../../../shared/form-builder/interface/i-entity-summary';
import { NodeType } from '../../../../types/node-type';

@Injectable({
  providedIn: 'root',
})
export class ChangeNodeHandler {
  public handle(request: ChangeNodeRequest): {
    flow: IFlowViewModel;
    action: ChangeNodeAction;
  } {
    const flow = JSON.parse(JSON.stringify(request.flow));

    const index: number = flow.nodes.findIndex(
      (x: INodeViewModel) => x.key === request.node.key
    );

    flow.nodes[index] = request.node;

    if (request.node.type === NodeType.UserInput) {
      const outputsNumberValue: number | undefined =
        this.findOutputsNumberValue(flow.nodes[index].value);

      if (outputsNumberValue) {
        flow.nodes[index].outputs = this.mergeOutputsWithNumber(
          flow,
          flow.nodes[index],
          outputsNumberValue
        );
      }
    }

    if (request.node.type === NodeType.Knowledge) {
      const outputsKnowledgeValue: IEntitySummary<string> | null =
        this.findOutputsKnowledgeValue(flow.nodes[index].value);

      if (outputsKnowledgeValue) {
        flow.nodes[index].outputs = this.changeOutputsWithKnowledge(
          flow,
          flow.nodes[index],
          outputsKnowledgeValue
        );
      }
    }

    const node = flow.nodes[index];

    const outputs: INodeOutputModel<string>[] = node.outputs.map(
      (x: IEntitySummary<string>) => {
        return {
          key: x.key,
          name: x.name,
          connectedTo:
            flow.connections.find(
              (connection: IConnectionViewModel) => connection.from === x.key
            )?.to || null,
        };
      }
    );
    const action = new ChangeNodeAction(
      request.flow.key,
      node.key,
      node.position,
      outputs,
      node.value
    );

    return {
      flow,
      action,
    };
  }

  private findOutputsNumberValue(
    value: INodeValueModel | null
  ): number | undefined {
    let result: number | undefined;
    const group = value?.groups.find((x) =>
      x.controls.some((x) => {
        return x.type === FormBuilderControlType.OUTPUTS_SELECT;
      })
    );
    if (group) {
      const control = group.controls.find(
        (x) => x.type === FormBuilderControlType.OUTPUTS_SELECT
      );
      result = control?.value;
    }
    return result;
  }

  private mergeOutputsWithNumber(
    flow: IFlowViewModel,
    node: INodeViewModel,
    outputsNumber: number
  ): IEntitySummary<string>[] {
    const outputs = node.outputs.slice(0, outputsNumber);

    const outputsToRemove = node.outputs.slice(outputsNumber);
    outputsToRemove.forEach((x) => {
      flow.connections = flow.connections.filter((connection) => {
        return connection.from !== x.key;
      });
    });

    if (outputs.length < outputsNumber) {
      for (let i = outputs.length; i < outputsNumber; i++) {
        outputs.push({ key: `output-${i + 1}`, name: `Output ${i + 1}` });
      }
    }
    return outputs;
  }

  private findOutputsKnowledgeValue(
    value: INodeValueModel | null
  ): IEntitySummary<string> | null {
    const group = value?.groups.find((x) =>
      x.controls.some((control) => {
        return control.type === FormBuilderControlType.KNOWLEDGE_SELECT;
      })
    );

    if (group) {
      const control = group.controls.find(
        (x) => x.type === FormBuilderControlType.KNOWLEDGE_SELECT
      );

      return control?.value ?? null;
    }

    return null;
  }

  private changeOutputsWithKnowledge(
    flow: IFlowViewModel,
    node: INodeViewModel,
    outputsKnowledge: IEntitySummary<string>
  ): IEntitySummary<string>[] {
    const outputsToRemove = node.outputs;

    outputsToRemove.forEach((x) => {
      flow.connections = flow.connections.filter((connection) => {
        return connection.from !== x.key;
      });
    });

    return [outputsKnowledge];
  }
}
