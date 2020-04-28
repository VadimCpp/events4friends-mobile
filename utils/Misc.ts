//
// NOTE!
// This method is used in EventSingle screen
// to remove all html tags from description
//
export function removeTags(html: string): string {
  let result = '';
  let isTag = false;

  for (let i = 0; i < html.length; i++) {
    const ch = html[i];

    if (ch === '<') {
      isTag = true;
    } else if (ch === '>') {
      isTag = false;
    } else if (isTag !== true) {
      result += ch;
    }
  }

  return result;
}
