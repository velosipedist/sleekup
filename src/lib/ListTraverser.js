export class ListTraverser {
  /**
   * @param list {HTMLElement}
   */
  constructor(list) {
    this.list = list;
  }

  /**
   * @param mutations {MutationRecord[]}
   */
  getItemsChecked(mutations) {
    const hasCheckMutations = mutations.some(
      (m) => [...m.target.classList.values()]
        .includes('cu-task-row-toggle'));
    if (!hasCheckMutations) {
      return null;
    }
    return this.list.querySelectorAll('.cu-task-row.cu-task-row_selected');
  }

  /**
   * @param item {HTMLElement}
   */
  getUrl(item) {
    const link = item.querySelector('a.cu-task-row-main__link');
    return link?.href ?? null;
  }

  /**
   * @param item {HTMLElement}
   */
  getName(item) {
    const link = item.querySelector('a.cu-task-row-main__link .cu-task-row-main__link-text-inner');
    return link?.textContent ?? null;
  }

  /**
   * @param item {HTMLElement}
   */
  getTimeEstimate(item) {
    return item.querySelector(
      '[data-test="time-estimates-view__value"]')?.innerText ?? null;
  }
}