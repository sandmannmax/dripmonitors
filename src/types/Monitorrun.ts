import { Monitorrun } from "../models/Monitorrun";
import pino from 'pino'

const logger = pino();

export class Monitorrun_O {
  public id!: string;
  public success!: boolean;
  public reason!: string;
  public timeStart!: string;
  public timeEnd!: string;
}

export function GetMonitorrun_O(monitorrun: Monitorrun): Monitorrun_O {
  let monitorrunO: Monitorrun_O = new Monitorrun_O();
  monitorrunO.id = monitorrun.id;
  monitorrunO.success = monitorrun.success;
  monitorrunO.reason = monitorrun.reason;
  monitorrunO.timeStart = new Date(Number(monitorrun.timestampStart)).toLocaleString('de-DE', { timeZone: 'Europe/Berlin'})
  monitorrunO.timeEnd = new Date(Number(monitorrun.timestampEnd)).toLocaleString('de-DE', { timeZone: 'Europe/Berlin'})
  return monitorrunO;
}

export function GetMonitorruns_O(monitorruns: Monitorrun[]): Monitorrun_O[] {
  let monitorrun_O = new Array<Monitorrun_O>();
  for (let i = 0; i < monitorruns.length; i++) {
    monitorrun_O.push(GetMonitorrun_O(monitorruns[i]));
  }
  return monitorrun_O;
}