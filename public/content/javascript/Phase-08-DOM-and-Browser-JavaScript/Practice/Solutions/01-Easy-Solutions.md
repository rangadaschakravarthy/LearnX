# Phase 8: Easy Practice Solutions

```javascript
// Problem 1: Select Heading by ID
const title = document.getElementById("main-title");
if (title) console.log(title.textContent);

// Problem 2: Change Paragraph Text
const desc = document.querySelector(".description");
if (desc) desc.textContent = "Updated Content";

// Problem 3: Count Paragraphs
const paragraphs = document.querySelectorAll("p");
console.log("Total paragraphs:", paragraphs.length);

// Problem 4: Add CSS Class
const btn = document.getElementById("submit-btn");
if (btn) btn.classList.add("active");

// Problem 5: Remove CSS Class
const card = document.getElementById("card");
if (card) card.classList.remove("hidden");

// Problem 6: Toggle CSS Class
const nav = document.getElementById("nav-menu");
if (nav) nav.addEventListener("click", () => nav.classList.toggle("open"));

// Problem 7: Set Inline Color Style
const statusMsg = document.getElementById("status-msg");
if (statusMsg) statusMsg.style.color = "red";

// Problem 8: Read Input Value
const input = document.getElementById("username");
if (input) console.log(input.value);

// Problem 9: Clear Input Field
const searchBox = document.getElementById("search-box");
if (searchBox) searchBox.value = "";

// Problem 10: Set Attribute
const avatar = document.getElementById("avatar");
if (avatar) avatar.setAttribute("alt", "User Avatar");

// Problem 11: Get Attribute
const link = document.getElementById("link");
if (link) console.log(link.getAttribute("href"));

// Problem 12: Check Attribute Presence
const banner = document.getElementById("banner");
const isPromoted = banner ? banner.hasAttribute("data-promoted") : false;

// Problem 13: Append Child Element
const list = document.getElementById("list");
if (list) {
    const li = document.createElement("li");
    li.textContent = "Item 1";
    list.appendChild(li);
}

// Problem 14: Prepend Element
const container = document.getElementById("container");
if (container) {
    const div = document.createElement("div");
    container.prepend(div);
}

// Problem 15: Remove Element Node
const oldBanner = document.getElementById("old-banner");
if (oldBanner) oldBanner.remove();

// Problem 16: Read Data Attribute
const userCard = document.getElementById("user-card");
if (userCard) console.log(userCard.dataset.userId);

// Problem 17: Set Data Attribute
const item1 = document.getElementById("item-1");
if (item1) item1.dataset.status = "completed";

// Problem 18: Handle Click Event
const alertBtn = document.getElementById("btn");
if (alertBtn) alertBtn.addEventListener("click", () => alert("Clicked!"));

// Problem 19: Change Button Text on Click
if (alertBtn) alertBtn.addEventListener("click", (e) => e.target.textContent = "Processing...");

// Problem 20: Hover Background Color
const hoverCard = document.getElementById("card");
if (hoverCard) {
    hoverCard.addEventListener("mouseenter", () => hoverCard.style.backgroundColor = "#e0e0e0");
    hoverCard.addEventListener("mouseleave", () => hoverCard.style.backgroundColor = "#ffffff");
}

// Problem 21: Count Button Clicks
let count = 0;
const counterBtn = document.getElementById("click-counter-btn");
if (counterBtn) counterBtn.addEventListener("click", () => console.log(++count));

// Problem 22: Disable Button
const subBtn = document.getElementById("submit");
if (subBtn) subBtn.disabled = true;

// Problem 23: Enable Button
if (subBtn) subBtn.disabled = false;

// Problem 24: Check Checkbox State
const agree = document.getElementById("agree");
if (agree) console.log(agree.checked);

// Problem 25: Hide Element
const modal = document.getElementById("modal");
if (modal) modal.style.display = "none";

// Problem 26: Show Element
if (modal) modal.style.display = "block";

// Problem 27: Get Parent Element
const child = document.getElementById("child");
if (child && child.parentElement) console.log(child.parentElement.id);

// Problem 28: Get First Child Element
const myList = document.getElementById("my-list");
if (myList && myList.firstElementChild) console.log(myList.firstElementChild.textContent);

// Problem 29: Get Next Sibling
const step1 = document.getElementById("step-1");
if (step1 && step1.nextElementSibling) step1.nextElementSibling.style.backgroundColor = "yellow";

// Problem 30: Simple Timer Update
const msg = document.getElementById("msg");
if (msg) setTimeout(() => { msg.textContent = "Timer Fired"; }, 1000);
```
