// Importando los métodos de api.js
import { getAllSlaves, getSlaveByID, createSlave, updateSlave, deleteSlave } from './api.js';

// Traer los productos y crear cada uno en la página principal
document.addEventListener('DOMContentLoaded', async () => {
    const slaveList = document.getElementById('slave-list');
    const slaves = await getAllSlaves();
  slaveList.innerHTML = slaves.map(slave => `
      <div class="col-xs-12 col-sm-6 col-md-3 card">
        <img class="card-img-top" src="${slave.imgUrl}">
        <div class="card-body d-flex flex-column justify-content-end">
          <h5 class="card-title">${slave.name}</h5>
          <p class="card-text">${new Intl.NumberFormat('en-ES', { style: 'currency', currency: 'USD' }).format(slave.price)}</p>
          <a onclick="viewSlave(${slave.id})" class="btn btn-primary">Ver más</a>
        </div>
      </div>
    `).join('');
});

// Crear la vista de detalles para cada producto al dar click en el boton ver más
window.viewSlave = async (id) => {
    const slave = await getSlaveByID(id);
    const slaveDetails = `
      <div class="col">
        <img class="img-fluid" src="${slave.imgUrl}">
        <h3>${slave.name}</h3>
        <p>${slave.description}</p>
        <p>Precio: ${new Intl.NumberFormat('en-ES', { style: 'currency', currency: 'USD' }).format(slave.price)}</p>
        <button class="btn btn-warning" onclick="enableEdit(${slave.id})">Editar</button>
        <button class="btn btn-danger" onclick="deleteSlave(${slave.id})">Eliminar</button>
      </div>
      `;
    document.getElementById('slave-list').innerHTML = slaveDetails;
  };
  
  // Habilitamos el formulario para editar cada uno de los productos
  window.enableEdit = async (id) => {
    const slave = await getSlaveByID(id);
    const editForm = `
      <div class="row gap-3">
        <input type="text" id="name" value="${slave.name}">
        <textarea id="description">${slave.description}</textarea>
        <input type="number" id="price" value="${slave.price}">
        <input type="text" id="imgUrl" value="${slave.imgUrl}">
        <button class="btn btn-success" onclick="saveEdit(${id})">Guardar</button>
      </div>
      `;
    document.getElementById('slave-list').innerHTML = editForm;
  };
  
  // Guardamos la nueva información en nuestra base de datos
  window.saveEdit = async (id) => {
    const updateSlave = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      price: parseFloat(document.getElementById('price').value),
      imgUrl: document.getElementById('imgUrl').value
    };
    await updateSlave(id, updateSlave);
    location.reload(); // Recarga la página para ver los cambios
  };
  
  // Función para borrar el producto seleccionado
  window.deleteSlave = async (id) => {
    await deleteSlave(id);
    location.reload(); // Recarga la página para ver los cambios
  };