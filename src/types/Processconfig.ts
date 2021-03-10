import { Processconfig } from "../models/Processconfig";
import { GetPipeelements_O, Pipeelement_O } from "./Pipeelement";

export class Processconfig_O {
  public id!: string;
  public pipe!: Array<Pipeelement_O>;
  public hasConstant!: boolean;
  public constant!: boolean;
}

export function GetProcessconfig_O(processconfig: Processconfig): Processconfig_O {
  let processconfig_O: Processconfig_O = new Processconfig_O();
  processconfig_O.id = processconfig.id;
  if (processconfig.pipeelements)
    processconfig_O.pipe = GetPipeelements_O(processconfig.pipeelements);
  processconfig_O.hasConstant = processconfig.hasConstant;
  processconfig_O.constant = processconfig.constant;
  return processconfig_O;
}

export function GetProcessconfigs_O(processconfigs: Processconfig[]): Processconfig_O[] {
  let processconfigs_O = new Array<Processconfig_O>();
  for (let i = 0; i < processconfigs.length; i++) {
    processconfigs_O.push(GetProcessconfig_O(processconfigs[i]));
  }
  return processconfigs_O;
}