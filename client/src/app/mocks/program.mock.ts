import { Tag } from '../models/tag.enum';
import { Program } from '../types/program.type';
import { QuestionType } from '../types/question-input.type';

export const mockProgram: Program = {
  id: '123',
  label: '',
  sections: [
    {
      id: '1',
      name: 'test1',
      order: 0,
      label: {
        en: 'Section 1',
        nl: 'Sectie 1',
      },
      questions: [
        {
          id: 100,
          type: QuestionType.text,
          label: {
            en: 'Question for Text-input',
            nl: 'Vraag met Tekst-invoer',
          },
          tags: [Tag.data],
          comment: 'A comment on this question',
        },
        {
          id: 101,
          type: QuestionType.textLong,
          label: 'Question for Longer Text-input',
          tags: [Tag.data],
          comment: 'A comment on this question',
        },
        {
          id: 102,
          type: QuestionType.numeric,
          label: 'Question for Numeric-input',
          tags: [Tag.people],
          comment: 'A comment on this question',
        },
        {
          id: 103,
          type: QuestionType.select1,
          label: 'Question for Select-1 from the options',
          tags: [Tag.data],
          options: [
            { id: 1001, label: 'option A', value: 'option-a' },
            { id: 1002, label: 'option B', value: 'option-b' },
            { id: 1003, label: 'option C', value: 'option-c' },
          ],
          comment: 'A comment on this question',
        },
        {
          id: 104,
          type: QuestionType.selectN,
          label: 'Question for Select-Multiple from the options',
          tags: [Tag.data],
          options: [
            { id: 1024, label: 'option X', value: 'option-x' },
            { id: 1025, label: 'option Y', value: 'option-y' },
            { id: 1026, label: 'option Z', value: 'option-z' },
          ],
        },
      ],
      state: 'pending',
    },
    {
      id: '2',
      name: 'test2',
      order: 0,
      label: 'Section 2',
      questions: [
        {
          id: 110,
          type: QuestionType.text,
          label: 'Question for Text-input B',
          tags: [Tag.cash],
        },
      ],
      state: 'pending',
    },
  ],
};
