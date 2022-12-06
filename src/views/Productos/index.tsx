import { useState } from "react";
import ProductoUx from "./ProductosUx";
import { useAllProductosQuery } from "@store/Services/Productos";
import { useNavigate } from "react-router-dom";
const Productos = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const changePageLimit = (p: number, l: number) => {
    setPage(p);
    setLimit(l);
  };
  const { data, isLoading, error } = useAllProductosQuery({
    page,
    items: limit,
  });
  const Navigate = useNavigate();
  return (
    <ProductoUx
      error={error}
      data={data}
      isLoading={isLoading}
      changePageLimit={changePageLimit}
      addPageClick={() => {
        Navigate("/productos/new");
      }}
      viewDetailClick={(id) => {
        Navigate(`/productos/${id}`);
      }}
    />
  );
};

export default Productos;
