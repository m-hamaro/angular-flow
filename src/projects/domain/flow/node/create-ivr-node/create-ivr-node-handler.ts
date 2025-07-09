import { Injectable } from '@angular/core';
import { INodeModel } from '../../interface/i-node-model';
import { CreateIvrNodeRequest } from './create-ivr-node-request';
import { NodeType } from '../../../../types/node-type';
import { FormBuilderControlType } from '../../../../types/form-builder-control-type';
import { v7 as uuidv7 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CreateIvrNodeHandler {
  public handle(request: CreateIvrNodeRequest): INodeModel {
    return {
      key: uuidv7(),
      description: 'Input Caller Lookup',
      input: uuidv7() + '_input',
      outputs: [
        {
          key: uuidv7(),
          name: 'Output 1',
        },
        {
          key: uuidv7(),
          name: 'Output 2',
        },
        {
          key: uuidv7(),
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
                key: uuidv7(),
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
