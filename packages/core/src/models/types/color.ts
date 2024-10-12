type RobotColor = 'blue' | 'green' | 'yellow' | 'red' | 'grey';
type TokenColor = Exclude<RobotColor, 'grey'>;

export type {
  RobotColor,
  TokenColor,
};