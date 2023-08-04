
// Originally from: Official TypeScript document
//
export function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

// Originally from: Official TypeScript document
//
export function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
  obj[key] = value;
}

// Originally from: Official TypeScript document
//
export function getTypedKeys<T>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}


// Originaly from: npm:defined
//
export function isDefined(...args: any[]) {
  for (let i = 0; i < args.length; i++) {
    if (args[i] !== undefined) return args[i];
  }
}

// Originally from: npm:is-plain-obj
//
export function isPlainObj(value: any) {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}




// Originally from: npm:is-arrayish
//
export function isArrayish(obj: any) {
  if (!obj || typeof obj === 'string') {
    return false;
  }

  return obj instanceof Array || Array.isArray(obj) ||
    (obj.length >= 0 && (obj.splice instanceof Function ||
      (Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));
}




// Originally from: npm:simple-swizzle
//
let concat = Array.prototype.concat;
let slice = Array.prototype.slice;

export function swizzle(args: any) {
  let results: any[] = [];

  for (var i = 0, len = args.length; i < len; i++) {
    var arg = args[i];

    if (isArrayish(arg)) {
      // http://jsperf.com/javascript-array-concat-vs-push/98
      results = concat.call(results, slice.call(arg));
    } else {
      results.push(arg);
    }
  }

  return results;
}

swizzle.wrap = function (fn: any) {
  return function () {
    return fn(swizzle(arguments));
  };
};


export interface IPredicate {
  (...args: any[]): boolean;
}

export function union<Predicate extends IPredicate>(
  p: Predicate,
  ...rest: Predicate[]
): Predicate {
  if (rest.length > 0) {
    return <any> function () {
      // @ts-ignore
      return p.apply((this), arguments) || union.apply(this, rest).apply(this, arguments);
    }
  }
  else {
    return p;
  }
}


