
import {
  AssertionError,
  equal,
  assert,
  assertEquals,
  assertNotEquals,
  assertStrictEq,
  assertStrContains,
  assertArrayContains,
  assertMatch,
  fail,
  assertThrows,
  assertThrowsAsync,
  unimplemented,
  unreachable
} from "https://deno.land/std/testing/asserts.ts";


import {
  StringBuilder,

  isNull,
  isNullOrEmpty,
  isEmpty,
  isNullOrWS,
  trim,
  startsWith,
  endsWith,
  indexOf
// @ts-ignore
} from "../mod.ts";


Deno.test("new", async () => {
  let sb = new StringBuilder();

  assertEquals(isNull(sb), false, "StringBuilder should not be null.");
  assertEquals(sb.maxCapacity, 1024**3, `maxCapacity must be ${1024**3} bytes.`);
  assertEquals(sb.capacity, 1024**2 * 100, `default capacity should be ${1024**2 * 100} bytes.`);
  assertEquals(sb.length, 0, "length should be zero.");

  sb = new StringBuilder("Hello");

  assertEquals(sb.length, 5, "length should be 5.");
  assertEquals(sb.toString(), "Hello", "Contents should be 'Hello'.");

  let sb2 = new StringBuilder(sb);

  assertEquals(isNull(sb2), false, "StringBuilder should not be null.");
  assertEquals(sb2.length, 5, "length should be 5.");
  assertEquals(sb2.toString(), "Hello", "Contents should be 'Hello'.");
});

Deno.test("append", async () => {
  let sb = new StringBuilder();

  sb.append("The ")
    .append("quick ")
    .append("brown ")
    .append("fox");

  assertEquals(sb.toString(), "The quick brown fox", "Expect 'The quick brown fox'");

  let sb2 = new StringBuilder(sb);

  sb2.append("The ")
    .append("quick ")
    .append("brown ")
    .append("fox");

  assertEquals(sb2.toString(), "The quick brown foxThe quick brown fox");
});

Deno.test("appendLine", async () => {
  let sb = new StringBuilder();

  sb.appendLine("The")
    .appendLine("quick")
    .appendLine("brown")
    .appendLine("fox");

  assertEquals(sb.toString(), "The\nquick\nbrown\nfox\n", "Expect 'The quick brown fox' each word on a new line.");
});

/* INTERNAL ONLY: uncomment if we need to test ensureCapacity directly, it needs to be made public for that.  But
 *                 append and appendLine do all the checks and we have tests to make sure capacity is ensured.  Not
 *                 a strong need to test directly except that it returns bool rather than exceptions.
 *

Deno.test("ensureCapacity", async () => {
  let sb = new StringBuilder();

  let chunk = "          ";
  let capacity = 500;
  let ensured = false;

  sb.capacity = capacity;
  assertEquals(sb.capacity, capacity, `Expect capacity to be ${capacity} got ${sb.capacity}.`);

  for (let i=0; i<capacity; i++) {
    if (sb.ensureCapacity(chunk) === false) {
      ensured = true;
      break;
    }
    sb.append(chunk);
  }

  assertEquals(ensured, true, "Expected ensuredCapacity to trigger a false.");
});
*/

Deno.test("Modify capacities", async () => {
  let sb = new StringBuilder(500); // maxCapacity = 500 bytes

  assertEquals(sb.maxCapacity, 500, `Expect maxCapacity to be 500. Instead got ${sb.maxCapacity}`);
  assertEquals(sb.capacity, 500, `Expect capacity to equal same as maxCapacity.`);

  for (let i=0; i<150; i++) {
    sb.append(" ");
  }

  assertEquals(sb.length, 150);

  assertThrows(() => { sb.capacity = 100; });
  assertThrows(() => { sb.capacity = 1000; });
  assertEquals(sb.capacity === 500, true);

  sb.capacity = 400;
  assertEquals(sb.capacity === 400, true);
  assertEquals(sb.maxCapacity === 500, true);
});

Deno.test("Append beyond capacity", async () => {
  let sb = new StringBuilder(25);

  assertEquals(sb.capacity === 25, true);
  assertEquals(sb.length === 0, true);

  sb.append("                    ");
  sb.append("     ");

  assertEquals(sb.length === 25, true);

  assertThrows(() => { sb.append(" "); });
});

Deno.test("AppendLine beyond capacity", async () => {
  let sb = new StringBuilder(25);

  assertEquals(sb.capacity === 25, true);
  assertEquals(sb.length === 0, true);

  sb.appendLine("                   ");
  sb.appendLine("    ");

  assertEquals(sb.length === 25, true);

  assertThrows(() => { sb.appendLine(" "); });
});

Deno.test("clear", async () => {
  let sb = new StringBuilder();

  sb.append("1");
  sb.append("2");
  sb.append("3");
  sb.append("4");
  sb.append("5");

  assertEquals(sb.fragments === 5, true, "Expect 5 fragments.");
  sb.clear(1);
  assertEquals(sb.fragments === 4, true, "Expect 4 fragments.");
  sb.clear(2);
  assertEquals(sb.fragments === 2, true, "Expect 2 fragments.");
  assertEquals(sb.toString(), "12", "Expect '12'.");

  sb.append("3");
  sb.append("4");
  sb.append("5");

  assertEquals(sb.fragments === 5, true, "Expect 5 fragments.");
  assertEquals(sb.length === 5, true, "Expect length to be 5.");
  assertEquals(sb.toString() === "12345", true, "Expect 12345");

  sb.clear();

  assertEquals(sb.length === 0, true, "Expect length to be zero.");
  assertEquals(sb.toString() === "", true, "Expect empty string.");
  assertEquals(sb.fragments === 0, true, "Expect zero fragments.");
});

Deno.test("flatten", async () => {
  let sb = new StringBuilder();

  sb.append("1");
  sb.append("2");
  sb.append("3");
  sb.append("4");
  sb.append("5");

  assertEquals(sb.fragments === 5, true, "Expect 5 fragments.");
  sb.flatten();
  assertEquals(sb.fragments === 1, true, "Expect 1 fragment.");
  assertEquals(sb.toString() === "12345", true, "Expect '12345'.");
});


