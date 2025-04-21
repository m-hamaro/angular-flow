import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { IBuilderValueGroupViewModel } from '../../interface/i-builder-value-group-view-model';
import { FORM_BUILDER_CONTROL_MAP } from '../../interface/form-builder-control-map';

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

    this.viewContainer!.clear();

    model.controls.forEach((control) => {
      const component = this.viewContainer!.createComponent(
        FORM_BUILDER_CONTROL_MAP[control.type]
      );
      component.instance.viewModel = control;
    });
  }
}
