import { CronJob } from 'cron';
const MID_NIGHT = '0 0 * * *';
/**
 * @class Cron
 */
export default class Cron {
    private static cronJob(): void {
        new CronJob(MID_NIGHT, (): void => {
            console.log("Running cron")
        },
            null,
            true);
         }

    // // init
    static init(): void {
        Cron.cronJob();
    }
}
