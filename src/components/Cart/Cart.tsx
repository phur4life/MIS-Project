import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

const Cart = ({ productData }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-end mb-3">
        <button className="bg-primary p-2 border rounded-md text-white">Add Item</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {productData.map((product, index) => (
          <div
            key={index}
            className="bg-white border p-4 text-center rounded-lg shadow-xl"
          >
            <div className="flex justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-43 h-40 object-cover rounded-lg"
              />
            </div>
            <h3 className="text-lg font-bold mt-4">{product.title}</h3>
            <p className="text-gray-500 mt-2 text-sm">{product.description}</p>
            <div className="flex justify-between items-center mt-4">
              <button className="bg-primary text-white px-4 py-2 rounded">
                View Detail
              </button>
              <div className="flex justify-center">
                <button className="text-black px-4 py-2 rounded">
                  <CiEdit size={25} />
                </button>
                <button className="text-black px-4 py-2 rounded">
                  <AiOutlineDelete size={25} scale={3} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
