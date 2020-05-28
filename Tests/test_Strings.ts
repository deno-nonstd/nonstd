
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
// @ts-ignore
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


let inputA: StringBuilder | any = null;
let inputB: string | any = undefined;
let inputC = "The quick brown fox jumped over the lazy red fox.";
let inputD = "";
let inputE = "  The quick brown fox jumped over the lazy red fox.  ";
let inputF = 500;
let inputG = 25.1;


function reset() {
  inputA = null;
  inputB = undefined;
  inputC = "The quick brown fox jumped over the lazy red fox.";
  inputD = "";
  inputE = "  The quick brown fox jumped over the lazy red fox.  ";
  inputF = 500;
  inputG = 25.1;
}

Deno.test("isNull", async () => {
  assertEquals(isNull(inputA), true);
  assertEquals(isNull(inputB), true);
  assertEquals(isNull(inputC), false);
  assertEquals(isNull(inputF), false);
  assertEquals(isNull(inputG), false);
});

Deno.test("isNullOrEmpty", async () => {
  assertEquals(isNullOrEmpty(inputA), true);
  assertEquals(isNullOrEmpty(inputB), true);
  assertEquals(isNullOrEmpty(inputC), false);
  assertEquals(isNullOrEmpty(inputD), true);
  assertEquals(isNullOrEmpty(inputF), false);
  assertEquals(isNullOrEmpty(inputG), false);
});

Deno.test("isEmpty", async () => {
  assertEquals(isEmpty(inputA), true);
  assertEquals(isEmpty(inputB), true);
  assertEquals(isEmpty(inputC), false);
  assertEquals(isEmpty(inputD), true);
});

Deno.test("isNullOrWS", async () => {
  assertEquals(isNullOrWS(inputA), true);
  assertEquals(isNullOrWS(inputB), true);
  assertEquals(isNullOrWS(inputC), false);
  assertEquals(isNullOrWS(inputD), true);
  assertEquals(isNullOrWS("     "), true);
  assertEquals(isNullOrWS(new StringBuilder("    ")), true);
});

Deno.test("trim", async () => {
  assertEquals(trim(inputA), "");
  assertEquals(trim(inputC), inputC);
  assertEquals(trim(inputE), inputC);
});

Deno.test("startsWith", async () => {
  assertEquals(startsWith(inputC, "The quick"), true);
  assertEquals(startsWith(inputE, "The quick"), false);
  assertEquals(startsWith(inputE, "The quick", 5), false);
  assertEquals(startsWith(inputC, "quick", 15), false);
  assertEquals(startsWith(inputC, "quick", 4), true);
});

Deno.test("endsWith", async () => {
  assertEquals(endsWith(inputC, "fox."), true);
  assertEquals(endsWith(inputC, "fox", 19), true);
  assertEquals(endsWith(inputE, "fox."), false);
});

Deno.test("indexOf", async () => {
  assertEquals(indexOf(inputC, "quick"), 4);
});









