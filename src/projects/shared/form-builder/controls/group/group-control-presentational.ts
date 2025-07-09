import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { IBuilderValueGroupViewModel } from '../../interface/i-builder-value-group-view-model';
import { FORM_BUILDER_CONTROL_MAP } from '../../interface/form-builder-control-map';
import { FormBuilderControlType } from '../../../../types/form-builder-control-type';

@Component({
  selector: 'group-control',
  styleUrls: ['group-control-presentational.scss'],
  templateUrl: 'group-control-presentational.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class GroupControlPresentational {
  @ViewChild('containerRef', { static: true, read: ViewContainerRef })
  viewContainer: ViewContainerRef | undefined;

  viewModel = signal<IBuilderValueGroupViewModel | undefined>(undefined);

  render(model: IBuilderValueGroupViewModel): void {
    this.viewModel.set(model);

    if (!this.viewContainer) {
      throw new Error(`要素 ${model.name} が見つかりません`);
    }

    this.viewContainer.clear();

    model.controls.forEach((control) => {
      const component = this.viewContainer!.createComponent(
        FORM_BUILDER_CONTROL_MAP[control.type]
      );

      component.instance.viewModel = control;

      if (control.type === FormBuilderControlType.KNOWLEDGE_SELECT) {
        component.instance.knowledgeList = [
          {
            key: `a7767e41-29e7-24c0-0d7d-6b1d200cea23`,
            name: '独自AI1',
          },
          {
            key: `9ddb866a-92cf-6668-5cbb-3c446680f868`,
            name: '独自AI2',
          },
        ];
      }
    });
  }
}
