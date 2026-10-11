# Professional Function Design Guidelines

## 1. Single Responsibility Principle (SRP)
- A function should do **one thing**, do it well, and do it completely.
- If a function name contains `And` (e.g., `fetchAndSaveAndFormatData`), break it down into smaller atomic functions.

## 2. Function Naming Best Practices
- Use descriptive **verb + noun** names for actions (`calculateTotal`, `getUserName`, `validateEmail`).
- Use **is/has/should** prefixes for functions returning booleans (`isEven`, `hasPermission`, `shouldRetry`).
- Avoid vague names (`processData`, `doStuff`, `handleIt`).

## 3. Pure Functions & Side-Effect Isolation
- **Pure Functions**: Given the same inputs, always return the exact same output without side-effects.
- Prefer pure functions for calculation, formatting, validation, and data transformation.
- Isolate side-effects (console logs, state mutations) to dedicated handler functions.

## 4. Parameter Management
- Keep parameter count small (ideally 0 to 3 parameters).
- Use default parameters (`name = "Guest"`) instead of checking `if (name === undefined)` inside the body.
- Use rest parameters (`...args`) instead of the legacy `arguments` object.

## 5. Explicit Return & Early Return Guard Clauses
- Always be explicit about return values.
- Use early return guard clauses at the top of a function to handle invalid or boundary cases early, avoiding deep `if...else` nesting.
