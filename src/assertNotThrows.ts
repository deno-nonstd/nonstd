

import {
  red,
  green,
  white,
  gray,
  bold,
  stripColor,
} from "https://deno.land/std@v0.56.0/fmt/colors.ts";

import {
  AssertionError
} from "https://deno.land/std@0.56.0/testing/asserts.ts";



interface Constructor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): any;
}


/** Executes a function, expecting it to not throw.  If it does, then it
 * throws.  An error class or a string can be used to indicate an expected
 * deviation and cancel the assert.
 */
export function assertNotThrows<T = void>(
  fn: () => T,
  IgnoreIfErrorIs?: Constructor,
  ignoreIfMsgIncludes?: string,
  msg?: string,
): Error {
  let doesThrow = false;
  let error = null;
  try {
    fn();
  } catch (e) {
    doesThrow = true;

    if (IgnoreIfErrorIs && ignoreIfMsgIncludes) {
      if (
        Object.getPrototypeOf(e) === IgnoreIfErrorIs.prototype &&
        stripColor(e.message).includes(stripColor(ignoreIfMsgIncludes))
      ) {
        doesThrow = false; // Cancel the throw if the filters match
      }
    } else if (
      IgnoreIfErrorIs &&
      (Object.getPrototypeOf(e) === IgnoreIfErrorIs!.prototype)
    ) {
      doesThrow = false; // Cancel the throw if the error filter matches
    } else if (
      ignoreIfMsgIncludes &&
      stripColor(e.message).includes(stripColor(ignoreIfMsgIncludes))
    ) {
      doesThrow = false; // Cancel the throw if the text filter matches
    }

    error = e;
  }

  if (doesThrow) {
    msg = `Expected function to not throw but caught ${error}. ${
      ignoreIfMsgIncludes ? `Text filter='${ignoreIfMsgIncludes}'` : ""
    }. ${msg ? `: ${msg}` : "."}`;
    throw new AssertionError(msg);
  }

  return error;
}

export async function assertNotThrowsAsync<T = void>(
  fn: () => Promise<T>,
  IgnoreIfErrorIs?: Constructor,
  ignoreIfMsgIncludes?: string,
  msg?: string,
): Promise<Error> {
  let doesThrow = false;
  let error = null;
  try {
    await fn();
  } catch (e) {
    doesThrow = true;

    if (IgnoreIfErrorIs && ignoreIfMsgIncludes) {
      if (
        Object.getPrototypeOf(e) === IgnoreIfErrorIs.prototype &&
        stripColor(e.message).includes(stripColor(ignoreIfMsgIncludes))
      ) {
        doesThrow = false; // Cancel the throw if the filters match
      }
    } else if (
      IgnoreIfErrorIs &&
      (Object.getPrototypeOf(e) === IgnoreIfErrorIs!.prototype)
    ) {
      doesThrow = false; // Cancel the throw if the error filter matches
    } else if (
      ignoreIfMsgIncludes &&
      stripColor(e.message).includes(stripColor(ignoreIfMsgIncludes))
    ) {
      doesThrow = false; // Cancel the throw if the text filter matches
    }

    error = e;
  }

  if (doesThrow) {
    msg = `Expected function to not throw but caught ${error}. ${
      ignoreIfMsgIncludes ? `Text filter='${ignoreIfMsgIncludes}'` : ""
    }. ${msg ? `: ${msg}` : "."}`;
    throw new AssertionError(msg);
  }

  return error;
}