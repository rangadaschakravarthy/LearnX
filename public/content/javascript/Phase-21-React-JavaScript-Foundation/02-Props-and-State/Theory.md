# Module 02 — Props, State & Immutability — Detailed Theory

Welcome to **Module 02** of the React JavaScript Foundation phase. Data management in React relies on two core concepts: **Props** (external input data passed down from parents) and **State** (internal mutable component memory managed via `useState`).

This guide provides an exhaustive theoretical foundation covering Unidirectional Data Flow, Props Immutability, `useState` hook mechanics, Functional State Updates, State Immutability, and React 18 Automatic Batching.

---

## 1. Unidirectional Data Flow & Props

React enforces a **Unidirectional (Top-Down) Data Flow**. Data flows downwards from parent components to child components via **Props**.

```
[ Parent Component (Holds State) ]
               │
               ▼ (Passes Props)
 [ Child Component (Read-Only Props) ]
```

### 1.1 Props are Immutable (Read-Only)
A child component must **NEVER mutate its own props**! Props are read-only input snapshots owned by the parent component.

```jsx
// 🟢 CORRECT: Read-only Props Usage
function UserCard({ name, role }) {
  return <div>{name} ({role})</div>;
}

// 🚨 BROKEN: Mutating Props directly (Forbidden in React!)
function BadCard(props) {
  // props.name = "Mutated"; // TypeError: Cannot assign to read only property!
}
```

---

## 2. Component Memory: The `useState` Hook

State allows a component to "remember" information between render cycles and trigger UI re-renders when state updates occur.

```jsx
import { useState } from "react";

function Counter() {
  // Signature: const [currentState, setStateFunction] = useState(initialState);
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

---

## 3. Functional State Updates & Stale Closures

Because `setState` calls do not mutate state immediately (state updates are scheduled for the next render), relying on the current state variable during multiple rapid state updates causes **Stale Closure Bugs**:

```jsx
function StaleCounter() {
  const [count, setCount] = useState(0);

  const handleTripleIncrementBroken = () => {
    // BROKEN: All 3 calls read 'count' as 0 from the current closure!
    setCount(count + 1); // setCount(0 + 1)
    setCount(count + 1); // setCount(0 + 1)
    setCount(count + 1); // setCount(0 + 1)
    // Result: count becomes 1, NOT 3!
  };

  const handleTripleIncrementCorrect = () => {
    // 🟢 CORRECT: Pass Functional State Updater (prev => prev + 1)!
    setCount(prev => prev + 1); // 0 -> 1
    setCount(prev => prev + 1); // 1 -> 2
    setCount(prev => prev + 1); // 2 -> 3
    // Result: count becomes 3!
  };
}
```

> [!IMPORTANT]
> Always use the **Functional Updater Form (`setState(prev => ...)` )** whenever the new state depends on the previous state value!

---

## 4. State Immutability & Object/Array Updates

In React, state must be treated as **Immutable**. Never mutate object or array state properties directly; always pass a new object/array copy to `setState`:

```jsx
const [user, setUser] = useState({ name: "Alice", age: 25 });

// 🚨 BROKEN: Direct State Mutation (React will NOT re-render!)
// user.age = 26;
// setUser(user); // Object reference is identical; React skips re-render!

// 🟢 CORRECT: Immutable Update via Spread Operator
setUser(prevUser => ({
  ...prevUser,
  age: 26 // Overwrite age property on a brand new object instance
}));

// 🟢 CORRECT: Immutable Array Update
const [items, setItems] = useState([1, 2, 3]);
setItems(prevItems => [...prevItems, 4]); // Append new item
```

---

## 5. React 18 Automatic Batching

**Batching** is when React groups multiple state updates into a single re-render pass for better performance.

Prior to React 18, React batched state updates only inside React event handlers (`onClick`). In **React 18**, **Automatic Batching** groups all state updates—even inside `setTimeout`, promises, or native event handlers—into a single re-render!

```jsx
// React 18 Automatic Batching Example:
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 18 triggers ONLY 1 single re-render for both state updates combined!
}, 1000);
```

---

## 6. Senior Interview Questions & Answers

### Q1: Why must React state be treated as immutable?
* **Answer**: React uses shallow reference equality comparison (`Object.is(prevState, nextState)`) to determine whether a component's state has changed and needs a re-render. If you mutate an object or array state property directly (`user.age = 26; setUser(user)`), the object memory reference address remains identical. React's diffing engine detects identical reference pointers and assumes no change occurred, failing to trigger a component re-render. Returning a new object copy (`setUser({ ...user, age: 26 })`) creates a new memory address pointer, notifying React to trigger a re-render.

### Q2: What is the difference between direct state updates (`setCount(count + 1)`) and functional state updates (`setCount(c => c + 1)`)?
* **Answer**: Direct state updates compute the new value using the state variable captured in the current render's closure frame. If multiple state updates are scheduled in rapid succession within the same handler event turn, all direct updates evaluate against the same stale closure snapshot. Functional state updates (`setState(prev => ...)` ) receive the latest pending state value from React's state queue, guaranteeing accurate incremental updates.

---

## 7. Summary & Key Takeaways

1. **Unidirectional Flow**: Props flow down from parents to children and are strictly read-only.
2. **`useState`**: Provides component memory and schedules re-renders.
3. **Functional Updaters**: Use `setCount(prev => prev + 1)` when new state depends on previous state.
4. **State Immutability**: Always return new object/array copies (`{ ...prev }`, `[...prev]`) to trigger re-renders.
5. **Automatic Batching**: React 18 batches state updates across promises and timers into single re-renders.
