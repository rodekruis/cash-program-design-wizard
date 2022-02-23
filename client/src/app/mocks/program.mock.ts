import { Program } from '../types/program.type';
import { QuestionType } from '../types/question-input.type';
import {
  getMockId,
  getRandomComment,
  getRandomNumber,
  getRandomTag,
} from './mock-helpers';

const mockSectionName1 = 'test1';
const mockSectionName2 = 'test2-answers';

const mockProgramData: Program = {
  id: getMockId(),
  name: 'Mock Program',
  sections: [
    {
      id: getMockId(),
      name: mockSectionName1,
      order: 0,
      label: {
        en: 'Test Section 1',
        nl: 'Test Sectie 1',
      },
      subsections: [
        {
          id: getMockId(),
          name: 'test1-sub-1',
          order: 1,
          questions: [
            {
              sectionName: mockSectionName1,
              id: getMockId(),
              name: 'test-1-text',
              type: QuestionType.text,
              label: {
                en: 'Question for Text-input',
                nl: 'Vraag met Tekst-invoer',
              },
              tags: [getRandomTag()],
              comments: [getRandomComment()],
            },
            {
              sectionName: mockSectionName1,
              id: getMockId(),
              name: 'test-1-text-long',
              type: QuestionType.textLong,
              label: 'Question for Longer Text-input',
              tags: [getRandomTag()],
              comments: [getRandomComment()],
            },
            {
              sectionName: mockSectionName1,
              id: getMockId(),
              name: 'test-1-numeric',
              type: QuestionType.numeric,
              label: 'Question for Numeric-input',
              tags: [getRandomTag()],
              comments: [getRandomComment()],
            },
          ],
        },
        {
          id: getMockId(),
          name: 'test1-sub-2',
          order: 2,
          questions: [
            {
              sectionName: mockSectionName1,
              id: getMockId(),
              name: 'test-1-select-1',
              type: QuestionType.select1,
              label: 'Question for Select-1 from the options',
              tags: [getRandomTag()],
              optionChoices: [
                {
                  id: getMockId(),
                  label: 'Option A',
                  name: 'option-a',
                },
                {
                  id: getMockId(),
                  label: 'Option B',
                  name: 'option-b',
                },
                {
                  id: getMockId(),
                  label: 'Option C',
                  name: 'option-c',
                },
              ],
            },
            {
              sectionName: mockSectionName1,
              id: getMockId(),
              name: 'test-1-select-2',
              type: QuestionType.select1,
              label: 'Select-1 with 1 option',
              tags: [getRandomTag()],
              optionChoices: [
                {
                  id: getMockId(),
                  label: 'Option 1',
                  name: 'option-1',
                },
              ],
            },
            {
              sectionName: mockSectionName1,
              id: getMockId(),
              name: 'test-1-select-3',
              type: QuestionType.select1,
              label: 'Select-1 with extreme options',
              tags: [getRandomTag()],
              optionChoices: [
                {
                  id: getMockId(),
                  label: 'Option 1',
                  name: 'option-1',
                },
                {
                  id: getMockId(),
                  label:
                    'Option 2 - with a very, very, very long label that will run over multiple lines',
                  name: 'option-2',
                },
                {
                  id: getMockId(),
                  label: 'Option 3️⃣',
                  name: 'option-3-emoji',
                },
              ],
            },
          ],
        },
        {
          id: getMockId(),
          name: 'test1-sub-3',
          order: 3,
          questions: [
            {
              sectionName: mockSectionName1,
              id: getMockId(),
              name: 'test-1-select-n',
              type: QuestionType.selectN,
              label: 'Question for Select-Multiple from the options',
              tags: [getRandomTag()],
              optionChoices: [
                {
                  id: getMockId(),
                  label: 'Option X',
                  name: 'option-x',
                },
                {
                  id: getMockId(),
                  label: 'Option Y',
                  name: 'option-y',
                },
                {
                  id: getMockId(),
                  label: 'Option Z',
                  name: 'option-z',
                },
              ],
            },
            {
              sectionName: mockSectionName1,
              id: getMockId(),
              name: 'test-1-select-n-2',
              type: QuestionType.selectN,
              label: 'Select-Multiple with 1 option',
              tags: [getRandomTag()],
              optionChoices: [
                {
                  id: getMockId(),
                  label: 'Option 1',
                  name: 'option-1',
                },
              ],
            },
            {
              sectionName: mockSectionName1,
              id: getMockId(),
              name: 'test-1-select-n-3',
              type: QuestionType.selectN,
              label: 'Select-Multiple with extreme options',
              tags: [getRandomTag()],
              optionChoices: [
                {
                  id: getMockId(),
                  label: 'Option 1',
                  name: 'option-1',
                },
                {
                  id: getMockId(),
                  label:
                    'Option 2 - with a very, very, very long label that will run over multiple lines',

                  name: 'option-2',
                },
                {
                  id: getMockId(),
                  label: 'Option 3️⃣',
                  name: 'option-3-emoji',
                },
              ],
            },
          ],
        },
        {
          id: getMockId(),
          name: 'test1-sub-4',
          order: 1,
          questions: [
            {
              sectionName: mockSectionName1,
              id: getMockId(),
              name: 'test-1-text-2',
              type: QuestionType.text,
              label:
                'Very, very, very long question for Text-input that runs over several, multple lines of text',
              tags: [getRandomTag()],
            },
            {
              sectionName: mockSectionName1,
              id: getMockId(),
              name: 'test-1-numeric-long',
              type: QuestionType.numeric,
              label:
                'Very, very, very long question for Numeric-input that runs over several, multple lines of text',
              tags: [getRandomTag()],
            },
            {
              sectionName: mockSectionName1,
              id: getMockId(),
              name: 'test-1-text-long',
              type: QuestionType.textLong,
              label:
                'Very, very, very long question for Long-Text-input that runs over several, multple lines of text',
              tags: [getRandomTag()],
              comments: [
                {
                  id: getMockId(),
                  text: 'Nel mezzo del cammin di nostra vita mi ritrovai per una selva oscura, ché la diritta via era smarrita.',
                  userName: 'andrea',
                  created: new Date('2021-11-07T11:51').toISOString(),
                },
                {
                  id: getMockId(),
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales.',
                  userName: 'elwin',
                  created: new Date('2021-11-07T15:47').toISOString(),
                },
                {
                  id: getMockId(),
                  text: 'Short comment',
                  userName: 'ruben',
                  created: new Date('2021-11-08T11:24').toISOString(),
                },
                {
                  id: getMockId(),
                  text: `Comment. \n with multiple \n lines \n of text.`,
                  userName: 'ruben',
                  created: new Date('2021-11-08T11:24').toISOString(),
                },
                getRandomComment(),
              ],
            },
          ],
        },
        {
          id: getMockId(),
          name: 'test1-sub-5',
          order: 1,
          questions: [
            {
              sectionName: mockSectionName1,
              id: getMockId(),
              name: 'test-1-text-link',
              type: QuestionType.text,
              label: {
                en: 'Question with a link: https://example.org/example/',
                nl: 'Vraag met een link: https://example.nl/voorbeeld/',
              },
              tags: [getRandomTag()],
              comments: [getRandomComment()],
            },
            {
              sectionName: mockSectionName1,
              id: getMockId(),
              name: 'test-1-text-markdown',
              type: QuestionType.text,
              label: {
                en: 'Question **with** [Markdown](https://en.wikipedia.org/wiki/Markdown "Yay!") _formatting_.\n And a new line.',
                nl: 'Vraag **met** [Markdown](https://en.wikipedia.org/wiki/Markdown "Yay!") _opmaak_.\n En een nieuwe regel.',
              },
              tags: [getRandomTag()],
              comments: [getRandomComment()],
            },
          ],
        },
      ],
      state: 'pending',
    },
    {
      id: getMockId(),
      name: mockSectionName2,
      order: 0,
      label: 'Test Section 2 - Answers',
      subsections: [
        {
          id: getMockId(),
          name: 'test2-sub-1',
          order: 1,
          questions: [
            {
              sectionName: mockSectionName2,
              id: getMockId(),
              name: 'test-2-text',
              type: QuestionType.text,
              label: 'Question for Text-input with Answer',
              tags: [getRandomTag()],
              comments: [getRandomComment()],
              answer: 'test answer',
            },
            {
              sectionName: mockSectionName2,
              id: getMockId(),
              name: 'test-2-text-long',
              type: QuestionType.textLong,
              label: 'Question for long Text-input with Answer',
              tags: [getRandomTag()],
              comments: [getRandomComment()],
              answer: 'Long test answer\n\nwith multiple\nlines\nof\ntext...',
            },
            {
              sectionName: mockSectionName2,
              id: getMockId(),
              name: 'test-2-numeric',
              type: QuestionType.numeric,
              label: 'Question for Numeric-input with Answer',
              tags: [getRandomTag()],
              comments: [getRandomComment()],
              answer: `${getRandomNumber(1, 10000)}`,
            },
          ],
        },
        {
          id: getMockId(),
          name: 'test2-sub-2',
          order: 2,
          questions: [
            {
              sectionName: mockSectionName2,
              id: getMockId(),
              name: 'test-2-select-1',
              type: QuestionType.select1,
              label: 'Question for Select-1 with 1 Answer',
              tags: [getRandomTag()],
              optionChoices: [
                {
                  id: getMockId(),
                  label: 'Option A',
                  name: 'option-a',
                },
                {
                  id: getMockId(),
                  label: 'Option B',
                  name: 'option-b',
                },
                {
                  id: getMockId(),
                  label:
                    'Option C - is a very very long sentence that is really very long',
                  name: 'option-c',
                },
              ],
              comments: [getRandomComment()],
              answer: 'option-b',
            },
          ],
        },
        {
          id: getMockId(),
          name: 'test2-sub-3',
          order: 3,
          questions: [
            {
              sectionName: mockSectionName2,
              id: getMockId(),
              name: 'test-2-select-n',
              type: QuestionType.selectN,
              label: 'Question for Select-N with 2 Answers',
              tags: [getRandomTag()],
              optionChoices: [
                {
                  id: getMockId(),
                  label: 'Option X',
                  name: 'option-x',
                },
                {
                  id: getMockId(),
                  label: 'Option Y',
                  name: 'option-y',
                },
                {
                  id: getMockId(),
                  label:
                    'Option Z - is a very very long sentence that is really very long',
                  name: 'option-z',
                },
              ],
              comments: [getRandomComment()],
              answer: ['option-x', 'option-y', 'option-z'],
            },
          ],
        },
      ],
      state: 'pending',
    },
  ],
  narrativeReportTemplate: `
## Example Program Overview

- Project mame: {{program-name}}
- Start date: {{start-date}}
- End date: {{end-date}}

### Operational Area:
{{operatiional-area}}

- Location 1 of program: {{location-1}}
- Location 2 of program: {{location-2}}

- - -

## All features of a Narrative-report template

### Using Markdown
It is possible to use Markdown to add structure and styling to the text.
For example; Easy text-__formatting__ or **emphasize**. And showing ~~changes~~updates explicitly.
See [more about Markdown](https://en.wikipedia.org/wiki/Markdown)
And lists:

- A list-item
- With bullet-points

Or ordered lists:

1. A list-item
1. With numbered items

### Using variables

To use the filled-in answers to the questions, variables can be used.
They can appear in a sentence, like what is chosen as the single-choice option({{test-2-select-1}}) for example.
Multiple-choice answers will show as a bullet-list:
{{test-2-select-n}}

An answer (like {{test-2-text}}) can also appear multiple times in the report, like this: {{test-2-text}}.

The report will show if there isn't any answer filled in yet:
{{test-1-text-long}}

- - -

...

`,
};

// Cleanup invalid/empty values for comments:
mockProgramData.sections = mockProgramData.sections.map((section) => {
  if (section.subsections) {
    section.subsections = section.subsections.map((subsection) => {
      if (subsection.questions) {
        subsection.questions = subsection.questions.map((question) => {
          if (question.answer) {
            question.storedAnswer = question.answer;
          }
          if (question.answer && !question.answerUpdated) {
            question.answerUpdated = new Date().toISOString();
          }
          if (question.comments) {
            question.comments = question.comments.filter(
              (comment) => !!comment,
            );
          }
          return question;
        });
      }
      return subsection;
    });
  }
  return section;
});
export const mockProgram = mockProgramData;
