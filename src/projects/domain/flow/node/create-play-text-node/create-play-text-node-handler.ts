import { Injectable } from '@angular/core';
import { FormBuilderControlType } from '../../../../types/form-builder-control-type';
import { NodeType } from '../../../../types/node-type';
import { INodeModel } from '../../interface/i-node-model';
import { CreatePlayTextNodeRequest } from './create-play-text-node-request';

@Injectable({
  providedIn: 'root',
})
export class CreatePlayTextNodeHandler {
  handle(request: CreatePlayTextNodeRequest): INodeModel {
    return {
      key: crypto.randomUUID(),

      input: `${crypto.randomUUID()}_input`,

      outputs: [
        {
          key: crypto.randomUUID(),
          name: `出力`,
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
                key: crypto.randomUUID(),

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
