import { formatTime } from "./formatTime";

export const logError = (info?: string | Object) => {
  const time = formatTime(new Date());
  if (!info) {
    info = "empty";
  }
  if (typeof info === "object") {
    info = JSON.stringify(info);
  }
  console.error(time, info);
};
