import ProductosUx from "./ProductosUx";
import { useAllProductosQuery } from "@store/Services/Productos";
const Productos = () => {
  const { data, isLoading, error } = useAllProductosQuery({
    page: 1,
    items: 10,
  });
  return <ProductosUx error={error} data={data} isLoading={isLoading} />;
};

export default Productos;
