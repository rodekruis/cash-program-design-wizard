import { QuestionInput } from 'src/app/types/question-input.type';
import { TranslatableString } from 'src/app/types/translatable-string.type';

export const getOptionChoiceAnswer = (
  question: QuestionInput,
  answer: string | string[],
): string | TranslatableString => {
  const chosenOption = question.optionChoices.find(
    (option) => option.name === answer,
  );

  return chosenOption.label;
};
