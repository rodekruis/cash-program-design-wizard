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
          label: 'Question for Numeric-input',
          tags: [Tag.data],
          options: [
            { id: 1000, label: 'option A' },
            { id: 1001, label: 'option B' },
            { id: 1002, label: 'option C' },
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
          id: 103,
          type: QuestionType.text,
          label: 'Question for Text-input B',
          tags: [Tag.cash],
        },
      ],
      state: 'pending',
    },
  ],
};
