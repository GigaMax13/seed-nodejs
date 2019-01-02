import { CronJob } from 'cron';
import { Logger } from '../helpers/Logger';

const workers = {};

class Cron {
  static add(id, time, worker, start = false) {
    if (!id || id.constructor !== String) {
      throw new Error('Cron: The id must be a string.');
    }

    if (!time || [String, Date].indexOf(time.constructor) < 0) {
      throw new Error('Cron: The time must be a string or a Date object.');
    }

    if (!worker || worker.constructor !== Function) {
      throw new Error('Cron: worker must be a function.');
    }

    const key = id.toLowerCase();
    if (workers[key] !== undefined) {
      throw new Error(`Cron: id ${id} already exists, the cron id must be a unique.`);
    }

    workers[key] = new CronJob(time, worker, () => {
      Logger.info(`Worker stopped the job ${key}.`);
    }, start, 'Etc/UTC');

    Logger.info(`Worker added the job ${key}.`);

    return this.get(key);
  }

  static get(id) {
    if (!id || id.constructor !== String) {
      throw new Error('Cron: id must be a string.');
    }

    const key = id.toLowerCase();
    if (workers[key]) {
      return workers[key];
    }

    return null;
  }

  static start(id) {
    if (id && id.constructor === String) {
      const key = id.toLowerCase();

      if (this.status(key) === false) {
        Logger.info(`Worker started the job ${key}.`);

        workers[key].start();
      }
    } else {
      Object.keys(workers).forEach((key) => {
        Logger.info(`Worker started the job ${key}.`);

        workers[key].start();
      });
    }
  }

  static stop(id) {
    if (id && id.constructor === String) {
      const key = id.toLowerCase();

      if (this.status(key)) {
        workers[key].stop();
      }
    } else {
      Object.keys(workers).forEach(key => workers[key].stop());
    }
  }

  static status(id) {
    if (id && id.constructor === String) {
      const key = id.toLowerCase();

      if (workers[key]) {
        return workers[key].running === true;
      }

      return undefined;
    }

    let status = {};

    Object.keys(workers).forEach((key) => {
      status = {
        ...status,
        [key]: {
          running: workers[key].running === true,
        },
      };
    });

    return status;
  }

  static remove(id) {
    if (id && id.constructor === String) {
      const key = id.toLowerCase();
      if (workers[key]) {
        this.stop(key);

        delete workers[key];

        Logger.info(`Worker removed the job ${key}.`);
      }
    }
  }
}

export { Cron };
