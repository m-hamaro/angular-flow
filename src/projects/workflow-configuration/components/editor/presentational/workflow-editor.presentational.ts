import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Injector,
  input,
  OnDestroy,
  OnInit,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  distinctUntilChanged,
  filter,
  map,
  merge,
  Observable,
  startWith,
  Subject,
  Subscription,
} from 'rxjs';
import { IFlowViewModel } from '../../../interface/i-flow-view-model';
import {
  EFConnectableSide,
  EFConnectionBehavior,
  EFConnectionType,
  EFMarkerType,
  FCanvasComponent,
  FCreateConnectionEvent,
  FCreateNodeEvent,
  FFlowComponent,
  FFlowModule,
  FReassignConnectionEvent,
  FZoomDirective,
} from '@foblex/flow';
import {
  A,
  BACKSPACE,
  DASH,
  DELETE,
  NUMPAD_MINUS,
  NUMPAD_PLUS,
} from '@angular/cdk/keycodes';
import { BulkRemoveHandler } from '../../../domain/bulk-remove/bulk-remove-handler';
import { BulkRemoveRequest } from '../../../domain/bulk-remove/bulk-remove-request';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IPoint } from '../../../../shared/form-builder/interface/i-point';
import { DetailsFlowHandler } from '../../../domain/details/details-flow-handler';
import { DetailsFlowRequest } from '../../../domain/details/details-flow-request';
import { INodeViewModel } from '../../../interface/i-node-view-model';
import { ChangeNodePositionAction } from '../../../../domain/flow/node/change-position/change-node-position-action';
import { CreateConnectionHandler } from '../../../domain/connection/create-connection/create-connection-handler';
import { CreateConnectionRequest } from '../../../domain/connection/create-connection/create-connection-request';
import { CreateNodeAction } from '../../../../domain/flow/node/create/create-node-action';
import { WorkflowActionPanelPresentational } from '../action-panel/workflow-action-panel.presentational';
import { WorkflowPalettePresentational } from '../palette/workflow-palette.presentational';
import { FlowActionPanelEventType } from '../../../../types/flow-action-panel-event-type';
import { FormsModule } from '@angular/forms';

import { WorkflowNodePresentational } from '../node/workflow-node.presentational';
import { INodeValueModel } from '../../../../domain/flow/interface/i-node-value-model';
import { IFlowModel } from '../../../../domain/flow/interface/i-flow-model';
import { ChangeNodeHandler } from '../../../domain/node/change/change-node-handler';
import { ChangeNodeRequest } from '../../../domain/node/change/change-node-request';
import { ReassignConnectionHandler } from '../../../domain/connection/reassign-connection/reassign-connection-handler';
import { ReassignConnectionRequest } from '../../../domain/connection/reassign-connection/reassign-connection-request';
import { CreateConnectionAction } from '../../../../domain/flow/create-connection/create-connection-action';
import { ChangeNodeAction } from '../../../../domain/flow/node/change/change-node-action';
import { BulkRemoveItemsAction } from '../../../../domain/flow/bulk-remove-items/bulk-remove-items-action';

