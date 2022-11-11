import config from '../config';
import { Sequelize } from 'sequelize'; 
import Container from 'typedi';
import { Setup as MonitorSetup, SetupAssociations as MonitorSetupAssociations } from '../models/Monitor';
import { Setup as MonitorpageSetup, SetupAssociations as MonitorpageSetupAssociations } from '../models/Monitorpage';
import { Setup as MonitorrunSetup, SetupAssociations as MonitorrunSetupAssociations } from '../models/Monitorrun';
import { Setup as MonitorsourceSetup, SetupAssociations as MonitorsourceSetupAssociations } from '../models/Monitorsource';
import { Setup as ProductSetup, SetupAssociations as ProductSetupAssociations } from '../models/Product';
import { Setup as ProxySetup } from '../models/Proxy';
import { Setup as RoleSetup } from '../models/Role';
import { Setup as SizeSetup } from '../models/Size';
import { Setup as UrlSetup } from '../models/Url';
import pino from 'pino';
import { Setup as AccesskeySetup } from '../models/Accesskey';

const logger = pino();

export async function DatabaseSetup() {
  let connection = new Sequelize(`postgres://${config.postgresUser}:${config.postgresPassword}@${config.postgresHost}:${config.postgresPort}/${config.postgresDb}`, {
    logging: false
  });
  await connection.authenticate();
  logger.info('Database connection established.');
  Container.set('dbConnection', connection);

  MonitorSetup();
  MonitorpageSetup();
  MonitorrunSetup();
  MonitorsourceSetup();
  ProductSetup();
  ProxySetup();
  RoleSetup();
  SizeSetup();
  UrlSetup();
  AccesskeySetup();

  MonitorSetupAssociations();
  MonitorpageSetupAssociations();
  MonitorrunSetupAssociations();
  MonitorsourceSetupAssociations();
  ProductSetupAssociations();
}