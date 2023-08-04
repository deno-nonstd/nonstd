
import { assertThrows, assertThrowsAsync } from "https://deno.land/std@v0.56.0/testing/asserts.ts";
import { assertNotThrows, assertNotThrowsAsync } from "../src/assertNotThrows.ts";

import {Errors} from "../src/Errors.ts";
let { test } = Deno;


test("testingAssertNotThrows", async () => {
  class OtherError extends Error {
    constructor(msg?: string) { super(msg); }
  }

  class AnotherError extends Error {
    constructor(msg?: string) { super(msg); }
  }

  assertThrows( () => {
    assertNotThrows(() => { throw new Error(); });     // does throw
  });
  assertNotThrows( () => { throw new OtherError() }, OtherError);   // filters known error
  assertThrows( () => {
    assertNotThrows( () => { throw new OtherError("error"); }, undefined, "hello"); // throws because different filter text
  });
  assertNotThrows( () => { throw new OtherError("Hello world"); }, undefined, "Hello"); // filters known text
  assertThrows( () => {
    assertNotThrows(() => { throw new OtherError("goodbye") }, Errors.OutOfRangeError, "hello"); // does throw based on filtered error, different text
  });
  assertThrows( () => {
    assertNotThrows(() => { throw new AnotherError("hello") }, OtherError, "hello"); // does throw based on different error, filtered tex
  });
  assertThrows( () => {
    assertNotThrows(() => { throw new AnotherError("hello") }, OtherError, "goodbye"); // does throw based on different error, different text
  });
  assertNotThrows(() => { throw new OtherError("hello") }, OtherError, "hello"); // does not throw based on filtered error, filtered text
});

test("testingAssertNotThrowsAsync", async () => {
  class OtherError extends Error {
    constructor(msg?: string) { super(msg); }
  }

  class AnotherError extends Error {
    constructor(msg?: string) { super(msg); }
  }

  await assertThrowsAsync( async () => {
    await assertNotThrowsAsync(async () => { throw new Error(); });     // does throw
  });
  await assertNotThrowsAsync( async () => { throw new OtherError() }, OtherError);   // filters known error
  await assertThrowsAsync( async () => {
    await assertNotThrowsAsync( async () => { throw new OtherError("error"); }, undefined, "hello"); // throws because different filter text
  });
  await assertNotThrowsAsync( async () => { throw new OtherError("Hello world"); }, undefined, "Hello"); // filters known text
  await assertThrowsAsync( async () => {
    await assertNotThrowsAsync(async () => { throw new OtherError("goodbye") }, Errors.OutOfRangeError, "hello"); // does throw based on filtered error, different text
  });
  await assertThrowsAsync( async () => {
    await assertNotThrowsAsync(async () => { throw new AnotherError("hello") }, OtherError, "hello"); // does throw based on different error, filtered tex
  });
  await assertThrowsAsync( async () => {
    await assertNotThrowsAsync(async () => { throw new AnotherError("hello") }, OtherError, "goodbye"); // does throw based on different error, different text
  });
  await assertNotThrowsAsync(async() => { throw new OtherError("hello") }, OtherError, "hello"); // does not throw based on filtered error, filtered text
});