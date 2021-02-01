import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct, addProduct, editProduct, addCategoryToProduct, removeCategoryToProduct } from '../../redux/actions/product';
import { addCategory } from '../../redux/actions/category';
import DropZone from '../DropZone/DropZone';

import "./ProductTable.css";

function ProductTable(props) {
  const history = useHistory();
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    if (!user.isAdmin) {
      history.push('/');
    }
  }, [])

  const dispatch = useDispatch();

  const products = useSelector(state => state.product.products);
  const dataCategories = useSelector(state => state.category.categories);

  //Prductos Hooks
  // const [data, setData] = useState(productos);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  // Add and Remove Categories
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [removeCategoryModal, setRemoveCategoryModal] = useState(false);

  const [error, setError] = useState({});

  const [productoSeleccionado, setProductoSeleccionado] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    images: [],
    categories: []
  });

  //Categorias Hooks
  // const [dataCategories, setDataCategories] = useState(categories);
  const [modalEditarCategoria, setModalEditarCategoria] = useState(false);
  const [modalEliminarCategoria, setModalEliminarCategoria] = useState(false);
  const [modalInsertarCategoria, setModalInsertarCategoria] = useState(false);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState({
    id: '',
    name: '',
    description: ''
  });

  //Productos
  const seleccionarProducto = (elemento, caso) => {
    setProductoSeleccionado(elemento);
    (caso === 'Editar') ? setModalEditar(true) : setModalEliminar(true);
  };
  //Categorias
  const seleccionarCategoria = (elemento, caso) => {
    setCategoriaSeleccionada(elemento);
    (caso === 'Editar') ? setModalEditarCategoria(true) : setModalEliminarCategoria(true);
  };

  //Productos
  const handleChange = e => {
    const { name, value } = e.target;
    console.log('entre')
    if (name === "img"){
      value = JSON.parse(localStorage.getItem('url'))
      setProductoSeleccionado({
        ...productoSeleccionado,
        images: [value]
      });
      localStorage.removeItem('url')
    }
    else
      setProductoSeleccionado((prevState) => ({
        ...prevState,
        [name]: value
      }));
    setError(validate({
      ...productoSeleccionado,
      [e.target.name]: [e.target.value]
    }));
  };

  const validate = (input) => {
    const error = {};

    // if (input.stock[0] === '') {
    //   error.stock = 'Stock is required';
    // }

    if (!Number(input.price)) {
      error.price = 'Please, input a valid price.';
    } else if (String(input.price).charAt(String(input.price).length - 3) !== '.') {
      error.price = 'Price format must have 2 digits after the decimal point.';
    }

    if (Number(input.stock) < 0) {
      error.stock = 'Please, input a valid amount.';
    }

    return error;
  };

  //Categorias
  const handleChangeCategory = e => {
    const { name, value } = e.target;
    if (!value) return;

    setCategoriaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  //Productos
  const editar = () => {
    // setData(data.map(d => {
    //   if (d.id === productoSeleccionado.id) {
    //     return productoSeleccionado;
    //   }
    //   return d;
    // }));

    dispatch(editProduct(productoSeleccionado.id, productoSeleccionado));

    setModalEditar(false);
  };
  //Categorias
  const editarCategoria = () => {
    // var dataNueva = dataCategories;
    // dataNueva.map(categoria => {
    //   if (categoria.id === categoriaSeleccionada.id) {
    //     categoria.name = categoriaSeleccionada.name;
    //     categoria.description = categoriaSeleccionada.description;
    //   }
    // });
    // setDataCategories(dataNueva);
    setModalEditarCategoria(false);
  };

  //Productos
  const eliminar = (e) => {
    // setData(data.filter(producto => producto.id !== productoSeleccionado.id));
    dispatch(removeProduct(productoSeleccionado.id));
    setModalEliminar(false);
  };
  //Categorias
  const eliminarCategoria = () => {
    // setDataCategories(dataCategories.filter(categoria => categoria.id !== categoriaSeleccionada.id));
    setModalEliminarCategoria(false);
  };

  //Productos
  const newProductModal = () => {
    setProductoSeleccionado(null);
    setModalInsertar(true);
  };
  //Categories
  const newCategoryModal = () => {
    setCategoriaSeleccionada(null);
    setModalInsertarCategoria(true);
  };

  const addCategoryToProductModal = (p) => {
    setProductoSeleccionado(p);
    setCategoriaSeleccionada(null);
    setAddCategoryModal(true);
  };

  const removeCategoryToProductModal = (p) => {
    setProductoSeleccionado(p);
    setCategoriaSeleccionada(null);
    setRemoveCategoryModal(true);
  };

  //Productos
  const insertar = () => {
    // var valorInsertar = productoSeleccionado;
    // valorInsertar.id = data[data.length - 1].id + 1;
    // var dataNueva = data;
    // dataNueva.push(valorInsertar);
    // setData(dataNueva);
    dispatch(addProduct(productoSeleccionado));
    setModalInsertar(false);
  };
  //Categorias
  const insertarCategoria = () => {
    // var valorInsertar = categoriaSeleccionada;
    // valorInsertar.id = dataCategories[data.length - 1].id + 1;
    // var dataNueva = dataCategories;
    // dataNueva.push(valorInsertar);
    // setDataCategories(dataNueva);
    dispatch(addCategory(categoriaSeleccionada));
    setModalInsertarCategoria(false);
  };

  const setCategoryToProduct = () => {
    if (!categoriaSeleccionada) return;

    dispatch(addCategoryToProduct(productoSeleccionado.id, categoriaSeleccionada.categoryId));
    setAddCategoryModal(false);
  };

  const unsetCategoryToProduct = () => {
    if (!categoriaSeleccionada) return;

    dispatch(removeCategoryToProduct(productoSeleccionado.id, categoriaSeleccionada.categoryId));
    setRemoveCategoryModal(false);
  };

  return (
    <div className="App">
      <h2 id='prodList' class="alert alert-info">Products List</h2>
      <div id='ordTabl'>
        <Link to='/admin/orders' >
          <button className="btn btn-info">Orders</button>
        </Link>
        <Link to='/admin/users' >
          <button className="btn btn-info">Users</button>
        </Link>
      </div>
      <div className='newProCat'>
        <button className="btn btn-success" onClick={() => newProductModal()}>New Product</button>
        <button className="btn btn-primary" onClick={() => newCategoryModal()}>New Category</button>
      </div>
      <br /><br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Images</th>
            <th>Category</th>
            <th>Edit Delete</th>
          </tr>
        </thead>
        <tbody id="tBody">
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td id='imgBox'>
                {
                  p.images.map((img, i) => (
                    <img src={img} alt={p.name} key={i} />
                  ))
                }
              </td>
              <td>
                {
                  p.categories.map((c, i) => (
                    <li key={i}>{c.name}</li>
                  ))
                }
              </td>
              <td id="buttonBox">
                <button className="btn btn-primary" onClick={() => seleccionarProducto(p, 'Editar')}>Edit Product</button> {"   "}
                <button className="btn btn-danger" onClick={() => seleccionarProducto(p, 'Eliminar')}>Delete Product</button>
                <br />
                <button className="btn btn-primary" onClick={() => addCategoryToProductModal(p)}>Add Category</button>
                <button className="btn btn-danger" onClick={() => removeCategoryToProductModal(p)}>Remove Category</button>
              </td>
            </tr>
          ))
          }
        </tbody>
      </table>

      {
        addCategory && <Modal isOpen={addCategoryModal}>
          <ModalHeader>
            <div>
              <h3>Add category to product</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">

              <label>Category</label>
              <select
                className="custom-select"
                name="categoryId"
                onChange={handleChangeCategory}>
                <option selected value="" name="category">Select a category</option>
                {dataCategories.map((e, i) =>
                  <option value={e.id} name="category" key={i}>{e.name}</option>
                )}
              </select>

            </div>

          </ModalBody>

          <ModalFooter>
            <button className="btn btn-primary"
              onClick={() => setCategoryToProduct()}>
              Add
          </button>
            <button
              className="btn btn-danger"
              onClick={() => setAddCategoryModal(false)}>
              Close
          </button>
          </ModalFooter>
        </Modal>

      }

      {removeCategoryModal && <Modal isOpen={removeCategoryModal}>
        <ModalHeader>
          <div>
            <h3>Remove category from product</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">

            <label>Category</label>
            <select
              className="custom-select"
              name="categoryId"
              onChange={handleChangeCategory}>
              <option selected value="" name="category">Select a category</option>
              {productoSeleccionado.categories.map((e) =>
                <option value={e.id} name="category">{e.name}</option>
              )}
            </select>

          </div>

        </ModalBody>

        <ModalFooter>
          <button className="btn btn-primary"
            onClick={() => unsetCategoryToProduct()}>
            Remove
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setRemoveCategoryModal(false)}>
            Close
          </button>
        </ModalFooter>
      </Modal>}

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Edit Product</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              id="idNum"
              type="text"
              name="id"
              value={productoSeleccionado && productoSeleccionado.id} />
            <br />

            <label>Product</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={productoSeleccionado && productoSeleccionado.name}
              onChange={handleChange}
              maxLength="200" />
            <br />

            <label>Description</label>
            <input
              className="form-control"
              type="text"
              name="description"
              value={productoSeleccionado && productoSeleccionado.description}
              onChange={handleChange}
              maxLength="2000" />
            <br />

            <label>Price</label>
            <input
              className="form-control"
              type="text"
              name="price"
              value={productoSeleccionado && productoSeleccionado.price}
              onChange={handleChange}
              maxLength="8" />
            {error.price && <span className='text-danger'>{error.price}</span>}
            <br />

            <label>Stock</label>
            <input
              className="form-control"
              type="number"
              name="stock"
              value={productoSeleccionado && productoSeleccionado.stock}
              onChange={handleChange}
              step="1"
              min="0"
              max="9999"
              required />
            {error.stock && <span className='text-danger'>{error.stock}</span>}
            <br />

            <label>Image</label>
            <form></form>
            <DropZone    
            name='img'
            onChange={handleChange}
            />
            <br />

          </div>
        </ModalBody>

        <ModalFooter>
          <button disabled={error.price || error.stock} className="btn btn-primary" onClick={() => editar()}>
            Update
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalEditar(false)}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Are you sure you want to delete this product from the database? {productoSeleccionado && productoSeleccionado.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => eliminar()}>
            Yes
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setModalEliminar(false)}>
            No
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Add Product</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Product</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={productoSeleccionado && productoSeleccionado.name}
              onChange={handleChange}
              maxLength="200" />
            <br />

            <label>Description</label>
            <input
              className="form-control"
              type="text"
              name="description"
              value={productoSeleccionado && productoSeleccionado.description}
              onChange={handleChange}
              maxLength="2000" />
            <br />

            <label>Price</label>
            <input
              className="form-control"
              type="text"
              name="price"
              value={productoSeleccionado && productoSeleccionado.price}
              onChange={handleChange}
              maxLength="8" />
            {error.price && <span className='text-danger'>{error.price}</span>}
            <br />

            <label>Stock</label>
            <input
              className="form-control"
              type="number"
              name="stock"
              value={productoSeleccionado && productoSeleccionado.stock}
              onChange={handleChange}
              step="1"
              min="0"
              max="9999"
              required />
            {error.stock && <span className='text-danger'>{error.stock}</span>}
            <br />

            <label>Image</label>
            <form></form>
            <DropZone    
            name='img'
            onChange={handleChange}
            />
            <br />

          </div>
        </ModalBody>

        <ModalFooter>
          <button className="btn btn-primary"
            onClick={() => insertar()}>
            Add
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalInsertar(false)}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>

      {/*Insertar Categoria Modal */}
      <Modal isOpen={modalInsertarCategoria}>
        <ModalHeader>
          <div>
            <h3>Add Category</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            {/* <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={data[data.length - 1].id + 1}
            />
            <br /> */}

            <label>Category</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={categoriaSeleccionada ? categoriaSeleccionada.name : ''}
              onChange={handleChangeCategory} />
            <br />

            <label>Description</label>
            <input
              className="form-control"
              type="text"
              name="description"
              value={categoriaSeleccionada ? categoriaSeleccionada.description : ''}
              onChange={handleChangeCategory} />
            <br />
          </div>

        </ModalBody>

        <ModalFooter>
          <button className="btn btn-primary"
            onClick={() => insertarCategoria()}>
            Add
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalInsertarCategoria(false)}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </div >
  );
}

export default ProductTable;