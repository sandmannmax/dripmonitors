export class RunningTrackerService {
  private static running: Array<string> = [];

  public static Start(id: string): boolean {
    if (RunningTrackerService.running.findIndex(item => item === id) === -1) {
      RunningTrackerService.running.push(id);
      return true;
    } else
      return false;
  }

  public static Stop(id: string) {
    let index = RunningTrackerService.running.findIndex(item => item === id);
    if (index != -1)
      RunningTrackerService.running.splice(index, 1);
  }
}