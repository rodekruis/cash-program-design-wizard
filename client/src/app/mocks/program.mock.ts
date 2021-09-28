import { Tag } from '../models/tag.enum';
import { Program } from '../types/program.type';
import { QuestionType } from '../types/question-input.type';

export const mockProgram: Program = {
  id: 123,
  label: '',
  sections: [
    {
      id: 1,
      slug: 'test1',
      order: 0,
      label: {
        en: 'Section 1',
        nl: 'Sectie 1',
      },
      questions: [
        {
          id: 100,
          type: QuestionType.text,
          label: 'Question for Text-input',
          tags: [Tag.data],
          comment: 'Comment on this question',
        },
        {
          id: 101,
          type: QuestionType.numeric,
          label: 'Question for Numeric-input',
          tags: [Tag.people],
        },
        {
          id: 102,
          type: QuestionType.select1,
          label: 'Question for Select-1 from the options',
          tags: [Tag.data],
          options: [
            { id: 1001, label: 'option A' },
            { id: 1002, label: 'option B' },
            { id: 1003, label: 'option C' },
          ],
        },
        {
          id: 103,
          type: QuestionType.selectN,
          label: 'Question for Select-Multiple from the options',
          tags: [Tag.data],
          options: [
            { id: 1024, label: 'option X' },
            { id: 1025, label: 'option Y' },
            { id: 1026, label: 'option Z' },
          ],
        },
      ],
      state: 'pending',
    },
    {
      id: 2,
      slug: 'test2',
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
