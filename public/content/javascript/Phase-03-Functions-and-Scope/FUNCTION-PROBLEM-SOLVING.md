# 9-Step Function Problem-Solving Framework

When tasked with designing a function, systematically ask and answer these 9 questions before writing code:

1. **What is the goal of this function?** (State its single responsibility in one sentence).
2. **What are the required inputs (parameters)?** (Define their expected data types and names).
3. **What is the expected output (return value)?** (Define type and format).
4. **What are valid inputs vs invalid inputs?** (Handle boundary cases).
5. **What are the edge cases?** (`undefined`, `null`, `0`, `""`, empty arrays `[]`).
6. **Does it need helper functions or function composition?** (Break complex logic into pipelines).
7. **Is the function pure or impure?** (Ensure no unexpected external mutations occur).
8. **Can it be reused across different scenarios?** (Avoid hardcoding specific values).
9. **How will I manually test this function?** (Define test cases with `console.log(fn(input) === expected)`).
