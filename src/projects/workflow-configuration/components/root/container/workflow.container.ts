import { Component } from '@angular/core';
import { WorkFlowPresentational } from '../presentational/workflow.presentational';
import { WorkflowListUseCase } from '../../workflow-list/use-case/workflow-list.use-case';

@Component({
  selector: 'workflow-container',
  templateUrl: 'workflow.container.html',
  standalone: true,
  imports: [WorkFlowPresentational],
  providers: [WorkflowListUseCase],
})
export class WorkflowContainer {}
