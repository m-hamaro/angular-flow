import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilderModelFromValueRequest } from './form-builder-model-from-value-request';
import { FormBuilderModelFromValueResponse } from './form-builder-model-from-value-response';
import { IBuilderValueGroupViewModel } from '../../interface/i-builder-value-group-view-model';
import { IFormBuilderValueControl } from '../../interface/external-value/i-form-builder-value-control';
import { IBuilderValueControlViewModel } from '../../interface/i-builder-value-control-view-model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderModelFromValueHandler {
  handle(
    request: FormBuilderModelFromValueRequest
  ): FormBuilderModelFromValueResponse {
    const form = new FormGroup({});

    const groups: IBuilderValueGroupViewModel[] = [];

    (request.value?.groups || []).forEach((x) => {
      const controls = this.mapControlModelToFormControl(x.controls, form);

      const group: IBuilderValueGroupViewModel = { ...x, controls };

      groups.push(group);
    });

    const result = new FormBuilderModelFromValueResponse(groups, form);

    return result;
  }
  private mapControlModelToFormControl(
    controls: IFormBuilderValueControl[],
    form: FormGroup
  ): IBuilderValueControlViewModel[] {
    const result = controls.map((controlModel) => {
      const formControl = new FormControl(controlModel.value);
      form.addControl(controlModel.key, formControl);
      return {
        ...controlModel,
        formControl,
      };
    });

    return result;
  }
}
