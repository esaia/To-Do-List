import "./index.css";
import { useEffect, useState } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalstorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalstorage());
  const [alert, setAlert] = useState({ show: false, msg: "", status: "" });
  const [isEditing, setIsediting] = useState(false);
  const [editId, setEditId] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showalert(true, "please enter value", "danger");
    } else if (name && isEditing) {
      // edit list
      const editItem = list.find((item) => item.id === editId);
      editItem.title = name;
      showalert(true, "value changed", "success");

      setName("");
      setIsediting(false);
      setEditId(null);
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
      showalert(true, "The item added", "success");
    }
  };

  const showalert = (show = false, msg = "", status = "") => {
    setAlert({ show, msg, status });
  };

  const clearelist = () => {
    setList([]);
    showalert(true, "list is empty", "danger");
  };
  const removeitem = (id) => {
    setList(list.filter((item) => item.id !== id));
    showalert(true, "item removed", "danger");
  };
  const editItem = (id) => {
    const edititem = list.find((item) => item.id === id);
    setIsediting(true);
    setEditId(id);
    setName(edititem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className='flex justify-center items-center  w-full  '>
      <div className='w-[500px] pb-10 mt-20 px-10 bg-white flex flex-col items-center '>
        <h1 className='text-center font-bold text-3xl m-3'>To do list</h1>

        {/* input div */}

        <form
          onSubmit={handleSubmit}
          className='flex justify-center border-gray-200 border-[1px]   w-full'
        >
          <input
            type='text'
            className='w-full  pl-3 focus:outline-none'
            placeholder='Your todos'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type='submit'
            className='bg-sky-400 text-white p-1 cursor-pointer w-[100px]'
          >
            {isEditing ? "Edit" : "Submit"}
          </button>
        </form>
        {/* list */}
        {list.length > 0 && (
          <div className='flex flex-col items-center  w-full  '>
            <List
              list={list}
              removeitem={removeitem}
              editItem={editItem}
              showalert={showalert}
            />
            <button
              className='bg-red-300 text-white px-5 py-1  w-[200px] hover:bg-red-500'
              onClick={clearelist}
            >
              Cleare all
            </button>
          </div>
        )}
      </div>

      {/* alert */}
      <div className='absolute bottom-6 right-6 h-24'>
        {alert.show && (
          <Alert alert={alert} removeAlert={showalert} list={list} />
        )}
      </div>
    </div>
  );
}

export default App;
