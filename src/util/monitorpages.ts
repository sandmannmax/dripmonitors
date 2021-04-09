import { NikeMonitor } from "../application/monitors/NikeMonitor";
import { INotificationService } from "../application/interface/INotificationService";
import { IProductRepo } from "../domain/repos/IProductRepo";
import { IScraperService } from "../application/interface/IScraperService";
import { SupremeMonitor } from "../application/monitors/SupremeMonitor";
import { ShopifyMonitor } from "../application/monitors/ShopifyMonitor";
import { ZalandoMonitor } from "../application/monitors/ZalandoMonitor";
import { FootlockerMonitor } from "../application/monitors/FootlockerMonitor";
import { MonitorpageSetupDTO } from "../application/dto/MonitorpageSetupDTO";
import { Uuid } from "../core/base/Uuid";
import { CountryCode } from "../domain/models/CountryCode";
import { MonitorpageName } from "../domain/models/MonitorpageName";
import { MonitorpageDisplayName } from "../domain/models/MonitorpageDisplayName";

export function MonitorpageSetup(productRepo: IProductRepo, scraperService: IScraperService, notificationService: INotificationService): MonitorpageSetupDTO[] {
  const monitorpages: MonitorpageSetupDTO[] = [];

  const nikeDeName = 'nike-de';
  const nikeDeDisplayName = 'Nike SNKRS DE';
  const nikeDeCC = 'DE';
  monitorpages.push({
    uuid: Uuid.create({ base: nikeDeName }),
    monitorpageName: MonitorpageName.create({ value: nikeDeName }),
    monitorpageDisplayName: MonitorpageDisplayName.create({ value: nikeDeDisplayName }),
    monitorpageFunctionality: new NikeMonitor(Uuid.create({ base: nikeDeName }), MonitorpageName.create({ value: nikeDeName }), productRepo, scraperService, notificationService),
    cc: CountryCode.create({ value: nikeDeCC }),
    monitorAllProducts: false,
    showMonitorpageDisplayName: false,
  });

  const supremeEuName = 'supreme-eu';
  const supremeEuDisplayName = 'Supreme EU';
  const supremeEuCC = 'DE';
  monitorpages.push({
    uuid: Uuid.create({ base: supremeEuName }),
    monitorpageName: MonitorpageName.create({ value: supremeEuName }),
    monitorpageDisplayName: MonitorpageDisplayName.create({ value: supremeEuDisplayName }),
    monitorpageFunctionality: new SupremeMonitor(Uuid.create({ base: supremeEuName }), MonitorpageName.create({ value: supremeEuName }), productRepo, scraperService, notificationService),
    cc: CountryCode.create({ value: supremeEuCC }),
    monitorAllProducts: false,
    showMonitorpageDisplayName: false,
  });

  const afewName = 'afew';
  const afewDisplayName = 'Afew';
  const afewCC = 'DE';
  monitorpages.push({
    uuid: Uuid.create({ base: afewName }),
    monitorpageName: MonitorpageName.create({ value: afewName }),
    monitorpageDisplayName: MonitorpageDisplayName.create({ value: afewDisplayName }),
    monitorpageFunctionality: new ShopifyMonitor(Uuid.create({ base: afewName }), MonitorpageName.create({ value: afewName }), productRepo, scraperService, notificationService),
    cc: CountryCode.create({ value: afewCC }),
    monitorAllProducts: true,
    showMonitorpageDisplayName: true,
  });

  const zalandoDeName = 'zalando-de';
  const zalandoDeDisplayName = 'Zalando DE';
  const zalandoDeCC = 'DE';
  monitorpages.push({
    uuid: Uuid.create({ base: zalandoDeName }),
    monitorpageName: MonitorpageName.create({ value: zalandoDeName }),
    monitorpageDisplayName: MonitorpageDisplayName.create({ value: zalandoDeDisplayName }),
    monitorpageFunctionality: new ZalandoMonitor(Uuid.create({ base: zalandoDeName }), MonitorpageName.create({ value: zalandoDeName }), productRepo, scraperService, notificationService),
    cc: CountryCode.create({ value: zalandoDeCC }),
    monitorAllProducts: false,
    showMonitorpageDisplayName: false,
  });

  const footlockerDeName = 'footlocker-de';
  const footlockerDeDisplayName = 'Footlocker DE';
  const footlockerDeCC = 'DE';
  monitorpages.push({
    uuid: Uuid.create({ base: footlockerDeName }),
    monitorpageName: MonitorpageName.create({ value: footlockerDeName }),
    monitorpageDisplayName: MonitorpageDisplayName.create({ value: footlockerDeDisplayName }),
    monitorpageFunctionality: new FootlockerMonitor(Uuid.create({ base: footlockerDeName }), MonitorpageName.create({ value: footlockerDeName }), productRepo, scraperService, notificationService),
    cc: CountryCode.create({ value: footlockerDeCC }),
    monitorAllProducts: false,
    showMonitorpageDisplayName: false,
  });

  return monitorpages;
}
