import { Component } from '@angular/core';
import { FlowContainer } from './container/flow.container';
import { FFlowModule } from '@foblex/flow';

@Component({
  selector: 'flow-page',
  templateUrl: './flow.page.html',
  standalone: true,
  imports: [FlowContainer],
  providers: [FFlowModule],
})
export class FlowPage {
  constructor() {}
}
