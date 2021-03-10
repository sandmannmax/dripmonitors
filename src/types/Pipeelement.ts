import { Pipeelement } from "../models/Pipeelement";

export class Pipeelement_O {
  public id!: string;
  public command!: string;
  public order!: number;
}

export function GetPipeelement_O(pipeelement: Pipeelement): Pipeelement_O {
  let pipeelement_O: Pipeelement_O = new Pipeelement_O();
  pipeelement_O.id = pipeelement.id;
  pipeelement_O.command = pipeelement.command;
  pipeelement_O.order = pipeelement.order;
  return pipeelement_O;
}

export function GetPipeelements_O(pipeelements: Pipeelement[]): Pipeelement_O[] {
  let pipes_O = new Array<Pipeelement_O>();
  for (let i = 0; i < pipeelements.length; i++) {
    pipes_O.push(GetPipeelement_O(pipeelements[i]));
  }
  return pipes_O;
}