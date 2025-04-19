import { FormControl } from '@angular/forms';
import { IFormBuilderValueControl } from './external-value/i-form-builder-value-control';

export interface IBuilderValueControlViewModel<TValue = any>
  extends IFormBuilderValueControl<TValue> {
  formControl: FormControl;
}
