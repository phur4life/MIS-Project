"use client";

import Layout from "@/components/Layout1/Layout";
import Cart from "@/components/inventory_card/Cart";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";

interface ProductData {
  id: string;
  itemName: string;
  image: string;
  description: string;
  quantity: number;
  status: string;
}

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [newItem, setNewItem] = useState({
    itemName: "",
    quantity: 1,
    description: "",
    status: "Available",
    image: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch inventory data from the API
  const fetchInventory = async () => {
    try {
      const response = await fetch("/api/inventory");
      if (response.ok) {
        const data = await response.json();
        getProductData(data);
        setInventory(data);
      } else {
        console.log("Error fetching inventory");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleSaveEdit = async (updatedItem: ProductData) => {
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
    const transformedData: ProductData[] = inventoryData.map((item) => ({
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
        console.log("Error adding item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/inventory/?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedInventory = inventory.filter((item) => item._id !== id);
        setInventory(updatedInventory);
        getProductData(updatedInventory);
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
          <Button className="text-white" onClick={() => setIsModalOpen(true)}>
            Add Item
          </Button>
        </div>
        <Cart
          productData={products}
          onEdit={() => console.log("Edit item")}
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
                onSuccess={(result) => {
                  setNewItem({ ...newItem, image: result?.info.secure_url });
                }}
              >
                {({ open }) => (
                  <>
                    {newItem.image ? (
                      <img src={newItem.image} alt="Uploaded Preview" />
                    ) : (
                      <div className="h-32 w-full bg-gray-200 rounded flex items-center justify-center">
                        No image uploaded
                      </div>
                    )}
                    <Button
                      className="m-4"
                      type="button"
                      onClick={() => open()}
                    >
                      Upload an Image
                    </Button>
                  </>
                )}
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
