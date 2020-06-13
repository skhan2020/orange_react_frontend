import { translate } from '../localization/service';

export const STUDENT = "student";
export const PROFESSIONAL = "professional";
export const UNDERGRAD = "undergrad";

export const NOT_STARTED = "not_started";
export const IN_PROGRESS = "in_progress";
export const ON_HOLD = "on_hold";
export const DONE = 'done';

export const TRIAL_PERIOD = 15;

export const TAG_LIMIT = 3;

export const STATUSES = new Map(
  [[ 1000, { label: translate(NOT_STARTED), css: 'redButton' } ],
  [ 2000, { label: translate(IN_PROGRESS), css: 'yellowButton'} ],
  [ 3000, { label: translate(ON_HOLD), css: 'blueButton' } ],
  [ 4000, { label: translate(DONE), css: 'greenButton' } ]]
);