import './base.css';
import './icons/fontawesome.css';
import './icons/solid.css';

import { hide, show, find } from './lib/dom';
import { parseHours } from './lib/parseHours';

window.onload = async () => {
  const copyBtn = find('#copy');
  copyBtn.addEventListener('click', () => {
    copyAllData(document.querySelector('[data-items]'));
  });
  const data = await chrome.storage.sync.get('scrummy_items');
  repaintItems(data);
};

async function repaintItems (data) {
  const taskTemplate = find('#record');
  const itemsRoot = find('[data-items]');
  const headerNode = find('[data-header]');
  itemsRoot.childNodes.forEach((n) => itemsRoot.removeChild(n));

  const emptyListNode = find('[data-no-items]');
  const estimateNode = find('[data-hours]');

  if ((data?.scrummy_items?.length ?? 0) === 0) {
    hide(itemsRoot, estimateNode, headerNode);
    show(emptyListNode);
    return;
  } else {
    show(itemsRoot, headerNode);
    hide(emptyListNode);
  }

  // dedupe items
  const dataDenormalized = data.scrummy_items.reduce((acc, next) => {
    if (acc.some((d) => d.taskId === next.taskId)) {
      return acc;
    }
    return [...acc, next];
  }, []);

  let hoursTotal = 0;
  dataDenormalized.forEach((item) => {
    const record = taskTemplate.content.cloneNode(true);
    record.querySelector('.id').textContent = item.taskId;
    record.querySelector('.id').href = item.url;
    record.querySelector('.name').textContent = item.name.trim();
    record.querySelector('.name').setAttribute('title', item.name.trim());
    if (item.time) {
      const hours = parseHours(item.time);
      hoursTotal += hours;
    }
    itemsRoot.appendChild(record);
  });

  show(itemsRoot);

  if (hoursTotal > 0) {
    estimateNode.querySelector("[data-text]").innerText = `${hoursTotal} hours`;
    show(estimateNode);
  }
}

function copyAllData (element) {
  const contents = element.innerHTML;

  const clipboardItem = new ClipboardItem({
    'text/plain': new Blob([contents], { type: 'text/plain' }),
    'text/html': new Blob([contents], { type: 'text/html' }),
  });

  navigator.clipboard.write([clipboardItem])
    .catch(console.error);
}


