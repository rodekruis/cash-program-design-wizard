import { Tag } from '../models/tag.enum';
import { QuestionComment } from '../types/question-input.type';

export const getRandomNumber = (min: number, max: number): number =>
  Math.round(Math.random() * (max - min) + min);

export const getRandomComment = (): QuestionComment | null =>
  Math.random() >= 0.5
    ? {
        id: getMockId(),
        text: `Lorem ipsum...`,
        userName: 'test-user',
        created: new Date().toISOString(),
      }
    : null;

export const getRandomTag = (): Tag =>
  Object.values(Tag)[getRandomNumber(0, Object.values(Tag).length - 1)];

export const getMockId = (): string =>
  `00000000-0000-0000-0000-${Math.random().toString().substr(2, 12)}`;
