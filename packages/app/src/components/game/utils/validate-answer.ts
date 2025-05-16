const validateAnswer = (answer: ReturnType<typeof prompt>): number => {
  // dialog was close without answer
  if (!answer) {
    throw new Error('stepCount is undefined');
  }

  const answerNumber = Number.parseInt(answer);

  if (!Number.isFinite(answerNumber) || !Number.isInteger(answerNumber)) {
  // TODO (2024.11.17): Show message is not integer
    throw new TypeError('stepCount not integer');
  }

  if (answerNumber < 1) {
  // TODO (2024.11.17): Show message is not positive integer
    throw new Error('stepCountValue not positive');
  }

  return answerNumber;
};

export {
  validateAnswer,
};
