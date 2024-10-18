export function convertDateToLocaleString(utcSeconds) {
  const date = new Date(utcSeconds * 1000);
  return date.toLocaleString();
}

export function blackOrWhiteTextColor(hex) {
  try {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }
    // converting 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
    const r = parseInt(hex.slice(0, 2), 16) * 0.299;
    const g = parseInt(hex.slice(2, 4), 16) * 0.587;
    const b = parseInt(hex.slice(4, 6), 16) * 0.114;
    const color = r + g + b;
    const textColor = color > 186 ? '#000000' : '#ffffff';
    return textColor;
  } catch (err) {
    console.error(err);
  }
}

export function encodePathParameter(text) {
  return encodeURIComponent(text);
}
export function decodePathParameter(text) {
  return decodeURIComponent(text);
}

export function intialTrialSubs() {
  const firstVisit = JSON.parse(localStorage.getItem('firstVisit') || 'true');
  const subredditList = localStorage.getItem('subreddit') || '[]';
  if (JSON.parse(subredditList).length === 0 && firstVisit) {
    localStorage.setItem('firstVisit', JSON.stringify(false));
    localStorage.setItem(
      'subreddit',
      JSON.stringify(['learnprogramming', 'india', 'AskIndia'])
    );
  }
}

export function replaceEntityString(text) {
  if (typeof text !== 'string') {
    return text;
  }
  text = text
    .replaceAll(/\n+/g, '\n')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'")
    .replaceAll('<a', '<a target="_blank" ')
    .replaceAll('href="/', 'href="https://www.reddit.com/');
  return text;
}

export function checkIsPostFav(postUrl) {
  const favoritePosts = JSON.parse(
    localStorage.getItem('favoritePosts') || '{}'
  );

  return Object.keys(favoritePosts).includes(postUrl);
}

export function getFromLocalStorage(itemName, defaultValue = '[]') {
  const items = localStorage.getItem(itemName) || defaultValue;
  return JSON.parse(items);
}

export function isAnImage(string) {
  const imageFormats = ['jpeg', 'jpg', 'png', 'gif', 'webp', 'tiff'];
  return imageFormats.some((item) => string.toLowerCase().endsWith(item));
}

// allowed characters between a-z, A-Z, 0-9, and (_) underscore
export function isCharAllowed(char) {
  // being optimistic with allowing undefined char, for selecting text and pressing backspace or delete.
  if (!char) {
    return true;
  }
  char = char.charCodeAt();
  return (
    (char >= 65 && char <= 90) ||
    (char >= 97 && char <= 122) ||
    (char >= 48 && char <= 57) ||
    char === 95
  );
}

export function filterNameWithAllowedCharacters(text) {
  const filteredText = text
    .split('')
    .filter((char) => isCharAllowed(char))
    .join('');
  return filteredText;
}
