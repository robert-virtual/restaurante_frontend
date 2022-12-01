import Page from "@components/Page";
import { IProducto, IGetAllProductsResponse } from "@store/Services/Productos";
import ErrorField from "@components/ErrorField";
import Card from "@components/Card";
import "./Productos.css";
interface IProductosUxProps {
  error?: any;
  data?: IGetAllProductsResponse;
  isLoading?: boolean;
}
const ProductoCard = (item: IProducto) => {
  return (
    <Card key={item._id}>
      <img src={item.imagen} className="card_img" />
      <h2>{item.nombre}</h2>
      <div>L.{item.precio}</div>
    </Card>
  );
};
const ProductosUx = ({ error, data, isLoading }: IProductosUxProps) => {
  console.log({ data });

  return (
    <Page pageTitle="Productos">
      <section>
        {isLoading && <div>Loading...</div>}
        {error && <ErrorField>Error al cargar Productos</ErrorField>}
        {data && data.items.map((o: IProducto) => ProductoCard(o))}
      </section>
    </Page>
  );
};

export default ProductosUx;
