export enum GenderEnum {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
    NOTPROVIDED = 'NOTPROVIDED'
  }

  export type Gender = keyof typeof GenderEnum;