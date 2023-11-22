window.onload = () => {
  const copyBtn = document.getElementById('copy');
  copyBtn.addEventListener('click', copyAllData);
  readItems();
};

async function readItems () {
  const data = await chrome.storage.sync.get('scrummy_items');
  const taskTemplate = document.getElementById('record');
  const itemsRoot = document.querySelector('[data-items]');
  itemsRoot.childNodes.forEach((n) => itemsRoot.removeChild(n));

  const emptyListNode = document.querySelector('[data-no-items]');
  const estimateNode = document.querySelector('[data-hours]');

  if (!data?.scrummy_items) {
    hide(itemsRoot, estimateNode);
    show(emptyListNode);
    return;
  } else {
    hide(emptyListNode);
  }

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
    estimateNode.innerText = `${hoursTotal} hours`;
    show(estimateNode);
  }
}

function copyAllData () {
  const contents = document.querySelector('[data-items]').innerHTML;

  const clipboardItem = new ClipboardItem({
    'text/plain': new Blob([contents], { type: 'text/plain' }),
    'text/html': new Blob([contents], { type: 'text/html' }),
  });

  navigator.clipboard.write([clipboardItem])
    .catch(console.error);
}

function show (...elements) {
  for (var element of elements) {
    element.classList.remove('invisible');
    element.classList.remove('hidden');
  }
}

function hide (...elements) {
  for (var element of elements) {
    element.classList.add('hidden');
  }
}

function parseHours (input) {
  let result = 0;
  const hoursMatch = input.match(/(\d+)h/);
  if (hoursMatch) {
    result += parseInt(hoursMatch[1]);
  }
  const daysMatch = input.match(/(\d+)d/);
  if (daysMatch) {
    result += parseInt(daysMatch[1]) * 8;
  }
  return result;
}