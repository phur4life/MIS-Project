// import { CiEdit } from "react-icons/ci";
// import { AiOutlineDelete } from "react-icons/ai";
// import { useState } from "react";
// import ViewItemDetails from "./ItemForm";
// import { Button } from "../ui/button";

// interface ProductData {
// 	id: string;
// 	itemName: string;
// 	quantity: number;
// 	description: string;
// 	image: string;
// 	status: string;
// }

// interface CartProps {
// 	productData: ProductData[];
// 	onEdit: (index: number) => void; // Function to handle editing
// 	onDelete: (index: string) => void; // Function to handle deletion
// 	onSaveEdit: (updatedItem: ProductData) => void;
// }

// const Cart: React.FC<CartProps> = ({
// 	productData,
// 	onEdit,
// 	onDelete,
// 	onSaveEdit,
// }) => {
// 	const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
// 		null
// 	);

// 	const openForm = (product: ProductData) => setSelectedProduct(product);
// 	const closeForm = () => setSelectedProduct(null);

// 	return (
// 		<div className="container mx-auto px-4">
// 			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// 				{productData.map((product, index) => (
// 					<div
// 						key={product.id}
// 						className="bg-white border p-4 text-center rounded-lg shadow-xl"
// 					>
// 						<div className="flex justify-center">
// 							<img
// 								src={product.image}
// 								alt={`Image of ${product.itemName}`}
// 								className="w-43 h-40 object-cover rounded-lg"
// 							/>
// 						</div>
// 						<h3 className="text-lg font-bold mt-4">{product.itemName}</h3>
// 						<p className="text-gray-500 mt-2 text-sm">{product.description}</p>
// 						<div className="flex justify-between items-center mt-4">
// 							<Button
// 								onClick={() => openForm(product)}
// 								className="bg-primary text-white px-4 py-2 rounded"
// 							>
// 								View Detail
// 							</Button>
// 							<div className="flex justify-center">
// 								{/* <button
// 									className="text-black px-4 py-2 rounded"
// 									onClick={() => onEdit(index)} // Call edit function
// 								>
// 									<CiEdit size={25} />
// 								</button> */}
// 								<button
// 									className="text-black px-4 py-2 rounded"
// 									onClick={() => onDelete(product.id)} // Call delete function
// 								>
// 									<AiOutlineDelete size={25} />
// 								</button>
// 							</div>
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 			{selectedProduct && (
// 				<ViewItemDetails
// 					isOpen={!!selectedProduct}
// 					onClose={closeForm}
// 					item={selectedProduct}
// 					onSave={onSaveEdit}
// 				/>
// 			)}
// 		</div>
// 	);
// };

// export default Cart;
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import ViewItemDetails from "./ItemForm";
import { Button } from "../ui/button";

interface ProductData {
	id: string;
	itemName: string;
	quantity: number;
	description: string;
	image: string;
	status: string;
}

interface CartProps {
	productData: ProductData[];
	onEdit: (index: number) => void; // Function to handle editing
	onDelete: (index: string) => void; // Function to handle deletion
	onSaveEdit: (updatedItem: ProductData) => void;
}

const Cart: React.FC<CartProps> = ({
	productData,
	onEdit,
	onDelete,
	onSaveEdit,
}) => {
	const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
		null
	);

	const openForm = (product: ProductData) => setSelectedProduct(product);
	const closeForm = () => setSelectedProduct(null);

	return (
    <div className="container mx-auto px-4 py-8">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {productData.map((product) => (
					<div
						key={product.id}
            className="bg-white border border-gray-300 p-6 text-center rounded-2xl shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl"
					>
            <div className="flex justify-center mb-4">
							<img
								src={product.image}
								alt={`Image of ${product.itemName}`}
                className="w-40.5 h-40 object-cover rounded-xl transition-transform duration-300 transform hover:scale-110"
							/>
						</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
              {product.itemName}
            </h3>
            <p className="text-gray-600 text-sm mb-4 overflow-hidden line-clamp-3">
              {product.description}
            </p>
            <div className="flex justify-between items-center">
							<Button
								onClick={() => openForm(product)}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors duration-200"
							>
								View Detail
							</Button>
              <div className="flex space-x-2">
								<button
                  className="text-black px-2 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
									onClick={() => onDelete(product.id)} // Call delete function
								>
									<AiOutlineDelete size={25} />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
			{selectedProduct && (
				<ViewItemDetails
					isOpen={!!selectedProduct}
					onClose={closeForm}
					item={selectedProduct}
					onSave={onSaveEdit}
				/>
			)}
		</div>
	);
};

export default Cart;
