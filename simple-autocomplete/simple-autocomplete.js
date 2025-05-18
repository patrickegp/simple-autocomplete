(function($) {
  $.fn.simpleAutocomplete = function(options) {
    const settings = $.extend({
      resultClass: 'results',
      itemClass: 'item',
      minLength: 1,
      debounceTime: 300,
      onSelect: null,
    }, options);

    return this.each(function() {
      const input     = $(this);
      const url       = input.data('url');
      const valueKey  = input.data('value');
      const labelKey  = input.data('label');
      const searchBox = input.closest('.search-box');
      const resultsContainer = searchBox.find('.' + settings.resultClass);

      const debouncedSearch = debounce(function(e) {
        const query = e.target.value;
        input.prev('input').val('');

        if (query.length < settings.minLength) {
          resultsContainer.empty();
          searchBox.removeClass('show');
          return;
        }

        $.ajax({
          url: url,
          type: 'GET',
          dataType: 'json',
          data: { s: query }
        }).done(function(res) {
          let items = res.map(item => 
            `<a href="#" 
                data-value="${item[valueKey]}" 
                data-object='${JSON.stringify(item)}' 
                class="${settings.itemClass}">${item[labelKey]}</a>`
          );

          resultsContainer.html(items);
          if (res.length > 0) {
            searchBox.addClass('show');
          } else {
            searchBox.removeClass('show');
          }
        }).fail(function(xhr) {
          console.error(xhr);
          resultsContainer.empty();
          searchBox.removeClass('show');
        });
      }, settings.debounceTime);

      input.on('keyup', debouncedSearch);

      input.on('focusout', function() {
        setTimeout(function(){
          var selectedValue = input.prev('input').val();
          if (selectedValue.length === 0) {
            input.val('');
            searchBox.removeClass('show');
          }
        }, 200);
      });

      searchBox.on('click', '.' + settings.itemClass, function(e) {
        e.preventDefault();
        const itemEl = $(this);
        const fullObject = JSON.parse(itemEl.attr('data-object'));

        input.val(itemEl.text());
        input.prev('input').val(itemEl.data('value'));
        searchBox.removeClass('show');

        if (typeof settings.onSelect === 'function') {
          settings.onSelect(fullObject, itemEl);
        }
      });

      function debounce(fn, delay) {
        let timeoutId;
        return function (...args) {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => fn.apply(this, args), delay);
        };
      }
    });
  };
})(jQuery);
