function handleOption(opt) {
  switch (Number(opt)) {
    case 1: return "Displaying User Profile...";
    case 2: return "Opening Settings Menu...";
    case 3: return "Loading Help & Documentation...";
    default: return "Invalid Option Selected";
  }
}

if (typeof document !== 'undefined') {
  document.getElementById('runBtn')?.addEventListener('click', () => {
    const val = document.getElementById('option').value;
    document.getElementById('out').innerText = handleOption(val);
  });
}

if (typeof module !== 'undefined') module.exports = { handleOption };
