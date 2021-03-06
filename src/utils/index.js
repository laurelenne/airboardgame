/**
 * Check if element or parent has className.
 * @param {DOMElement} element
 * @param {string} className
 */

export const hasClass = (element, className) =>
  typeof element.className === "string" &&
  element.className.split(" ").includes(className);

export const insideClass = (element, className) => {
  if (hasClass(element, className)) {
    return element;
  }
  if (!element.parentNode) {
    return false;
  }
  return insideClass(element.parentNode, className);
};

export const isPointInsideRect = (point, rect) => {
  return (
    point.x > rect.left &&
    point.x < rect.left + rect.width &&
    point.y > rect.top &&
    point.y < rect.top + rect.height
  );
};

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
export const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/**
 * Extract coordinates from mouse/touch event.
 * @param {event} e the event.
 */
export const getPointerState = (e) => {
  if (e.touches) {
    return {
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY,
    };
  } else {
    return {
      clientX: e.clientX,
      clientY: e.clientY,
    };
  }
};
