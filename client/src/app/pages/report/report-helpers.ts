import { QuestionInput } from 'src/app/types/question-input.type';

export const flatten = (arr) =>
  arr.reduce(
    (a, b) => (Array.isArray(b) ? [...a, ...flatten(b)] : [...a, b]),
    [],
  );

export const getOptionChoiceAnswer = (
  question: QuestionInput,
  answer: string | string[],
): string => {
  const chosenOption = question.optionChoices.find(
    (option) => option.name === answer,
  );

  return chosenOption.label as string;
};
