import { TranslatableString } from 'src/types/translatable-string.type';

export function parseTranslatableProperty(
  prop: any,
): string | TranslatableString {
  let property = '';
  try {
    property = JSON.parse(prop);
  } catch (error) {
    console.warn('Error parsing JSON', error);
  }
  return property;
}
