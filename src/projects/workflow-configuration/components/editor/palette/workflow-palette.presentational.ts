import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnChanges,
} from '@angular/core';
import { IFlowViewModel } from '../../../interface/i-flow-view-model';
import { NODE_STATIC_MAP } from '../../../../types/node-static-map';
import { NodeType } from '../../../../types/node-type';
import { IconButtonPresentational } from '../../../../shared/icon-button/icon-button.presentational';
import { MatTooltip } from '@angular/material/tooltip';
import { FFlowModule } from '@foblex/flow';

@Component({
  selector: 'workflow-palette-presentational',
  styleUrls: ['workflow-palette.presentational.scss'],
  templateUrl: 'workflow-palette.presentational.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconButtonPresentational, MatTooltip, FFlowModule],
})
export class WorkflowPalettePresentational implements OnChanges {
  viewModel = input.required<IFlowViewModel>();

  protected nodes = Object.keys(NODE_STATIC_MAP).map((key: string) => {
    return {
      ...NODE_STATIC_MAP[key],
      type: key,
      disabled: false,
    };
  });

  ngOnChanges(): void {
    this.limitNodes();
  }

  private limitNodes(): void {
    this.nodes.forEach((x) => {
      if (x.type === NodeType.Start) {
        x.disabled = !!this.viewModel()?.nodes.some(
          (y) => y.type === NodeType.Start
        );
      }
    });
  }
}
