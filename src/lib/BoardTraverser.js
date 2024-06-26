export class BoardTraverser {
  /**
   * @param board {HTMLElement}
   */
  constructor(board) {
    this.board = board;
  }

  /**
   * @param mutations {MutationRecord[]}
   */
  getItemsChecked(mutations) {
    const hasCheckMutations = mutations.some(
      (m) => [...m.target.classList.values()]
        .includes('bat-checkbox'));
    if (!hasCheckMutations) {
      return null;
    }
    return this.board.querySelectorAll('.board-task.board-task_selected');
  }

  /**
   * @param item {HTMLElement}
   */
  getUrl(item) {
    const link = item.querySelector('a.board-task__name-link');
    return link?.href ?? null;
  }

  /**
   * @param item {HTMLElement}
   */
  getName(item) {
    const link = item.querySelector('a.board-task__name-link');
    return link?.textContent ?? null;
  }

  /**
   * @param item {HTMLElement}
   */
  getTimeEstimate(item) {
    const slot = item.querySelector('.cu-time-estimates-view__full');
    return slot?.innerText ?? null;
  }
}