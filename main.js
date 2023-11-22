const observer = new MutationObserver(catchDom);

observer.observe(document.body,
  { subtree: true, attributes: true, childList: true, characterData: false });

function catchDom (evt) {
  const itemsChecked = findAll('.cu-task-row.cu-task-row_selected');
  const list = [];
  if (itemsChecked.length > 0) {
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
  }

  chrome.storage.sync.set({ scrummy_items: list });
}

