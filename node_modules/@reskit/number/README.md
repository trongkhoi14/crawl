## Install

Install `@reskit/number` by `pnpm`

```shell
pnpm add @reskit/number
```

## Setup

```ts
import { extractNumber } from "@reskit/number";

const result = extractNumber("The numbers are: 1. 3030.222 and 899.90");
```

The kit will extract number from text, console will output

```bash
[1, 3030.222, 899.9]
```

## Localized

Before use `@reskit/number` to extract localized number, you should set localized data.

> At current version , we only have build in chinese data

```typescript
import { extractNumber, updateLocalized, replaceNumber } from "@reskit/number";
import { zhLocalize, zhAlgorithm, createZhRegexp } from "@reskit/number";

updateLocalized(
  {
    ...zhLocalize,
    regexp: createZhRegexp(),
  },
  zhAlgorithm
);
```

After prepared, run a test demo

```typescript
const result = extractNumber(
  "我想明天中午十二点和三个人走1千多米，花费十七点五万元，有百分之四十的概率温度在二十三摄氏度"
);

console.info(result);
```

The console will output:

```text
[12, 3, 1000, 175000, 0.4, 23]
```

## Functions

### Extract Decimal

```typescript
const result = extractNumber("整个路程有1.2千米");
```

The console will output:

```bash
result: [1200]
```

### Extract Fraction

```typescript
const result = extractNumber("这里有四分之三的人在说活");
```

The console will output:

```bash
result: [0.75]
```

### Extract Negative Number

```typescript
const result = extractNumber("答案是负的一又十分之四");
```

The console will output:

```bash
result: [-1.4]
```

### Keep raw text

```typescript
const result = extractNumber(
  "我想订明天中午十二点的餐馆，三个人，走路1千多米能到，十七点五万元以内，预留手机号为18619994211，明天二十三摄氏度",
  false
);
```

The console will output:

```bash
result: ["十二", "三", "1千", "十七点五万", "18619994211", "二十三"]
```

### Just replace number

```typescript
const result = replaceNumber("造价在十七点五万元以内");
```

The console will output:

```bash
result: 造价在175000元以内
```

## Others

Welcome to create PR and make reskit/number support your country's language!
