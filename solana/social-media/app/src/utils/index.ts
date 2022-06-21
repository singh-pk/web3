export function getOrderedListByTimestamp(obj: any) {
  return obj.sort((a: any, b: any) => b.timestamp - a.timestamp);
}
