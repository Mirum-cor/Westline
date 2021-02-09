const menuBtn = document.querySelector('.menu-btn');
const toTopBtn = document.querySelector('.to-top');
const menuDiv = document.querySelector('.mobile-menu');

const teaKind = Array.from(document.querySelectorAll('.tea-cards'));
const teaCards = Array.from(document.querySelectorAll('.cards'));
const teaCardArray = Array.from(document.querySelectorAll('.card'));

const weightDivs = Array.from(document.querySelectorAll('.weight'));
const addGoodsBtn = Array.from(document.querySelectorAll('.add-goods'));

const teaKindOpen = Number(localStorage.getItem('teaKind')) || '';
let goodsInCart = JSON.parse(localStorage.getItem('order')) || {};
let goodsCounter = document.querySelector('.header-backet-text')
  .lastElementChild;
let mobileGoodsCounter = document.querySelector('.mobile-backet').lastElementChild;
let currentProduct = 0;

window.addEventListener('load', function() {
  const catalogH2 = document.querySelector('.catalog').firstElementChild.firstElementChild;
  const catalogDescription = document.querySelector('.catalog').firstElementChild.firstElementChild.nextElementSibling;
  catalogH2.style.animation = 'appearance 0.5s ease-in-out';
  catalogH2.style.transition = 'opacity 0.5s ease-in-out';
  catalogH2.style.opacity = '1';
  catalogH2.classList.remove('animated');
  catalogDescription.style.animation = 'appearance 0.5s ease-in-out 0.25s';
  catalogDescription.style.transition = 'opacity 0.5s ease-in-out 0.25s';
  catalogDescription.style.opacity = '1';
  teaKind[0].style.animation = 'appearance 0.5s ease-in-out 0.5s';
  teaKind[0].style.transition = 'opacity 0.5s ease-in-out 0.5s, background 0.35s ease-in-out';
  teaKind[0].style.opacity = '1';
  teaKind[1].style.animation = 'appearance 0.5s ease-in-out 0.75s';
  teaKind[1].style.transition = 'opacity 0.5s ease-in-out 0.75s, background 0.35s ease-in-out';
  teaKind[1].style.opacity = '1';
  teaKind[2].style.animation = 'appearance 0.5s ease-in-out 1s';
  teaKind[2].style.transition = 'opacity 0.5s ease-in-out 1s, background 0.35s ease-in-out';
  teaKind[2].style.opacity = '1';
  teaKind[3].style.animation = 'appearance 0.5s ease-in-out 1.25s';
  teaKind[3].style.transition = 'opacity 0.5s ease-in-out 1.25s, background 0.35s ease-in-out';
  teaKind[3].style.opacity = '1';
  setTimeout(function() {
    catalogDescription.classList.remove('animated');
  }, 250);
  setTimeout(function() {
    teaKind[0].classList.remove('animated');
  }, 400);
  setTimeout(function() {
    teaKind[1].classList.remove('animated');
  }, 750);
  setTimeout(function() {
    teaKind[2].classList.remove('animated');
  }, 1000);
  setTimeout(function() {
    teaKind[3].classList.remove('animated');
  }, 1250);
});

$(window).scroll(function() {
  $('.shopping .container').children('p').each(showAnimation);
  $('.contacts-data').children('h3').each(showAnimation);
  $('.phone-numbers').each(showAnimation);
  $('.address').each(showAnimation);
  $('.e-mail-address').each(showAnimation);
  $('.work-time').each(showAnimation);
});

