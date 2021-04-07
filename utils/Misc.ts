import { Dimensions } from 'react-native';

//
// NOTE!
// This is important function which scales all sizes from Figma design:
// https://www.figma.com/file/EuJMgLEbXfMdhAe1aOfOpF/events4friends---v2
//
const { width } = Dimensions.get('screen');
const FIGMA_WIDTH = 375;
export function calcSize(figmaSize: number): number {
  return width * (figmaSize / FIGMA_WIDTH);
}

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

export function timeZoneToCityName(timezone: string): string {
  if (timezone === '+0200') {
    return 'Клд';
  } else if (timezone === '+0300') {
    return 'Мск';
  }
  return '';
}
