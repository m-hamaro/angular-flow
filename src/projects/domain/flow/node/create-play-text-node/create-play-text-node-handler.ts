import { Injectable } from '@angular/core';
import { FormBuilderControlType } from '../../../../types/form-builder-control-type';
import { NodeType } from '../../../../types/node-type';
import { INodeModel } from '../../interface/i-node-model';
import { CreatePlayTextNodeRequest } from './create-play-text-node-request';
import { v7 as uuidv7 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CreatePlayTextNodeHandler {
  handle(request: CreatePlayTextNodeRequest): INodeModel {
    return {
      key: uuidv7(),

      input: `${uuidv7()}_input`,

      outputs: [
        {
          key: uuidv7(),
          name: `質問文`,
        },
      ],

      position: request.position,

      type: NodeType.PlayText,

      value: {
        groups: [
          {
            name: `質問内容`,

            controls: [
              {
                key: uuidv7(),

                name: `ここに内容を入力`,

                type: FormBuilderControlType.TEXTAREA,

                value: ``,
              },
            ],
          },
        ],
      },
    };
  }
}
