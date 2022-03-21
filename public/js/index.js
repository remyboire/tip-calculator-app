var percentage_buttons = document.querySelectorAll('.percentage')
var reset_button = document.querySelector('.reset')
var inputs = document.querySelectorAll('input')
var custom_percentage = document.querySelector('.custom')

var custom_value
var tip_total
var tip_amount

// For each percentage buttons on click,
// remove .selected from all buttons
// add .selected to the clicked button
// then get datas

percentage_buttons.forEach((item) => {
	item.addEventListener('click', () => {
		percentage_buttons.forEach((item) => {
			item.classList.remove('selected')
		})
		item.classList.add('selected')
		getdata()
	})
})

// watch for changes on inputs
// the get datas

inputs.forEach((item) => {
	item.addEventListener('input', () => {
		getdata()
	})
})

// if reset button is pressed, call the reset function

reset_button.addEventListener('click', () => {
	reset()
})

// This is how we get the datas

function getdata() {
	// Get bill amount,
	// percentage value (with '%' trimmed)
	// and number of people
	var bill = document.querySelector('.bill').value
	var tip = document.querySelector('.selected').value.replace(/\D/g, '')
	var people = document.querySelector('.people').value

	// Make the calculs:
	// total = bill amount divided by percentage
	// tip amount per person = total divided by number of people
	tip_total = (bill * tip) / 100
	tip_amount = tip_total / people

	// Once calculs made, change the elements on the page
	change(tip_amount, tip_total)
}

// the function who changes
function change(per_person, total) {
	// Change tip amount per person
	if (isNaN(per_person) || per_person == Infinity) {
		document.querySelector('.tip').innerHTML = '$0.00'
	} else {
		document.querySelector('.tip').innerHTML = '$' + per_person.toFixed(2)
	}
	// Change tip total
	document.querySelector('.total').innerHTML = '$' + total.toFixed(2)
}

// if reset button is pressed,
// remove selected percentage_buttons
// and reset all datas

function reset() {
	percentage_buttons.forEach((item) => {
		item.classList.remove('selected')
	})
	document.querySelector('.bill').value = null
	document.querySelector('.custom').value = null
	document.querySelector('.people').value = null
	change(0, 0)
}

// when a custom percentage is oninput,
// trim any non number char and add a %
// change the input value
// then move the cursor before the %
function custom_percentage_onInput(e) {
	custom_value = e.replace(/\D/g, '') + '%'
	custom_percentage.value = custom_value
	custom_percentage.selectionStart = custom_percentage.selectionEnd = custom_percentage.value.length - 1
}
// when custom_percentage is focusout
// if input is empty, remove the '%' remained
// and unselect the field
function custom_percentage_focusOut(e) {
	if (e == '%' || e == '') {
		custom_percentage.value = ''
		custom_percentage.classList.remove('selected')
	}
}
