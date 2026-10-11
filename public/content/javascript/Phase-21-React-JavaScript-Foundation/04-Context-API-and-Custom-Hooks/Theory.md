# Module 4 — Context API & Custom Hooks — Deep-Dive Theoretical Guide

## 1. First Principles & Structural Overview

In standard React data flow, props are passed top-down (parent to child) imperatively. When state must be shared across deeply nested components in disparate tree branches, this leads to **Prop Drilling**—the anti-pattern of explicitly passing props down through intermediate components that do not consume or require that data themselves.

The **Context API** solves prop drilling by providing a mechanism to broadcast data globally down a component tree without manually passing props through every intermediate node. 

**Custom Hooks** provide the complementary abstraction mechanism: while Context provides a way to share **state instances** globally, Custom Hooks provide a way to share **stateful logic and behaviors** reusably across multiple independent component instances.

---

## 2. React Context Engine Mechanics & Fiber Subscriptions

### 2.1 Context Architecture Schema
React Context consists of three primary primitives created via `createContext`:

```javascript
const UserContext = createContext(defaultValue);
```

1. **`ContextObject`:** An internal React container holding `Provider` and `Consumer` component references.
2. **`ContextObject.Provider`:** A React component that accepts a `value` prop and exposes it to all child components nested within its sub-tree.
3. **`useContext(ContextObject)` Hook:** A hook that subscribes the calling functional component to changes in `ContextObject`.

```
                  ┌──────────────────────────────┐
                  │      AuthContext.Provider    │ (value = { user, login })
                  └──────────────┬───────────────┘
                                 │
                   ┌─────────────┴─────────────┐
                   ▼                           ▼
            ┌──────────────┐            ┌──────────────┐
            │   Header     │            │   Sidebar    │ (Does NOT use Context)
            └──────┬───────┘            └──────────────┘
                   │
            ┌──────┴───────┐
            ▼              ▼
     ┌──────────────┐┌──────────────┐
     │  UserProfile ││  LogoutBtn   │ (Subscribed via useContext)
     └──────────────┘└──────────────┘
```

### 2.2 How React Propagates Context Updates
When a component consuming context renders via `useContext(MyContext)`:
1. React registers a **Context Dependency** on that component's Fiber node.
2. When the `value` prop of `MyContext.Provider` changes (determined by `Object.is(prevValue, newValue)`), React initiates a traversal down the Fiber subtree under that Provider.
3. React searches for Fiber nodes marked with matching context dependencies and **forces a re-render** on those subscriber components, bypassing `React.memo` or `shouldComponentUpdate` checks on intermediate ancestors!

> [!IMPORTANT]
> **Context Bypass Behavior:**
> Intermediate components that do **not** consume the Context will not re-render if their own props/state didn't change (assuming they are wrapped in `React.memo` or children prop pattern). However, **every component calling `useContext` will unconditionally re-render** whenever the Provider's `value` reference changes—even if the subscriber only reads a tiny un-updated property of that Context object!

---

## 3. Context Performance Traps & Optimization Patterns

### 3.1 The Uninstantiated Object Trap
The single most common bug in Context API usage is passing inline object literals to the Provider `value` prop.

