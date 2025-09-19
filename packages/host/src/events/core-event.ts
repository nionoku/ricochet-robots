enum CoreEvent {
  Ready = 'core:ready',
  GenerateInitialRobotsCoords = 'core:generate_initial_robots_coords',
  InitialRobotsCoords = 'core:initial_robots_coords',
  ConfigureGame = 'core:configure_game',
  EnableMoveRobots = 'core:enable_move_robots',
  DisableMoveRobots = 'core:disable_move_robots',
  SetTargetToken = 'core:set_target_token',
  SelectRobot = 'core:select_robot',
  SelectPrevRobot = 'core:select_prev_robot',
  SelectNextRobot = 'core:select_next_robot',
  MoveRobot = 'core:move_robot',
  RobotMoved = 'core:robot_moved',
  TokenAchieved = 'core:token_achieved',
}

export {
  CoreEvent,
};
