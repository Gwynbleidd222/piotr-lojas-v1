const navBtn = document.querySelector('.burger-btn')
const nav = document.querySelector('.nav-items')
const allLi = document.querySelectorAll('li')

const accordion = document.querySelector('.accordion')
const accordionBtns = document.querySelectorAll('.accordion-btn')

const msgStatus = document.querySelector('.msg-status')

const username = document.querySelector('#name')
const email = document.querySelector('#email')

const sendBtn = document.querySelector('.send-btn')

let errorCount = 0

const showError = (input, msg) => {
	const contactBox = input.parentElement
	const mistakeMsg = contactBox.querySelector('.error-text')

	contactBox.classList.add('error-msg')
	mistakeMsg.textContent = msg
	erorrMsg()
}

const clearError = input => {
	const contactBox = input.parentElement
	contactBox.classList.remove('error-msg')
}

const checkBox = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, el.placeholder)
			msgStatus.classList.add('error')
			msgStatus.textContent = 'Wystąpił błąd'

			setTimeout(() => {
				msgStatus.classList.remove('error')
			}, 3000)
		} else {
			clearError(el)
			// msgStatus.classList.add('success')
			// msgStatus.textContent = 'Wiadomość wysłana!'

			// setTimeout(() => {
			// 	msgStatus.classList.remove('success')
			// }, 3000)
		}
	})
}

const checkMail = email => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/

	if (re.test(email.value)) {
		clearError(email)
	} else {
		showError(email, 'E-mail jest nie poprawny')
		errorCount++
		msgStatus.classList.add('error')
		msgStatus.textContent = 'Wystąpił błąd'

		setTimeout(() => {
			msgStatus.classList.remove('error')
		}, 3000)
		
	}
}

const checkName = input => {
	if (input.value === '') {
		showError(input, `${input.innerText} Musisz podać imię i nazwisko`)
	}
}

const checkErrors = () => {
	const allinputs = document.querySelectorAll('.contact-box')

	allinputs.forEach(el => {
		if (el.classList.contains('error-msg')) {
			errorCount++
		}
	})

	if (errorCount === 0) {
		msgStatus.classList.add('success')
		msgStatus.textContent = 'Wiadomość wysłana!'
		sendBtn.style.pointerEvents = 'none'

		setTimeout(() => {
			msgStatus.classList.remove('success')
		}, 3000)
	}
}

function sendMSg() {
	if (document.location.search === '?mail_status=sent') {
		msgStatus.classList.add('success')
		msgStatus.textContent = 'Wiadomość wysłana!'

		setTimeout(() => {
			msgStatus.classList.remove('success')
		}, 3000)
	}
}

sendMSg()

function erorrMsg() {
	if (document.location.search === '?mail_status=error') {
		msgStatus.classList.add('error')
		msgStatus.textContent = 'Wystąpił błąd'

		setTimeout(() => {
			msgStatus.classList.remove('error')
		}, 3000)
	}
}

erorrMsg()

function openAccordionItems() {
	if (this.nextElementSibling.classList.contains('active-accordion')) {
		this.nextElementSibling.classList.remove('active-accordion')
	} else {
		closeAccordionItems()
		this.nextElementSibling.classList.toggle('active-accordion')
	}
}

const closeAccordionItems = () => {
	const allActiveItems = document.querySelectorAll('.accordion-info')
	allActiveItems.forEach(item => item.classList.remove('active-accordion'))
}

const clickOutsideAccordion = e => {
	if (
		e.target.classList.contains('accordion-btn') ||
		e.target.classList.contains('accordion-info') ||
		e.target.classList.contains('accordion-info-text') ||
		e.target.classList.contains('accordion-list')
	)
		return

	closeAccordionItems()
}

const handleNav = () => {
	nav.classList.toggle('active')

	allLi.forEach(li => {
		li.addEventListener('click', () => {
			nav.classList.remove('active')
		})
	})
}

const year = new Date().getFullYear()
const date = `&copy; ${year} | Piotr Łojas`

document.getElementsByTagName('footer')[0].innerHTML = date
accordionBtns.forEach(btn => btn.addEventListener('click', openAccordionItems))
window.addEventListener('click', clickOutsideAccordion)
navBtn.addEventListener('click', handleNav)

sendBtn.addEventListener('click', e => {
	errorCount = 0
	checkBox([username, email])
	checkMail(email)
	checkErrors()
})
