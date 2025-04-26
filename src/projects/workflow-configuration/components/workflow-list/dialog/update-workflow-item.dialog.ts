import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { IEntitySummary } from '../../../../shared/form-builder/interface/i-entity-summary';
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
})
export class UpdateWorkflowItemDialog {
  private readonly fb = inject(NonNullableFormBuilder);

  formGroup!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpdateWorkflowItemDialog>,

    @Inject(MAT_DIALOG_DATA)
    public data: IEntitySummary<string>
  ) {
    this.formGroup = this.fb.group({
      name: [this.data.name, [Validators.required]],
    });
  }

  onChangeFlow() {
    const key = this.data.key;

    const newName = this.formGroup.get('name')?.value;

    if (!key || !newName) {
      return;
    }

    const updateData: IEntitySummary<string> = {
      key: key,
      name: newName,
    };

    this.dialogRef.close(updateData);
  }
}
