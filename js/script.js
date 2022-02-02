window.addEventListener('DOMContentLoaded', () => {
	// tabs
  	const tabs = document.querySelectorAll('.tabcontent'),
		tabPanel = document.querySelector('.tabheader__items'),
		tabLink = tabPanel.querySelectorAll('.tabheader__item');

  	const hideTabContent = () => {
		tabs.forEach(item => {
	  		item.classList.remove('show');
	  		item.classList.add('hide');
		});
		tabLink.forEach(item => {
	  	item.classList.remove('tabheader__item_active');
		});
  	} 

	const showTabContent = (i = 0) => {
		tabs[i].classList.remove('hide');
		tabs[i].classList.add('show');
		tabLink[i].classList.add('tabheader__item_active');
  	};

  	hideTabContent();
  	showTabContent();

  	tabPanel.addEventListener('click', (e) => {
		e.preventDefault();
		tabLink.forEach((item, i) => {
	  		if (item == e.target) {
				hideTabContent();
				showTabContent(i);
	  		}
		})
  	});
	  //timer
	const deadline = '2022-02-23';
	function getRemainingTime(endtime) {
		const t = Date.parse(endtime) - new Date(),
			  days = Math.floor(t / (1000 * 60 * 60 * 24)),
			  hours = Math.floor((t / (1000 * 60 * 60)) % 24),
			  minutes = Math.floor((t / (1000 * 60)) % 60),
			  seconds = Math.floor((t / 1000) % 60);

		return {
			'total' : t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		}
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock (selector, endtime) {
		const timer = document.querySelector(selector),
			  days = timer.querySelector('#days'),
			  hours = timer.querySelector('#hours'),
			  minutes = timer.querySelector('#minutes'),
			  seconds = timer.querySelector('#seconds'),
			  timeInterval = setInterval(updateClock, 1000);
		updateClock();

		function updateClock() {
			const time = getRemainingTime(endtime);
			days.innerHTML = getZero(time.days);
			hours.innerHTML = getZero(time.hours);
			minutes.innerHTML = getZero(time.minutes);
			seconds.innerHTML = getZero(time.seconds);
			if (time.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', deadline);
	// Modal
	const btns = document.querySelectorAll('[data-modal]'),
		  modal = document.querySelector('.modal'),
		  close = document.querySelector('[data-close]');

	function showModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(showModalTimer);
	}

	function hideModal() {
		modal.classList.remove('show');
		modal.classList.add('hide');
		document.body.style.overflow = '';
	}

	btns.forEach(elem => {
		elem.addEventListener('click', showModal);
	})
	
	close.addEventListener('click', hideModal);

	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			hideModal();
		}
	});
	document.addEventListener('keydown', (e) => {
		if(e.code == 'Escape' && modal.classList.contains('show')) {
			hideModal();
		}
	})
	const showModalTimer = setTimeout(showModal, 15000);

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			showModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	window.addEventListener('scroll', showModalByScroll);

	class MenuCard {
		constructor (src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src
			this.alt = alt
			this.title = title
			this.descr = descr
			this.price = price
			this.transfer = 27
			this.parent = document.querySelector(parentSelector)
			this.classes = classes;
			this.changeToUAH();
		}
		changeToUAH() {
			this.price = +this.transfer * this.price;
		}
		render() {
			const element = document.createElement('div');
			if (this.classes.length == 0) {
				element.classList.add('menu__item');
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}
			element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
			`;
			this.parent.append(element);
		}
	}
	new MenuCard(
		"img/tabs/vegy.jpg",
		"vegy",
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		9,
		'.menu .container'
	).render();

	new MenuCard(
		"img/tabs/elite.jpg",
		"elite",
		'Меню “Премиум”',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		19,
		'.menu .container'
	).render();

	new MenuCard(
		"img/tabs/post.jpg",
		"post",
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		16,
		'.menu .container'
	).render();
});