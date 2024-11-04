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
		<div className="container mx-auto px-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{productData.map((product, index) => (
					<div
						key={product.id}
						className="bg-white border p-4 text-center rounded-lg shadow-xl"
					>
						<div className="flex justify-center">
							<img
								src={product.image}
								alt={`Image of ${product.itemName}`}
								className="w-43 h-40 object-cover rounded-lg"
							/>
						</div>
						<h3 className="text-lg font-bold mt-4">{product.itemName}</h3>
						<p className="text-gray-500 mt-2 text-sm">{product.description}</p>
						<div className="flex justify-between items-center mt-4">
							<Button
								onClick={() => openForm(product)}
								className="bg-primary text-white px-4 py-2 rounded"
							>
								View Detail
							</Button>
							<div className="flex justify-center">
								{/* <button
									className="text-black px-4 py-2 rounded"
									onClick={() => onEdit(index)} // Call edit function
								>
									<CiEdit size={25} />
								</button> */}
								<button
									className="text-black px-4 py-2 rounded"
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
