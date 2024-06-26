import {ListTraverser} from "./ListTraverser";
import {BoardTraverser} from "./BoardTraverser";

export class TraverserFactory {
  /**
   * @param doc {HTMLElement}
   * @returns {TreeTraverser|ListTraverser}
   */
  static create(doc) {
    const boardView = doc.querySelector('cu-manager-dashboard-board');
    if (boardView) {
      return new BoardTraverser(boardView);
    }
    const listView = doc.querySelector('cu-list-view-divisions');
    if (listView) {
      return new ListTraverser(listView);
    }
    return null;
  }
}