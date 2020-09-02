export function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

export function isPresent(obj, prop) {
  return (
    typeof obj === "object" &&
    obj !== null &&
    prop in obj &&
    obj[prop] !== undefined
  );
}
