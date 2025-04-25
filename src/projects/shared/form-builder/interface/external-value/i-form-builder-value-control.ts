import { ValidatorFn } from '@angular/forms';
import { FormBuilderControlType } from '../../../../types/form-builder-control-type';

export interface IFormBuilderValueControl<TValue = any> {
  key: string;

  name: string;

  type: FormBuilderControlType;

  value?: TValue;

  validators?: ValidatorFn[];
}
