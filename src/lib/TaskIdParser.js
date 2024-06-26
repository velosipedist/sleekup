export class TaskIdParser {
  /**
   * @param urlPattern {RegExp}
   */
  constructor(urlPattern) {
    this.urlPattern = urlPattern;
 }

  getFromUrl(url) {
    const taskIdMatch = url.match(this.urlPattern);
    if (taskIdMatch !== null) {
      return taskIdMatch[0];
    }
    return null;
  }
}