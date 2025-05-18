# jQuery Simple Autocomplete

A custom lightweight jQuery plugin to add autocomplete functionality to input fields using AJAX. 
Easy to integrate and flexible to customize just to about complicated scripts integrations.

## ✨ Features

- Minimal setup
- Bootstrap Droupdown style
- AJAX-based dynamic suggestions
- Customizable label and value mapping
- Callback support on selection
- Works with any backend returning JSON

## Installation

Include jQuery and the plugin script:

```html
<!-- HTML content -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="simpleAutocomplete.js"></script>

<div class="search-box">
  <input type="hidden" name="id">
  <input
    type="text"
    class="form-control autocomplete"
    data-url="/api/search"
    data-value="id"
    data-label="name"
  >
  <div class="results"></div>
</div>

// JavaScript content
$('.autocomplete').simpleAutocomplete({
  resultClass: 'results',
  itemClass: 'item',
  onSelect: function (item, $element) {
    console.log('Selected object:', item);
  }
});

// JSON response
[
  { "id": 1, "name": "John Doe" },
  { "id": 2, "name": "Jane Smith" }
]