@Component({
  selector: 'workflow-editor-presentational',
  styleUrls: ['workflow-editor.presentational.scss'],
  templateUrl: 'workflow-editor.presentational.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FFlowModule,
    WorkflowNodePresentational,
    WorkflowActionPanelPresentational,
    WorkflowPalettePresentational,
    FormsModule,
  ],
  host: {
    '(keydown)': 'onKeyDown($event)',
    tabindex: '-1',
  },
})
export class WorkflowEditorPresentational
  implements OnInit, AfterViewInit, OnDestroy
{
  private subscription$: Subscription = new Subscription();

  private hasChanges$: Subject<void> = new Subject<void>();

  private readonly injector = inject(Injector);

  private readonly router = inject(Router);

  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly cd = inject(ChangeDetectorRef);

  flows = input<IFlowModel[]>([]);

  viewModel = signal<IFlowViewModel | undefined>(undefined);

  cBehavior = signal<EFConnectionBehavior>(EFConnectionBehavior.FIXED);

  cType = signal<EFConnectionType>(EFConnectionType.SEGMENT);

  fFlowComponent = viewChild(FFlowComponent);

  fCanvasComponent = viewChild(FCanvasComponent);

  fZoomDirective = viewChild.required(FZoomDirective);

  readonly eMarkerType = EFMarkerType;

  readonly eConnectableSide = EFConnectableSide;

  createNode = output<CreateNodeAction>();

  changeNodePosition = output<ChangeNodePositionAction>();

  createConnection = output<CreateConnectionAction>();

  changeNodeAction = output<ChangeNodeAction>();

  removeConnectionAction = output<BulkRemoveItemsAction>();

  ngOnInit(): void {
    this.subscription$.add(this.subscriptionReloadEvents());
  }

  ngAfterViewInit(): void {
    this.onLoaded();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  onLoaded(): void {
    const point: IPoint = {
      x: 300,
      y: 300,
    };

    this.fCanvasComponent()?.fitToScreen(point, false);
  }

  onCreateNode(event: FCreateNodeEvent): void {
    const viewModel = this.viewModel();

    if (!viewModel) {
      return;
    }

    const createAction = new CreateNodeAction(
      viewModel.key,
      event.data,
      event.rect
    );

    this.createNode.emit(createAction);

    this.hasChanges$.next();
  }

  onNodePositionChanged(point: IPoint, node: INodeViewModel): void {
    node.position = point;
    const changeAction = new ChangeNodePositionAction(
      this.viewModel()!.key,
      node.key,
      point
    );

    this.changeNodePosition.emit(changeAction);
  }

  onCreateConnection(event: FCreateConnectionEvent): void {
    if (!event.fInputId) {
      return;
    }

    const view = this.injector
      .get(CreateConnectionHandler)
      .handle(
        new CreateConnectionRequest(
          this.viewModel()!,
          event.fOutputId,
          event.fInputId
        )
      );
    this.viewModel.set(view.flow);

    this.createConnection.emit(view.action);

    // TODO
    // this.cd.detectChanges();
  }

  onActionPanelEvent(event: FlowActionPanelEventType): void {
    switch (event) {
      case FlowActionPanelEventType.TEST_CALL:
        // TODO
        break;

      case FlowActionPanelEventType.DELETE_SELECTED:
        this.onRemoveItems();
        break;

      case FlowActionPanelEventType.SELECT_ALL:
        this.fFlowComponent()?.selectAll();
        break;

      case FlowActionPanelEventType.ZOOM_IN:
        this.fZoomDirective().zoomIn();
        break;

      case FlowActionPanelEventType.ZOOM_OUT:
        this.fZoomDirective().zoomOut();
        break;

      case FlowActionPanelEventType.FIT_TO_SCREEN:
        this.fCanvasComponent()?.fitToScreen();
        break;

      case FlowActionPanelEventType.ONE_TO_ONE:
        this.fCanvasComponent()?.resetScaleAndCenter();
        break;
    }
  }

  onReassignConnection(event: FReassignConnectionEvent): void {
    if (!event.newFInputId || !this.viewModel()) {
      return;
    }

    const view = this.injector
      .get(ReassignConnectionHandler)
      .handle(
        new ReassignConnectionRequest(
          this.viewModel()!,
          event.fOutputId,
          event.oldFInputId,
          event.newFInputId
        )
      );

    this.viewModel.set(view);
  }

  onRemoveConnection(outputKey: string): void {
    const connection = this.viewModel()?.connections?.find(
      (x) => x.from === outputKey
    );

    if (!connection) {
      return;
    }

    const view = this.injector
      .get(BulkRemoveHandler)
      .handle(new BulkRemoveRequest(this.viewModel()!, [], [connection.key]));

    this.viewModel.set(view.flow);

    this.removeConnectionAction.emit(view.action);
  }

  onValueChanged(node: INodeViewModel, value: INodeValueModel): void {
    const selected = this.fFlowComponent()?.getSelection();

    if (!selected) {
      return;
    }

    node.value = value;

    const view = this.injector
      .get(ChangeNodeHandler)
      .handle(new ChangeNodeRequest(this.viewModel()!, node));

    this.viewModel.set(view.flow);

    this.changeNodeAction.emit(view.action);

    this.cd.detectChanges();

    // TODO setTimeOut
    setTimeout(() => {
      this.fFlowComponent()?.select(selected.fNodeIds, selected.fConnectionIds);
    });
  }

  onRemoveItems(): void {
    const selection = this.fFlowComponent()?.getSelection();

    if (!selection || !this.viewModel()) {
      return;
    }

    const view = this.injector
      .get(BulkRemoveHandler)
      .handle(
        new BulkRemoveRequest(
          this.viewModel()!,
          selection.fNodeIds,
          selection.fConnectionIds
        )
      );
    this.viewModel.set(view.flow);

    this.removeConnectionAction.emit(view.action);

    // TODO いるかも
    // this.cd.detectChanges();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
    ) {
      return;
    }
    const keyCodeNumber = Number(event.code);

    if (isNaN(keyCodeNumber)) {
      return;
    }

    switch (keyCodeNumber) {
      case BACKSPACE:
      case DELETE:
        this.onRemoveItems();
        break;

      case NUMPAD_PLUS:
        // TODO MACの場合の判定がいる？
        this.fZoomDirective().zoomIn();
        break;

      case NUMPAD_MINUS:
      case DASH:
        // TODO MACの場合の判定がいる？
        this.fZoomDirective().zoomOut();
        break;

      case A:
        // TODO MACの場合の判定がいる？
        this.fFlowComponent()?.selectAll();
        break;
    }
  }

  private get routeKeyChanges(): Observable<boolean> {
    return this.router.events.pipe(
      startWith(new NavigationEnd(0, '', '')),
      filter((x) => x instanceof NavigationEnd),
      map(() => this.activatedRoute.snapshot.params['key']),
      distinctUntilChanged(),
      map(() => true)
    );
  }

  private subscriptionReloadEvents(): Subscription {
    return merge(this.hasChanges$, this.routeKeyChanges).subscribe((res) => {
      const key = this.activatedRoute.snapshot.params['key'];

      try {
        const view = this.injector
          .get(DetailsFlowHandler)
          .handle(this.flows(), new DetailsFlowRequest(key));

        this.viewModel.set(view);
      } catch (e) {
        console.error(e);
        this.viewModel.set(undefined);
      }

      if (res) {
        this.fFlowComponent()?.reset();
      }

      this.cd.detectChanges();
    });
  }
}
