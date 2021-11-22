import { Tag } from '../models/tag.enum';
import { QuestionComment } from '../types/question-input.type';

export const getRandomNumber = (min: number, max: number): number =>
  Math.round(Math.random() * (max - min) + min);

export const getRandomComment = (): QuestionComment | null => {
  if (Math.random() >= 0.5) {
    return {
      id: getMockId(),
      text: getRandomFrom([
        'Lorem ipsum...',
        'Dolor sit amet.',
        'consectetur adipiscing elit.',
      ]),
      userName: getRandomFrom(['test-user', 'another user']),
      created: new Date().toISOString(),
    };
  }
};

export const getRandomTag = (): Tag => getRandomFrom(Object.values(Tag));

export const getRandomFrom = (fromArray: any[]) =>
  fromArray[getRandomNumber(0, fromArray.length - 1)];

export const getMockId = (): string =>
  `00000000-0000-0000-0000-${Math.random().toString().substr(2, 12)}`;
