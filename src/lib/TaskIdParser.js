const urlPatternCode = /\/([A-Z]{3,5}-\d+$)/;
const urlPatternBasic = /\/([a-zA-Z0-9]+$)/;

export class TaskIdParser {
  constructor() {
 }

  getFromUrl(url) {
    const basicIdMatch = url.match(urlPatternBasic);
    if (basicIdMatch !== null) {
      return basicIdMatch[1].substr(0,5);
    }
    const codeIdMatch = url.match(urlPatternCode);
    if (codeIdMatch) {
      return codeIdMatch[1];
    }
    return null;
  }
}