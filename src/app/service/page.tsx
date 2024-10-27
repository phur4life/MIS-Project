import DefaultLayout from "@/components/Layout/DefaultLayout";
import Cart from "@/components/Cart/Cart";
import serviceData from '@/components/Cart/serviceData'
const Service = () => {
  return (
    <DefaultLayout>
      <div>
        <Cart productData={serviceData}/>
      </div>
    </DefaultLayout>
  )
}
export default Service;
