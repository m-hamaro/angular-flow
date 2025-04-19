import {
  Directive,
  effect,
  forwardRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IFormBuilderValue } from './interface/external-value/i-form-builder-value';
import { FormBuilderModelFromValueHandler } from './domain/view-model-from-value/form-builder-model-from-value-handler';
import { FormBuilderModelFromValueRequest } from './domain/view-model-from-value/form-builder-model-from-value-request';
import { IBuilderValueViewModel } from './interface/i-builder-value-view-model';
import { ValueToFormValueHandler } from './domain/value-to-form-value/value-to-form-value-handler';
import { ValueToFormValueRequest } from './domain/value-to-form-value/value-to-form-value-request';
import { IBuilderValueGroupViewModel } from './interface/i-builder-value-group-view-model';
import { GroupControlPresentational } from './controls/group/group-control-presentational';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[formBuilder]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormBuilderDirective),
      multi: true,
    },
  ],
})
export class FormBuilderDirective
  implements OnInit, OnDestroy, ControlValueAccessor
{
  private subscription: Subscription = Subscription.EMPTY;

  private readonly $value = signal<IFormBuilderValue | null>(null);

  private readonly $viewModel = signal<IBuilderValueViewModel | null>(null);

  private readonly container = inject(ViewContainerRef);

  value = input<IFormBuilderValue | null>(null);

  constructor() {
    effect(() => {
      if (this.value() !== this.$value()) {
        this.$value.set(this.value());
      }
    });
  }

  writeValue(value: IFormBuilderValue | null): void {
    if (value !== this.$value()) {
      this.$value.set(value);
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.rebuild(this.$value());
  }

  ngOnDestroy(): void {
    this.dispose();

    this.subscription.unsubscribe();
  }

  public dispose(): void {
    this.container.clear();
  }

  private onChange: any = () => {};

  private onTouch: any = () => {};

  private rebuild(value: IFormBuilderValue | null): void {
    const viewModel = new FormBuilderModelFromValueHandler().handle(
      new FormBuilderModelFromValueRequest(value)
    );

    this.$viewModel.set(viewModel);

    this.subscription.unsubscribe();

    this.subscription = this.subscribeOnFormChanges(viewModel);

    this.render(viewModel.groups);
  }

  private render(groups: IBuilderValueGroupViewModel[]): void {
    this.dispose();
    groups.forEach((x) => {
      const groupComponent = this.container.createComponent(
        GroupControlPresentational
      );
      groupComponent.instance.render(x);
    });
  }

  private subscribeOnFormChanges(
    viewModel: IBuilderValueViewModel
  ): Subscription {
    return viewModel.form.valueChanges.subscribe(() => {
      const value = new ValueToFormValueHandler().handle(
        new ValueToFormValueRequest(viewModel)
      );

      this.onChange(value);
      this.onTouch();
    });
  }
}
