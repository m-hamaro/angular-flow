import { IFormBuilderValue } from '../../interface/external-value/i-form-builder-value';
import { ValueToFormValueRequest } from './value-to-form-value-request';

export class ValueToFormValueHandler {
  handle(request: ValueToFormValueRequest): IFormBuilderValue {
    return {
      groups: request.formBuilderValue.groups.map((group) => {
        return {
          name: group.name,
          controls: group.controls.map((control) => ({
            key: control.key,
            name: control.name,
            type: control.type,
            value: control.formControl.value,
          })),
        };
      }),
    };
  }
}
