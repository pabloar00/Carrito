window.onload = function(){
    //Array con los productos que se van a incluir
const productos=[
    {
    tag: 1,
    nombre: 'CyberPunk 2077',
    imagen: 'images/cyberpunk.jpeg',
    genero: 'RPG',
    precio: 80.00,
    oferta: false
},
    {
        tag: 2,
    nombre: 'Battlefield 3',
    imagen: 'images/battlefield.jpg',
    genero: 'Shooter',
    precio: 10.00,
    oferta: false
},
    {
        tag: 3,
    nombre: 'Cities Skylines',
    imagen: 'images/cities.jpg',
    genero: 'Estrategia',
    precio: 10.00,
    oferta: false
},
    {
        tag: 4,
    nombre: 'Dark Souls III',
    imagen: 'images/darksouls.jpg',
    genero: 'RPG',
    precio: 20.00,
    oferta: false
},
    {
        tag: 5,
    nombre: 'FIFA 21',
    imagen: 'images/fifa.jpeg',
    genero: 'Deportes',
    precio: 60.00,
    oferta: false
},
    {
        tag: 6,
    nombre: 'GTA V',
    imagen: 'images/gta.jpg',
    genero: 'Acción',
    precio: 30.00,
    oferta: false
},
    {
        tag: 7,
    nombre: 'Mortal Kombat XI',
    imagen: 'images/mortal.jpeg',
    genero: 'Lucha',
    precio: 30.00,
    oferta: false
},
    {
        tag: 8,
    nombre: 'Fallout New Vegas',
    imagen: 'images/newvegas.jpg',
    genero: 'RPG',
    precio: 5.00,
    oferta: false
},
    {
        tag: 9,
    nombre: 'Resident Evil 2 Remake',
    imagen: 'images/resident.jpeg',
    genero: 'Terror',
    precio: 40.00,
    oferta: false
},
    {
        tag: 10,
    nombre: 'The Crew 2',
    imagen: 'images/thecrew.jpg',
    genero: 'Deportes',
    precio: 20.00,
    oferta: false
}
];
/* variables para enlazar con document e insertar valores*/
let $items =document.querySelector('#listaproductos');
let arrayCesta=[];
let total= 0;
let $cesta=document.querySelector('#cesta');
let $total= document.querySelector('#total');
let $botonvaciar=document.querySelector('#boton-vaciar');
let $botoncesta=document.querySelector('#botoncesta');

function mostrarocultar(){
    var aside=document.getElementById('aside');
    if(aside.style.display==='block'){
        aside.style.display='none';
    }else{
        aside.style.display='block';
    }
}


/*Mostrar los elementos de los productos*/
function renderItems(){
    for (let info of productos){


        // tarjeta de producto
        let tarjeta=document.createElement('div');
        tarjeta.classList.add('body-tarjeta');

        //Titulo
        let nombre=document.createElement('h3');
        nombre.classList.add('titulo');
        nombre.textContent=info['nombre'];

        //Genero
        let genero=document.createElement('p');
        genero.classList.add('genero');
        genero.textContent=info['genero'];

        //Imagen
        let imagen=document.createElement('img');
        imagen.classList.add('img');
        imagen.setAttribute('src', info['imagen']);

        //Precio
        let precio=document.createElement('h3');
        precio.classList.add('precio');
        precio.textContent=info['precio']+'€';

        //Boton
        let boton=document.createElement('button');
        boton.classList.add('boton');
        boton.textContent='Añadir a cesta';
        boton.setAttribute('marcador',info['tag']);
        boton.addEventListener('click', insertarenCesta);
        

        //insertar
        tarjeta.appendChild(imagen);
        tarjeta.appendChild(nombre);
        tarjeta.appendChild(genero);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(boton);
        $items.appendChild(tarjeta);
    }


}

/*añadir productos a la cesta y mostrarlos*/
function insertarenCesta(){
    //insertar el nodo al array de la cesta
    arrayCesta.push(this.getAttribute('marcador'))
    //calcular el total
    calcularTotal();
    //mostrar cesta
    renderCesta();
}

/*mostrar la cesta*/
function renderCesta(){
    //vaciar html de la cesta
    $cesta.textContent= '';
    //Borrar duplicados
    let cestaQuitarRepetidos =[...new Set(arrayCesta)];
    //generacion de nodos a partir de cesta
    cestaQuitarRepetidos.forEach(function (item, _indice){
        //recuperación del identificador  del producto en el array de datos
        let miProducto=productos.filter(function(itemproductos){
            return itemproductos['tag'] == item;
        });
        //contar el número de veces que se repite el producto
        let numeroproductos = arrayCesta.reduce(function(total, idproducto){
        return idproducto === item ? total+=1 : total;
        }, 0);    
        //creacion nodo para el producto en la cesta
        let nodoItemCesta=document.createElement('div');
        nodoItemCesta.classList.add('producto-lista')
        nodoItemCesta.textContent= `${numeroproductos} x ${miProducto[0]['nombre']}-${miProducto[0]['precio']} €`;
        //boton de borrar
        let botonborrar=document.createElement('button');
        botonborrar.classList.add('boton-borrar');
        botonborrar.textContent='X';
        botonborrar.style.marginLeft= '1rem';
        botonborrar.setAttribute('item', item);
        botonborrar.addEventListener('click', borrarProductoCesta);
        //asignar nodos
        nodoItemCesta.appendChild(botonborrar);
        $cesta.appendChild(nodoItemCesta);
    });
}

/*Elimina un producto insertado de la cesta*/
function borrarProductoCesta(){
    //recuperar id del producto que queremos eliminar
    let idproductocesta=this.getAttribute('item');
    //borrar todos los productos
    arrayCesta=arrayCesta.filter(function(idcesta){
        return idcesta !== idproductocesta;
    });
    //volver a renderizar
    renderCesta();
    //calcular el total
    calcularTotal();
}

/*Calcula el precio total de todos los productos en la cesta*/
function calcularTotal(){
    //borrar el precio 
    total=0;
    //recorrer el array de la cesta y obtener el precio de cada producto
    for(let item of arrayCesta){
        let itemcesta=productos.filter(function(objetoproductos){
            return objetoproductos['tag']==item;
        });
        //se suma el total
        total=total+itemcesta[0]['precio'];
    }
    //mostrar el precio
    $total.textContent=total.toFixed(2);
}

/*Elimna el contenido de la cesta*/
function vaciarCesta(){
    //borrar los productos guardados en el array
    arrayCesta=[];
    //Renderizar cambios
    renderCesta();
    calcularTotal();
}
/*Evento para mostrar y ocultar la cesta al  hacer click en el carrito*/
$botoncesta.addEventListener('click', mostrarocultar);

/*Evento para vaciar la cesta al hacer click en el boton que dice "vaciar cesta"*/
$botonvaciar.addEventListener('click', vaciarCesta);

/*Muestra los productos disponibles */
renderItems();


}
