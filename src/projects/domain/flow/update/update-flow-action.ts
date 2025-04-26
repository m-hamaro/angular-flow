export class UpdateFlowAction {
  public static readonly type = '[Flow] Update';

  constructor(
    public key: string,

    public name: string
  ) {}
}
