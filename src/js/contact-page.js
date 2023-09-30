const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const menuItems = document.querySelectorAll('.nav__menu-link');
const navHeight = document.querySelector('.nav').offsetHeight;
const lastSection = document.querySelector('.offer-link');
const menuItemsMobile = document.querySelectorAll('.mobile-nav__link');
const footerYear = document.querySelector('.footer__year');

const msgName = document.querySelector('#name');
const msgMail = document.querySelector('#email');
const msgText = document.querySelector('#msg');
const msgBtn = document.querySelector('.contact__form-btn');
const msgStatus = document.querySelector('.contact__msg-status');

let isMobileNavOpen = false;

const handleScrollSpy = () => {
	const scrollY = window.scrollY;

	menuItems.forEach((item) => {
		const section = document.querySelector(item.getAttribute('href'));
		if (section !== null) {
			const sectionTop = section.offsetTop - navHeight;
			const sectionHeight = section.offsetHeight;

			if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
				item.classList.add('nav__menu-active');
			} else {
				item.classList.remove('nav__menu-active');
			}

			if (window.innerHeight + scrollY >= document.body.offsetHeight - 70) {
				menuItems.forEach((item) => item.classList.remove('nav__menu-active'));

				lastSection.classList.add('nav__menu-active');
			}
		}
	});
};

const handleNavMenu = () => {
	isMobileNavOpen = !isMobileNavOpen;
	if (isMobileNavOpen) {
		mobileNav.classList.add('mobile-nav--active');
		hamburger.classList.add('is-active');
		document.body.style.overflowY = 'hidden';
	} else {
		mobileNav.classList.remove('mobile-nav--active');
		hamburger.classList.remove('is-active');
		document.body.style.overflowY = 'auto';
	}

	menuItemsMobile.forEach((item) => {
		item.addEventListener('click', () => {
			isMobileNavOpen = false;
			mobileNav.classList.remove('mobile-nav--active');
			hamburger.classList.remove('is-active');
			document.body.style.overflowY = 'auto';
		});
	});
};

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector('.contact__form-box-error');

	formBox.classList.add('error');

	if (input.value.trim() === '' || input.value.trim() === ' ') {
		msg = `Wpisz ${input.previousElementSibling.textContent
			.toLowerCase()
			.slice(0, -1)}`;
	}

	errorMsg.textContent = msg;
};

const clearError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.remove('error');
};

const checkForm = (input) => {
	input.forEach((el) => {
		if (el.value.trim() === '' || el.value.trim() === ' ') {
			showError(el, msg);
		} else {
			clearError(el);
		}
	});
};

const validateEmail = (email) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(msgMail.value)) {
		clearError(email);
	} else {
		showError(email, 'E-mail jest nieprawidłowy');
	}
};

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.contact__form-box')
	let errorCount = 0;
	
	allInputs.forEach(el => {
		if(el.classList.contains('error')) {
			errorCount++
		}
	})
	
	if(errorCount === 0) {
		msgStatus.classList.add('contact__msg-status--success')
		setTimeout(() => {
			msgStatus.classList.remove('contact__msg-status--success')
		}, 2000);
	}
}

msgBtn.addEventListener('click', (e) => {
	e.preventDefault();

	checkForm([msgName, msgMail, msgText]);
	validateEmail(msgMail);
	checkErrors();
});

const handleCurrentYear = () => {
	const year = new Date().getFullYear();
	footerYear.innerText = year;
};

handleCurrentYear();
hamburger.addEventListener('click', handleNavMenu);
window.addEventListener('scroll', handleScrollSpy);