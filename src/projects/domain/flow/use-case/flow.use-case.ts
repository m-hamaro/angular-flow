import { inject, Injectable, Injector } from '@angular/core';
import { FlowState } from '../state/flow.state';
import { IEntitySummary } from '../../../shared/form-builder/interface/i-entity-summary';
import { IFlowModel } from '../interface/i-flow-model';
import { CreateFlowHandler } from '../create/create-flow-handler';
import { CreateFlowRequest } from '../create/create-flow-request';
import { CreateFlowAction } from '../create/create-flow-action';
import { CreateNodeAction } from '../node/create/create-node-action';
import { CreateNodeHandler } from '../node/create/create-node-handler';
import { CreateNodeRequest } from '../node/create/create-node-request';
import { ChangeNodeAction } from '../node/change/change-node-action';
import { ChangeNodeHandler } from '../node/change/change-node-handler';
import { ChangeNodeRequest } from '../node/change/change-node-request';
import { CreateConnectionAction } from '../create-connection/create-connection-action';
import { CreateConnectionHandler } from '../create-connection/create-connection-handler';
import { CreateConnectionRequest } from '../create-connection/create-connection-request';
import { BulkRemoveItemsAction } from '../bulk-remove-items/bulk-remove-items-action';
import { BulkRemoveItemsRequest } from '../bulk-remove-items/bulk-remove-items-request';
import { BulkRemoveItemsHandler } from '../bulk-remove-items/bulk-remove-items-handler';
import { RemoveFlowAction } from '../remove/remove-flow-action';
import { ChangeNodePositionAction } from '../node/change-position/change-node-position-action';
import { ChangeNodePositionHandler } from '../node/change-position/change-node-position-handler';
import { ChangeNodePositionRequest } from '../node/change-position/change-node-position-request';
import { UpdateFlowAction } from '../update/update-flow-action';
import { UpdateFlowHandler } from '../update/update-flow-handler';
import { UpdateFlowRequest } from '../update/update-flow-request';

@Injectable({
  providedIn: 'root',
})
export class FlowUseCase {
  private readonly injector = inject(Injector);

  state = new FlowState();

  #state = this.state.asReadonly();

  summaryList(): IEntitySummary<string>[] {
    return this.#state.flows().map((x) => {
      return {
        key: x.key,
        name: x.name,
      };
    });
  }

  create(flows: IFlowModel[], { key, name }: CreateFlowAction): string {
    const result: IFlowModel = this.injector
      .get(CreateFlowHandler)
      .handle(new CreateFlowRequest(key, name, flows));

    this.state.flows.update((prev) => prev.concat(result));

    return key;
  }

  update(flows: IFlowModel[], { key, name }: UpdateFlowAction): void {
    const result: IFlowModel[] = this.injector
      .get(UpdateFlowHandler)
      .handle(new UpdateFlowRequest(key, name, flows));

    this.state.flows.set(result);
  }

  createNode(
    flows: IFlowModel[],
    { flowKey, type, position }: CreateNodeAction
  ): void {
    const result: IFlowModel[] = this.injector
      .get(CreateNodeHandler)
      .handle(new CreateNodeRequest(flowKey, type, position, flows));

    this.state.flows.set(result);
  }

  changeNode(
    flows: IFlowModel[],
    { flowKey, nodeKey, position, outputs, value }: ChangeNodeAction
  ): void {
    const result = this.injector
      .get(ChangeNodeHandler)
      .handle(
        new ChangeNodeRequest(flowKey, nodeKey, position, outputs, value, flows)
      );

    this.state.flows.set(result);
  }

  changeNodePosition(
    flows: IFlowModel[],
    { flowKey, nodeKey, position }: ChangeNodePositionAction
  ): void {
    const result = this.injector
      .get(ChangeNodePositionHandler)
      .handle(new ChangeNodePositionRequest(flowKey, nodeKey, position, flows));

    this.state.flows.set(result);
  }

  createConnection(
    flows: IFlowModel[],
    { flowKey, outputNodeKey, outputKey, inputKey }: CreateConnectionAction
  ): void {
    const result = this.injector
      .get(CreateConnectionHandler)
      .handle(
        new CreateConnectionRequest(
          flowKey,
          outputNodeKey,
          outputKey,
          inputKey,
          flows
        )
      );

    this.state.flows.set(result);
  }

  removeConnection(
    flows: IFlowModel[],
    { flowKey, nodeKeys, outputKeys }: BulkRemoveItemsAction
  ): void {
    const result = this.injector
      .get(BulkRemoveItemsHandler)
      .handle(new BulkRemoveItemsRequest(flowKey, nodeKeys, outputKeys, flows));

    this.state.flows.set(result);
  }

  remove(flows: IFlowModel[], { key }: RemoveFlowAction): void {
    const filteredFlows = flows.filter((flow) => flow.key !== key);

    this.state.flows.set(filteredFlows);
  }
}
