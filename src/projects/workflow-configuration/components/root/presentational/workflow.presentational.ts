import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'workflow-presentational',
  styleUrls: ['workflow.presentational.scss'],
  templateUrl: 'workflow.presentational.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
})
export class WorkFlowPresentational {}
