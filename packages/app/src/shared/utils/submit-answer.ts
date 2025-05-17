import { MessageControllerInstance } from '../../controllers/messages';
import { isValidAnswer } from './is-valid-answer';

const submitAnswer = (): void => {
  const answer = prompt('Steps for resolve?');
  const steps = typeof answer === 'string' ? Number.parseInt(answer) : undefined;

  if (!isValidAnswer(steps)) {
    alert('Steps count is not integer!');
    return;
  }

  // DEBUG !!! REMOVE AFTER TESTS
  MessageControllerInstance.sendMessage({
    event: 'enable',
  });
  // DEBUG !!! REMOVE AFTER TESTS

  MessageControllerInstance.sendMessage({
    event: 'answer',
    steps,
  });
};

export {
  submitAnswer,
};
