import type { TableColumn } from '../../types/table.ts';
import type { Athlete } from '../../types/athletes.ts';

export const TABLE_COLUMNS: TableColumn<Athlete>[] = [
  {
    key: 'firstName',
    label: 'First Name',
  },
  {
    key: 'lastName',
    label: 'Last Name',
  },
  {
    key: 'gender',
    label: 'Gender',
  },
  {
    key: 'age',
    label: 'Age',
  },
  {
    key: 'dateOfBirth',
    label: 'Date of Birth',
  },
  {
    key: 'country',
    label: 'Country',
  },
  {
    key: 'sport',
    label: 'Sport',
  },
  {
    key: 'heightCm',
    label: 'Height (Cm)',
  },
  {
    key: 'weightKg',
    label: 'Weight (Kg)',
  },
  {
    key: 'salaryUsd',
    label: 'Salary (USD)',
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'winRate',
    label: 'Win Rate',
  },
];
