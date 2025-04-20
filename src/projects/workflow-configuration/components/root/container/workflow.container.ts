import { Component } from '@angular/core';
import { WorkFlowPresentational } from '../presentational/workflow.presentational';

@Component({
  selector: 'workflow-container',
  templateUrl: 'workflow.container.html',
  standalone: true,
  imports: [WorkFlowPresentational],
})
export class WorkflowContainer {}
