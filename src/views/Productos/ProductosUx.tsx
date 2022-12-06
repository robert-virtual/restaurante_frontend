import Page from "@components/Page";
import { IProducto, IGetAllProductosResponse } from "@store/Services/Productos";
import ErrorField from "@components/ErrorField";
import Card from "@components/Card";
import Paging from "@components/Paging";
import { formatCurrency } from "@helpers/NumberFormat";

import "./Productos.css";
import { Button } from "@components/Buttons";
interface IProductosUxProps {
  error?: any;
  data?: IGetAllProductosResponse;
  isLoading?: boolean;
  changePageLimit?: (page: number, limit: number) => void;
  addPageClick?: () => void;
  viewDetailClick?: (id: string) => void;
}
const ProductoCard = (
  item: IProducto,
  viewDetailClick: (id: string) => void
) => {
  return (
    <Card
      key={item._id}
      onClick={() => {
        viewDetailClick(item._id);
      }}
    >

        <div className="row">
        {item.imagenes.map((e)=>(
              <img key={e} src={e}/>
              ))}

        </div>
      <h2>{item.nombre}</h2>
      <p>{item.description}</p>
      <hr />
      <p> {formatCurrency(item.precio)}</p>
      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
    </Card>
  );
};
const ProductoUx = ({
  error,
  data,
  isLoading,
  changePageLimit = (p, l) => {
    console.log("PG", { p, l });
  },
  addPageClick = () => {},
  viewDetailClick = (id) => {},
}: IProductosUxProps) => {
  return (
    <Page pageTitle="Productos">
      <Button
        style={{
          position: "absolute",
          bottom: 25,
          right: 25,
          backgroundColor: "#0984e3",
          color: "white",
        }}
        onClick={() => {
          addPageClick();
        }}
      >
        +
      </Button>
      <section className="ProductosHolder">
        {isLoading && <div>Loading...</div>}
        {error && <ErrorField>Error al cargar Productos</ErrorField>}
        {data &&
          data.items.map((o: IProducto) => ProductoCard(o, viewDetailClick))}
      </section>
      <Paging
        currentPage={data?.page || 1}
        totalPages={data?.totalPages || 0}
        pageLimit={data?.itemsPerPage || 10}
        onPageChange={(page) => {
          changePageLimit(page, data?.itemsPerPage || 10);
        }}
        onLimitChange={(limit) => {
          changePageLimit(data?.page || 1, limit);
        }}
      />
    </Page>
  );
};

export default ProductoUx;
