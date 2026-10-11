# Capstone Final Project: JavaScript Task Manager

## Overview
A production-ready browser Task Manager application built purely with HTML5, CSS3, and Vanilla JavaScript.

## Application Architecture
- **State Layer**: In-memory JavaScript array of task objects synced with `localStorage`.
- **DOM Engine**: Pure DOM rendering functions for generating task cards, empty states, and counter metrics.
- **Event Handler**: High-performance Event Delegation pattern on main container for handling task completion, editing, and deletion.
- **Form System**: Dynamic form validation for title, category, priority, and due date.

## File Manifest
- `index.html`: Accessible HTML structure.
- `style.css`: Custom responsive design system.
- `app.js`: Primary entry point binding events and initializing state.
- `storage.js`: Storage wrapper for `localStorage` persistence.
- `dom.js`: Pure DOM rendering functions.
- `SAMPLE_TASKS.json`: Initial seed data for testing.
