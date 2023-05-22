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

export interface StatusDisplayDetail {
  label: string,
  css: string,
  bg_css: string
}

export interface StatusObjectKeys {
  [key: number]: StatusDisplayDetail // best way to declare a key value pair
}

// TypeScript - chnage this to a record
export const STATUSES: Map<number, StatusDisplayDetail > = new Map(
  [[ NOT_STARTED_CODE, { label: translate(NOT_STARTED), css: 'redButton', bg_css: 'created_bg' } ],
  [ IN_PROGRESS_CODE, { label: translate(IN_PROGRESS), css: 'yellowButton', bg_css: 'in_progress_bg'} ],
  [ ON_HOLD_CODE, { label: translate(ON_HOLD), css: 'blueButton', bg_css: 'on_hold_bg' } ],
  [ DONE_CODE, { label: translate(DONE), css: 'greenButton', bg_css: 'done_bg' } ]]
);