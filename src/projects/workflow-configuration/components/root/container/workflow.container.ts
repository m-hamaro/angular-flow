import { Component } from '@angular/core';
import { WorkFlowPresentational } from '../presentational/workflow.presentational';
import { WorkflowListUseCase } from '../../workflow-list/use-case/workflow-list.use-case';
import { FlowUseCase } from '../../../../domain/flow/use-case/flow.use-case';

@Component({
  selector: 'workflow-container',
  styleUrls: ['workflow.container.scss'],
  templateUrl: 'workflow.container.html',
  standalone: true,
  imports: [WorkFlowPresentational],
  providers: [WorkflowListUseCase, FlowUseCase],
})
export class WorkflowContainer {}
