import { IFormBuilderValue } from '../../interface/external-value/i-form-builder-value';

export class FormBuilderModelFromValueRequest {
  constructor(public value: IFormBuilderValue | null) {}
}
