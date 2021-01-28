import { Service } from 'typedi';
import { MonitorModel } from '../models/Monitor';
import { IResult } from '../types/IResult';
import { Queue } from 'bull';
import { logger } from '../logger';

@Service()
export class MonitorService {
  private queue: Queue;

  constructor(queue: Queue) {
    this.queue = queue;
  }

  async GetMonitors(): Promise<IResult> {
    try {  
      let results = [];
      let monitors = await MonitorModel.GetMonitors();
      for (let i = 0; i < monitors.length; i++) {
        let result = { monitor: undefined, jobs: undefined };
        result.monitor = monitors[i];
        result.jobs = await MonitorModel.GetMonitorJob({ monitorId: monitors[i]._id.toString() });
        results.push(result);
      }
      return {success: true, data: {monitors: results}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async CreateJob({ monitorId, interval }: { monitorId: string, interval: number }): Promise<IResult> {
    try {
      let result = await MonitorModel.GetMonitor({ _id: monitorId });

      if (result.length == 0)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};
      
      if (result.length > 1)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.CreateJob: Found more than one monitor with monitorId = ${monitorId}`}};
      
      let monitor = result[0];

      const monitorJobs = await MonitorModel.GetMonitorJob({ monitorId });

      if (monitorJobs.length > 0) {
        for (let i = 0; i < monitorJobs.length; i++) {
          
          await this.queue.removeRepeatableByKey(monitorJobs[i].key);
          await MonitorModel.DeleteMonitorJob({ monitorId, key: monitorJobs[i].key });
        }
      }
      
      await this.queue.add(monitor.page, null, {repeat: {every: interval * 1000}});
      const monitorJob = await MonitorModel.InsertMonitorJob({ monitorId: monitorId, key: `${monitor.page}:::${interval * 1000}`, interval });
      
      return {success: true, data: {job: monitorJob}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async DeleteJob({ monitorId }: { monitorId: string }): Promise<IResult> {
    try {
      const monitorJob = await MonitorModel.GetMonitorJob({ monitorId });

      if (monitorJob.length == 0)
        return {success: false, error: {status: 404, message: 'Job is not existing.'}};
      
      if (monitorJob.length > 1)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.DisableJob: Found more than one job with monitorId = ${monitorId}`}};
      
      let job = monitorJob[0];

      await this.queue.removeRepeatableByKey(job.key);
      await MonitorModel.DeleteMonitorJob({ monitorId, key: job.key });
      
      return {success: true, data: {message: 'Successfully deleted Job'}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }
}