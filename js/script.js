let cantidadObras = 0;
let obras = [];
let consumoHora = 0;
let costoKWh = 0;


// paso 1: colocar los nombres de los cuadros
document.querySelector('#btnConfirmarCantidad').addEventListener('click', function() {
    
    let cantidad = document.querySelector('#cantidadObras').value;
    
    // Validar que no esté vacío y sea mayor a 0
    if (!cantidad || cantidad < 1) {
        alert('Ingrese una cantidad válida (mayor a 0)');
        return;
    }
    
    cantidadObras = Number(cantidad);
    
    // Deshabilitar input y botón
    document.querySelector('#cantidadObras').disabled = true;
    this.disabled = true;
    
    document.querySelector('#paso2').style.display = 'block';
});


//paso 2: datos de las obras
document.querySelector('#btnAgregarObra').addEventListener('click', function() {
    
    let nombre = document.querySelector('#nombreObra').value;
    let cantidad = document.querySelector('#cantidadLuces').value;
    let tiempo = document.querySelector('#tiempo').value;
    
    if (!nombre || !cantidad || !tiempo) {
        alert('Complete todos los campos');
        return;
    }
    
    if (cantidad < 1 || tiempo <= 0) {
        alert('Ingrese valores válidos');
        return;
    }
    
    let obra = {
        nombre: nombre,
        cantidadLuces: Number(cantidad),
        tiempo: Number(tiempo)
    };
    
    obras.push(obra);

        if (obras.length === 0) {
        alert('Debe ingresar al menos una obra');
        return;

    }
    // Mostrar la lista actualizada
    mostrarObras();
    
    // Limpiar formulario
    document.querySelector('#nombreObra').value = '';
    document.querySelector('#cantidadLuces').value = '';
    document.querySelector('#tiempo').value = '';
    
    if (obras.length === cantidadObras) {
        document.querySelector('#btnAgregarObra').disabled = true;
        document.querySelector('#paso3').style.display = 'block';
    }
});


//función : se muestran las obras en una lista
function mostrarObras() {
    let html = '<h4>Obras ingresadas:</h4>';
    
    obras.forEach((obra, index) => {
        html += `<p>${index + 1}. ${obra.nombre} - ${obra.cantidadLuces} luces, ${obra.tiempo}h/día</p>`;
    });
    
    document.querySelector('#listaObras').innerHTML = html;
}


//paso 3: cuantos KWh gasta y cuanto cuesta
document.querySelector('#btnCalcular').addEventListener('click', function() {
    
    let consumo = document.querySelector('#consumoHora').value;
    let costo = document.querySelector('#costoKWh').value;
    
    if (!consumo || !costo) {
        alert('Complete todos los campos');
        return;
    }
    
    if (consumo <= 0 || costo <= 0) {
        alert('Ingrese valores válidos mayores a 0');
        return;
    }
    
    consumoHora = Number(consumo);
    costoKWh = Number(costo);
    
    document.querySelector('#consumoHora').disabled = true;
    document.querySelector('#costoKWh').disabled = true;
    this.disabled = true;
    
    calcularResultados();
    
    document.querySelector('#paso4').style.display = 'block';
});


//función : calcular resultados
function calcularResultados() {
    
 
    
    //resultado 1: consumo total y el promerdio de este
    let consumoDiarioTotal = 0;
    
    obras.forEach(obra => {
        let consumoObra = obra.cantidadLuces * obra.tiempo * consumoHora;
        consumoDiarioTotal += consumoObra;
    });
    
    let consumoPromedio = consumoDiarioTotal / obras.length;
    
    
    //resultado 2 : calcular el tiempo
    let obraMayorTiempo = obras[0];
    let mayorTiempo = obras[0].tiempo;
    
    obras.forEach(obra => {
        if (obra.tiempo > mayorTiempo) {
            mayorTiempo = obra.tiempo;
            obraMayorTiempo = obra;
        }
    });
    
    let consumoObraMayor = obraMayorTiempo.cantidadLuces * obraMayorTiempo.tiempo * consumoHora;
    let costoObraMayor = obraMayorTiempo.cantidadLuces * costoKWh;
    
    
    //resultado 3: cuantos tienen mas de 20 luces
    let obrasConMas20 = obras.filter(obra => obra.cantidadLuces > 20).length;
    let porcentaje = (obrasConMas20 / obras.length) * 100;
    
    
    mostrarResultados(consumoDiarioTotal, consumoPromedio, obraMayorTiempo, costoObraMayor, porcentaje);
}


//funciín = mostrar resultados
function mostrarResultados(consumoTotal, consumoPromedio, obraMayor, costoMayor, porcentaje) {
    
    let div = document.querySelector('#resultados');
    
    div.innerHTML = `
        <h4>Análisis de Consumo</h4>
        
        <p><strong>1. Consumo Diario Total:</strong> ${consumoTotal.toFixed(2)} <kWh</p>
        <p><strong>   Consumo Diario Promedio por obra:</strong> ${consumoPromedio.toFixed(2)} <kWh/obra</p>
        
        <p><strong>2. Obra con mayor tiempo de funcionamiento:</strong> ${obraMayor.nombre}</p>
        <p><strong>   Tiempo de funcionamiento:</strong> ${obraMayor.tiempo} horas/día</p>
        <p><strong>   Costo diario:</strong> $${costoMayor.toFixed(2)}</p>
        
        <p><strong>3. Porcentaje de obras con más de 20 luces:</strong> ${porcentaje.toFixed(2)}%</p>
    `;
}


//paso 4 : volver a empezar
document.querySelector('#btnReiniciar').addEventListener('click', function() {
    
    // Limpiar variables
    cantidadObras = 0;
    obras = [];
    consumoHora = 0;
    costoKWh = 0;
    
    document.querySelector('#cantidadObras').value = '';
    document.querySelector('#cantidadObras').disabled = false;
    document.querySelector('#btnConfirmarCantidad').disabled = false;
    
    document.querySelector('#nombreObra').value = '';
    document.querySelector('#cantidadLuces').value = '';
    document.querySelector('#tiempo').value = '';
    document.querySelector('#btnAgregarObra').disabled = false;
    document.querySelector('#listaObras').innerHTML = '';
    
    document.querySelector('#consumoHora').value = '';
    document.querySelector('#costoKWh').value = '';
    document.querySelector('#consumoHora').disabled = false;
    document.querySelector('#costoKWh').disabled = false;
    document.querySelector('#btnCalcular').disabled = false;
    
    document.querySelector('#paso1').style.display = 'block';
    document.querySelector('#paso2').style.display = 'none';
    document.querySelector('#paso3').style.display = 'none';
    document.querySelector('#paso4').style.display = 'none';
});