// "use client";
// import { CiEdit } from "react-icons/ci";
// import { AiOutlineDelete } from "react-icons/ai";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import ServiceForm from "./ServiceForm";

// interface serviceData {
// 	_id: string;
// 	serviceName: string;
// 	description: string;
// 	image: string;
// }

// interface Cartprops {
// 	services: serviceData[];
// 	onDelete: (index: string) => void;
// 	//onEdit: (index: number) => void;
// 	onSaveEdit: (updatedItem: serviceData) => void;
// }

// const Cart: React.FC<Cartprops> = ({ services, onDelete, onSaveEdit }) => {
// 	const [selectedService, setSelectedService] = useState<serviceData | null>(
// 		null
// 	);

// 	const openForm = (service: serviceData) => setSelectedService(service);
// 	const closeForm = () => setSelectedService(null);
// 	return (
// 		<div className="container mx-auto px-4">
// 			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// 				{services.length > 0 ? (
// 					services.map((service, index) => (
// 						<div
// 							key={index}
// 							className="bg-white border p-4 text-center rounded-lg shadow-xl"
// 						>
// 							<div className="flex justify-center">
// 								<img
// 									src={service.image}
// 									alt={service.serviceName}
// 									className="w-43 h-40 object-cover rounded-lg"
// 								/>
// 							</div>
// 							<h3 className="text-lg font-bold mt-4">{service.serviceName}</h3>
// 							<p className="text-gray-500 mt-2 text-sm">
// 								{service.description}
// 							</p>
// 							<div className="flex justify-between items-center mt-4">
// 								<button
// 									onClick={() => openForm(service)}
// 									className="bg-primary text-white px-4 py-2 rounded"
// 								>
// 									View Detail
// 								</button>
// 								<div className="flex space-x-2">
// 									{/* <button className="text-black px-2 py-2 rounded">
// 										<CiEdit size={25} />
// 									</button> */}
// 									<button
// 										onClick={() => onDelete(service._id)}
// 										className="text-black px-2 py-2 rounded"
// 									>
// 										<AiOutlineDelete size={25} />
// 									</button>
// 								</div>
// 							</div>
// 						</div>
// 					))
// 				) : (
// 					<p>No services available.</p> // Fallback if services array is empty
// 				)}
// 			</div>
// 			{selectedService && (
// 				<ServiceForm
// 					isOpen={!!selectedService}
// 					onClose={closeForm}
// 					item={selectedService}
// 					onSave={onSaveEdit}
// 				/>
// 			)}
// 		</div>
// 	);
// };

// export default Cart;
"use client";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import ServiceForm from "./ServiceForm";

interface serviceData {
  _id: string;
  serviceName: string;
  description: string;
  image: string;
}

interface Cartprops {
  services: serviceData[];
  onDelete: (index: string) => void;
  onSaveEdit: (updatedItem: serviceData) => void;
}

const Cart: React.FC<Cartprops> = ({ services, onDelete, onSaveEdit }) => {
  const [selectedService, setSelectedService] = useState<serviceData | null>(
    null
  );

  const openForm = (service: serviceData) => setSelectedService(service);
  const closeForm = () => setSelectedService(null);

  const truncateDescription = (description: string, limit: number = 100) => {
    if (description.length > limit) {
      return description.substring(0, limit) + "...";
    }
    return description;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.length > 0 ? (
          services.map((service, index) => (
            <div
              key={index}
              className="bg-white border p-4 text-center rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex justify-center">
                <img
                  src={service.image}
                  alt={service.serviceName}
                  className="w-45 h-40 object-cover rounded-md transition-transform duration-300 transform hover:scale-110"
                />
              </div>
              <h3 className="text-lg font-bold mt-4">{service.serviceName}</h3>
              <p className="text-gray-500 mt-2 text-sm">
                {truncateDescription(service.description)}
              </p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => openForm(service)}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200"
                >
                  View Detail
                </button>
                <div className="flex space-x-2">
                  {/* <button className="text-black px-2 py-2 rounded hover:bg-gray-200">
										<CiEdit size={25} />
									</button> */}
                  <button
                    onClick={() => onDelete(service._id)}
                    className="text-black px-2 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200"
                  >
                    <AiOutlineDelete size={25} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No services available.
          </p>
        )}
      </div>
      {selectedService && (
        <ServiceForm
          isOpen={!!selectedService}
          onClose={closeForm}
          item={selectedService}
          onSave={onSaveEdit}
        />
      )}
    </div>
  );
};

export default Cart;
