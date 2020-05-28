
# **nonstd**

A library of useful features that aren't currently in the Deno std lib.


#### StringBuilder

A StringBuilder is a utility that allows for efficient building of a large string.  This version loosely models the C#/.NET StringBuilder interface.

_To import:_

```TypeScript
import { StringBuilder } from "https://deno.land/x/deno-nonstd/nonstd/mod.ts";
```

_To use:_

```TypeScript
let sb = new StringBuilder();

sb.append("some text 1")
  .append("some text 2");

sb.appendLine("Long text 3...")
  .appendLine("Long text 4...");

let text = sb.toString();
```

The StringBuilder object has a maxCapacity flag which indicates the maximum characters that can be joined together, and a capacity flag that also serves the same purpose, but can be any value lower than maxCapacity.  

To set the maxCapacity beyond the default (1 GB), use the constructor thus:

```TypeScript
let sb = new StringBuilder(maxCapacityValue);
```

You can set the soft capacity level to anything lower than the max.  The max cannot be changed beyond the constructor.  And the `capacity` value cannot be set lower than the current length, or the current max.

```TypeScript
let sb = new StringBuilder();
...
sb.capacity = newCapacityValue;
```

It is possible to clear the current text and start fresh with the `clear()` function:

```TypeScript
...
sb.clear();
```

Because the strings aren't joined until a `toString()` is called, each previous `append()` and `appendLine()` value is still in memory.  If you want to undo a number of recent appends, you can do so by passing a number into the `clearn(howMany)` function thus:

```TypeScript
let sb = new StringBuilder();

sb.append("The quick brown")
  .append("fox jumped")
  .appendLine(" the  lazy")
  .appendLine(" red fox.")
  .append(" <THE END> ");

sb.clear(1);  // removes " <THE END> "
sb.clear(2);  // will remove the " the lazy" and " read fox."
sb.clear();   // will remove everything else.

```

If for any reason it's important to flatten all the text fragments into a single string, you can do so with the `flatten()` function:

```TypeScript
sb.flatten();
```

And you can pass a StringBuilder anywhere you might pass a string, including the constructor if you with to initialize from the text of something else.

