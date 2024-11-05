"use strict";
const radioWrappers = document.querySelectorAll('.form__radio-w');
const customInput = document.querySelector('#tip-custom');
const radioButtons = document.querySelectorAll('.form__radio-input');

const billInput = document.getElementById("bill");
const tipRadios = document.getElementsByName("tip");
const peopleInput = document.getElementById("number-of-people");
let billAmount;
let peopleAmount;

const tipAmountPerPerson = document.getElementById("tip-amount");
const totalAmountPerPersonAmount = document.getElementById("total-amount");
const resetButton = document.getElementById("reset");

radioWrappers.forEach(wrapper => {
    wrapper.addEventListener('click', () => {
        const input = wrapper.querySelector('input[type="radio"]');
        if (input) {
            input.checked = true;
            input.dispatchEvent(new Event('change'));
        }
    });
});

radioButtons.forEach(input => {
    input.addEventListener('change', () => {
        radioWrappers.forEach(wrapper => {
            wrapper.classList.remove('selected');
        });

        const selectedWrapper = input.closest('.form__radio-w');
        if (selectedWrapper) {
            selectedWrapper.classList.add('selected');
        }
    });
});

customInput.addEventListener('focus', () => {
    radioWrappers.forEach(wrapper => {
        wrapper.classList.remove('selected');
    });
});

////////////////////////////////////////////////////////////////////////
function getSelectedTip() {
  let selectedTip;
  tipRadios.forEach((radio) => {
    if (radio.checked) {
      selectedTip = parseFloat(radio.value);
    }
  });
  
  if (!selectedTip && customInput.value) {
    selectedTip = parseFloat(customInput.value);
  }
  return selectedTip;
}

function handlePeopleInput() {
  billAmount = parseFloat(billInput.value);
  peopleAmount = parseInt(peopleInput.value);

  if (!isNaN(peopleAmount) && peopleAmount > 0) {
    calculate();
  } else {
    console.log("Введіть коректну кількість людей");
  }
}

peopleInput.addEventListener("input", handlePeopleInput);

function calculate() {
  const tipAmountPerP = (billAmount * (getSelectedTip() / 100)) / peopleAmount;
  const totalAmountPerP = (billAmount + tipAmountPerP * peopleAmount) / peopleAmount;

  outPutDate(tipAmountPerP, totalAmountPerP);
}

function outPutDate(tipAmountPerP, totalAmountPerP) {
  tipAmountPerPerson.textContent = `$${tipAmountPerP.toFixed(2)}`;
  totalAmountPerPersonAmount.textContent = `$${totalAmountPerP.toFixed(2)}`;
  resetButton.classList.add("reset-active");
  resetButton.disabled = false;
}

function resetCalculator() {
  console.log("Reset button clicked");
  billInput.value = '';
  peopleInput.value = '';
  customInput.value = '';
  tipAmountPerPerson.textContent = '$0.00';
  totalAmountPerPersonAmount.textContent = '$0.00';
  resetButton.classList.remove("reset-active");
  resetButton.disabled = true;
}

resetButton.addEventListener("click", resetCalculator);