```javascript
// ❌ CRITICAL PERFORMANCE BUG: Inline object re-instantiated on EVERY render!
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    // { user, loading } creates a NEW object memory address on EVERY render of AuthProvider.
    // ALL context consumers will forced-re-render constantly!
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### 3.2 Fix 1: Value Memoization
Wrap the context object value in `useMemo` so that its reference only updates when state actually changes.

```javascript
// ✅ CORRECT: Memoized value container
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const contextValue = useMemo(() => ({
    user,
    loading,
    setUser
  }), [user, loading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
```

### 3.3 Fix 2: Context Splitting (State vs. Dispatch)
Because subscribers re-render whenever *any* part of the context value updates, split state read values from updater functions into two separate Context providers.

```javascript
const TodoStateContext = createContext(null);
const TodoDispatchContext = createContext(null);

export function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todosReducer, []);

  return (
    <TodoStateContext.Provider value={todos}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// Components that only dispatch actions (e.g. AddTodoButton) subscribe to DispatchContext!
// They will NEVER re-render when 'todos' list state changes!
```

---

## 4. Custom Hooks Architecture & Composition Rules

A **Custom Hook** is a JavaScript function whose name starts with `"use"` and that may call other React Hooks (`useState`, `useEffect`, `useCallback`, `useContext`, etc.).

### 4.1 Fundamentals of Stateful Logic Reuse
Custom Hooks do **not** share state data between component instances; they share **stateful behavioral logic**. Every time a component calls a custom hook, all state and effects declared inside that hook are isolated strictly to that calling component instance.

```
Component A ──► calls useFetch('/api/users') ──► Spawns independent state (data, error)
Component B ──► calls useFetch('/api/posts') ──► Spawns independent state (data, error)
```

### 4.2 Rules of Custom Hook Design
1. **Name Prefix Rule:** Must start with the lowercase prefix `"use"` (e.g., `useAuth`, `useLocalStorage`). This signals to React's ESLint plugin (`eslint-plugin-react-hooks`) to enforce Hook execution rules.
2. **Pure Composable Logic:** Custom hooks should abstract complex side effects, event listeners, or context consumption into clean declarative APIs.
3. **Return Format Conventions:**
   - **Tuple Return (`[value, setter]`):** Best when the hook exposes 1 or 2 primary values where consumer renaming is desirable (e.g., `useToggle`).
   - **Object Return (`{ data, error, isLoading }`):** Best when exposing 3 or more named properties to avoid ordinal parameter index confusion.

---

## 5. Complete Production Code Architectures

### 5.1 Architecture 1: Robust Context + Custom Hook Pattern
```javascript
import React, { createContext, useContext, useState, useMemo } from 'react';

// 1. Internal Context Symbol
const ThemeContext = createContext(undefined);

// 2. Custom Provider Component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom Consumer Hook with Null Safety Guard
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

### 5.2 Architecture 2: Custom API Fetch Hook with Cache & Cancellation
```javascript
import { useState, useEffect, useRef } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Ref cache container across renders
  const cache = useRef({});

  useEffect(() => {
    if (!url) return;

    let isMounted = true;
    const controller = new AbortController();

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      // Return cached data if present
      if (cache.current[url]) {
        setData(cache.current[url]);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        
        // Save to cache
        cache.current[url] = json;

        if (isMounted) {
          setData(json);
        }
      } catch (err) {
        if (err.name !== 'AbortError' && isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
      controller.abort(); // Cancel ongoing HTTP request on unmount/url change
    };
  }, [url]);

  return { data, isLoading, error };
}
```

---

## 6. Anti-Patterns vs. Best Practices

```
┌─────────────────────────────────────────────────────────┐
│                     ANTI-PATTERN                        │
├─────────────────────────────────────────────────────────┤
│ 1. Using Context API as a global state store for high-  │
│    frequency updates (e.g. mouse position, live animations)│
│ 2. Forgetting safety null guards in custom Context hooks│
│ 3. Passing un-memoized object literals in Provider value│
│ 4. Writing monolithic custom hooks that do 10 things     │
└─────────────────────────────────────────────────────────┘
                            ▲
                            │ Contrast
                            ▼
┌─────────────────────────────────────────────────────────┐
│                     BEST PRACTICE                       │
├─────────────────────────────────────────────────────────┤
│ 1. Reserve Context for low-frequency global data (auth, │
│    themes, user settings, localized translations)       │
│ 2. Split State and Dispatch into separate Contexts      │
│ 3. Wrap Context consumption in custom access hooks      │
│ 4. Keep Custom Hooks modular, single-responsibility     │
└─────────────────────────────────────────────────────────┘
```

---

## 7. Senior-Level Interview Questions & Deep-Dive Answers

### Q1: Why is React Context NOT a true State Management tool like Redux or Zustand?
**Answer:**
Context is a **dependency injection / transport mechanism**, not a state management system. Context does not store state itself—it merely propagates a value down a DOM tree segment. Real state management systems provide state storage, state immutability controls, derivation selectors, and fine-grained subscription mechanics. Context lacks selector mechanics: whenever the Context value updates, **all subscribers are forced to re-render**, making Context unsuitable for large, frequently changing atomic state trees.

### Q2: What happens if a component calls `useContext(MyContext)` but no `<MyContext.Provider>` is present above it in the component tree?
**Answer:**
If no matching Provider exists above the consumer component in the render tree, `useContext(MyContext)` returns the `defaultValue` that was passed to `createContext(defaultValue)` when the Context object was instantiated. It will not throw a runtime error automatically unless custom defensive assertions (e.g. `if (!context) throw Error(...)`) are implemented inside a custom access hook.

### Q3: How do Custom Hooks enforce isolated state across different components?
**Answer:**
Custom Hooks do not instantiate global state or shared memory closures. When a component calls a Custom Hook, the React engine executes the Hook's internal primitives (`useState`, `useEffect`, etc.) in the scope of **that calling component's Fiber node**. Thus, invoking `useCounter()` in `ComponentA` attaches a state node to `ComponentA`'s Fiber tree, while calling `useCounter()` in `ComponentB` attaches a separate state node to `ComponentB`'s Fiber tree.

---

## 8. Module Summary & Key Takeaways

1. **Context Purpose:** Context solves Prop Drilling for low-frequency, widely consumed global state (Theme, User Auth, Locale).
2. **Re-render Prevention:** Always memoize Provider `value` props using `useMemo` or split Contexts into State and Dispatch containers.
3. **Custom Hooks Encapsulation:** Abstract stateful side effects and reusable behavior into functions starting with `use`.
4. **Safety Guards:** Export custom consumer hooks (`useAuth`, `useTheme`) that validate Provider existence and throw explicit error boundaries if missing.
