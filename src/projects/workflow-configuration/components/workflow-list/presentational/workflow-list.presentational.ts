import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { filter, of, startWith, Subscription, switchMap } from 'rxjs';
import { IEntitySummary } from '../../../../shared/form-builder/interface/i-entity-summary';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { CreateFlowAction } from '../../../../domain/flow/create/create-flow-action';
import { IconButtonPresentational } from '../../../../shared/icon-button/icon-button.presentational';
import { AsyncPipe } from '@angular/common';
import { RemoveFlowAction } from '../../../../domain/flow/remove/remove-flow-action';

const entityName = 'flow';

@Component({
  selector: 'workflow-list-presentational',
  styleUrls: ['workflow-list.presentational.scss'],
  templateUrl: 'workflow-list.presentational.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    IconButtonPresentational,
  ],
})
export class WorkflowListPresentational implements OnInit, OnDestroy {
  private subscription$: Subscription = new Subscription();

  searchControl = signal<FormControl>(new FormControl(''));

  entities = signal<IEntitySummary<string>[]>([]);

  entities$ = this.searchControl().valueChanges.pipe(
    startWith(''),
    switchMap((search) => {
      return of(
        this.entities().filter((entity) =>
          entity.name.toLowerCase().includes(search?.toLowerCase() || '')
        )
      );
    })
  );

  private readonly router = inject(Router);

  onCreateFlow = output<CreateFlowAction>();

  onRemoveFlow = output<RemoveFlowAction>();

  ngOnInit(): void {
    this.subscription$.add(this.subscribeOnRouteChanges());
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  onCreate(): void {
    const key = crypto.randomUUID();

    const action = new CreateFlowAction(key, entityName + Date.now(), []);

    this.onCreateFlow.emit(action);
  }

  onDelete(entity: IEntitySummary<string>, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const action = new RemoveFlowAction(entity.key);

    this.onRemoveFlow.emit(action);
  }

  private subscribeOnRouteChanges(): Subscription {
    return this.router.events
      .pipe(
        startWith(new NavigationEnd(1, '', '')),
        filter((x) => x instanceof NavigationEnd)
      )
      .subscribe(() => {
        const isFlowKey: boolean =
          this.router.url.split('/').pop()?.toLowerCase() !== entityName;

        if (!isFlowKey) {
          this.toDefaultFlow();
        } else {
          this.filterEntities();
        }
      });
  }

  private toDefaultFlow(): void {
    if (this.entities().length > 0) {
      this.navigateToEntity(this.entities()[0].key);
    }
  }

  private filterEntities(): void {
    this.searchControl()?.setValue(this.searchControl()?.value);
  }

  private navigateToEntity(key: string): void {
    this.router.navigateByUrl(`/${entityName}/${key}`);
  }
}
