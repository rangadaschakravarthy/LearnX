# Phase 8: Easy Practice Problems

## Overview
30 foundational DOM selection, element reading, style modification, and basic click event listener exercises.

---

### Problem 1: Select Heading by ID
Select element with ID `"main-title"` using `getElementById()` and log its text content.

### Problem 2: Change Paragraph Text
Select paragraph with class `"description"` using `querySelector()` and update its `textContent` to `"Updated Content"`.

### Problem 3: Count Paragraphs
Select all `<p>` elements using `querySelectorAll()` and log the total count.

### Problem 4: Add CSS Class
Select a button with ID `"submit-btn"` and add the class `"active"` using `classList.add()`.

### Problem 5: Remove CSS Class
Select an element with ID `"card"` and remove class `"hidden"` using `classList.remove()`.

### Problem 6: Toggle CSS Class
Select an element with ID `"nav-menu"` and toggle class `"open"` on click.

### Problem 7: Set Inline Color Style
Select an element with ID `"status-msg"` and set `style.color = "red"`.

### Problem 8: Read Input Value
Select an input element with ID `"username"` and log its `value`.

### Problem 9: Clear Input Field
Select an input field with ID `"search-box"` and set its value to an empty string.

### Problem 10: Set Attribute
Select an image element with ID `"avatar"` and set its `alt` attribute to `"User Avatar"`.

### Problem 11: Get Attribute
Select an anchor tag with ID `"link"` and log its `href` attribute.

### Problem 12: Check Attribute Presence
Write a function checking if an element with ID `"banner"` has attribute `"data-promoted"`.

### Problem 13: Append Child Element
Create a new `<li>` element with text `"Item 1"` and append it to `<ul id="list">`.

### Problem 14: Prepend Element
Create a `<div>` element and prepend it to `<div id="container">`.

### Problem 15: Remove Element Node
Select element with ID `"old-banner"` and call its `.remove()` method.

### Problem 16: Read Data Attribute
Select element with ID `"user-card"` and read `dataset.userId`.

### Problem 17: Set Data Attribute
Select element with ID `"item-1"` and set `dataset.status = "completed"`.

### Problem 18: Handle Click Event
Attach a click listener to button `#btn` that displays an alert `"Clicked!"`.

### Problem 19: Change Button Text on Click
Attach click listener to button `#btn` that changes its own text to `"Processing..."`.

### Problem 20: Change Background Color on Hover
Attach `mouseenter` and `mouseleave` event listeners to `#card` to change background color.

### Problem 21: Count Button Clicks
Maintain a count variable and increment it every time `#click-counter-btn` is clicked.

### Problem 22: Disable Button
Select button `#submit` and set its `disabled` property to `true`.

### Problem 23: Enable Button
Select button `#submit` and set `disabled = false`.

### Problem 24: Check Checkbox State
Select checkbox `#agree` and log whether it is `checked`.

### Problem 25: Hide Element via Style
Set `style.display = "none"` on element `#modal`.

### Problem 26: Show Element via Style
Set `style.display = "block"` on element `#modal`.

### Problem 27: Get Parent Element
Select element `#child` and log its `parentElement.id`.

### Problem 28: Get First Child Element
Select list `#my-list` and log text content of `firstElementChild`.

### Problem 29: Get Next Sibling
Select element `#step-1` and update background of `nextElementSibling`.

### Problem 30: Simple Timer Update
Use `setTimeout` to change text of `#msg` after 1000ms.
