const menuBtn = document.querySelector('.menu-btn');
const getMoreTeaInfo = Array.from(document.querySelectorAll('.get-more-info'));
const goToCatalogBtns = Array.from(document.querySelectorAll('.go-to-catalog'));
const toTopBtn = document.querySelector('.to-top');
const closeNotificationBtn = document.querySelector('.close-notification');
const getPriceBtn = document.querySelector('.get-price-btn');
const askForCallBtn = document.querySelector('.ask-for-call');

const menuDiv = document.querySelector('.mobile-menu');
const formSendDiv = document.querySelector('.form-send');

const forms = Array.from(document.forms);
const emailPriceInput = document.querySelector('#email-price');
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

function showAnimation() {
  const imagePos = $(this).offset().top;
  const topOfWindow = $(window).scrollTop();
  const heightOfWindow = $(window).height();
  if (imagePos < topOfWindow + heightOfWindow - 200) {
    $(this).addClass('animation');
    $(this).fadeTo(0, 1);
  }
}

window.addEventListener('load', function() {
  const presentationH1 = document.querySelector('.presentation-text').firstElementChild;
  const presentationP = document.querySelector('.presentation-text').firstElementChild.nextElementSibling;
  const presentationDiv = document.querySelector('.presentation-text').lastElementChild;
  presentationH1.style.animation = 'appearance 0.5s ease-in-out';
  presentationH1.style.transition = 'opacity 0.5s ease-in-out';
  presentationH1.style.opacity = '1';
  presentationH1.classList.remove('animated');
  presentationP.style.animation = 'appearance 0.5s ease-in-out 0.25s';
  presentationP.style.transition = 'opacity 0.5s ease-in-out 0.25s';
  presentationP.style.opacity = '1';
  presentationDiv.style.animation = 'appearance 0.5s ease-in-out 0.5s';
  presentationDiv.style.transition = 'opacity 0.5s ease-in-out 0.5s';
  presentationDiv.style.opacity = '1';
  setTimeout(function() {
    presentationP.classList.remove('animated');
  }, 200);
  setTimeout(function() {
    presentationDiv.classList.remove('animated');
  }, 400);
});

$(window).scroll(function() {
  $('.advantages').children('h2').each(showAnimation);
  $('.advantage').each(showAnimation);
  $('#products .container').children('h2, p').each(showAnimation);
  $('.get-price-text').children().each(showAnimation);
  $('.about-company-text').children().each(showAnimation);
  $('.we-work').children('h2').each(showAnimation);
  $('.step1').each(function() {
    const imagePos = $(this).offset().top;
    const topOfWindow = $(window).scrollTop();
    const heightOfWindow = $(window).height();
    if (imagePos < topOfWindow + heightOfWindow - 200) {
      $(this).addClass('animation');
      $(this).delay(600).fadeTo(0, 1);
    }
  });
  $('.step2').each(function() {
    const imagePos = $(this).offset().top;
    const topOfWindow = $(window).scrollTop();
    const heightOfWindow = $(window).height();
    if (imagePos < topOfWindow + heightOfWindow - 200) {
      $(this).addClass('animation');
      $(this).delay(850).fadeTo(0, 1);
    }
  });
  $('.step3').each(function() {
    const imagePos = $(this).offset().top;
    const topOfWindow = $(window).scrollTop();
    const heightOfWindow = $(window).height();
    if (imagePos < topOfWindow + heightOfWindow - 200) {
      $(this).addClass('animation');
      $(this).delay(1100).fadeTo(0, 1);
    }
  });
  $('.step4').each(function() {
    const imagePos = $(this).offset().top;
    const topOfWindow = $(window).scrollTop();
    const heightOfWindow = $(window).height();
    if (imagePos < topOfWindow + heightOfWindow - 200) {
      $(this).addClass('animation');
      $(this).delay(1350).fadeTo(0, 1);
    }
  });
  $('#question-form .container').children('h2, p').each(showAnimation);
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
    menuBtn.src = 'img/icon/close-menu.svg';
    menuBtn.classList.remove('menu-btn');
    menuBtn.classList.add('close-menu');
  } else {
    menuDiv.style.visibility = 'hidden';
    menuDiv.style.left = '-100%';
    menuDiv.style.zIndex = '-5';
    menuBtn.src = 'img/icon/menu.svg';
    menuBtn.classList.remove('close-menu');
    menuBtn.classList.add('menu-btn');
  }
});

