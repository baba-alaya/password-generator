const input = document.querySelector('input[type="range"]');
const inputNum = document.querySelector('.input-num');

const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
const button = document.querySelector('button')
const copy = document.querySelector('.copy')
const orgpass = document.querySelector('.orgpass')

let disabled = false
let value = input.value;
input.addEventListener('input', () => {
    value = input.value;
    inputNum.textContent = value;
})
window.addEventListener('load', () => {
    button.disabled = !disabled
    inputNum.textContent = value
})

let assets = {
    numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    lowwerCase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    upperCase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'L', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    symbols: [".", ',', '$', '%', '^', '&', '(', ')', '@']
}

let ovr = {
    numbers: [],
    lowwerCase: [],
    upperCase: [],
    symbols: []
}

checkBoxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => {
        let checked = checkbox.checked;
        switch (checkbox.value) {
            case 'numbers':
                ovr.numbers = checked ? assets.numbers : [];
                break;
            case 'lowercase':
                ovr.lowwerCase = checked ? assets.lowwerCase : [];
                break;
            case 'uppercase':
                ovr.upperCase = checked ? assets.upperCase : [];
                break;
            case 'symbols':
                ovr.symbols = checked ? assets.symbols : [];
                break
        }

        checked ? button.disabled = disabled : button.disabled = !disabled
    })
})

button.addEventListener('click', () => {
    let FinalResult = ''
    let ovrKey = Object.keys(ovr)
    let checkedKey = ovrKey.filter(key => ovr[`${key}`].length !== 0)
    let avg = Math.floor(value / checkedKey.length)
    let mod = value % checkedKey.length
    checkedKey.forEach(key => {
        for (let i = 0; i < avg; i++) {
            const nums = Math.floor(Math.random() * avg)
            FinalResult += assets[key][nums]
        }
    })
    if (mod === 1) {
        usenum = Math.floor(Math.random() * 3);
        let extra = checkedKey[usenum ? 1 : 2];;
        let extraArr = assets[extra];
        pickone = Math.floor(Math.random() * extraArr.length);
        FinalResult += extraArr[pickone]
    } else if (mod > 1) {
        for (i = 0; i < mod; i++) {
            const usenums = Math.floor(Math.random() * mod)
            array = checkedKey[usenums]
            let extraArr = assets[array];
            pickone = Math.floor(Math.random() * extraArr.length);
            FinalResult += extraArr[pickone]
        }
    }
    orgpass.textContent = FinalResult
})

const copyText = function (e) {
    e.preventDefault()
    navigator.clipboard.writeText(orgpass.textContent)
    alert('password copied succesfully')
}
copy.addEventListener('click', copyText)





