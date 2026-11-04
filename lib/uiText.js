const EMOJI_CHARACTERS = /[\p{Extended_Pictographic}\p{Emoji_Presentation}\p{Regional_Indicator}\uFE0E\uFE0F\u200D\u20E3]/gu;

export function withoutEmoji(value) {
  if (typeof value !== 'string') return '';
  return value.replace(EMOJI_CHARACTERS, '');
}
