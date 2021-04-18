import { InvalidValueException } from "../exceptions/InvalidValueException";
import { NullOrUndefinedException } from "../exceptions/NullOrUndefinedException";
import { OutOfRangeException } from "../exceptions/OutOfRangeException";

export interface IValidatorArgument {
  argument: any;
  argumentName: string;
}

export type ValidatorArgumentCollection = IValidatorArgument[];

export class Validator {
  public static notNullOrUndefined (argument: any, argumentName: string): void {
    if (Validator.isNullOrUndefined(argument)) {
      throw new NullOrUndefinedException(`${argumentName} is null or undefined`);
    }
  }

  public static isNullOrUndefined(argument: any): boolean {
    return (argument === null || argument === undefined);
  }

  public static notNullOrUndefinedBulk(args: ValidatorArgumentCollection): void {
    for (let arg of args) {
      this.notNullOrUndefined(arg.argument, arg.argumentName);
    }
  }

  public static isOneOf (value: any, validValues: any[], argumentName: string) : void {
    let isValid = false;
    for (let validValue of validValues) {
      if (value === validValue) {
        isValid = true;
      }
    }

    if (!isValid) {
      throw new InvalidValueException(`${argumentName} isn't oneOf the correct types in ${JSON.stringify(validValues)}. Got "${value}".`);
    }
  }

  public static inRange (num: number, min: number, max: number, argumentName: string) : void {
    const isInRange = num >= min && num <= max;
    if (!isInRange) {
      throw new OutOfRangeException(`${argumentName} is not within range ${min} to ${max}.`);
    }
  }

  public static allInRange (numbers: number[], min: number, max: number, argumentName: string) : void {
    for(let num of numbers) {
      this.inRange(num, min, max, argumentName);
    }
  }
}