import React from "react";
import { FaTrashAlt, FaEdit, FaRegCopy } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";

const List = ({ list, removeitem, editItem, showalert }) => {
  return (
    <div className='w-full'>
      {list.map((item) => {
        return (
          <div
            key={item.id}
            className='flex justify-between bg-gray-200 py-2 px-3 m-2 '
          >
            <h1>{item.title}</h1>

            <div className='flex justify-between w-[70px] '>
              <CopyToClipboard text={item.title}>
                <FaRegCopy
                  className='hover:text-white cursor-pointer'
                  onClick={() =>
                    showalert(true, "The item copied to clipboard", "middle")
                  }
                />
              </CopyToClipboard>
              <FaEdit
                className='hover:text-white cursor-pointer'
                onClick={() => editItem(item.id)}
              />
              <FaTrashAlt
                className='hover:text-red-400 cursor-pointer'
                onClick={() => removeitem(item.id)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