menuBtn.addEventListener('click', function() {
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

teaKind.forEach(function(kind) {
  kind.addEventListener('click', function() {
    if (kind.classList.contains('opened-tea-cards')) {
      kind.classList.remove('opened-tea-cards');
      kind.nextElementSibling.style.display = 'none';
    } else {
      kind.classList.add('opened-tea-cards');
      kind.nextElementSibling.style.display = 'flex';
    }
  });
});

teaCards.forEach(function(card) {
  const volumes = Array.from(card.querySelector('.weight').children);
  volumes.forEach(function(volume) {
    volume.addEventListener('click', function(event) {
      const teaDescription =
        event.target.parentNode.parentNode.previousElementSibling.textContent;
      volumes.forEach(function(vol) {
        vol.classList.remove('checked-volume');
      });
      volume.classList.add('checked-volume');
      if (
        teaDescription ===
        'Чай «Классический» индийский, гранулированный, Premium'
      ) {
        switch (volume.textContent) {
          case '250 г':
            event.target.parentNode.nextElementSibling.textContent = '7,58 BYN';
            break;
          case '500 г':
            event.target.parentNode.nextElementSibling.textContent =
              '14,20 BYN';
            break;
          case '1000 г':
            event.target.parentNode.nextElementSibling.textContent =
              '28,07 BYN';
            break;
        }
      }
      if (teaDescription === 'Чай индийский, черный, гранулированный') {
        switch (volume.textContent) {
          case '250 г':
            event.target.parentNode.nextElementSibling.textContent = '6,09 BYN';
            break;
          case '500 г':
            event.target.parentNode.nextElementSibling.textContent =
              '11,59 BYN';
            break;
        }
      }
    });
  });
});

weightDivs.forEach(function(weightDiv) {
  const weightBtn = Array.from(weightDiv.children);
  weightBtn.forEach(function(weight) {
    weight.addEventListener('click', function(event) {
      setCurrentProduct(event);
      const cardName =
        weight.parentNode.parentNode.previousElementSibling
          .previousElementSibling.textContent;
      const cardVolume = parseFloat(weight.textContent);
      if (goodsInCart[currentProduct + cardName + cardVolume]) {
        weight.parentNode.parentNode.nextElementSibling.textContent =
          'В корзине';
        if (document.documentElement.clientWidth <= 480) {
          weight.parentNode.parentNode.nextElementSibling.style.background =
            'url(../img/icon/shopping-bag-button-done.svg) no-repeat 181px 13px, #549369';
        } else {
          weight.parentNode.parentNode.nextElementSibling.style.background =
            'url(../img/icon/shopping-bag-button-done.svg) no-repeat 139px 13px, #549369';
        }
      } else {
        weight.parentNode.parentNode.nextElementSibling.textContent =
          'В корзину';
        if (document.documentElement.clientWidth <= 480) {
          weight.parentNode.parentNode.nextElementSibling.style.background =
            'url(../img/icon/shopping-bag-button.svg) no-repeat 181px 13px, #113229';
        } else {
          weight.parentNode.parentNode.nextElementSibling.style.background =
            'url(../img/icon/shopping-bag-button.svg) no-repeat 139px 13px, #113229';
        }
      }
    });
  });
});

addGoodsBtn.forEach(function(addGoods) {
  addGoods.addEventListener('click', function(event) {
    if (event.target.textContent === 'В корзину') {
      setCurrentProduct(event);
      let currentProductName = '';
      let currentProductImg = '';
      switch (currentProduct) {
        case 0:
          currentProductName = 'Ассам';
          currentProductImg = '../img/cards/small/assam-classic-small.png';
          break;
        case 1:
          currentProductName = 'Ассам';
          currentProductImg = '../img/cards/small/assam-leaf-small.png';
          break;
        case 2:
          currentProductName = 'Ассам';
          currentProductImg = '../img/cards/small/assam-evening-small.png';
          break;
        case 3:
          currentProductName = 'Ассам';
          currentProductImg = '../img/cards/small/assam-gold-small.png';
          break;
        case 4:
          currentProductName = 'Ассам';
          currentProductImg = '../img/cards/small/assam-special-small.png';
          break;
        case 5:
          currentProductName = 'Ассам';
          currentProductImg = '../img/cards/small/assam-tea-bags-small.png';
          break;
        case 6:
          currentProductName = 'Наурыз';
          currentProductImg = '../img/cards/small/nauriz-small.png';
          break;
        case 7:
          currentProductName = 'Тенгри';
          currentProductImg = '../img/cards/small/tengri-small.png';
          break;
        case 8:
          currentProductName = 'Sunday';
          currentProductImg = '../img/cards/small/sunday-small.png';
          break;
      }
      const currentProductDescription =
        teaCardArray[currentProduct].firstElementChild.nextElementSibling
          .nextElementSibling.nextElementSibling.textContent;
      const currentProductPrice = teaCardArray[currentProduct].querySelector('.price').textContent;
      const currentProductVolume = parseFloat(teaCardArray[currentProduct].querySelector('.checked-volume').textContent);
      const currentProductNumber = 1;
      if (
        goodsInCart[currentProduct + currentProductName + currentProductVolume]
      ) {
        goodsInCart[
          currentProduct + currentProductName + currentProductVolume
        ].number =
          Number(
            goodsInCart[
              currentProduct + currentProductName + currentProductVolume
            ].number) + Number(currentProductNumber);
      } else {
        goodsInCart[
          currentProduct + currentProductName + currentProductVolume
        ] = {
          img: currentProductImg,
          name: currentProductName,
          description: currentProductDescription,
          weight: currentProductVolume + ' г',
          price: currentProductPrice,
          number: currentProductNumber,
        };
      }
      event.target.textContent = 'В корзине';
      if (document.documentElement.clientWidth <= 480) {
        event.target.style.background =
          'url(../img/icon/shopping-bag-button-done.svg) no-repeat 68% 13px, #549369';
      } else {
        event.target.style.background =
          'url(../img/icon/shopping-bag-button-done.svg) no-repeat 139px 13px, #549369';
      }
      setPushcartCounter();
      localStorage.setItem('order', JSON.stringify(goodsInCart));
    } else {
      window.location.href = '../html/shopping.html';
    }
  });
});

function setCurrentProduct(event) {
  let teaDescription = '';
  if (event.target.tagName === 'BUTTON') {
    teaDescription =
      event.target.previousElementSibling.previousElementSibling.textContent;
  } else if (event.target.tagName === 'P') {
    teaDescription =
      event.target.parentNode.parentNode.previousElementSibling.textContent;
  }
  switch (teaDescription) {
    case 'Чай «Классический» индийский, гранулированный, Premium':
      currentProduct = 0;
      break;
    case 'Чай «Листовой» индийский черный, Premium':
      currentProduct = 1;
      break;
    case 'Чай «Вечерний» с бергамотом, Premium':
      currentProduct = 2;
      break;
    case 'Чай «Gold» черный, гранулированный':
      currentProduct = 3;
      break;
    case 'Чай «Особый» черный, гранулированный, Premium':
      currentProduct = 4;
      break;
    case 'Чай «Классический» Premium, пакетированный, 100 пак. + 12 пак.':
      currentProduct = 5;
      break;
    case 'Чай индийский, черный, гранулированный':
      currentProduct = 6;
      break;
    case 'Чай индийский, гранулированный':
      currentProduct = 7;
      break;
    case 'Чай «Сандэй» кенийский, черный, гранулированный':
      currentProduct = 8;
      break;
  }
}

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

function checkButtonsGoodsInCart() {
  let counter = 0;
  teaCardArray.forEach(function(card) {
    const cardName =
      card.firstElementChild.nextElementSibling.nextElementSibling.textContent;
    const cardVolume = parseFloat(
      card.querySelector('.checked-volume').textContent);
    if (goodsInCart[counter + cardName + cardVolume]) {
      card.lastElementChild.textContent = 'В корзине';
      if (document.documentElement.clientWidth <= 480) {
        card.lastElementChild.style.background =
          'url(../img/icon/shopping-bag-button-done.svg) no-repeat 68% 13px, #549369';
      } else {
        card.lastElementChild.style.background =
          'url(../img/icon/shopping-bag-button-done.svg) no-repeat 139px 13px, #549369';
      }
    } else {
      card.lastElementChild.textContent = 'В корзину';
      if (document.documentElement.clientWidth <= 480) {
        card.lastElementChild.style.background =
          'url(../img/icon/shopping-bag-button.svg) no-repeat 68% 13px, #113229';
      } else {
        card.lastElementChild.style.background =
          'url(../img/icon/shopping-bag-button.svg) no-repeat 139px 13px, #113229';
      }
    }
    counter++;
  });
}

function toCatalogFromMain() {
  if (teaKindOpen) {
    teaKind[teaKindOpen - 1].classList.add('opened-tea-cards');
    teaKind[teaKindOpen - 1].nextElementSibling.style.display = 'flex';
  }
  if (localStorage) {
    localStorage.removeItem('teaKind');
  }
}

function showAnimation() {
  const imagePos = $(this).offset().top;
  const topOfWindow = $(window).scrollTop();
  const heightOfWindow = $(window).height();
  if (imagePos < topOfWindow + heightOfWindow - 200) {
    $(this).addClass('animation');
    $(this).fadeTo(0, 1);
  }
}

toCatalogFromMain();
setPushcartCounter();
checkButtonsGoodsInCart();

setInterval(function() {
  goodsInCart = JSON.parse(localStorage.getItem('order')) || {};
  setPushcartCounter();
  checkButtonsGoodsInCart();
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
