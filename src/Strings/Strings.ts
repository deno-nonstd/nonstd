

import {StringBuilder} from "./StringBuilder.ts";

export type Inputs = StringBuilder | string | undefined;
export type InputsEx = Inputs | number;


export function isNull(value: InputsEx): boolean {
  return value === null || value === undefined;
}

export function isNullOrEmpty(value: InputsEx): boolean {
  if (isNull(value)) {
    return true;
  }

  if (typeof value === "string") {
    return value.length === 0;
  }

  if (typeof value === "number") {
    return isNaN(value as number);
  }

  if (value instanceof StringBuilder) {
    return value.length === 0;
  }

  return false;
}

export function isEmpty(value: Inputs): boolean {
  if (isNull(value)) {
    return true;
  }

  if (value instanceof StringBuilder) {
    return value.toString().trim().length === 0;
  }

  // @ts-ignore
  return value.trim().length === 0;
}

export function isNullOrWS(value: Inputs): boolean {
  if (isNullOrEmpty(value)) {
    return true;
  }

  return isEmpty(value);
}

export function trim(value: Inputs): string {
  if (isNull(value)) {
    return "";
  }

  if (value instanceof StringBuilder) {
    return value.toString().trim();
  }

  return String(value).trim();
}

export function startsWith(text: Inputs, target: string, startAt: number = 0): boolean {
  if (isNull(text)) {
    return false;
  }

  let temp = "";

  if (text instanceof StringBuilder) {
    temp = text.toString();
  }
  else {
    temp = String(text);
  }

  let { length } = temp;
  return temp.slice(startAt, startAt + target.length) === target;
}

export function endsWith(text: Inputs, target: string, endAt: number = 0): boolean {
  if (isNull(text)) {
    return false;
  }

  let temp = "";

  if (text instanceof StringBuilder) {
    temp = text.toString();
  }
  else {
    temp = String(text);
  }

  let { length } = temp;

  if (endAt === 0) {
    endAt = length;
  }

  let startAt = endAt - target.length;
  return endAt >= 0 && temp.slice(startAt, endAt) === target;
}

export function indexOf(text: Inputs, target: string, pos?: number): number {
  if (isNullOrEmpty(text)) {
    return -1;
  }

  if (text instanceof StringBuilder) {
    return text.toString().indexOf(target, pos);
  }
  else if (typeof text === 'string') {
    return text.indexOf(target, pos);
  }
  else {
    return -1;
  }
}
