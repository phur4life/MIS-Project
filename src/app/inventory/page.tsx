import DefaultLayout from "@/components/Layout/DefaultLayout";
import Cart from "@/components/Cart/Cart";
import productData from "@/components/Cart/productData";

const Inventory = () => {
  return (
    <DefaultLayout>
     <div className="flex flex-wrap">
       <Cart productData={productData}/>
     </div>
    </DefaultLayout>
  )
}
export default Inventory;
