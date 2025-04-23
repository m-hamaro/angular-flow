import { Component, computed, inject } from '@angular/core';
import { WorkflowEditorPresentational } from '../presentational/workflow-editor.presentational';
import { FlowUseCase } from '../../../../domain/flow/use-case/flow.use-case';
import { CreateNodeAction } from '../../../../domain/flow/node/create/create-node-action';
import { ChangeNodePositionAction } from '../../../../domain/flow/node/change-position/change-node-position-action';
import { CreateConnectionAction } from '../../../../domain/flow/create-connection/create-connection-action';
import { BulkRemoveItemsAction } from '../../../../domain/flow/bulk-remove-items/bulk-remove-items-action';
import { RemoveFlowAction } from '../../../../domain/flow/remove/remove-flow-action';
import { ChangeNodeAction } from '../../../../domain/flow/node/change/change-node-action';

@Component({
  selector: 'workflow-editor-container',
  styleUrls: ['workflow-editor.container.scss'],
  templateUrl: 'workflow-editor.container.html',
  standalone: true,
  imports: [WorkflowEditorPresentational],
})
export class WorkFlowEditorContainer {
  readonly flowUseCase = inject(FlowUseCase);

  private readonly flows = computed(() => this.flowUseCase.state.flows());

  createNode(action: CreateNodeAction): void {
    this.flowUseCase.createNode(this.flows(), action);
  }

  changeNode(action: ChangeNodeAction): void {
    this.flowUseCase.changeNode(this.flows(), action);
  }

  nodePositionChanged(action: ChangeNodePositionAction): void {
    this.flowUseCase.changeNodePosition(this.flows(), action);
  }

  createConnection(action: CreateConnectionAction): void {
    this.flowUseCase.createConnection(this.flows(), action);
  }

  removeConnection(action: BulkRemoveItemsAction): void {
    this.flowUseCase.removeConnection(this.flows(), action);
  }

  remove(action: RemoveFlowAction): void {
    this.flowUseCase.remove(this.flows(), action);
  }
}
