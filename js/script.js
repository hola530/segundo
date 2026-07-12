let cantidadObras = 0;
let obras = [];
let consumoHora = 0;
let costokWh = 0;


// ============ PASO 1: CONFIRMAR CANTIDAD ============
document.querySelector('#btnConfirmarCantidad').addEventListener('click', function() {
    
    let cantidad = document.querySelector('#cantidadObras').value;
    
    // Validar que no esté vacío y sea mayor a 0
    if (!cantidad || cantidad < 1) {
        alert('Ingrese una cantidad válida (mayor a 0)');
        return;
    }
    
    // Guardar en variable global
    cantidadObras = Number(cantidad);
    
    // Deshabilitar input y botón
    document.querySelector('#cantidadObras').disabled = true;
    this.disabled = true;
    
    // Mostrar paso 2
    document.querySelector('#paso2').style.display = 'block';
});


// ============ PASO 2: AGREGAR OBRAS ============
document.querySelector('#btnAgregarObra').addEventListener('click', function() {
    
    // Tomar datos del formulario
    let nombre = document.querySelector('#nombreObra').value;
    let cantidad = document.querySelector('#cantidadLuces').value;
    let tiempo = document.querySelector('#tiempo').value;
    
    // Validar que no esté vacío
    if (!nombre || !cantidad || !tiempo) {
        alert('Complete todos los campos');
        return;
    }
    
    // Validar que sean números válidos
    if (cantidad < 1 || tiempo <= 0) {
        alert('Ingrese valores válidos');
        return;
    }
    
    // Crear objeto con los datos
    let obra = {
        nombre: nombre,
        cantidadLuces: Number(cantidad),
        tiempo: Number(tiempo)
    };
    
    // Agregar a la lista
    obras.push(obra);
    
    // Mostrar la lista actualizada
    mostrarObras();
    
    // Limpiar formulario
    document.querySelector('#nombreObra').value = '';
    document.querySelector('#cantidadLuces').value = '';
    document.querySelector('#tiempo').value = '';
    
    // Si ya ingresó todas las obras, mostrar paso 3
    if (obras.length === cantidadObras) {
        document.querySelector('#btnAgregarObra').disabled = true;
        document.querySelector('#paso3').style.display = 'block';
    }
});


// ============ FUNCIÓN: MOSTRAR LISTA DE OBRAS ============
function mostrarObras() {
    let listaDiv = document.querySelector('#listaObras');
    listaDiv.innerHTML = '<h4>Obras ingresadas:</h4>';
    
    // Para cada obra, mostrar una línea
    obras.forEach((obra, index) => {
        listaDiv.innerHTML += `<p>${index + 1}. ${obra.nombre} - ${obra.cantidadLuces} luces, ${obra.tiempo}h/día</p>`;
    });
}


// ============ PASO 3: INGRESAR CONSUMO Y COSTO ============
document.querySelector('#btnCalcular').addEventListener('click', function() {
    
    // Tomar datos
    let consumo = document.querySelector('#consumoHora').value;
    let costo = document.querySelector('#costokWh').value;
    
    // Validar que no esté vacío
    if (!consumo || !costo) {
        alert('Complete todos los campos');
        return;
    }
    
    // Validar que sean mayores a 0
    if (consumo <= 0 || costo <= 0) {
        alert('Ingrese valores válidos mayores a 0');
        return;
    }
    
    // Guardar en variables globales
    consumoHora = Number(consumo);
    costokWh = Number(costo);
    
    // Deshabilitar campos
    document.querySelector('#consumoHora').disabled = true;
    document.querySelector('#costokWh').disabled = true;
    this.disabled = true;
    
    // Calcular resultados
    calcularResultados();
    
    // Mostrar paso 4
    document.querySelector('#paso4').style.display = 'block';
});


