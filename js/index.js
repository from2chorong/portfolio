$(document).ready(function () {
  function renderList() {
    const $lists = $('.lists');
    let $item; 

    lists.forEach(list => {
      $item = $('<div>').addClass('list');
      const $link = $('<a>').attr({ href: list.link, target: '_blank' });

      const $text = $('<div>').addClass('text').append(
        $('<span>').text(list.type),
        $('<h5>').text(list.name)
      );
      const $figure = $('<figure>').addClass('img').append(
        $('<img>').attr({ src: `/portfolio/images/projects/${list.image}.jpg`, alt: list.img })
      );

      $link.append($text, $figure);
      $item.append($link, $('<span class="hover"></span>'));
      $lists.append($item);
    });

    $(window).on('load resize', function() {
      setTimeout(() => {
        requestAnimationFrame(() => {
          $('.list').each(function () {
            let listWidth = $(this)[0].getBoundingClientRect().width;
            let listHeight = $(this)[0].getBoundingClientRect().height;

            linesSize(listHeight);
            listHover(listWidth, listHeight);
          });
        });
      }, 100);
    });
  }

  function linesSize(listHeight) {
    const listsColumns = $('.lists').css('grid-template-columns').split(' ').length;
    $('.lines').css({ 'background-size': `calc((100% - 2px) / ${listsColumns}) ${listHeight}px` });
  }

  function listHover(listWidth, listHeight) {
    const $list = $('.list');

    $list.each(function () {
      $(this).find('.hover').css({ 'left': -listWidth, 'top': -listHeight });
      $(this).off();
      $(this).on('mouseenter mouseleave focusin focusout', function (e) {
        var x, y, type;

        x = Math.floor(e.pageX - $(this).offset().left);
        y = Math.floor(e.pageY - $(this).offset().top);

        x = (e.pageX - $(this).offset().left - (listWidth / 2)) * (listWidth > listHeight ? (listHeight / listWidth) : 1);
        y = (e.pageY - $(this).offset().top - (listHeight / 2)) * (listHeight > listWidth ? (listWidth / listHeight) : 1);

        type = (e.type == 'mouseenter' || e.type == 'focusin') ? true : false;

        spanMove($(this).find('.hover'), type, x, y);
      });
    });

    function spanMove(tgObj, overType, x, y) {
      var startX, startY, tgX, tgY;
      var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
      if (overType) {
        switch (direction) {
          case 0:
            startX = 0;
            startY = -listHeight;
            break;
          case 1:
            startX = listWidth;
            startY = 0;
            break;
          case 2:
            startX = 0;
            startY = listHeight;
            break;
          case 3:
            startX = -listWidth;
            startY = 0;
            break;
          default:
            startX = -listHeight;
            startY = 0;
            break;
        }
        tgX = 0;
        tgY = 0;
        tgObj.stop().css({ 'left': startX, 'top': startY }).animate({ 'left': tgX, 'top': tgY }, { queue: false, duration: 400, easing: 'easeOutExpo' });
      } else {
        switch (direction) {
          case 0:
            tgX = 0;
            tgY = -listHeight;
            break;
          case 1:
            tgX = listWidth;
            tgY = 0;
            break;
          case 2:
            tgX = 0;
            tgY = listHeight;
            break;
          case 3:
            tgX = -listWidth;
            tgY = 0;
            break;
          default:
            tgX = listWidth;
            tgY = 0;
            break;
        }
        tgObj.stop().animate({ 'left': tgX, 'top': tgY }, { queue: false, duration: 400, easing: 'easeOutExpo' });
      }
    }
  }

  renderList();

  function filterLists() {
    const isProposalChecked = $('#proposal').is(':checked');
    const isWebsiteOrGdwebChecked = $('#website').is(':checked') || $('#gdweb').is(':checked');

    $('#website, #gdweb').prop('disabled', isProposalChecked);
    $('#proposal').prop('disabled', isWebsiteOrGdwebChecked);

    const checkedFilters = [];

    $('.keywords input[type="checkbox"]:checked').each(function () {
      checkedFilters.push($(this).attr('id'));
    });

    $('.list').each(function () {
      const keywords = lists[$(this).index()].keywords;
      const matchesFilters = checkedFilters.length === 0 || checkedFilters.every(filter => keywords.includes(filter));

      if (matchesFilters) {
        $(this).stop().show();
      } else {
        $(this).stop().hide();
      }
    });
  }

  $('.keywords input[type="checkbox"]').change(function () {
    filterLists();
  });

  $('.mode input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      $('.mode span').css('left', 'calc(50% + 2.5px)');
      $('main').removeClass('light').addClass('dark');
    } else {
      $('.mode span').css('left', '0');
      $('main').removeClass('dark').addClass('light');
    }
  });

});
