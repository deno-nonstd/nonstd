
export class OutOfRangeError extends Error {
  constructor(message: string = "One more values is out of range.") {
    super(message);
    this.name = "OutOfRangeError";
  }
}

export class ArgumentError extends Error {
  constructor(message: string = "One ore more arguments is invalid.") {
    super(message);
    this.name = "ArgumentError";
  }
}

export class InsufficientResourcesError extends Error {
  constructor(message: string = "There are not enough sources to complete this operation.") {
    super(message);
    this.name = "InsufficientResourceError";
  }
}

export const Errors = {
  ArgumentError: ArgumentError,
  OutOfRangeError: OutOfRangeError,
  InsufficientResourcesError: InsufficientResourcesError
};