// ============ FUNCIÓN: CALCULAR RESULTADOS ============
function calcularResultados() {
    
    // ===== RESULTADO 1: CONSUMO TOTAL Y PROMEDIO =====
    let consumoDiarioTotal = 0;
    
    obras.forEach(obra => {
        let consumoObra = obra.cantidadLuces * obra.tiempo * consumoHora;
        consumoDiarioTotal += consumoObra;
    });
    
    let consumoPromedio = consumoDiarioTotal / obras.length;
    
    
    // ===== RESULTADO 2: OBRA CON MAYOR TIEMPO =====
    let obraMayorTiempo = obras[0];
    let mayorTiempo = obras[0].tiempo;
    
    obras.forEach(obra => {
        if (obra.tiempo > mayorTiempo) {
            mayorTiempo = obra.tiempo;
            obraMayorTiempo = obra;
        }
    });
    
    let consumoObraMayor = obraMayorTiempo.cantidadLuces * obraMayorTiempo.tiempo * consumoHora;
    let costoObraMayor = consumoObraMayor * costokWh;
    
    
    // ===== RESULTADO 3: PORCENTAJE CON MÁS DE 20 LUCES =====
    let obrasConMas20 = obras.filter(obra => obra.cantidadLuces > 20).length;
    let porcentaje = (obrasConMas20 / obras.length) * 100;
    
    
    // Mostrar resultados en pantalla
    mostrarResultados(consumoDiarioTotal, consumoPromedio, obraMayorTiempo, costoObraMayor, porcentaje);
}


// ============ FUNCIÓN: MOSTRAR RESULTADOS ============
function mostrarResultados(consumoTotal, consumoPromedio, obraMayor, costoMayor, porcentaje) {
    
    let div = document.querySelector('#resultados');
    
    div.innerHTML = `
        <h4>📊 Análisis de Consumo</h4>
        
        <p><strong>1. Consumo Diario Total:</strong> ${consumoTotal.toFixed(2)} kWh</p>
        <p><strong>   Consumo Diario Promedio por obra:</strong> ${consumoPromedio.toFixed(2)} kWh/obra</p>
        
        <p><strong>2. Obra con mayor tiempo de funcionamiento:</strong> ${obraMayor.nombre}</p>
        <p><strong>   Tiempo de funcionamiento:</strong> ${obraMayor.tiempo} horas/día</p>
        <p><strong>   Costo diario:</strong> $${costoMayor.toFixed(2)}</p>
        
        <p><strong>3. Porcentaje de obras con más de 20 luces:</strong> ${porcentaje.toFixed(2)}%</p>
    `;
}


// ============ PASO 4: REINICIAR ============
document.querySelector('#btnReiniciar').addEventListener('click', function() {
    
    // Limpiar variables
    cantidadObras = 0;
    obras = [];
    consumoHora = 0;
    costokWh = 0;
    
    // Limpiar paso 1
    document.querySelector('#cantidadObras').value = '';
    document.querySelector('#cantidadObras').disabled = false;
    document.querySelector('#btnConfirmarCantidad').disabled = false;
    
    // Limpiar paso 2
    document.querySelector('#nombreObra').value = '';
    document.querySelector('#cantidadLuces').value = '';
    document.querySelector('#tiempo').value = '';
    document.querySelector('#btnAgregarObra').disabled = false;
    document.querySelector('#listaObras').innerHTML = '';
    
    // Limpiar paso 3
    document.querySelector('#consumoHora').value = '';
    document.querySelector('#costokWh').value = '';
    document.querySelector('#consumoHora').disabled = false;
    document.querySelector('#costokWh').disabled = false;
    document.querySelector('#btnCalcular').disabled = false;
    
    // Ocultar todos los pasos excepto el 1
    document.querySelector('#paso1').style.display = 'block';
    document.querySelector('#paso2').style.display = 'none';
    document.querySelector('#paso3').style.display = 'none';
    document.querySelector('#paso4').style.display = 'none';
});