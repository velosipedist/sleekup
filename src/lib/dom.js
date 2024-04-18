export function find (selector) {
  return document.querySelector(selector);
}

export function findAll (selector) {
  return document.querySelectorAll(selector);
}
export function show (...elements) {
  for (let element of elements) {
    element.classList.remove('invisible');
    element.classList.remove('hidden');
  }
}

export function hide (...elements) {
  for (let element of elements) {
    element.classList.add('hidden');
  }
}
