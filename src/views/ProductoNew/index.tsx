import ProductosNewUx from "./ProductoNewUx";
import {
  useNewProductoMutation,
  INewProducto,
  useNewProductoFormMutation,
} from "@store/Services/Productos";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductoNew = () => {
  const [form, setForm] = useState<INewProducto>({
    precio: 0,
    description: "",
    stock: 1,
    imagenes:[],
    nombre: "",
    createdAt: new Date(),
  });
  const formRef = useRef<HTMLFormElement>(null)
  const [newProducto, { isLoading, error }] = useNewProductoMutation();
  const [newProductoForm, { isLoading:isLoadingForm, error:formError }] = useNewProductoFormMutation();
  const Navigate = useNavigate();

  const onChangeHandler = (name: string, value: string | number) => {
    setForm({ ...form, [name]: value });
  };
  const onSubmitHandler = async () => {
  if (!formRef || !formRef.current) {
  console.log("no existe formref ni current");
  
   return 
  }
  const formData = new FormData(formRef.current)
  if (formData) {
  console.log("formdata creado");
  
    try {
      const data = await newProductoForm(formData).unwrap();
      console.log(data);
      Navigate("/productos");
    } catch (error) {
      console.log(error);
    }
   
   return
  }
    try {
      const data = await newProducto(form).unwrap();
      console.log(data);
      Navigate("/productos");
    } catch (error) {
      console.log(error);
    }
  };
  const onCancelHandler = () => {
    console.log("cancel");
    Navigate("/productos");
  };
  return (
    <ProductosNewUx
      form={form}
      formRef={formRef}
      onChangeHandler={onChangeHandler}
      onSubmitHandler={onSubmitHandler}
      onCancelHandler={onCancelHandler}
    />
  );
};
export default ProductoNew;
