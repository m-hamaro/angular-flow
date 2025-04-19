import { Component } from '@angular/core';
import { FlowPresentational } from '../presentational/flow.presentational';
import { FFlowModule } from '@foblex/flow';

@Component({
  selector: 'flow-container',
  templateUrl: './flow.container.html',
  standalone: true,
  imports: [FlowPresentational],
  providers: [FFlowModule],
})
export class FlowContainer {}
