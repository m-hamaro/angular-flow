import { Component, inject } from '@angular/core';
import { WorkflowEditorPresentational } from '../presentational/workflow-editor.presentational';
import { FlowUseCase } from '../../../../domain/flow/use-case/flow.use-case';

@Component({
  selector: 'workflow-editor-container',
  styleUrls: ['workflow-editor.container.scss'],
  templateUrl: 'workflow-editor.container.html',
  standalone: true,
  imports: [WorkflowEditorPresentational],
})
export class WorkFlowEditorContainer {
  readonly flowUseCase = inject(FlowUseCase);
}
