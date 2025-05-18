import { AppEvent, AppEventsController } from '../../../../host';
import { isValidAnswer } from './is-valid-answer';

const submitAnswer = (): void => {
  const answer = prompt('Steps for resolve?');
  const steps = typeof answer === 'string' ? Number.parseInt(answer) : undefined;

  if (!isValidAnswer(steps)) {
    alert('Steps count is not integer!');
    return;
  }

  AppEventsController.instance.sendMessage({
    event: AppEvent.Answer,
    steps,
  });
};

export {
  submitAnswer,
};
