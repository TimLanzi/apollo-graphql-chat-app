import { groupBy, map } from "lodash";
import { startOfDay, startOfMinute } from "date-fns";

/**
 * Groups messages by day
 * @param arr Array of messages to be grouped by day
 */
export function groupByDay(arr: any[]) {
  const grouped = groupBy(arr, item => startOfDay(new Date(item.timestamp)));
  return map(grouped, (group, day) => ({
    day,
    messages: group
  }))
}

/**
 * Groups and sorts messages by minute sent and by the user who sent them
 * @param arr Array of messages to be grouped and sorted appropriately
 */
export function groupAndSort(arr: any[]) {
  const sorted = arr.sort((a, b) => a.timestamp < b.timestamp ? -1 : 1);
  const res = [];

  for (const item of sorted) {
    if (res.length <= 0) {
      res.push({
        sender: item.sender.id,
        minute: startOfMinute(new Date(item.timestamp)).toString(),
        messages: [item],
      });
      continue;
    }

    const last = res[res.length - 1];

    if ((item.sender.id === last.sender) && (startOfMinute(new Date(item.timestamp)).toString() === last.minute)) {
      last.messages.push(item);
    } else {
      res.push({
        sender: item.sender.id,
        minute: startOfMinute(new Date(item.timestamp)).toString(),
        messages: [item],
      });
    }
  }

  return res;
}