import { useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { RiEditBoxLine } from "react-icons/ri";
import "./App.css";
import Swal from "sweetalert2";
export default function App() {
  const nameInput = useRef();
  const priceInput = useRef();
  const qtyInput = useRef();
  const [phoneIndex, setPhoneIndex] = useState(0);
  const handleSubmit = (event) => {
    event.preventDefault();

    let newphone = {
      name: nameInput.current.value,
      price: +priceInput.current.value,
      qty: +qtyInput.current.value,
    };
    let copy = [...phones];
    copy.push(newphone);
    setphones(copy);
    Swal.fire({
      icon: "success",
      title: "Phone Aded",
    }).then(() => {
      setmodalIndex(false);
    });
  };

  const removePhone = (phoneIndex) => {
    Swal.fire({
      icon: "question",
      text: "Are you sure you want to delete this Phone?",
      showDenyButton: true,
      confirmButtonColor: "red",
      denyButtonColor: "green",
      confirmButtonText: "Delete",
      denyButtonText: "Cancel",
    }).then((res) => {
      if (res.isConfirmed) {
        let copy = [...phones];
        copy.splice(phoneIndex, 1);
        setPhones(copy);
      }
    });
  };

  const [phones, setphones] = useState([
    { name: "iphone 11", price: 400, qty: 3 },
    { name: "iphone 12", price: 500, qty: 8 },
    { name: "iphone 13", price: 600, qty: 4 },
    { name: "iphone 14", price: 700, qty: 1 },
  ]);
  const [modalIndex, setmodalIndex] = useState(false);
  return (
    <div className="col-12 App container d-flex flex-column align-items-center">
      <h1>Fatora System</h1>

      <button
        onClick={() => {
          setmodalIndex(true);
        }}
        className="btn btn-primary "
      >
        Add New Phone
      </button>

      <table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th>-</th>
            <th>Phone Name</th>
            <th>Phone Price</th>
            <th>Phone Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {phones.map((el, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{el.name}</td>
                <td>{el.price}</td>
                <td>{el.qty}</td>
                <td>
                  <div className="d-flex gap-3">
                    <FaTrash
                      onClick={() => {
                        removePhone(index);
                      }}
                      className="text-danger"
                    />
                    <RiEditBoxLine className="text-warning" />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {modalIndex == true ? (
        <div
          onClick={() => {
            setmodalIndex(false);
          }}
          className="myModal d-flex align-items-center justify-content-center"
        >
          <form
            onSubmit={handleSubmit}
            onClick={(event) => event.stopPropagation()}
            className="bg-white rounded shadow boder p-3 d-flex flex-column gap-3 col-12 col-md-5 animate__animated animate__fadeInDown"
          >
            <input
              ref={nameInput}
              className="form-control"
              type="text"
              placeholder="Enter your phone Name"
            />
            <input
              ref={priceInput}
              className="form-control"
              type="number"
              placeholder="Enter your phone Price"
            />
            <input
              ref={qtyInput}
              className="form-control"
              type="number"
              placeholder="Enter your phone Qty"
            />
            <button className="btn btn-primary">Add New Phone</button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
