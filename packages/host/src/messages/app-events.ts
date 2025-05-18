import { AppEvent } from '../events/app-event';
import type { IAppEventMessage } from './types/app-event';

type Answer = IAppEventMessage<AppEvent.Answer> & {
  steps: number
};

type TimerStart = IAppEventMessage<AppEvent.TimerStart> & {
  timeout: number
};

type TimerTimeUp = IAppEventMessage<AppEvent.TimerTimeUp>;

type YourTurn = IAppEventMessage<AppEvent.YourTurn> & {
  steps: number
  timeout: number
};

type YourTurnSuccess = IAppEventMessage<AppEvent.YourTurnSuccess>;

type YourTurnTimeUp = IAppEventMessage<AppEvent.YourTurnTimeUp>;

type AppEventMessage = Answer
  | TimerStart
  | TimerTimeUp
  | YourTurn
  | YourTurnSuccess
  | YourTurnTimeUp;

export type {
  AppEventMessage,
};
