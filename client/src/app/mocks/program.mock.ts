import { Tag } from '../models/tag.enum';
import { Program } from '../types/program.type';
import { QuestionType } from '../types/question-input.type';

const getRandomNumber = (min: number, max: number): number =>
  Math.round(Math.random() * (max - min) + min);
const getRandomComment = (): string | null =>
  Math.random() >= 0.5 ? `Lorem ipsum...` : null;
const getRandomTag = (): Tag =>
  Object.values(Tag)[getRandomNumber(0, Object.values(Tag).length - 1)];
const getMockId = (): string =>
  `00000000-0000-0000-0000-${Math.random().toString().substr(2, 12)}`;

export const mockProgram: Program = {
  id: getMockId(),
  label: 'Mock Program',
  sections: [
    {
      id: getMockId(),
      name: 'people-to-help',
      order: 0,
      label: {
        en: 'The people we will help are mostly:',
      },
      subsections: [
        {
          id: getMockId(),
          name: 'pa-gender-1',
          order: 1,
          questions: [
            {
              id: getMockId(),
              name: 'pa-gender-1',
              type: QuestionType.selectN,
              label: 'PA Gender',
              tags: [Tag.people],
              optionChoices: [
                {
                  id: getMockId(),
                  label: 'N/a',
                  name: 'n-a',
                },
                {
                  id: getMockId(),
                  label: 'any',
                  name: 'any',
                },
                {
                  id: getMockId(),
                  label: 'Currently Unknown',
                  name: 'unknown',
                },
                {
                  id: getMockId(),
                  label: 'Female',
                  name: 'F',
                },
                {
                  id: getMockId(),
                  label: 'Male',
                  name: 'M',
                },
                {
                  id: getMockId(),
                  label: 'Non Binary',
                  name: 'NB',
                },
              ],
            },
            {
              id: getMockId(),
              name: 'pa-gender-2',
              type: QuestionType.textLong,
              label:
                'PA Gender: Is there a local culture where gender affects the efficacy of the intended CVA Program?',
              tags: [Tag.people],
              comment: getRandomComment(),
            },
          ],
        },
        {
          id: getMockId(),
          name: 'pa-age-1',
          order: 2,
          questions: [
            {
              id: getMockId(),
              name: 'pa-age-1',
              type: QuestionType.selectN,
              label: 'PA Age',
              tags: [Tag.people],
              optionChoices: [
                {
                  id: getMockId(),
                  label: 'N/a',
                  name: 'n-a',
                },

                {
                  id: getMockId(),
                  label: 'any',
                  name: 'any',
                },
                {
                  id: getMockId(),
                  label: 'Currently Unknown',
                  name: 'unknown',
                },
                {
                  id: getMockId(),
                  label: 'less than 5',
                  name: 'under-5',
                },
                {
                  id: getMockId(),
                  label: '5y to 9y',
                  name: '5-to-9',
                },
                {
                  id: getMockId(),
                  label: '9y to 17',
                  name: '9-to-17',
                },
                {
                  id: getMockId(),
                  label: '18-24',
                  name: '18-24',
                },
                {
                  id: getMockId(),
                  label: '25-34',
                  name: '25-34',
                },
                {
                  id: getMockId(),
                  label: '35-44',
                  name: '35-44',
                },
                {
                  id: getMockId(),
                  label: '45-54',
                  name: '45-54',
                },
                {
                  id: getMockId(),
                  label: '55-64',
                  name: '55-64',
                },
                {
                  id: getMockId(),
                  label: '65 plus',
                  name: '65-plus',
                },
              ],
            },
            {
              id: getMockId(),
              name: 'pa-age-2',
              type: QuestionType.textLong,
              label:
                'PA Age: Is there a local lifestyle of this age group affects the efficacy of the intended CVA Program?',
              tags: [Tag.people],
              comment: getRandomComment(),
            },
          ],
        },
        {
          id: getMockId(),
          name: 'pa-status-1',
          order: 3,
          questions: [
            {
              id: getMockId(),
              name: 'pa-status-1',
              type: QuestionType.selectN,
              label: 'PA Marital status',
              tags: [Tag.people],
              optionChoices: [
                {
                  id: getMockId(),
                  label: 'N/a',
                  name: 'n-a',
                },
                {
                  id: getMockId(),
                  label: 'any',
                  name: 'any',
                },
                {
                  id: getMockId(),
                  label: 'Currently Unknown',
                  name: 'unknown',
                },
                {
                  id: getMockId(),
                  label: 'Single',
                  name: 'single',
                },
                {
                  id: getMockId(),
                  label: 'Married with Partner',
                  name: 'married-partner',
                },
                {
                  id: getMockId(),
                  label: 'Married with Estranged Partner',
                  name: 'married-estranged-partner',
                },
                {
                  id: getMockId(),
                  label: 'Parent',
                  name: 'parent',
                },
                {
                  id: getMockId(),
                  label: 'Parent to be',
                  name: 'parent-to-be',
                },
              ],
            },
            {
              id: getMockId(),
              name: 'pa-status-2',
              type: QuestionType.textLong,
              label:
                'PA Marital status: Is there a local stigma of the/these group(s) affects the efficacy of the intended CVA Program?',
              tags: [Tag.people],
              comment: getRandomComment(),
            },
          ],
        },
        {
          id: getMockId(),
          name: 'pa-shelter-1',
          order: 4,
          questions: [
            {
              id: getMockId(),
              name: 'pa-shelter-1',
              type: QuestionType.selectN,
              label: 'PA Shelter status',
              tags: [Tag.people],
              optionChoices: [
                {
                  id: getMockId(),
                  label: 'N/a',
                  name: 'n-a',
                },
                {
                  id: getMockId(),
                  label: 'any',
                  name: 'any',
                },
                {
                  id: getMockId(),
                  label: 'Currently Unknown',
                  name: 'unknown',
                },
                {
                  id: getMockId(),
                  label: 'homeless',
                  name: 'homeless',
                },
                {
                  id: getMockId(),
                  label: 'with home in camp',
                  name: 'home-in-camp',
                },
                {
                  id: getMockId(),
                  label: 'with temporary shelter',
                  name: 'temporary-shelter',
                },
                {
                  id: getMockId(),
                  label: 'with rental home',
                  name: 'rental-home',
                },
                {
                  id: getMockId(),
                  label: 'with own home',
                  name: 'own-home',
                },
              ],
            },
            {
              id: getMockId(),
              name: 'pa-shelter-2',
              type: QuestionType.textLong,
              label:
                'PA Shelter status: Are there local regulations for the/these group(s) affects the efficacy of the intended CVA Program?',
              tags: [Tag.people],
              comment: getRandomComment(),
            },
          ],
        },
        {
          id: getMockId(),
          name: 'pa-live-1',
          order: 5,
          questions: [
            {
              id: getMockId(),
              name: 'pa-lives-1',
              type: QuestionType.selectN,
              label: 'PA Lives',
              tags: [Tag.people],
              optionChoices: [
                {
                  id: getMockId(),
                  label: 'N/a',
                  name: 'n-a',
                },
                {
                  id: getMockId(),
                  label: 'any',
                  name: 'any',
                },
                {
                  id: getMockId(),
                  label: 'Currently Unknown',
                  name: 'unknown',
                },
                {
                  id: getMockId(),
                  label: 'Alone',
                  name: 'Alone',
                },
                {
                  id: getMockId(),
                  label: 'In shared household',
                  name: 'shared-household',
                },
                {
                  id: getMockId(),
                  label: 'In household size 3 or less',
                  name: 'household-size-3-less',
                },
                {
                  id: getMockId(),
                  label: 'In household size 5 or less',
                  name: 'household-size-5-less',
                },
                {
                  id: getMockId(),
                  label: 'In household size 6 or more',
                  name: 'household-size-6-more',
                },
              ],
            },
            {
              id: getMockId(),
              name: 'pa-lifestyle-1',
              type: QuestionType.textLong,
              label:
                'PA Lifestyle: Is there a trend for the/these group(s) affects the efficacy of the intended CVA Program?',
              tags: [Tag.people],
              comment: getRandomComment(),
            },
          ],
        },
        {
          id: getMockId(),
          name: 'pa-dependants-1',
          order: 6,
          questions: [
            {
              id: getMockId(),
              name: 'pa-dependants-1',
              type: QuestionType.selectN,
              label: 'PA dependants',
              tags: [Tag.people],
              optionChoices: [
                {
                  id: getMockId(),
                  label: 'N/a',
                  name: 'n-a',
                },
                {
                  id: getMockId(),
                  label: 'any',
                  name: 'any',
                },
                {
                  id: getMockId(),
                  label: 'Currently Unknown',
                  name: 'unknown',
                },
                {
                  id: getMockId(),
                  label: 'no dependants',
                  name: 'no-dependants',
                },
                {
                  id: getMockId(),
                  label: '3 or more dependants',
                  name: 'dependants-3',
                },
                {
                  id: getMockId(),
                  label: '5 or more dependants',
                  name: 'dependants-5',
                },
                {
                  id: getMockId(),
                  label: '6 or more dependants',
                  name: 'dependants-6',
                },
              ],
            },

            {
              id: getMockId(),
              name: 'pa-dependants-2',
              type: QuestionType.textLong,
              label:
                'PA Dependants: Is there a trend with the/these group(s) affects the efficacy of the intended CVA Program?',
              tags: [Tag.people],
              comment: getRandomComment(),
            },
          ],
        },
        {
          id: getMockId(),
          name: 'pa-status-1',
          order: 6,
          questions: [
            {
              id: getMockId(),
              name: 'pa-legal-1',
              type: QuestionType.selectN,
              label: 'PA legal status',
              tags: [Tag.people],
              optionChoices: [
                {
                  id: getMockId(),
                  label: 'N/a',
                  name: 'n-a',
                },
                {
                  id: getMockId(),
                  label: 'any',
                  name: 'any',
                },
                {
                  id: getMockId(),
                  label: 'Currently Unknown',
                  name: 'unknown',
                },
                {
                  id: getMockId(),
                  label: 'Documented',
                  name: 'documented',
                },
                {
                  id: getMockId(),
                  label: 'Undocumented',
                  name: 'undocumented',
                },
              ],
            },
            {
              id: getMockId(),
              name: 'pa-legal-2',
              type: QuestionType.textLong,
              label:
                'PA Legal Status: Is there a local law for the/these group(s) affects the efficacy of the intended CVA Program?',
              tags: [Tag.people],
              comment: getRandomComment(),
            },
          ],
        },
        {
          id: getMockId(),
          name: 'pa-job-1',
          order: 6,
          questions: [
            {
              id: getMockId(),
              name: 'pa-job-1',
              type: QuestionType.selectN,
              label: 'Job type',
              tags: [Tag.people],
              optionChoices: [
                {
                  id: getMockId(),
                  label: 'N/a',
                  name: 'n-a',
                },
                {
                  id: getMockId(),
                  label: 'any',
                  name: 'any',
                },
                {
                  id: getMockId(),
                  label: 'Currently Unknown',
                  name: 'unknown',
                },
                {
                  id: getMockId(),
                  label: 'Farmers',
                  name: 'farmers',
                },
                {
                  id: getMockId(),
                  label: 'Merchants',
                  name: 'merchants',
                },
                {
                  id: getMockId(),
                  label: 'Fishing',
                  name: 'fishing',
                },
                {
                  id: getMockId(),
                  label: 'Casual workers',
                  name: 'casual-workers',
                },
                {
                  id: getMockId(),
                  label: 'Unemployed',
                  name: 'unemployed',
                },
                {
                  id: getMockId(),
                  label: 'Ilegal workers',
                  name: 'ilegal-workers',
                },
              ],
            },
            {
              id: getMockId(),
              name: 'pa-econ-1',
              type: QuestionType.textLong,
              label:
                'Is there an economic trend for the/these group(s) affects the efficacy of the intended CVA Program?',
              tags: [Tag.people],
              comment: getRandomComment(),
            },
          ],
        },
        {
          id: getMockId(),
          name: 'pa-needs-1',
          order: 6,
          questions: [
            {
              id: getMockId(),
              name: 'pa-needs-1',
              type: QuestionType.selectN,
              label: 'lack of',
              tags: [Tag.people],
              optionChoices: [
                {
                  id: getMockId(),
                  label: 'N/a',
                  name: 'n-a',
                },
                {
                  id: getMockId(),
                  label: 'any',
                  name: 'any',
                },
                {
                  id: getMockId(),
                  label: 'Currently Unknown',
                  name: 'unknown',
                },
                {
                  id: getMockId(),
                  label: 'Health',
                  name: 'health',
                },
                {
                  id: getMockId(),
                  label: 'Food security',
                  name: 'food-security',
                },
                {
                  id: getMockId(),
                  label: 'Nutrtion',
                  name: 'nutrtion',
                },
                {
                  id: getMockId(),
                  label: 'Protection',
                  name: 'protection',
                },
                {
                  id: getMockId(),
                  label: 'Shelter',
                  name: 'shelter',
                },
                {
                  id: getMockId(),
                  label: 'Water Sanitation & Hygeine',
                  name: 'wash',
                },
                {
                  id: getMockId(),
                  label: 'Education',
                  name: 'education',
                },
                {
                  id: getMockId(),
                  label: 'Financial Stability',
                  name: 'financial-stability',
                },
              ],
            },

            {
              id: getMockId(),
              name: 'pa-programs-1',
              type: QuestionType.textLong,
              label:
                'Are their other programs for the/these PAs that affect the efficacyof the intended CVA Program?',
              tags: [Tag.people],
              comment: getRandomComment(),
            },
          ],
        },
        {
          id: getMockId(),
          name: 'pa-disaster-1',
          order: 6,
          questions: [
            {
              id: getMockId(),
              name: 'pa-disaster-1',
              type: QuestionType.selectN,
              label: 'Disaster Type',
              tags: [Tag.people],
              optionChoices: [
                {
                  id: getMockId(),
                  label: 'N/a',
                  name: 'n-a',
                },
                {
                  id: getMockId(),
                  label: 'any',
                  name: 'any',
                },
                {
                  id: getMockId(),
                  label: 'Currently Unknown',
                  name: 'unknown',
                },
                {
                  id: getMockId(),
                  label: 'Floods',
                  name: 'floods',
                },
                {
                  id: getMockId(),
                  label: 'Typhoons/Hurricane/Cyclones',
                  name: 'hurricane',
                },
                {
                  id: getMockId(),
                  label: 'EarthQuake',
                  name: 'earthQuake',
                },
                {
                  id: getMockId(),
                  label: 'Tsunami',
                  name: 'tsunami',
                },
                {
                  id: getMockId(),
                  label: 'Drought',
                  name: 'drought',
                },
                {
                  id: getMockId(),
                  label: 'War',
                  name: 'war',
                },
                {
                  id: getMockId(),
                  label: 'Civil Unrest',
                  name: 'civil-unrest',
                },
                {
                  id: getMockId(),
                  label: 'Poor Economy',
                  name: 'poor-economy',
                },
                {
                  id: getMockId(),
                  label: 'Epedemic',
                  name: 'epedemic',
                },
                {
                  id: getMockId(),
                  label: 'Pandemic',
                  name: 'pandemic',
                },
              ],
            },

            {
              id: getMockId(),
              name: 'pa-disaster-2',
              type: QuestionType.selectN,
              label: 'Current Disaster Phase',
              tags: [Tag.people],
              optionChoices: [
                {
                  id: getMockId(),
                  label: 'Prevention',
                  name: 'prevention',
                },
                {
                  id: getMockId(),
                  label: 'Mitigation',
                  name: 'mitigation',
                },
                {
                  id: getMockId(),
                  label: 'Preparedness',
                  name: 'preparedness',
                },
                {
                  id: getMockId(),
                  label: 'Disaster',
                  name: 'disaster',
                },
                {
                  id: getMockId(),
                  label: 'Response',
                  name: 'response',
                },
                {
                  id: getMockId(),
                  label: 'Recovery',
                  name: 'recovery',
                },
                {
                  id: getMockId(),
                  label: 'Reconstruction',
                  name: 'reconstruction',
                },
                {
                  id: getMockId(),
                  label: 'Combination',
                  name: 'combination',
                },
              ],
            },
            {
              id: getMockId(),
              name: 'pa-disaster-3',
              type: QuestionType.textLong,
              label:
                'Is there potential for other combined Disasters to occur during the intended CVA program?',
              tags: [Tag.people],
              comment: getRandomComment(),
            },

            {
              id: getMockId(),
              name: 'pa-disaster-4',
              type: QuestionType.textLong,
              label:
                'Is this disaster potentially reoccuring or in a phase efficacyof the intended CVA Program?',
              tags: [Tag.people],
              comment: getRandomComment(),
            },
          ],
        },
      ],
      state: 'pending',
    },
    {
      id: getMockId(),
      name: 'test1',
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
              id: getMockId(),
              name: 'test-1-text',
              type: QuestionType.text,
              label: {
                en: 'Question for Text-input',
                nl: 'Vraag met Tekst-invoer',
              },
              tags: [getRandomTag()],
            },
            {
              id: getMockId(),
              name: 'test-1-text-long',
              type: QuestionType.textLong,
              label: 'Question for Longer Text-input',
              tags: [getRandomTag()],
            },
            {
              id: getMockId(),
              name: 'test-1-numeric',
              type: QuestionType.numeric,
              label: 'Question for Numeric-input',
              tags: [getRandomTag()],
            },
          ],
        },
        {
          id: getMockId(),
          name: 'test1-sub-2',
          order: 2,
          questions: [
            {
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
              id: getMockId(),
              name: 'test-1-select-n',
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
              id: getMockId(),
              name: 'test-1-text-2',
              type: QuestionType.text,
              label:
                'Very, very, very long question for Text-input that runs over several, multple lines of text',
              tags: [getRandomTag()],
              comment: `Long comment. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                 sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
            },
            {
              id: getMockId(),
              name: 'test-1-text-long',
              type: QuestionType.textLong,
              label:
                'Very, very, very long question for Long-Text-input that runs over several, multple lines of text',
              tags: [getRandomTag()],
              comment: 'Short comment',
            },
            {
              id: getMockId(),
              name: 'test-1-numeric',
              type: QuestionType.numeric,
              label: 'Question for Numeric-input',
              tags: [getRandomTag()],
              comment: `Comment. \n with multiple \n lines \n of text.`,
            },
          ],
        },
      ],
      state: 'pending',
    },
    {
      id: getMockId(),
      name: 'test2-answers',
      order: 0,
      label: 'Test Section 2 - Answers',
      subsections: [
        {
          id: getMockId(),
          name: 'test2-sub-1',
          order: 1,
          questions: [
            {
              id: getMockId(),
              name: 'test-2-text',
              type: QuestionType.text,
              label: 'Question for Text-input with Answer',
              tags: [getRandomTag()],
              comment: getRandomComment(),
              answer: 'test answer',
              answerUpdated: '2021-10-21T01:00:00Z',
            },
            {
              id: getMockId(),
              name: 'test-2-text-long',
              type: QuestionType.textLong,
              label: 'Question for long Text-input with Answer',
              tags: [getRandomTag()],
              comment: getRandomComment(),
              answer: 'Long test answer\n\nwith multiple\nlines\nof\ntext...',
              answerUpdated: '2021-10-21T01:01:00Z',
            },
            {
              id: getMockId(),
              name: 'test-2-numeric',
              type: QuestionType.numeric,
              label: 'Question for Numeric-input with Answer',
              tags: [getRandomTag()],
              comment: getRandomComment(),
              answer: `${getRandomNumber(1, 10000)}`,
              answerUpdated: '2021-10-21T01:00:00Z',
            },
          ],
        },
        {
          id: getMockId(),
          name: 'test2-sub-2',
          order: 2,
          questions: [
            {
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
              comment: getRandomComment(),
              answer: 'option-b',
              answerUpdated: '2021-10-21T01:01:00Z',
            },
          ],
        },
        {
          id: getMockId(),
          name: 'test2-sub-3',
          order: 3,
          questions: [
            {
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
              comment: getRandomComment(),
              answer: ['option-x', 'option-y', 'option-z'],
              answerUpdated: '2021-10-21T01:01:00Z',
            },
          ],
        },
      ],
      state: 'pending',
    },
  ],
  narrativeReportTemplate: `
The answers where: {{test-2-select-n}}

And also {{test-2-select-1}} or {{test-2-text}}.

Concluding:
{{text-2-text-long}}
`,
};
