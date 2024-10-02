import {findAll, find} from "./lib/dom";
import {TraverserFactory} from './lib/TraverserFactory';
import {TaskIdParser} from "./lib/TaskIdParser";

const observer = new MutationObserver(catchCheckbox);

observer.observe(document.body, {
    subtree: true,
    attributes: true,
    childList: false,
    characterData: false,
    attributeFilter: ['class'],
  },
);

function catchCheckbox(mutations) {
  const traverser = TraverserFactory.create(document.body);
  if (!traverser) {
    return;
  }
  const links = traverser.getItemsChecked(mutations);
  if (links === null) {
    return;
  }
  const idParser = new TaskIdParser();

  const list = [];
  links.forEach((link, idx) => {
    const url = traverser.getUrl(link);
    const taskId = idParser.getFromUrl(url);
    const name = traverser.getName(link) ?? `no name #${idx}`;
    const time = traverser.getTimeEstimate(link);

    list.push({name, url, taskId, time});
  });

  chrome.storage.sync?.set({scrummy_items: list});
}

