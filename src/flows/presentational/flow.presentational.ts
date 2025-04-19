import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FFlowModule } from '@foblex/flow';

@Component({
  selector: 'flow-presentational',
  styleUrls: ['flow.presentational.scss'],
  templateUrl: 'flow.presentational.html',
  imports: [FFlowModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowPresentational {}
