import ProductoDetailUx from "./ProductoDetailUx";
import {
  INewProducto,
  useDeleteProductoMutation,
  useProductoByIdQuery,
  useUpdateProductoMutation,
} from "@store/Services/Productos";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const ProductoDetail = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const {
    data: formData,
    isLoading,
    error,
  } = useProductoByIdQuery(id as string);
  console.log({ formData });

  const [form, setForm] = useState<INewProducto>(formData!);

  const onChangeHandler = (name: string, value: string | number) => {
    setForm({ ...form, [name]: value });
  };
  const [deleteProducto, { isLoading: isLoadingDelete, error: deleteError }] =
    useDeleteProductoMutation();
  const [updateProducto, { isLoading: isLoadingUpdate, error: updateError }] =
    useUpdateProductoMutation();

  const onSubmitUpdateHandler = async () => {
    try {
      const data = await updateProducto({
        id: id as string,
        body: form,
      }).unwrap();
      console.log(data);
      Navigate("/productos");
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitDeleteHandler = async () => {
    try {
      const data = await deleteProducto(id as string).unwrap();
      console.log(data);
      Navigate("/productos");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProductoDetailUx
      form={form}
      onReturnClick={() => {
        Navigate("/productos");
      }}
      isLoading={isLoading}
      onChangeHandler={onChangeHandler}
      onSubmitDeleteHandler={onSubmitDeleteHandler}
      onSubmitUpdateHandler={onSubmitUpdateHandler}
      error={error}
    />
  );
};
export default ProductoDetail;
