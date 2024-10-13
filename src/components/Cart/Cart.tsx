const Cart = ({ productData }) => {
    return (
      <>
        <div className="grid grid-cols-3 gap-4">
          {productData.map((product, index) => (
            <div key={index} className="bg-white border p-4 text-center rounded-lg">
              <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded-lg" />
              <h3 className="text-lg font-bold mt-2">{product.title}</h3>
              <p className="text-gray-500 mt-2">{product.description}</p>
              <div className="flex justify-between mt-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">View Detail</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };
  
  export default Cart;
  