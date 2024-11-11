"use client";

import Layout from "@/components/Layout1/Layout";
import Cart from "@/components/inventory_card/Cart";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ObjectId } from "mongoose";
import { CldUploadWidget } from "next-cloudinary";
import { auth } from "@/auth";

interface productData {
  id: string;
  itemName: string;
  image: string;
  description: string;
  quantity: number;
  status: string;
}

// interface inventoryData {
// 	id: ObjectId;
// 	itemName: string;
// 	quantity: number;
// 	description: string;
// 	status: string;
// 	image: string;
// }

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState<productData[]>([]);
  const [newItem, setNewItem] = useState({
    itemName: "",
    quantity: 1,
    description: "",
    status: "Available",
    image: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const fetchInventory = async () => {
    try {
      const response = await fetch("/api/inventory");
      if (response.ok) {
        const data = await response.json();
        getProductData(data);
        setInventory(data);
        // console.log(data);
      } else {
        console.log("error fetching inventory");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleSaveEdit = async (updatedItem: productData) => {
    try {
      const response = await fetch(`/api/inventory?id=${updatedItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        const data = await response.json();
        const updatedProducts = products.map((product) =>
          product.id === updatedItem.id ? data.updatedItem : product
        );
        setProducts(updatedProducts);
      } else {
        console.log(`Failed to update item ${updatedItem.id}`);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const getProductData = (inventoryData: any[]) => {
    const transformedData: productData[] = inventoryData.map((item) => ({
      id: item._id.toString(),
      itemName: item.itemName,
      image: item.image,
      description: item.description,
      quantity: item.quantity,
      status: item.status,
    }));
    setProducts(transformedData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  const handleItemAdd = async () => {
    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        const addedItem = await response.json();
        getProductData([...inventory, addedItem]);
        setNewItem({
          itemName: "",
          quantity: 1,
          description: "",
          status: "Available",
          image: "",
        });
        setIsModalOpen(false);
      } else {
        console.log("error adding item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Example: Directly convert file to URL for now (in real scenarios, upload the file and get URL)
      const fileUrl = imageUrl;
      setNewItem({ ...newItem, image: fileUrl });

      // TODO: Add logic to upload the file to your server or storage and replace `fileUrl` with the response URL
    }
  };

  const handleEdit = (index: number) => {
    console.log("edited");
  };

  const handleDelete = async (id: string) => {
    // console.log("deleleted");
    // console.log(id);
    try {
      const response = await fetch(`/api/inventory/?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // console.log("deleted");
        // console.log(inventory[0]._id);
        //Optionally, you can update the local state to remove the item
        const updatedInventory = inventory.filter((item) => item._id !== id);
        setInventory(updatedInventory);
        getProductData(updatedInventory); // Update products after deletion
      } else {
        console.log("Error deleting item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-wrap">
        {/* <h1>Inventory</h1> */}
        <div className="flex px-4 my-4 justify-between items-center gap-4 w-full">
          <div className="flex gap-4">
            <h1 className="text-lg font-semibold text-gray-700">
              Inventories: {products.length}
            </h1>
            <h1 className="text-lg font-semibold text-gray-700">
              Available Items:{" "}
              {
                products.filter((product) => product.status === "Available")
                  .length
              }
            </h1>
          </div>
          {/* <Button className="text-white" onClick={() => setIsModalOpen(true)}>
            Add Item
          </Button> */}
        </div>
        <Cart
          productData={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSaveEdit={handleSaveEdit}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add New Item</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleItemAdd();
              }}
            >
              <CldUploadWidget
                uploadPreset="MIS_project"
                onSuccess={(result, { widget }) => {
                  console.log("Image URL:", result?.info.secure_url);
                  setNewItem({ ...newItem, image: result?.info.secure_url });
                }}
              >
                {({ open }) => {
                  console.log(newItem.image === ""); // Logs if the image URL is empty

                  return (
                    <>
                      {/* Conditionally render either an empty div or the image */}
                      {newItem.image === "" ? (
                        <div></div>
                      ) : (
                        <img src={newItem.image} alt="Uploaded Preview" />
                      )}
                      {/* Button to open the upload widget */}
                      <Button
                        className="m-4"
                        type="button"
                        onClick={() => open()}
                      >
                        Upload an Image
                      </Button>
                    </>
                  );
                }}
              </CldUploadWidget>
              <input
                type="text"
                name="itemName"
                placeholder="Item Name"
                value={newItem.itemName}
                onChange={handleInputChange}
                required
                className="w-full mb-2 p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={newItem.quantity}
                onChange={handleInputChange}
                required
                className="w-full mb-2 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={newItem.description}
                onChange={handleInputChange}
                required
                className="w-full mb-2 p-2 border border-gray-300 rounded"
              />
              {/* <input
								type="file"
								accept="image/*"
								onChange={handleFileChange}
								className="w-full mb-2 p-2 border border-gray-300 rounded"
							/> */}
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-2 bg-gray-500 text-white"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 text-white">
                  Add Item
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Inventory;
