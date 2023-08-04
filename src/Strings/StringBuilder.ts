
import { Error, isNull, isNullOrEmpty } from "../../mod.ts";


/**
 *  This class is loosely based on the .NET StringBuilder class.  It allows for concatenating
 *   large strings efficiently.
 *
 *  @file StringBuilder is used to efficiently join many strings together.
 *  @author Shawn Bullock <http://github.com/deno-nonstd>
 *  @license MIT
 *
 *  @see https://github.com/deno-nonstd/nonstd
 *
 */

/**
 *  Used to efficiently join many strings together.
 *
 *  @class
 */
export class StringBuilder {
  private _values: string[] = [];
  private _maxCapacity: number = (1024**3); // 1 GB
  private _capacity: number = (1024**2 * 100); // 100 MB
  private _length: number = 0;


  /**
   * Creates the instance of StringBuilder.
   *
   * @param {StringBuilder} value - Start from the output of another StringBuilder.
   * @param {string} value - Start with an initial string if applicable.
   * @memberOf StringBuilder
   *
   */
  constructor(value?: StringBuilder | string | number) {
    this._values = [];

    if (!isNullOrEmpty(value)) {
      if (typeof value === "number" && value >= 0) {
        this._maxCapacity = value;
        this.capacity = value;
      }
      else if (typeof value === "string") {
        this.append(value as string);
      }
      else if (value instanceof StringBuilder) {
        this.append(value.toString());
      }
    }

    return this;
  }

  private ensureCapacity(value: string | StringBuilder): boolean {
    return (this.length + value.length <= this._capacity);
  }


  public append(value: string | StringBuilder) : StringBuilder {
    if (!this.ensureCapacity(value)) {
      throw new Error.InsufficientResourcesError("There is not enough capacity to complete this operation.");
    }

    if (typeof value === "string") {
      this._values.push(value);
    } else {
      this._values.push(value.toString());
    }

    this._length += value.length;
    return this;
  }

  public appendLine(value: string | StringBuilder) : StringBuilder {
    return this.append(value + "\n");
  }

  public clear(count?: number): StringBuilder {
    if (!isNullOrEmpty(count) && count as number > 0) {
      for ( ; count as number > 0; (count as number)--) {
        this._length -= this._values[(count as number)-1].length;
        this._values.pop();
      }
    }
    else {
      this._values = [];
      this._length = 0;
    }

    return this;
  }

  public toString(): string {
    return this._values.join("");
  }


  public get length(): number {
    return this._length;
  }


  public set capacity(capacity: number) {
    if (isNull(capacity) || capacity <= 0) {
      throw new Error.ArgumentError("Capacity must be a valid positive integer.");
    }

    if (capacity < this.length) {
      throw new Error.OutOfRangeError("Cannot set capacity less than current length.");
    }
    else if (capacity > this._maxCapacity) {
      throw new Error.OutOfRangeError(`Cannot set capacity more than maxCapacity of: ${this._maxCapacity} bytes.`);
    }
    else {
      this._capacity = capacity;
    }
  }


  public flatten(): void {
    let temp = this.toString();
    this.clear();
    this.append(temp);
  }


  public get capacity(): number {
    return this._capacity;
  }

  public get maxCapacity(): number {
    return this._maxCapacity;
  }

  public get fragments(): number {
    return this._values.length;
  }
}


