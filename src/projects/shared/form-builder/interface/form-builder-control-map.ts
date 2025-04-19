import { Type } from '@angular/core';
import { FormBuilderControlType } from '../../../types/form-builder-control-type';
import { IMap } from './i-map';
import { InputControlPresentational } from '../controls/input/input-control.presentational';
import { OutputsSelectControlPresentational } from '../controls/outputs-select/outputs-select-control.presentational';
import { TextareaControlPresentational } from '../controls/textarea/textarea-control.presentational';

export const FORM_BUILDER_CONTROL_MAP: IMap<Type<any>> = {
  [FormBuilderControlType.INPUT]: InputControlPresentational,
  [FormBuilderControlType.OUTPUTS_SELECT]: OutputsSelectControlPresentational,
  [FormBuilderControlType.TEXTAREA]: TextareaControlPresentational,
};
