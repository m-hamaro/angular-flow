import { Component } from '@angular/core';
import { WorkflowEditorPresentational } from '../presentational/workflow-editor.presentational';

@Component({
  selector: 'workflow-editor-container',
  styleUrls: ['workflow-editor.container.scss'],
  templateUrl: 'workflow-editor.container.html',
  standalone: true,
  imports: [WorkflowEditorPresentational],
})
export class WorkFlowEditorContainer {}
