import { findAll, find } from "./lib/dom";

const observer = new MutationObserver(catchCheckbox);

observer.observe(document.body, {
    subtree: true,
    attributes: true,
    childList: false,
    characterData: false,
    attributeFilter: ['class'],
  },
);

function catchCheckbox (mutations) {
  const hasCheckMutations = mutations.some(
    (m) => [...m.target.classList.values()]
      .includes('cu-task-row-toggle'));
  if (!hasCheckMutations) {
    return;
  }

  const itemsChecked = findAll('.cu-task-row.cu-task-row_selected');
  const list = [];
  itemsChecked.forEach((item, idx) => {
    const link = item.querySelector('a.cu-task-row-main__link');

    if (link) {
      const url = link.href;
      let taskId = '';
      const taskIdMatch = url.match(/[A-Z]{3,5}-\d+/);
      if (taskIdMatch !== null) {
        taskId = taskIdMatch[0];
      }
      const name = link.querySelector(
        '.cu-task-row-main__link-text-inner')?.textContent ?? 'no name';

      const timeCell = item.querySelector(
        '[data-test="time-estimates-view__value"]');
      const time = timeCell?.innerText;
      list.push({ name, url, taskId, time });
    }
  });

  chrome.storage.sync.set({ scrummy_items: list });
}

