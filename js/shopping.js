const formSendDiv = document.querySelector('.form-send');
const goodsTableBody = document.querySelector('#table-body');
const tableFoot = document.querySelector('#table-foot');
const totalBill = document.querySelector('.total-bill');
const lessGoodsBtn = Array.from(document.querySelectorAll('.less-of-goods'));
const moreGoodsBtn = Array.from(document.querySelectorAll('.more-of-goods'));
const closeNotificationBtn = document.querySelector('.close-notification');
const applyBtn = document.querySelector('.apply');
const toTopBtn = document.querySelector('.to-top');
const menuBtn = document.querySelector('.menu-btn');
const menuDiv = document.querySelector('.mobile-menu');

const forms = document.forms[0];
const nameInput = document.querySelector('#name');
const phoneInput = document.querySelector('#phone');
const emailInput = document.querySelector('#email');
const messageTextarea = document.querySelector('#message');

let goodsInCart = JSON.parse(localStorage.getItem('order')) || {};
let goodsCounter = document.querySelector('.header-backet-text')
  .lastElementChild;
let mobileGoodsCounter = document.querySelector('.mobile-backet')
  .lastElementChild;

$(function () {
  $('#phone').mask('+375 (99) 999 99 99', { placeholder: '*' });
});

window.addEventListener('load', function() {
  const shoppingH2 = document.querySelector('.shopping').firstElementChild.firstElementChild;
  shoppingH2.style.animation = 'appearance 0.5s ease-in-out';
  shoppingH2.style.transition = 'opacity 0.5s ease-in-out';
  shoppingH2.style.opacity = '1';
  shoppingH2.classList.remove('animated');
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

applyBtn.addEventListener('click', function(event) {
  event.preventDefault();
  if (nameInput.value === '') {
    validationBeforeSending(nameInput);
  }
  if (phoneInput.value === '') {
    validationBeforeSending(phoneInput);
  }
  if (emailInput.value === '') {
    validationBeforeSending(emailInput);
  }
  if (isFormValid()) {
    let order = '';
    const keysCart = Object.keys(goodsInCart);
    keysCart.forEach(function(tea) {
      order +=
        goodsInCart[tea].name +
        ', ' +
        goodsInCart[tea].description +
        ', ' +
        goodsInCart[tea].weight +
        ', <strong> ' +
        goodsInCart[tea].number +
        'шт.</strong><br />';
    });
    Email.send({
      SecureToken: 'd5c70b6c-4273-4724-9d0c-14bc43f43538',
      To: 'info@teahouse.by',
      From: emailInput.value,
      Subject: 'Заказ',
      Body:
        '<strong>Имя:</strong> ' +
        nameInput.value +
        '<br /> <strong>Номер телефона:</strong> ' +
        phoneInput.value +
        '<br /> <strong>E-mail:</strong> ' +
        emailInput.value +
        '<br /> <strong>Сообщение:</strong> ' +
        messageTextarea.value +
        '<br /><br /> <strong>Мой заказ:</strong><br /> ' +
        order +
        '<br /> <strong>Сумма заказа:</strong> ' +
        totalBill.textContent,
    }).then(function () {
      formSendDiv.style.opacity = 1;
      formSendDiv.style.zIndex = 5;
      goodsInCart = {};
      localStorage.removeItem('order');
      setPushcartCounter();
      renderGoods();
      forms.reset();
      nameInput.classList.remove('wrong-data-input');
      phoneInput.classList.remove('wrong-data-input');
      emailInput.classList.remove('wrong-data-input');
      if (
        navigator.userAgent.indexOf('Firefox') !== -1 ||
        navigator.userAgent.indexOf('MSIE') !== -1 ||
        !!document.documentMode === true
      ) {
        formSendDiv.style.background = 'rgba(71, 81, 75, 0.9)';
      }
    });
  }
});

nameInput.addEventListener('blur', function(event) {
  if (event.target.value) {
    const condition = event.target.value.length < 2;
    validationBorder(event, condition);
  }
});

phoneInput.addEventListener('blur', function(event) {
  if (event.target.value !== '+375 (**) *** ** **') {
    const regexp = /\d/g;
    const phoneMatch = event.target.value.match(regexp);
    if (phoneMatch) {
      const phoneNumber = phoneMatch.join('');
      const condition = phoneNumber.length !== 12;
      validationBorder(event, condition);
    }
  }
});

phoneInput.addEventListener('click', function() {
  phoneInput.selectionStart = phoneInput.selectionEnd = 6;
});

emailInput.addEventListener('blur', function(event) {
  const email = event.target.value;
  if (email) {
    const regexp = /(\w+\.)+\w+/g;
    const condition = !email.match(regexp);
    validationBorder(event, condition);
  }
});

closeNotificationBtn.addEventListener('click', function(event) {
  closeNotification();
});

formSendDiv.addEventListener('click', function() {
  closeNotification();
});

window.addEventListener('keydown', function(event) {
  if (formSendDiv.style.opacity === '1' && event.code === 'Escape') {
    closeNotification();
  }
});

function validationBeforeSending(element) {
  element.style.borderColor = '#CD7A7A';
  element.classList.add('wrong-data-input');
}

function validationBorder(event, condition) {
  if (condition) {
    event.target.style.borderColor = '#CD7A7A';
    event.target.classList.add('wrong-data-input');
  } else {
    event.target.style.borderColor = '#C7CBB7';
    event.target.classList.remove('wrong-data-input');
    if (event.target === phoneInput) {
      phoneInput.style.color = '#464542';
    }
  }
}

function isFormValid() {
  const borderCondition =
    nameInput.style.borderColor !== 'rgb(205, 122, 122)' &&
    phoneInput.style.borderColor !== 'rgb(205, 122, 122)' &&
    emailInput.style.borderColor !== 'rgb(205, 122, 122)';
  const valueCondition =
    nameInput.value !== '' &&
    phoneInput.value !== '' &&
    emailInput.value !== '';
  if (borderCondition && valueCondition) {
    return true;
  } else {
    return false;
  }
}

function closeNotification() {
  formSendDiv.style.opacity = '0';
  formSendDiv.style.zIndex = '-5';
}

function renderGoods() {
  goodsTableBody.innerHTML = '';
  for (let goods in goodsInCart) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
    const td6 = document.createElement('td');
    const productImg = document.createElement('img');
    const name = document.createElement('p');
    const description = document.createElement('p');
    const weight = document.createElement('p');
    const numOfGoodsDiv = document.createElement('div');
    const moreLessGoodsDiv = document.createElement('div');
    const lessBtn = document.createElement('span');
    const spanLessMore = document.createElement('span');
    const moreBtn = document.createElement('span');
    const deleteBtn = document.createElement('img');
    td1.classList.add('col1');
    td2.classList.add('col2');
    td3.classList.add('col3');
    td4.classList.add('col4');
    td5.classList.add('col5');
    td5.classList.add('bill');
    td6.classList.add('col6');
    numOfGoodsDiv.classList.add('number-of-goods');
    moreLessGoodsDiv.classList.add('more-less');
    lessBtn.classList.add('less-of-goods');
    spanLessMore.classList.add('counter');
    moreBtn.classList.add('more-of-goods');
    deleteBtn.classList.add('delete-goods');
    productImg.src = goodsInCart[goods].img;
    productImg.alt = goodsInCart[goods].name;
    name.textContent = goodsInCart[goods].name;
    description.textContent = goodsInCart[goods].description;
    weight.textContent = 'Вес: ' + goodsInCart[goods].weight;
    td3.textContent = goodsInCart[goods].price;
    if (Number(goodsInCart[goods].number) === 1) {
      lessBtn.style.background = 'rgba(175, 144, 63, 0.62)';
      lessBtn.style.color = '#626262';
    } else {
      lessBtn.style.background = '#AF903F';
      lessBtn.style.color = '#000000';
    }
    lessBtn.textContent = '-';
    spanLessMore.textContent = goodsInCart[goods].number;
    moreBtn.textContent = '+';
    countProductBill(goods, td5);
    deleteBtn.src = '../img/icon/cross.svg';
    deleteBtn.alt = 'Удалить товар';
    deleteBtn.style.cursor = 'pointer';
    lessBtnOrderActions(lessBtn, spanLessMore, td5);
    moreBtnOrderActions(lessBtn, spanLessMore, moreBtn, td5);
    deleteGoodsActions(deleteBtn);
    td1.appendChild(productImg);
    td2.appendChild(name);
    td2.appendChild(description);
    td2.appendChild(weight);
    moreLessGoodsDiv.appendChild(lessBtn);
    moreLessGoodsDiv.appendChild(spanLessMore);
    moreLessGoodsDiv.appendChild(moreBtn);
    numOfGoodsDiv.appendChild(moreLessGoodsDiv);
    td4.appendChild(moreLessGoodsDiv);
    td6.appendChild(deleteBtn);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    goodsTableBody.appendChild(tr);
  }
  if (Object.keys(goodsInCart).length) {
    tableFoot.style.display = 'block';
    countTotalBill();
  } else {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const emptyBagImg = document.createElement('img');
    const emptyBagText = document.createElement('p');
    const goToCatalogP = document.createElement('p');
    const catalogLink = document.createElement('a');
    const catalogText = document.createElement('span');
    tr.classList.add('empty-bag-tr');
    emptyBagImg.src = '../img/icon/empty-bag.svg';
    emptyBagImg.alt = 'Корзина пуста';
    emptyBagText.textContent = 'Ваша корзина пуста';
    catalogLink.href = 'catalog.html';
    catalogLink.style.cursor = 'pointer';
    catalogLink.textContent = 'Нажмите здесь';
    catalogText.textContent = ', чтобы перейти в каталог';
    goToCatalogP.appendChild(catalogLink);
    goToCatalogP.appendChild(catalogText);
    td.appendChild(emptyBagImg);
    td.appendChild(emptyBagText);
    td.appendChild(goToCatalogP);
    tr.appendChild(td);
    goodsTableBody.appendChild(tr);
    tableFoot.style.display = 'none';
  }
}

function countTotalBill() {
  if (Object.keys(goodsInCart).length) {
    const col5 = Array.from(document.querySelectorAll('.col5'));
    const billsTDs = col5.slice(1, col5.length - 1);
    const bills = [];
    let dotPosition = '';
    billsTDs.forEach(function(billTD) {
      dotPosition = billTD.textContent.indexOf(',', 0);
      const countingPrice =
        billTD.textContent.slice(0, dotPosition) +
        '.' +
        billTD.textContent.slice(dotPosition + 1, -4);
      bills.push(Number(countingPrice));
    });
    const amount = String(
      Math.round(bills.reduce(function(sum, current) {return sum + current}, 0) * 100) / 100);
    dotPosition = amount.indexOf('.', 0);
    if (dotPosition === -1) {
      dotPosition = amount.length;
    }
    let amountPrice = '';
    if (amount.slice(dotPosition + 1).length === 2) {
      amountPrice =
        amount.slice(0, dotPosition) +
        ',' +
        amount.slice(dotPosition + 1) +
        ' BYN';
    } else if (amount.slice(dotPosition + 1).length === 1) {
      amountPrice =
        amount.slice(0, dotPosition) +
        ',' +
        amount.slice(dotPosition + 1) +
        '0 BYN';
    } else {
      amountPrice =
        amount.slice(0, dotPosition) +
        ',' +
        amount.slice(dotPosition + 1) +
        '00 BYN';
    }
    totalBill.textContent = amountPrice;
  } else {
    totalBill.textContent = '0 BYN';
  }
}

function lessBtnOrderActions(lessBtn, spanLessMore, td5) {
  if (spanLessMore.textContent > 1) {
    lessBtn.style.cursor = 'pointer';
  } else {
    lessBtn.style.cursor = 'default';
  }
  lessBtn.addEventListener('click', function(event) {
    const currentProductName = getNameCurrentOrderProduct(event);
    goodsInCart = JSON.parse(localStorage.getItem('order'));
    if (Number(spanLessMore.textContent) > 1) {
      spanLessMore.textContent = Number(spanLessMore.textContent) - 1;
      if (Number(spanLessMore.textContent) === 1) {
        lessBtn.style.background = 'rgba(175, 144, 63, 0.62)';
        lessBtn.style.color = '#626262';
        lessBtn.style.cursor = 'default';
      }
    } else {
      lessBtn.style.background = 'rgba(175, 144, 63, 0.62)';
      lessBtn.style.color = '#626262';
      lessBtn.style.cursor = 'default';
    }
    goodsInCart[currentProductName].number = Number(spanLessMore.textContent);
    countProductBill(currentProductName, td5);
    countTotalBill();
    setPushcartCounter();
    localStorage.setItem('order', JSON.stringify(goodsInCart));
  });
}

function moreBtnOrderActions(lessBtn, spanLessMore, moreBtn, td5) {
  moreBtn.addEventListener('click', function(event) {
    const currentProductName = getNameCurrentOrderProduct(event);
    goodsInCart = JSON.parse(localStorage.getItem('order'));
    spanLessMore.textContent = Number(spanLessMore.textContent) + 1;
    if (Number(spanLessMore.textContent) === 2) {
      lessBtn.style.background = '#AF903F';
      lessBtn.style.color = '#000000';
      lessBtn.style.cursor = 'pointer';
    }
    goodsInCart[currentProductName].number = Number(spanLessMore.textContent);
    countProductBill(currentProductName, td5);
    countTotalBill();
    setPushcartCounter();
    localStorage.setItem('order', JSON.stringify(goodsInCart));
  });
}

function countProductBill(currentProductName, td5) {
  let dotPosition = goodsInCart[currentProductName].price.indexOf(',', 0);
  const countingPrice =
    goodsInCart[currentProductName].price.slice(0, dotPosition) +
    '.' +
    goodsInCart[currentProductName].price.slice(dotPosition + 1, -4);
  let price = String(
    Math.round(
      Number(countingPrice) * goodsInCart[currentProductName].number * 100) / 100);
  dotPosition = price.indexOf('.', 0);
  if (dotPosition === -1) {
    dotPosition = price.length;
  }
  let amountPrice = '';
  if (price.slice(dotPosition + 1).length === 2) {
    amountPrice =
      price.slice(0, dotPosition) + ',' + price.slice(dotPosition + 1) + ' BYN';
  } else if (price.slice(dotPosition + 1).length === 1) {
    amountPrice =
      price.slice(0, dotPosition) +
      ',' +
      price.slice(dotPosition + 1) +
      '0 BYN';
  } else {
    amountPrice =
      price.slice(0, dotPosition) +
      ',' +
      price.slice(dotPosition + 1) +
      '00 BYN';
  }
  td5.textContent = amountPrice;
}

function deleteGoodsActions(deleteBtn) {
  deleteBtn.addEventListener('click', function(event) {
    goodsInCart = JSON.parse(localStorage.getItem('order'));
    delete goodsInCart[getNameCurrentOrderProduct(event)];
    setPushcartCounter();
    localStorage.setItem('order', JSON.stringify(goodsInCart));
    renderGoods();
  });
}

function getNameCurrentOrderProduct(event) {
  let removingProductTR = '';
  if (!!document.documentMode === true) {
    if (event.target.nodeName === 'SPAN') {
      removingProductTR = event.target.parentNode.parentNode.parentNode;
    }
    if (event.target.nodeName === 'IMG') {
      removingProductTR = event.target.parentNode.parentNode;
    }
  } else {
    removingProductTR = event.target.closest('tr');
  }
  const removingName =
    removingProductTR.firstElementChild.nextElementSibling.firstElementChild
      .textContent;
  const removingDescription =
    removingProductTR.firstElementChild.nextElementSibling.firstElementChild
      .nextElementSibling.textContent;
  let removingWeight = removingProductTR.firstElementChild.nextElementSibling.lastElementChild.textContent.slice(
    5,
    length - 3);
  let cardNumber = 0;
  switch (removingDescription) {
    case 'Чай «Классический» индийский, гранулированный, Premium':
      cardNumber = 0;
      break;
    case 'Чай «Листовой» индийский черный, Premium':
      cardNumber = 1;
      break;
    case 'Чай «Вечерний» с бергамотом, Premium':
      cardNumber = 2;
      break;
    case 'Чай «Gold» черный, гранулированный':
      cardNumber = 3;
      break;
    case 'Чай «Особый» черный, гранулированный, Premium':
      cardNumber = 4;
      break;
    case 'Чай «Классический» Premium, пакетированный, 100 пак. + 12 пак.':
      cardNumber = 5;
      break;
    case 'Чай индийский, черный, гранулированный':
      cardNumber = 6;
      break;
    case 'Чай индийский, гранулированный':
      cardNumber = 7;
      break;
    case 'Чай «Сандэй» кенийский, черный, гранулированный':
      cardNumber = 8;
      break;
  }
  const removingFieldName = cardNumber + removingName + removingWeight;
  return removingFieldName;
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
    mobileGoodsCounter.textContent = '';
    mobileGoodsCounter.style.background = 'none';
  } else {
    goodsCounter.style.color = '#826b2f';
    mobileGoodsCounter.textContent = allGoodsNumber;
    mobileGoodsCounter.style.background =
      'url(../img/icon/backet-background.svg) no-repeat center center';
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

function showAnimation() {
  const imagePos = $(this).offset().top;
  const topOfWindow = $(window).scrollTop();
  const heightOfWindow = $(window).height();
  if (imagePos < topOfWindow + heightOfWindow - 200) {
    $(this).addClass('animation');
    $(this).fadeTo(0, 1);
  }
}

setPushcartCounter();
renderGoods();

setInterval(function() {
  goodsInCart = JSON.parse(localStorage.getItem('order')) || {};
  setPushcartCounter();
  renderGoods();
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
      url: '../img/icon/map-pointer.svg',
    },
  });
}
