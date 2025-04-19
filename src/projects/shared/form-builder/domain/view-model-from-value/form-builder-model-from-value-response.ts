import { FormGroup } from '@angular/forms';
import { IBuilderValueGroupViewModel } from '../../interface/i-builder-value-group-view-model';

export class FormBuilderModelFromValueResponse {
  constructor(
    public groups: IBuilderValueGroupViewModel[],
    public form: FormGroup
  ) {}
}
