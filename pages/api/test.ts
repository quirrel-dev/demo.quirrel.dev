import { CronJob } from "../../quirrel/CronJob";

export default CronJob("0 * * * 0", async () => {
  console.log("Work work work");
});
