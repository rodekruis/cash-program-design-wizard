import { Tag } from '../models/tag.enum';
import { Program } from '../types/program.type';
import { QuestionType } from '../types/question-input.type';

const getRandomComment = () => (Math.random() >= 0.5 ? `Lorem ipsum...` : null);

export const mockProgram: Program = {
  id: '123',
  label: '',
  sections: [
    {
      id: '3',
      name: 'people-to-help',
      order: 0,
      label: {
        en: 'The people we will help are mostly:',
      },
      questions: [
        {
          id: 300,
          type: QuestionType.selectN,
          label: 'PA Gender',
          tags: [Tag.people],
          options: [
            { id: 30000, label: 'N/a', value: 'n-a' },
            { id: 30001, label: 'any', value: 'any' },
            { id: 30002, label: 'Currently Unknown', value: 'unknown' },
            { id: 30003, label: 'Female', value: 'F' },
            { id: 30004, label: 'Male', value: 'M' },
            { id: 30005, label: 'Non Binary', value: 'NB' },
          ],
        },
        {
          id: 301,
          type: QuestionType.selectN,
          label: 'PA Age',
          tags: [Tag.people],
          options: [
            { id: 30100, label: 'N/a', value: 'n-a' },
            { id: 30101, label: 'any', value: 'any' },
            { id: 30102, label: 'Currently Unknown', value: 'unknown' },
            { id: 30103, label: 'less than 5', value: 'under-5' },
            { id: 30104, label: '5y to 9y', value: '5-to-9' },
            { id: 30105, label: '9y to 17', value: '9-to-17' },
            { id: 30106, label: '18-24', value: '18-24' },
            { id: 30107, label: '25-34', value: '25-34' },
            { id: 30108, label: '35-44', value: '35-44' },
            { id: 30109, label: '45-54', value: '45-54' },
            { id: 30110, label: '55-64', value: '55-64' },
            { id: 30111, label: '65 plus', value: '65-plus' },
          ],
        },
        {
          id: 302,
          type: QuestionType.selectN,
          label: 'PA Marital status',
          tags: [Tag.people],
          options: [
            { id: 30200, label: 'N/a', value: 'n-a' },
            { id: 30201, label: 'any', value: 'any' },
            { id: 30202, label: 'Currently Unknown', value: 'unknown' },
            { id: 30203, label: 'Single', value: 'single' },
            {
              id: 30204,
              label: 'Married with Partner',
              value: 'married-partner',
            },
            {
              id: 30205,
              label: 'Married with Estranged Partner',
              value: 'married-estranged-partner',
            },
            { id: 30206, label: 'Parent', value: 'parent' },
            { id: 30207, label: 'Parent to be', value: 'parent-to-be' },
          ],
        },
        {
          id: 303,
          type: QuestionType.textLong,
          label:
            'PA Gender: Is there a local culture where gender affects the efficacy of the intended CVA Program?',
          tags: [Tag.people],
          comment: getRandomComment(),
        },
        {
          id: 304,
          type: QuestionType.textLong,
          label:
            'PA Age: Is there a local lifestyle of this age group affects the efficacy of the intended CVA Program?',
          tags: [Tag.people],
          comment: getRandomComment(),
        },
        {
          id: 305,
          type: QuestionType.textLong,
          label:
            'PA Marital status: Is there a local stigma of the/these group(s) affects the efficacy of the intended CVA Program?',
          tags: [Tag.people],
          comment: getRandomComment(),
        },
        {
          id: 306,
          type: QuestionType.selectN,
          label: 'PA Shelter status',
          tags: [Tag.people],
          options: [
            { id: 30600, label: 'N/a', value: 'n-a' },
            { id: 30601, label: 'any', value: 'any' },
            { id: 30602, label: 'Currently Unknown', value: 'unknown' },
            { id: 30603, label: 'homeless', value: 'homeless' },
            { id: 30604, label: 'with home in camp', value: 'home-in-camp' },
            {
              id: 30605,
              label: 'with temporary shelter',
              value: 'temporary-shelter',
            },
            { id: 30606, label: 'with rental home', value: 'rental-home' },
            { id: 30607, label: 'with own home', value: 'own-home' },
          ],
        },
        {
          id: 307,
          type: QuestionType.selectN,
          label: 'PA Lives',
          tags: [Tag.people],
          options: [
            { id: 30700, label: 'N/a', value: 'n-a' },
            { id: 30701, label: 'any', value: 'any' },
            { id: 30702, label: 'Currently Unknown', value: 'unknown' },
            { id: 30703, label: 'Alone', value: 'Alone' },
            {
              id: 30704,
              label: 'In shared household',
              value: 'shared-household',
            },
            {
              id: 30705,
              label: 'In household size 3 or less',
              value: 'household-size-3-less',
            },
            {
              id: 30706,
              label: 'In household size 5 or less',
              value: 'household-size-5-less',
            },
            {
              id: 30707,
              label: 'In household size 6 or more',
              value: 'household-size-6-more',
            },
          ],
        },
        {
          id: 308,
          type: QuestionType.selectN,
          label: 'PA dependants',
          tags: [Tag.people],
          options: [
            { id: 30800, label: 'N/a', value: 'n-a' },
            { id: 30801, label: 'any', value: 'any' },
            { id: 30802, label: 'Currently Unknown', value: 'unknown' },
            { id: 30803, label: 'no dependants', value: 'no-dependants' },
            { id: 30804, label: '3 or more dependants', value: 'dependants-3' },
            { id: 30805, label: '5 or more dependants', value: 'dependants-5' },
            { id: 30806, label: '6 or more dependants', value: 'dependants-6' },
          ],
        },

        {
          id: 309,
          type: QuestionType.textLong,
          label:
            'PA Shelter status: Are there local regulations for the/these group(s) affects the efficacy of the intended CVA Program?',
          tags: [Tag.people],
          comment: getRandomComment(),
        },

        {
          id: 310,
          type: QuestionType.textLong,
          label:
            'PA Lifestyle: Is there a trend for the/these group(s) affects the efficacy of the intended CVA Program?',
          tags: [Tag.people],
          comment: getRandomComment(),
        },

        {
          id: 311,
          type: QuestionType.textLong,
          label:
            'PA Dependants: Is there a trend with the/these group(s) affects the efficacy of the intended CVA Program?',
          tags: [Tag.people],
          comment: getRandomComment(),
        },

        {
          id: 312,
          type: QuestionType.selectN,
          label: 'PA legal status',
          tags: [Tag.people],
          options: [
            { id: 31200, label: 'N/a', value: 'n-a' },
            { id: 31201, label: 'any', value: 'any' },
            { id: 31202, label: 'Currently Unknown', value: 'unknown' },
            { id: 31203, label: 'Documented', value: 'documented' },
            { id: 31204, label: 'Undocumented', value: 'undocumented' },
          ],
        },
        {
          id: 313,
          type: QuestionType.selectN,
          label: 'Job type',
          tags: [Tag.people],
          options: [
            { id: 31300, label: 'N/a', value: 'n-a' },
            { id: 31301, label: 'any', value: 'any' },
            { id: 31302, label: 'Currently Unknown', value: 'unknown' },
            { id: 31303, label: 'Farmers', value: 'farmers' },
            { id: 31304, label: 'Merchants', value: 'merchants' },
            { id: 31305, label: 'Fishing', value: 'fishing' },
            { id: 31306, label: 'Casual workers', value: 'casual-workers' },
            { id: 31307, label: 'Unemployed', value: 'unemployed' },
            { id: 31308, label: 'Ilegal workers', value: 'ilegal-workers' },
          ],
        },
        {
          id: 314,
          type: QuestionType.selectN,
          label: 'lack of',
          tags: [Tag.people],
          options: [
            { id: 31400, label: 'N/a', value: 'n-a' },
            { id: 31401, label: 'any', value: 'any' },
            { id: 31402, label: 'Currently Unknown', value: 'unknown' },
            { id: 31403, label: 'Health', value: 'health' },
            { id: 31404, label: 'Food security', value: 'food-security' },
            { id: 31405, label: 'Nutrtion', value: 'nutrtion' },
            { id: 31406, label: 'Protection', value: 'protection' },
            { id: 31407, label: 'Shelter', value: 'shelter' },
            { id: 31408, label: 'Water Sanitation & Hygeine', value: 'wash' },
            { id: 31409, label: 'Education', value: 'education' },
            {
              id: 31410,
              label: 'Financial Stability',
              value: 'financial-stability',
            },
          ],
        },

        {
          id: 315,
          type: QuestionType.textLong,
          label:
            'PA Legal Status: Is there a local law for the/these group(s) affects the efficacy of the intended CVA Program?',
          tags: [Tag.people],
          comment: getRandomComment(),
        },

        {
          id: 316,
          type: QuestionType.textLong,
          label:
            'Is there an economic trend for the/these group(s) affects the efficacy of the intended CVA Program?',
          tags: [Tag.people],
          comment: getRandomComment(),
        },

        {
          id: 317,
          type: QuestionType.textLong,
          label:
            'Are their other programs for the/these PAs that affect the efficacyof the intended CVA Program?',
          tags: [Tag.people],
          comment: getRandomComment(),
        },

        {
          id: 318,
          type: QuestionType.selectN,
          label: 'Disaster Type',
          tags: [Tag.people],
          options: [
            { id: 31800, label: 'N/a', value: 'n-a' },
            { id: 31801, label: 'any', value: 'any' },
            { id: 31802, label: 'Currently Unknown', value: 'unknown' },
            { id: 31803, label: 'Floods', value: 'floods' },
            {
              id: 31804,
              label: 'Typhoons/Hurricane/Cyclones',
              value: 'hurricane',
            },
            { id: 31805, label: 'EarthQuake', value: 'earthQuake' },
            { id: 31806, label: 'Tsunami', value: 'tsunami' },
            { id: 31807, label: 'Drought', value: 'drought' },
            { id: 31808, label: 'War', value: 'war' },
            { id: 31809, label: 'Civil Unrest', value: 'civil-unrest' },
            { id: 31810, label: 'Poor Economy', value: 'poor-economy' },
            { id: 31811, label: 'Epedemic', value: 'epedemic' },
            { id: 31812, label: 'Pandemic', value: 'pandemic' },
          ],
        },

        {
          id: 319,
          type: QuestionType.selectN,
          label: 'Current Disaster Phase',
          tags: [Tag.people],
          options: [
            { id: 31900, label: 'Prevention', value: 'prevention' },
            { id: 31901, label: 'Mitigation', value: 'mitigation' },
            { id: 31902, label: 'Preparedness', value: 'preparedness' },
            { id: 31903, label: 'Disaster', value: 'disaster' },
            { id: 31904, label: 'Response', value: 'response' },
            { id: 31905, label: 'Recovery', value: 'recovery' },
            { id: 31906, label: 'Reconstruction', value: 'reconstruction' },
            { id: 31907, label: 'Combination', value: 'combination' },
          ],
        },
        {
          id: 320,
          type: QuestionType.textLong,
          label: '',
          tags: [],
          comment: getRandomComment(),
        },
        {
          id: 321,
          type: QuestionType.textLong,
          label:
            'Is there potential for other combined Disasters to occur during the intended CVA program?',
          tags: [Tag.people],
          comment: getRandomComment(),
        },

        {
          id: 322,
          type: QuestionType.textLong,
          label:
            'Is this disaster potentially reoccuring or in a phase efficacyof the intended CVA Program?',
          tags: [Tag.people],
          comment: getRandomComment(),
        },
      ],
      state: 'pending',
    },
    {
      id: '4',
      name: 'aw-info',
      order: 0,
      label: 'The AWs & volunteers who wants to help the PAs mostly',
      questions: [
        {
          id: 400,
          type: QuestionType.selectN,
          label: 'Languages Spoken',
          tags: [Tag.people],
          options: [
            { id: 40000, label: 'Could be all of below', value: 'all' },
            { id: 40001, label: 'Currently Unknown', value: 'unknown' },
            { id: 40002, label: 'Arabic', value: 'ar' },
            { id: 40003, label: 'English', value: 'en' },
            { id: 40004, label: 'Spanish', value: 'es' },
            { id: 40005, label: 'Dutch', value: 'nl' },
            { id: 40006, label: 'French', value: 'fr' },
            { id: 40007, label: 'Tagalog', value: 'ta' },
            { id: 40008, label: 'Turkana', value: 'tu' },
            { id: 40009, label: 'Samburu', value: 'sa' },
            { id: 40010, label: 'Swahili', value: 'sw' },
          ],
        },
        {
          id: 401,
          type: QuestionType.selectN,
          label: 'literacy',
          tags: [Tag.people],
          options: [
            { id: 40100, label: 'N/a', value: 'n-a' },
            { id: 40101, label: 'Could be all of below', value: 'all' },
            { id: 40102, label: 'Currently Unknown', value: 'unknown' },
            { id: 40103, label: 'Highly literate', value: 'high-literacy' },
            { id: 40104, label: 'No literacy', value: 'no-literacy' },
            { id: 40105, label: 'Illiterate', value: 'illiterate' },
          ],
        },
        {
          id: 402,
          type: QuestionType.selectN,
          label: 'These Digtial Devices available to the AWs',
          tags: [Tag.people],
          options: [
            { id: 40200, label: 'N/a', value: 'n-a' },
            { id: 40201, label: 'Could be all of below', value: 'all' },
            { id: 40202, label: 'Currently Unknown', value: 'unknown' },
            { id: 40203, label: 'land line', value: 'land-line' },
            {
              id: 40204,
              label: 'simcard only with Proxy phone',
              value: 'sim-only-proxy-phone',
            },
            {
              id: 40205,
              label: 'proxy phone with Proxy phone number',
              value: 'proxy-phone-proxy-number',
            },
            {
              id: 40206,
              label: 'mobile feature phone',
              value: 'feature-phone',
            },
            {
              id: 40207,
              label: 'mobile smart phone android',
              value: 'smart-phone-android',
            },
            {
              id: 40208,
              label: 'mobile smart phone iOS',
              value: 'smart-phone-ios',
            },
            { id: 40209, label: 'Tablet android', value: 'tablet-android' },
            { id: 40210, label: 'Tablet iOS', value: 'tablet-ios' },
            { id: 40211, label: 'PC Laptop', value: 'pc-laptop' },
            { id: 40212, label: 'PC Desktop', value: 'pc-desktop' },
          ],
        },
        {
          id: 403,
          type: QuestionType.selectN,
          label: 'access to share on Information sources',
          tags: [Tag.people],
          options: [
            { id: 40300, label: 'N/a', value: 'n-a' },
            { id: 40301, label: 'Could be all of below', value: 'all' },
            { id: 40302, label: 'Currently Unknown', value: 'unknown' },
            {
              id: 40303,
              label: 'Community meetings',
              value: 'community-meetings',
            },
            {
              id: 40304,
              label: 'Religious meetings',
              value: 'religious-meetings',
            },
            { id: 40305, label: 'Radio', value: 'radio' },
            { id: 40306, label: 'TV', value: 'tv' },
            {
              id: 40307,
              label: 'Social media platforms',
              value: 'social-media',
            },
            { id: 40308, label: 'Websites', value: 'websites' },
          ],
        },
        {
          id: 404,
          type: QuestionType.selectN,
          label: 'social media platforms',
          tags: [Tag.people],
          options: [
            { id: 40400, label: 'N/a', value: 'n-a' },
            { id: 40401, label: 'Could be all of below', value: 'all' },
            { id: 40402, label: 'Currently Unknown', value: 'unknown' },
            { id: 40403, label: 'Facebook', value: 'facebook' },
            { id: 40404, label: 'Instagram', value: 'instagram' },
            { id: 40405, label: 'TikTok', value: 'tiktok' },
          ],
        },
        {
          id: 405,
          type: QuestionType.selectN,
          label: 'Communication channels',
          tags: [Tag.people],
          options: [
            { id: 40500, label: 'N/a', value: 'n-a' },
            { id: 40501, label: 'Could be all of below', value: 'all' },
            { id: 40502, label: 'Currently Unknown', value: 'unknown' },
            { id: 40503, label: 'Phone call', value: 'phone-call' },
            { id: 40504, label: 'SMS', value: 'sms' },
            { id: 40505, label: 'WhatsApp', value: 'whatsapp' },
            { id: 40506, label: 'FB Messenger', value: 'fb-messenger' },
            { id: 40507, label: 'Viber', value: 'viber' },
            { id: 40508, label: 'Signal', value: 'signal' },
            { id: 40509, label: 'E-mail', value: 'email' },
          ],
        },
      ],
      state: 'pending',
    },
    {
      id: '5',
      name: 'help-focus',
      order: 0,
      label: 'The people affected we want to help  mostly',
      questions: [
        {
          id: 500,
          type: QuestionType.selectN,
          label: 'Shop in',
          tags: [Tag.data],
          options: [
            { id: 50000, label: 'N/a', value: 'n-a' },
            { id: 50001, label: 'Could be all of below', value: 'all' },
            { id: 50002, label: 'Currently Unknown', value: 'unknown' },
            { id: 50003, label: 'Open air markets', value: 'open-air-markets' },
            { id: 50004, label: 'Supermarkets', value: 'supermarkets' },
            { id: 50005, label: 'Small stores', value: 'small-stores' },
          ],
        },
        {
          id: 501,
          type: QuestionType.selectN,
          label: 'Frequency of shopping',
          tags: [Tag.data],
          options: [
            { id: 50100, label: 'N/a', value: 'n-a' },
            { id: 50101, label: 'Could be all of below', value: 'all' },
            { id: 50102, label: 'Currently Unknown', value: 'unknown' },
            { id: 50103, label: 'Weekly Market', value: 'weekly market' },
            {
              id: 50104,
              label: 'Bi weekly Market (every second week)',
              value: 'bi-weekly-market',
            },
            { id: 50105, label: 'Monthly Market', value: 'monthly-market' },
            { id: 50106, label: 'ad hoc', value: 'ad-hoc' },
          ],
        },
        {
          id: 502,
          type: QuestionType.selectN,
          label: 'location of market food /supplies materials type',
          tags: [Tag.data],
          options: [
            { id: 50200, label: 'N/a', value: 'n-a' },
            { id: 50201, label: 'Could be all of below', value: 'all' },
            { id: 50202, label: 'Currently Unknown', value: 'unknown' },
            {
              id: 50203,
              label: 'travel 30 mins or less walking',
              value: 'travel-30m-walking',
            },
            {
              id: 50204,
              label: 'travel 1 hours or less walking',
              value: 'travel-1h-walking',
            },
            {
              id: 50205,
              label: 'travel 3 hours or less walking',
              value: 'travel-3h-walking',
            },
            {
              id: 50206,
              label: 'travel 30 mins or less paid transport',
              value: 'travel-30m-paid-transport',
            },
            {
              id: 50207,
              label: 'travel 1 hours or less paid transport',
              value: 'travel-1h-paid-transport',
            },
            {
              id: 50208,
              label: 'travel 3 hours or less paid transport',
              value: 'travel-3h-paid-transport',
            },
          ],
        },
        {
          id: 503,
          type: QuestionType.selectN,
          label: 'Basket size',
          tags: [Tag.data],
          options: [
            { id: 50300, label: 'N/a', value: 'n-a' },
            { id: 50301, label: 'Could be all of below', value: 'all' },
            { id: 50302, label: 'Currently Unknown', value: 'unknown' },
          ],
        },
        {
          id: 504,
          type: QuestionType.selectN,
          label: 'Using these currencies',
          tags: [Tag.data],
          options: [
            { id: 50400, label: 'N/a', value: 'n-a' },
            { id: 50401, label: '$ US Dollar', value: 'usd' },
            { id: 50402, label: '€ Euro', value: 'euro' },
            { id: 50403, label: 'CHF Swiss Franc', value: 'chf' },
            { id: 50404, label: 'Kenyan shilling', value: 'Kenyan shilling' },
            { id: 50405, label: 'Ethiopia Birr', value: 'Ethiopia Birr' },
            { id: 50406, label: 'Labanese Pound', value: 'Labanese Pound' },
          ],
        },
        {
          id: 505,
          type: QuestionType.selectN,
          label: 'Use mobile service providers',
          tags: [Tag.data],
          options: [
            { id: 50500, label: 'N/a', value: 'n-a' },
            { id: 50501, label: 'Could be all of below', value: 'all' },
            { id: 50502, label: 'Currently Unknown', value: 'unknown' },
            { id: 50503, label: 'Lebara', value: 'Lebara' },
            { id: 50504, label: 'Hello Cash', value: 'Hello Cash' },
            { id: 50505, label: 'Alfa', value: 'Alfa' },
            { id: 50506, label: 'Touch', value: 'Touch' },
          ],
        },
        {
          id: 506,
          type: QuestionType.selectN,
          label: 'Use financial services of',
          tags: [Tag.data],
          options: [
            { id: 50600, label: 'N/a', value: 'n-a' },
            { id: 50601, label: 'Could be all of below', value: 'all' },
            { id: 50602, label: 'Currently Unknown', value: 'unknown' },
            { id: 50603, label: 'Bank Accounts', value: 'bank-accounts' },
            { id: 50604, label: 'Post offices', value: 'post-offices' },
            {
              id: 50605,
              label: 'Mobile Cash Company',
              value: 'mobile-cash-company',
            },
            {
              id: 50606,
              label: 'Remitence company',
              value: 'remitence-company',
            },
            {
              id: 50607,
              label: 'Communications & Payments Company',
              value: 'communications-payments-company',
            },
          ],
        },
        {
          id: 507,
          type: QuestionType.selectN,
          label: 'Use the following to receive cash',
          tags: [Tag.data],
          options: [
            { id: 50700, label: 'N/a', value: 'n-a' },
            { id: 50701, label: 'Could be all of below', value: 'all' },
            { id: 50702, label: 'Currently Unknown', value: 'unknown' },
            {
              id: 50703,
              label: 'at counter to receive cash',
              value: 'counter-receive-cash',
            },
            {
              id: 50704,
              label: 'at counter to send cash',
              value: 'counter-send-cash',
            },
            { id: 50705, label: 'atm machine with card', value: 'atm-card' },
            {
              id: 50706,
              label: 'online account with card',
              value: 'online-account-card',
            },
            {
              id: 50707,
              label: 'at mobile cash agent with SMS code',
              value: 'mobile-cash-agent-sms',
            },
          ],
        },
        {
          id: 508,
          type: QuestionType.selectN,
          label: 'called',
          tags: [Tag.data],
          options: [
            { id: 50800, label: 'N/a', value: 'n-a' },
            { id: 50801, label: 'Could be all of below', value: 'all' },
            { id: 50802, label: 'Currently Unknown', value: 'unknown' },
            { id: 50803, label: 'MPESA', value: 'mpesa' },
            { id: 50804, label: 'Western Union', value: 'western-union' },
            { id: 50805, label: 'Cashunited', value: 'cashunited' },
            { id: 50806, label: 'Libanpost', value: 'libanpost' },
          ],
        },
        {
          id: 509,
          type: QuestionType.selectN,
          label: 'main company',
          tags: [Tag.data],
          options: [
            { id: 50900, label: 'N/a', value: 'n-a' },
            { id: 50901, label: 'Could be all of below', value: 'all' },
            { id: 50902, label: 'Currently Unknown', value: 'unknown' },
            {
              id: 50903,
              label: `Africa's Talking Ltd`,
              value: 'africas-talking-ltd',
            },
            { id: 50904, label: 'Western Union', value: 'western-union' },
            { id: 50905, label: 'Cashunited', value: 'cashunited' },
            { id: 50906, label: 'Libanpost', value: 'libanpost' },
          ],
        },
      ],
      state: 'pending',
    },
    {
      id: '6',
      name: 'pa-access',
      order: 0,
      label:
        'The people we want to help have physicall & financial & social access to',
      questions: [
        {
          id: 600,
          type: QuestionType.selectN,
          label: 'Energy',
          tags: [Tag.data],
          options: [
            { id: 60000, label: 'N/a', value: 'n-a' },
            { id: 60001, label: 'Could be all of below', value: 'all' },
            { id: 60002, label: 'No electricity ', value: 'no-electricity' },
            { id: 60003, label: 'Electricity ', value: 'electricity' },
            { id: 60004, label: 'other', value: 'other' },
          ],
        },
        {
          id: 601,
          type: QuestionType.selectN,
          label: 'frequency ',
          tags: [Tag.data],
          options: [
            { id: 60100, label: 'N/a', value: 'n-a' },
            { id: 60101, label: 'Could be all of below', value: 'all' },
            { id: 60102, label: 'unknown', value: 'unknown' },
            { id: 60103, label: 'constant ', value: 'constant' },
            { id: 60104, label: 'intermitant ', value: 'intermitant' },
            { id: 60105, label: 'other', value: 'other' },
          ],
        },
        {
          id: 602,
          type: QuestionType.selectN,
          label: 'connectivity',
          tags: [Tag.data],
          options: [
            { id: 60200, label: 'N/a', value: 'n-a' },
            { id: 60201, label: 'Could be all of below', value: 'all' },
            { id: 60202, label: 'no internet', value: 'no internet' },
            { id: 60203, label: 'internet', value: 'internet' },
            { id: 60204, label: 'TV', value: 'tv' },
            { id: 60205, label: 'Radio', value: 'radio' },
          ],
        },
        {
          id: 603,
          type: QuestionType.selectN,
          label: 'frequency ',
          tags: [Tag.data],
          options: [
            { id: 60300, label: 'N/a', value: 'n-a' },
            { id: 60301, label: 'Could be all of below', value: 'all' },
            { id: 60302, label: 'constant ', value: 'constant' },
            { id: 60303, label: 'intermitant ', value: 'intermitant' },
            { id: 60304, label: 'free', value: 'free' },
            { id: 60305, label: 'paid', value: 'paid' },
          ],
        },
        {
          id: 604,
          type: QuestionType.selectN,
          label: 'and access it ',
          tags: [Tag.data],
          options: [],
        },
        {
          id: 605,
          type: QuestionType.selectN,
          label: 'called',
          tags: [Tag.data],
          options: [],
        },
      ],
      state: 'pending',
    },
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
          comment: getRandomComment(),
        },
        {
          id: 101,
          type: QuestionType.textLong,
          label: 'Question for Longer Text-input',
          tags: [Tag.data],
          comment: getRandomComment(),
        },
        {
          id: 102,
          type: QuestionType.numeric,
          label: 'Question for Numeric-input',
          tags: [Tag.people],
          comment: getRandomComment(),
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
          comment: getRandomComment(),
        },
      ],
      state: 'pending',
    },
  ],
};
