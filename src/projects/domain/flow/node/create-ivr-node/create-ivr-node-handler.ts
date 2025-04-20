import { Injectable } from '@angular/core';
import { INodeModel } from '../../interface/i-node-model';
import { CreateIvrNodeRequest } from './create-ivr-node-request';
import { NodeType } from '../../../../types/node-type';
import { FormBuilderControlType } from '../../../../types/form-builder-control-type';

@Injectable({
  providedIn: 'root',
})
export class CreateIvrNodeHandler {
  public handle(request: CreateIvrNodeRequest): INodeModel {
    return {
      key: crypto.randomUUID(),
      description: 'Input Caller Lookup',
      input: crypto.randomUUID() + '_input',
      outputs: [
        {
          key: crypto.randomUUID(),
          name: 'Output 1',
        },
        {
          key: crypto.randomUUID(),
          name: 'Output 2',
        },
        {
          key: crypto.randomUUID(),
          name: 'Output 3',
        },
      ],
      position: request.position,
      type: NodeType.UserInput,
      value: {
        groups: [
          {
            name: 'Select Number of Outputs',
            controls: [
              {
                key: crypto.randomUUID(),
                name: 'Outputs',
                type: FormBuilderControlType.OUTPUTS_SELECT,
                value: 3,
              },
            ],
          },
        ],
      },
    };
  }
}
