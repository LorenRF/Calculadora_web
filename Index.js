let display = document.getElementById('screen');
let historial = [];

//BOTONES AC Y C
const wipe = () => {
  display.value = display.value.slice(0, -1);
}

const clearAll = () => {
  display.value = '';
}

//NUMEROS Y SIGNOS
const show = (n) => {
  display.value += n;
}

//BOTON DE IGUAL
const calc = () => {
  const inputValue = display.value;
  const errorSymbol = ['**', '++', '--', '//', '/*', '*/', '-+', '+-', '/0'];

  if (errorSymbol.some(symbol => inputValue.includes(symbol))) {
    // Mostrar mensaje de error
    alert('Error: Ecuación invalida');
    wipe();
    return;
  }

  display.valueOp = (display.value + "=");
  display.value = eval(display.value);
  historial.push(display.valueOp, display.value); // Agregar el resultado al historial
  localStorage.setItem('historial', JSON.stringify(historial)); // Guardar el historial en el localStorage
  actualizarHistorial();
}


//EL HISTORIAL SIEMPRE ESTE ACTUALIZADO
const actualizarHistorial = () => {
  const historialDiv = document.querySelector('.historial');
  historialDiv.innerHTML = '';

  for (let i = 0; i < historial.length; i++) {
    const operacion = document.createElement('p');
    operacion.textContent = historial[i];
    historialDiv.appendChild(operacion);
  }
}

//OBTENER EL HISTORIAL DEL LOCALSTORAGE
const cargarHistorial = () => {
  const historialGuardado = localStorage.getItem('historial');
  if (historialGuardado) {
    historial = JSON.parse(historialGuardado);
    actualizarHistorial(); // Actualizar el historial en el div
  }
}

cargarHistorial(); // Llamar a cargarHistorial para cargar el historial almacenado previamente

//BANIMACON DEL BOTON DELETE
document.querySelectorAll('.deleteHistorial').forEach(button => button.addEventListener('click', e => {
  if(!button.classList.contains('delete')) {
  button.classList.add('delete');
  setTimeout(() => button.classList.remove('delete'), 3200);
  }
  e.preventDefault();
  }));

//FUNCION DEL BOTON DELETE
  const deleteHistorial = () => {
    historial = []; // Limpiar el historial
    localStorage.removeItem('historial'); // Eliminar el historial del localStorage
    actualizarHistorial(); // Actualizar el historial en el div
  }
  
  // Obtener referencia al botón
  const deleteButton = document.querySelector('.deleteHistorial');
  
  // Agregar evento de escucha al botón
  deleteButton.addEventListener('click', deleteHistorial);



  display.addEventListener('input', function() {
    let text = display.value;
  
    if (text.length >= 2) {
      const lastChar = text[text.length - 2];
      const sign = text[text.length - 1];
  
      if (isSign(lastChar) && isSign(sign)) {
        text = text.slice(0, -1) + sign;
        display.value = text;
      }
    }
  });



//cambiat el tema
  function toggleTheme() {
    const calculatorWrapper = document.querySelector('.calculator-wrapper');
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const body = document.body;
    calculatorWrapper.classList.toggle('dark');
    themeToggleBtn.classList.toggle('active');

    
  }


  
  