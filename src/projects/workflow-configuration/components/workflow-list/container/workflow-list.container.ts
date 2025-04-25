import { Component, computed, inject } from '@angular/core';
import { WorkflowListPresentational } from '../presentational/workflow-list.presentational';
import { CreateFlowAction } from '../../../../domain/flow/create/create-flow-action';
import { FlowUseCase } from '../../../../domain/flow/use-case/flow.use-case';
import { RemoveFlowAction } from '../../../../domain/flow/remove/remove-flow-action';
import { Router } from '@angular/router';
import { IEntitySummary } from '../../../../shared/form-builder/interface/i-entity-summary';
import { MatDialog } from '@angular/material/dialog';
import { UpdateWorkflowItemDialog } from '../dialog/update-workflow-item.dialog';

@Component({
  selector: 'workflow-list-container',
  templateUrl: 'workflow-list.container.html',
  styleUrls: ['workflow-list.container.scss'],
  standalone: true,
  imports: [WorkflowListPresentational],
})
export class WorkflowListContainer {
  private readonly router = inject(Router);

  readonly flowUseCase = inject(FlowUseCase);

  private readonly dialog = inject(MatDialog);

  private readonly flows = computed(() => this.flowUseCase.state.flows());

  onCreateFlow(action: CreateFlowAction): void {
    this.flowUseCase.create(this.flows(), action);
  }

  onRemoveFlow(action: RemoveFlowAction): void {
    this.flowUseCase.remove(this.flows(), action);

    if (this.flows().length) {
      this.router.navigateByUrl(`/flow/${this.flows()[0].key}`);
    } else {
      this.router.navigateByUrl(`/flow`);
    }
  }

  openUpdateFlowItemDialog(entity: IEntitySummary<string>) {
    this.dialog.open(UpdateWorkflowItemDialog, {
      data: entity,
    });
  }
}
