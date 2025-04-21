import { Component } from '@angular/core';
import { WorkFlowPresentational } from '../presentational/workflow.presentational';
import { FlowUseCase } from '../../../../domain/flow/use-case/flow.use-case';

@Component({
  selector: 'workflow-container',
  styleUrls: ['workflow.container.scss'],
  templateUrl: 'workflow.container.html',
  standalone: true,
  imports: [WorkFlowPresentational],
  providers: [FlowUseCase],
})
export class WorkflowContainer {}
