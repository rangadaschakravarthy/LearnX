# Phase 8: Easy Output Prediction Questions

### Question 1
```html
<div id="test"><span>Hello</span> World</div>
```
```javascript
const el = document.getElementById("test");
console.log(el.textContent);
console.log(el.innerText);
```
**What is logged?**

---

### Question 2
```html
<ul id="items">
    <li>One</li>
    <li>Two</li>
</ul>
```
```javascript
const list = document.getElementById("items");
console.log(list.children.length);
console.log(list.childNodes.length);
```
**What is logged assuming whitespace formatting exists between tags?**
