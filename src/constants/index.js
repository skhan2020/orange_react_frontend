import { translate } from '../localization/service';

export const STUDENT = "student";
export const PROFESSIONAL = "professional";
export const UNDERGRAD = "undergrad";

export const NOT_STARTED = "not_started";
export const IN_PROGRESS = "in_progress";
export const ON_HOLD = "on_hold";
export const DONE = 'done';

export const NOT_STARTED_CODE = 1000;
export const IN_PROGRESS_CODE = 2000;
export const ON_HOLD_CODE = 3000;
export const DONE_CODE = 4000;

export const TRIAL_PERIOD = 15;

export const TAG_LIMIT = 3;

export const STATUSES = new Map(
  [[ NOT_STARTED_CODE, { label: translate(NOT_STARTED), css: 'redButton' } ],
  [ IN_PROGRESS_CODE, { label: translate(IN_PROGRESS), css: 'yellowButton'} ],
  [ ON_HOLD_CODE, { label: translate(ON_HOLD), css: 'blueButton' } ],
  [ DONE_CODE, { label: translate(DONE), css: 'greenButton' } ]]
);