const isValidAnswer = (answer: unknown): answer is number => {
  // dialog was close without answer
  if (typeof answer !== 'number') {
    return false;
  }

  const isValid = [
    Number.isFinite(answer),
    Number.isInteger(answer),
    answer >= 1,
  ].every(Boolean);

  return isValid;
};

export {
  isValidAnswer,
};
