async function readItems () {
  const data = await chrome.storage.sync.get('scrummy_items');
  const taskTemplate = document.getElementById('record');
  const root = document.getElementById('scrum');
  root.childNodes.forEach((n) => root.removeChild(n));

  if (!data?.scrummy_items) {
    return;
  }

  const dataDenormalized = data.scrummy_items.reduce((acc, next) => {
    if (acc.some((d) => d.taskId === next.taskId)) {
      return acc;
    }
    return [...acc, next];
  }, []);

  dataDenormalized.forEach((item) => {
    const record = taskTemplate.content.cloneNode(true);
    record.querySelector('.id').textContent = item.taskId;
    record.querySelector('.id').href = item.url;
    record.querySelector('.name').textContent = item.name.trim();
    record.querySelector('.name').attributes.title = item.name.trim();
    root.appendChild(record);
  });
}

readItems();

function copyData () {
  const contents = document.getElementById('scrum').innerHTML;
  const clipboardItem = new ClipboardItem({
    'text/plain': new Blob([contents], { type: 'text/plain' }),
    'text/html': new Blob([contents], { type: 'text/html' }),
  });

  navigator.clipboard.write([clipboardItem])
    .then((result) => {
      console.debug(`#scrummy result`, { result, contents,clipboardItem });
    })
    .catch(console.error);
}

document.getElementById('copy').addEventListener('click', () => {
  copyData();
});

