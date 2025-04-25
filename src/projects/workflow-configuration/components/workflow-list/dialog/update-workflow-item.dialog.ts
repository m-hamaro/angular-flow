import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { IEntitySummary } from '../../../../shared/form-builder/interface/i-entity-summary';
import {
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormBuilderDirective } from '../../../../shared/form-builder/form-builder.directive';
import { FormBuilderControlType } from '../../../../types/form-builder-control-type';
import { IFormBuilderValue } from '../../../../shared/form-builder/interface/external-value/i-form-builder-value';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'update-workflow-item-dialog',
  templateUrl: 'update-workflow-item.dialog.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormBuilderDirective,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormBuilderDirective),
      multi: true,
    },
  ],
})
export class UpdateWorkflowItemDialog {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly data: IEntitySummary<string> = inject(MAT_DIALOG_DATA);

  readonly formData: IFormBuilderValue = {
    groups: [
      {
        name: 'name',
        controls: [
          {
            key: 'name',
            name: 'name',
            type: FormBuilderControlType.INPUT,
            value: this.data.name,
            validators: [Validators.required],
          },
        ],
      },
    ],
  };
  form = new FormControl(this.formData);

  formGroup = this.fb.group({
    name: this.form,
  });

  ngOnInit() {
    console.log(this.form);
  }
}
