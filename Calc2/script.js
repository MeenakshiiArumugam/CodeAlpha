const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');
const themeSwitcher = document.querySelector('.theme-btn');

let memoryValue = 0;
let isMemorySet = false;

buttons.addEventListener('click', function(event) {
    const target = event.target;

    if (target.classList.contains('btn')) {
        const action = target.dataset.action;
        const number = target.dataset.number;

        // Memory Functions
        if (action === 'M+') {
            memoryValue += parseFloat(display.value) || 0;
            isMemorySet = true;
        } else if (action === 'M-') {
            memoryValue -= parseFloat(display.value) || 0;
            isMemorySet = true;
        } else if (action === 'MC') {
            memoryValue = 0;
            isMemorySet = false;
        } else if (action === 'MR') {
            display.value = isMemorySet ? memoryValue : 0;
        }

        // Clear Display
        else if (action === 'clear') {
            display.value = '';
        }

        // Delete Last Character
        else if (action === 'delete') {
            display.value = display.value.slice(0, -1);
        }

        // Handle Equals
        else if (action === 'equals') {
            try {
                display.value = eval(display.value) || '';
            } catch {
                display.classList.add('error');
                display.value = 'Error';
                setTimeout(() => {
                    display.classList.remove('error');
                    display.value = '';
                }, 1500);
            }
        }

        // Handle Scientific Functions
        else if (['sin', 'cos', 'tan', 'log', 'sqrt', 'pow'].includes(action)) {
            try {
                if (action === 'sin') display.value = Math.sin(parseFloat(display.value));
                if (action === 'cos') display.value = Math.cos(parseFloat(display.value));
                if (action === 'tan') display.value = Math.tan(parseFloat(display.value));
                if (action === 'log') display.value = Math.log10(parseFloat(display.value));
                if (action === 'sqrt') display.value = Math.sqrt(parseFloat(display.value));
                if (action === 'pow') display.value = Math.pow(parseFloat(display.value), 2);
            } catch {
                display.classList.add('error');
                display.value = 'Error';
                setTimeout(() => {
                    display.classList.remove('error');
                    display.value = '';
                }, 1500);
            }
        }

        // Handle Operators and Numbers
        else if (number !== undefined || action !== undefined) {
            display.value += number || action;
        }
    }
});

// Theme Switcher
themeSwitcher.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    themeSwitcher.textContent = document.body.classList.contains('dark-theme') ? 'Light Mode' : 'Dark Mode';
});
