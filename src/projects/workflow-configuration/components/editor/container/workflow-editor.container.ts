import { Component, computed, inject } from '@angular/core';
import { WorkflowEditorPresentational } from '../presentational/workflow-editor.presentational';
import { FlowUseCase } from '../../../../domain/flow/use-case/flow.use-case';
import { CreateNodeAction } from '../../../../domain/flow/node/create/create-node-action';
import { ChangeNodePositionAction } from '../../../../domain/flow/node/change-position/change-node-position-action';

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
}
