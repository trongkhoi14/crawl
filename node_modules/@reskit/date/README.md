## Install

Install `@reskit/date` by `pnpm`

```bash
pnpm add @reskit/date
```

## Usage

> At current version, we only support extract zh localized date

```ts
import { extractDate, updateLocalized } from "@reskit/date";
import { zhLocalize, createZhRegexp } from "@reskit/date";

updateLocalized({
  useRegexp: createZhRegexp(),
  data: zhLocalize,
});

const result = extractDate("今天早上到明天晚上都要开会！");
```

The result will be today's 10:00 and tomorrow's 20:00

## Others

Welcome to contribute and make @reskit/date better!
