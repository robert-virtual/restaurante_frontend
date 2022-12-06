import Page from "@components/Page";
import { Field } from "@components/InputField";
import ActionField from "@components/ActionField";
import { PrimaryButton, Button } from "@components/Buttons";
import { INewProducto } from "@store/Services/Productos";
export interface IProductoNewUx {
  form: INewProducto;
  onChangeHandler: (name: string, value: string | number) => void;
  onSubmitHandler: () => void;
  onCancelHandler: () => void;
}
const ProductoNewUx = ({
  form,
  onChangeHandler,
  onSubmitHandler,
  onCancelHandler,
}: IProductoNewUx) => {
  return (
    <Page pageTitle="Nuevo Producto">
      <section>
        <img src={form.imagen}/>
        <Field
          name="nombre"
          labelText="Nombre"
          value={form.nombre}
          onChange={(e) => {
            onChangeHandler(e.target.name, e.target.value);
          }}
        />
        <Field
          name="descripcion"
          labelText="Descripción"
          value={form.description}
          onChange={(e) => {
            onChangeHandler(e.target.name, e.target.value);
          }}
        />
        <Field
          name="precio"
          labelText="Precio"
          value={String(form.precio)}
          type="number"
          onChange={(e) => {
            onChangeHandler(e.target.name, e.target.value);
          }}
        />
        <Field
          name="imagen"
          labelText="Imagen url"
          value={String(form.imagen)}
          type="text"
          onChange={(e) => {
            onChangeHandler(e.target.name, e.target.value);
          }}
        />
        <ActionField>
          <PrimaryButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSubmitHandler();
            }}
          >
            Guardar
          </PrimaryButton>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onCancelHandler();
            }}
          >
            Cancelar
          </Button>
        </ActionField>
      </section>
    </Page>
  );
};

export default ProductoNewUx;
