import { CronJob } from "../../quirrel/CronJob";

const job = CronJob("0 * * * 0", async () => {
  console.log("Work work work");
});

export default job;
