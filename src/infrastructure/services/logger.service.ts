import { LoggerService } from '@nestjs/common';
import * as fse from 'fs-extra';

export class CustomLoggerService {
  log(message: string) {
    const date = new Date();
    fse.appendFileSync('../../../applog.log', `${date}: ${message}\n`);
  }
}