getMoreTeaInfo.forEach(function(getInfo) {
  getInfo.addEventListener('click', function(event) {
    event.target.style.display = 'none';
    event.target.previousElementSibling.style.display = 'none';
    event.target.previousElementSibling.previousElementSibling.style.display =
      'block';
  });
});

goToCatalogBtns.forEach(function(goBtn) {
  goBtn.addEventListener('click', function(event) {
    let teaKind =
      event.target.parentNode.parentNode.firstElementChild.nextElementSibling
        .textContent;
    switch (teaKind) {
      case 'Ассам':
        localStorage.setItem('teaKind', '1');
        break;
      case 'Наурыз':
        localStorage.setItem('teaKind', '2');
        break;
      case 'Тенгри':
        localStorage.setItem('teaKind', '3');
        break;
      case 'Sunday':
        localStorage.setItem('teaKind', '4');
        break;
    }
  });
});

getPriceBtn.addEventListener('click', function(event) {
  event.preventDefault();
  if (emailPriceInput.value === '') {
    validationBeforeSending(emailPriceInput);
  } else {
    const email = emailPriceInput.value;
    const regexp = /(\w+\.)+\w+/g;
    const condition = email.match(regexp);
    if (condition) {
      Email.send({
      SecureToken: 'd5c70b6c-4273-4724-9d0c-14bc43f43538',
      To: 'info@teahouse.by',
      From: emailPriceInput.value,
      Subject: 'Запрос прайс-листа',
      Body: '<strong>E-mail:</strong> ' + emailPriceInput.value,
    }).then(function() {
      formSendDiv.style.opacity = 1;
      formSendDiv.style.zIndex = 5;
      forms[0].reset();
      event.target.previousElementSibling.classList.remove('wrong-data-input');
      if (
        navigator.userAgent.indexOf('Firefox') !== -1 ||
        navigator.userAgent.indexOf('MSIE') !== -1 ||
        !!document.documentMode === true
      ) {
        formSendDiv.style.background = 'rgba(71, 81, 75, 0.9)';
      }
    });
    } else {
      validationBeforeSending(emailPriceInput);
    }
  }
});

askForCallBtn.addEventListener('click', function(event) {
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
    Email.send({
      SecureToken: 'd5c70b6c-4273-4724-9d0c-14bc43f43538',
      To: 'info@teahouse.by',
      From: emailInput.value,
      Subject: 'Запрос консультации',
      Body:
        '<strong>Имя:</strong> ' +
        nameInput.value +
        '<br /> <strong>Номер телефона:</strong> ' +
        phoneInput.value +
        '<br /> <strong>E-mail:</strong> ' +
        emailInput.value +
        '<br /> <strong>Сообщение:</strong> ' +
        messageTextarea.value,
    }).then(function() {
      formSendDiv.style.opacity = 1;
      formSendDiv.style.zIndex = 5;
      forms[1].reset();
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

closeNotificationBtn.addEventListener('click', function() {
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

emailPriceInput.addEventListener('blur', function(event) {
  const email = event.target.value;
  if (email) {
    const regexp = /(\w+\.)+\w+/g;
    const condition = !email.match(regexp);
    validationBorder(event, condition);
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

toTopBtn.addEventListener('click', function() {
  if (navigator.userAgent.indexOf('Firefox') !== -1) {
    window.location = window.location.href;
  } else {
    window.scrollTo(pageYOffset, 0);
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
      'url(img/icon/backet-background.svg) no-repeat center center';
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
  let latLng = new google.maps.LatLng(27.49911, 53.911325);
  let mapOptions = {
    zoom: 11,
    center: latLng,
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
    position: latLng,
    map: map,
    title: 'West Line',
    icon: {
      url: '../img/icon/map-pointer.svg',
    },
  });
}
