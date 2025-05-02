import {
  Directive,
  forwardRef,
  inject,
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
  private subscription$: Subscription = Subscription.EMPTY;

  // ControlValueAccessor からの値を受け取るための内部 Signal
  private readonly $internalValue = signal<IFormBuilderValue | null>(null);

  private readonly $viewModel = signal<IBuilderValueViewModel | null>(null);

  private readonly container = inject(ViewContainerRef);

  // --- ControlValueAccessor の実装 ---
  writeValue(value: IFormBuilderValue | null): void {
    // 値が実際に変更された場合のみ更新と再構築を行う
    if (value !== this.$internalValue()) {
      this.$internalValue.set(value);
      // 値が外部から設定されたときに UI を再構築する
      this.rebuild(value);
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  // setDisabledState?(isDisabled: boolean): void { // 必要に応じて実装 }

  ngOnInit(): void {
    // 初期値で一度 rebuild する（writeValue が呼ばれていればその値が使われる）
    // this.rebuild(this.$internalValue()); // writeValue で rebuild するので、必須ではないかもしれない
    // ただし、初期値が null で writeValue が呼ばれないケースを考慮すると
    // ここで呼ぶか、writeValue で null でも初回描画を保証する必要がある
    // writeValue で常に rebuild するならここは不要
  }

  ngOnDestroy(): void {
    this.dispose();
    this.subscription$.unsubscribe();
  }

  /**
   * コンテナの状態をクリアする
   */
  public dispose(): void {
    this.container.clear();
  }

  private onChange: (value: IFormBuilderValue | null) => void = () => {};
  private onTouch: () => void = () => {};

  private rebuild(value: IFormBuilderValue | null): void {
    // 以前の unsubscribe 処理は subscribeOnFormChanges 前に行う
    this.subscription$.unsubscribe();
    this.dispose(); // コンテナをクリア

    // value が null や undefined の場合、空のフォームを表示するなどの処理が必要
    if (value === null || value === undefined) {
      this.$viewModel.set(null); // ViewModel もリセット
      // 必要なら空の状態を描画する処理
      this.subscription$ = Subscription.EMPTY; // サブスクリプションも空にする
      return; // null の場合はここで終了
    }

    const viewModel = new FormBuilderModelFromValueHandler().handle(
      new FormBuilderModelFromValueRequest(value)
    );

    this.$viewModel.set(viewModel);

    if (viewModel && viewModel.form) {
      // viewModel と form が存在するか確認
      this.subscription$ = this.subscribeOnFormChanges(viewModel);
      this.render(viewModel.groups);
    } else {
      this.subscription$ = Subscription.EMPTY; // サブスクリプションを空にする
    }
  }

  private render(groups: IBuilderValueGroupViewModel[] | undefined): void {
    // this.dispose(); // rebuild の最初で呼ばれるのでここでは不要かも
    if (!groups) return; // groups がない場合は描画しない

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
    // valueChanges は form が生成されてから購読する
    return viewModel.form.valueChanges.subscribe(() => {
      // viewModel.form の現在の値から IFormBuilderValue を再計算する必要がある場合が多い
      // ValueToFormValueHandler が viewModel.form.value を使って変換すると仮定
      const updatedValue = new ValueToFormValueHandler().handle(
        new ValueToFormValueRequest(viewModel) // viewModel (内部の form を含む) を渡す
      );

      // 変更をフォームコントロールに通知
      this.onChange(updatedValue);
      this.onTouch();
    });
  }
}
