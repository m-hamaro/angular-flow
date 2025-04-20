import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FlowActionPanelEventType } from '../../../../types/flow-action-panel-event-type';
import { IconButtonPresentational } from '../../../../shared/icon-button/icon-button.presentational';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'workflow-action-panel-presentational',
  styleUrls: ['workflow-action-panel.presentational.scss'],
  templateUrl: 'workflow-action-panel.presentational.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconButtonPresentational, MatTooltip],
})
export class WorkflowActionPanelPresentational {
  protected eventType = FlowActionPanelEventType;

  request = output<FlowActionPanelEventType>();

  onClick(event: FlowActionPanelEventType): void {
    this.request.emit(event);
  }
}
