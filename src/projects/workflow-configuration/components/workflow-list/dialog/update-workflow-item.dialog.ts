import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Inject,
  inject,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { IEntitySummary } from '../../../../shared/form-builder/interface/i-entity-summary';
import {
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormBuilderDirective } from '../../../../shared/form-builder/form-builder.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface UpdateWorkFlowItemForm {
  name: string;
}

@Component({
  selector: 'update-workflow-item-dialog',
  styleUrls: ['update-workflow-item.dialog.scss'],
  templateUrl: 'update-workflow-item.dialog.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
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
export class UpdateWorkflowItemDialog implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);

  formGroup!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: IEntitySummary<string>
  ) {
    this.formGroup = this.fb.group({
      name: [this.data.name, [Validators.required]],
    });
  }

  ngOnInit(): void {}
}
