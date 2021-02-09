const menuBtn = document.querySelector('.menu-btn');
const toTopBtn = document.querySelector('.to-top');
const menuDiv = document.querySelector('.mobile-menu');

let goodsInCart = JSON.parse(localStorage.getItem('order')) || {};
let goodsCounter = document.querySelector('.header-backet-text')
  .lastElementChild;
let mobileGoodsCounter = document.querySelector('.mobile-backet').lastElementChild;

function showAnimation() {
  const imagePos = $(this).offset().top;
  const topOfWindow = $(window).scrollTop();
  const heightOfWindow = $(window).height();
  if (imagePos < topOfWindow + heightOfWindow - 200) {
    $(this).addClass('animation');
    $(this).fadeTo(0, 1);
  }
}

$(window).scroll(function() {
  $('.shopping .container').children('p').each(showAnimation);
  $('.contacts-data').children('h3').each(showAnimation);
  $('.phone-numbers').each(showAnimation);
  $('.address').each(showAnimation);
  $('.e-mail-address').each(showAnimation);
  $('.work-time').each(showAnimation);
});

menuBtn.addEventListener('click', function () {
  if (menuBtn.classList.contains('menu-btn')) {
    menuDiv.style.visibility = 'visible';
    menuDiv.style.left = 0;
    menuDiv.style.zIndex = '5';
    menuBtn.src = '../img/icon/close-menu.svg';
    menuBtn.classList.remove('menu-btn');
    menuBtn.classList.add('close-menu');
  } else {
    menuDiv.style.visibility = 'hidden';
    menuDiv.style.left = '-100%';
    menuDiv.style.zIndex = '-5';
    menuBtn.src = '../img/icon/menu.svg';
    menuBtn.classList.remove('close-menu');
    menuBtn.classList.add('menu-btn');
  }
});

toTopBtn.addEventListener('click', function() {
  if (navigator.userAgent.indexOf('Firefox') !== -1) {
    window.location = window.location.href;
  } else {
    window.scrollTo(pageYOffset, 0);
  }
});

function getGoodsNumberInCart() {
  goodsNumberInCart = 0;
  const keysCart = Object.keys(goodsInCart);
  keysCart.forEach(function(key) {
    goodsNumberInCart += Number(goodsInCart[key].number);
  });
  return goodsNumberInCart;
}

function setPushcartCounter() {
  const allGoodsNumber = getGoodsNumberInCart();
  if (allGoodsNumber === 0) {
    goodsCounter.style.color = '#aaaaaa';
    mobileGoodsCounter.textContent = ''
    mobileGoodsCounter.style.background = 'none';
  } else {
    goodsCounter.style.color = '#826b2f';
    mobileGoodsCounter.textContent = allGoodsNumber;
    mobileGoodsCounter.style.background = 'url(../img/icon/backet-background.svg) no-repeat center center';
  }
  switch (allGoodsNumber % 10) {
    case 1:
      if (allGoodsNumber === 11) {
        goodsCounter.textContent = allGoodsNumber + ' товаров';
      } else {
        goodsCounter.textContent = allGoodsNumber + ' товар';
      }
      break;
    case 2:
    case 3:
    case 4:
      const additionalCondition =
        allGoodsNumber === 12 || allGoodsNumber === 13 || allGoodsNumber === 14;
      if (additionalCondition) {
        goodsCounter.textContent = allGoodsNumber + ' товаров';
      } else {
        goodsCounter.textContent = allGoodsNumber + ' товара';
      }
      break;
    case 0:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      goodsCounter.textContent = allGoodsNumber + ' товаров';
      break;
  }
}

setPushcartCounter();

setInterval(function() {
  goodsInCart = JSON.parse(localStorage.getItem('order')) || {};
  setPushcartCounter();
}, 1000);

google.maps.event.addDomListener(window, 'load', init);
function init() {
  let mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(27.49911, 53.911325),
    styles: [
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ lightness: 100 }, { visibility: 'simplified' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ visibility: 'on' }, { color: '#C6E2FF' }],
      },
      {
        featureType: 'poi',
        elementType: 'geometry.fill',
        stylers: [{ color: '#C5E3BF' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [{ color: '#D1D1B8' }],
      },
    ],
  };
  let mapElement = document.getElementById('map');
  let map = new google.maps.Map(mapElement, mapOptions);
  let marker = new google.maps.Marker({
    position: new google.maps.LatLng(27.49911, 53.911325),
    map: map,
    title: 'West Line',
    icon: {
      url: '../img/icon/map-pointer.svg'
    }
  });
}
