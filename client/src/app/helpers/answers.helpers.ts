import { QuestionInput } from 'src/app/types/question-input.type';
import {
  QuestionSection,
  QuestionSubsection,
} from 'src/app/types/question-section.type';

export const flatten = (arr) =>
  arr.reduce(
    (a, b) => (Array.isArray(b) ? [...a, ...flatten(b)] : [...a, b]),
    [],
  );

export type AnswerSet = {
  name: string;
  answer: string | string[];
  answerUpdated: string | Date;
  question: QuestionInput;
};

export type QuestionSet = {
  name: string;
  sectionName: string;
};

export const getAllQuestionsFromSections = (
  sections: QuestionSection[],
): QuestionInput[] => {
  const subsections = flatten(
    sections.map((section) => section.subsections),
  ) as QuestionSubsection[];
  const questions = flatten(
    subsections.map((subsection) => subsection.questions),
  ) as QuestionInput[];

  return questions;
};

export const createAnswersSet = (questions: QuestionInput[]): AnswerSet[] => {
  const answers = questions
    .filter((question) => !!question.answer)
    .map((question) => ({
      name: question.name,
      answer: question.answer,
      answerUpdated: question.answerUpdated,
      question,
    }));
  return answers;
};

export const createAllQuestionsSet = (
  questions: QuestionInput[],
): QuestionSet[] => {
  const emptyAnswers = questions.map((question) => ({
    name: question.name,
    sectionName: question.sectionName,
  }));
  return emptyAnswers;
};

export const getLatestAnswerDate = (answers: AnswerSet[]): Date | string => {
  if (!answers.length) {
    return '';
  }
  // Sort latest first
  answers.sort((a, b) => (a.answerUpdated > b.answerUpdated ? -1 : 1));

  return answers[0].answerUpdated;
};

export const getOptionChoiceAnswer = (
  question: QuestionInput,
  answer: string | string[],
): string => {
  const chosenOption = question.optionChoices.find(
    (option) => option.name === answer,
  );

  return chosenOption.label as string;
};
