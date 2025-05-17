const isValidAnswer = (answer: unknown): answer is number => {
  // dialog was close without answer
  if (typeof answer !== 'string') {
    return false;
  }

  const answerNumber = Number.parseInt(answer);

  const isValid = [
    Number.isFinite(answerNumber),
    Number.isInteger(answerNumber),
    answerNumber >= 1,
  ].every(Boolean);

  return isValid;
};

export {
  isValidAnswer,
};
