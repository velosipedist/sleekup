const observer = new MutationObserver(catchDom);

observer.observe(document.body,
  { subtree: true, attributes: true, childList: true, characterData: false });
const foo =observer.takeRecords();

function catchDom (evt) {
  const itemsChecked = findAll('.cu-task-row.cu-task-row_selected');
  if (itemsChecked.length > 0) {
    const list = [];

    itemsChecked.forEach((item, idx) => {
      const link = item.querySelector('a.cu-task-row-main__link');
      if (link) {
        const url = link.href;
        let taskId = '';
        const taskIdMatch = url.match(/[a-z]+-\d+/i);
        if (taskIdMatch !== null) {
          taskId = taskIdMatch[0];
        }
        const name = link.querySelector(
          '.cu-task-row-main__link-text-inner')?.textContent ?? 'no name';
        list.push({ name, url, taskId });
      }
    });

    chrome.storage.sync.set({ scrummy_items: list });
  }
}

