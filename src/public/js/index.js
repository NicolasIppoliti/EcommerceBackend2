const socket = io();

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('productForm');

    if (form) {
        form.addEventListener('submit', submitForm);
    } else {
        console.error('No se pudo encontrar el formulario');
    }

    socket.on('newProduct', (product) => {
        addProductToList(product);
    });
});

async function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const product = Object.fromEntries(formData.entries());

    // Emitir el evento 'addProduct' en lugar de hacer una solicitud HTTP
    socket.emit('addProduct', product);

    event.target.reset();
}

function addProductToList(product) {
    const tableBody = document.querySelector('table tbody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.code}</td>
        <td>${product.price}</td>
        <td>${product.status}</td>
        <td>${product.stock}</td>
        <td>${product.category}</td>
        <td><img src="${product.thumbnail}" alt="${product.title}" width="100"></td>
    `;

    tableBody.appendChild(newRow);
}

const deleteButtons = document.querySelectorAll('.delete-product');

deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('clicked!');
        const productId = button.dataset.productId;
        socket.emit('removeProduct', productId);
    });
});

socket.on('productRemoved', (productId) => {
    const productElement = document.querySelector(`[data-product-id="${productId}"]`);
    productElement.closest('tr').remove();
});