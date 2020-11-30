export function getSlot(slots, slot = 'default', data) {
  if (!slots || !Reflect.has(slots, slot)) {
    return null;
  }

  if (typeof slots[slot] !== 'function') {
    console.error(`${slot} is not a function!`);
    return null;
  }
  const slotFn = slots[slot];
  if (!slotFn) return null;
  return slotFn(data);
}

// export function toPage (router, pageName) {
//   router.push({name: pageName})
// }