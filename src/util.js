export function remove (arr, item) {
  arr.splice(arr.findIndex(v => v === item), 1);
}