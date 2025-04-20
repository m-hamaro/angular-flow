import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkflowListContainer } from '../../workflow-list/container/workflow-list.container';

@Component({
  selector: 'workflow-presentational',
  styleUrls: ['workflow.presentational.scss'],
  templateUrl: 'workflow.presentational.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, WorkflowListContainer],
})
export class WorkFlowPresentational {}
