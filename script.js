let display = '';
        const displayElement = document.querySelector('.display');

        function updateDisplay(value) {
            if (display === '0' || display === 'Erro') {
                display = value;
            } else {
                display += value;
            }
            displayElement.textContent = display;
        }

        function clearDisplay() {
            display = '0';
            displayElement.textContent = '0';
        }

        function calculate() {
            try {
                // Substitui % por /100 para porcentagem
                let expression = display.replace(/(\d+)%/g, '($1/100)');
                display = eval(expression).toString();
                displayElement.textContent = display;
            } catch {
                display = 'Erro';
                displayElement.textContent = 'Erro';
                //
                setTimeout(clearDisplay, 1500);
            }
        }

        document.querySelectorAll('.number').forEach(btn => {
            btn.addEventListener('click', () => {
                updateDisplay(btn.textContent);
            });
        });

        document.querySelectorAll('.operator').forEach(btn => {
            btn.addEventListener('click', () => {
                updateDisplay(btn.textContent);
            });
        });

        document.querySelector('.equals').addEventListener('click', calculate);
        document.querySelector('.clear').addEventListener('click', clearDisplay);

        // Suporte para teclado
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') {
                updateDisplay(e.key);
            } else if (['+', '-', '*', '/', '.', '%'].includes(e.key)) {
                updateDisplay(e.key);
            } else if (e.key === 'Enter' || e.key === '=') {
                calculate();
            } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
                clearDisplay();
            } else if (e.key === 'Backspace') {
                display = display.slice(0, -1) || '0';
                displayElement.textContent = display;
            }
        });
