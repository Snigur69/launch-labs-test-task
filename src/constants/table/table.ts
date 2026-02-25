import type { Athlete } from '../../types/athletes.ts';

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export const SEARCH_KEYS: Array<keyof Athlete> = [
  'firstName',
  'lastName',
  'country',
  'sport',
  'status',
];

export const FILTER_KEYS: (keyof Athlete)[] = ['gender', 'status', 'country', 'sport'];
