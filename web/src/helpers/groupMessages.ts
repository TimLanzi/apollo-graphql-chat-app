import { groupBy, map} from "lodash";
import { startOfDay, startOfMinute } from "date-fns";

export function groupByDay(arr: any[]) {
  const grouped = groupBy(arr, item => startOfDay(new Date(item.timestamp)));
  return map(grouped, (group, day) => ({
    day,
    messages: group
  }))
}

export function groupByUser(arr: any[]) {
  const grouped = groupBy(arr, item => item.sender.id);
  return map(grouped, (group, sender) => ({
    sender,
    messages: group,
  }));
}

export function groupByMinute(arr: any[]) {
  const grouped = groupBy(arr, item => startOfMinute(new Date(item.timestamp)));
  return map(grouped, (group, minute) => ({
    minute,
    messages: group
  }))
}