import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const ProductEditForm = ({
  modalEditar,
  setModalEditar,
  editar,
  productoSeleccionado,
  handleChange
}) => {

  return (
    <Modal isOpen={modalEditar}>

      <ModalHeader>
        <div>
          <h3>Editar Producto</h3>
        </div>
      </ModalHeader>

      <ModalBody>
        <div className="form-group">
          <label>ID</label>
          <input
            className="form-control"
            readOnly
            type="text"
            name="id"
            value={productoSeleccionado && productoSeleccionado.id}
          />
          <br />

          <label>Producto</label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={productoSeleccionado && productoSeleccionado.name}
            onChange={handleChange}
          />
          <br />

          <label>Description</label>
          <input
            className="form-control"
            type="text"
            name="description"
            value={productoSeleccionado && productoSeleccionado.description}
            onChange={handleChange}
          />
          <br />

          <label>Price</label>
          <input
            className="form-control"
            type="text"
            name="price"
            value={productoSeleccionado && productoSeleccionado.price}
            onChange={handleChange}
          />
          <br />

          <label>Stock</label>
          <input
            className="form-control"
            type="text"
            name="stock"
            value={productoSeleccionado && productoSeleccionado.stock}
            onChange={handleChange}
          />
          <br />

          <label>Imagen URL</label>
          <input
            className="form-control"
            type="text"
            name="img"
            value={productoSeleccionado && productoSeleccionado.img}
            onChange={handleChange}
          />
          <br />

        </div>
      </ModalBody>

      <ModalFooter>
        <button className="btn btn-primary" onClick={() => editar()}>
          Actualizar
          </button>
        <button
          className="btn btn-danger"
          onClick={() => setModalEditar(false)}
        >
          Cancelar
          </button>
      </ModalFooter>
    </Modal>
  );
};

export default ProductEditForm;