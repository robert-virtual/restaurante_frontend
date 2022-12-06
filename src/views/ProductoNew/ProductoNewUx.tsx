import Page from "@components/Page";
import { Field } from "@components/InputField";
import ActionField from "@components/ActionField";
import { PrimaryButton, Button } from "@components/Buttons";
import { INewProducto } from "@store/Services/Productos";
import { useState } from "react";
export interface IProductoNewUx {
  form: INewProducto;
  formRef: React.RefObject<HTMLFormElement>;
  onChangeHandler: (name: string, value: string | number) => void;
  onSubmitHandler: () => void;
  onCancelHandler: () => void;
}
const ProductoNewUx = ({
  form,
  onChangeHandler,
  onSubmitHandler,
  formRef,
  onCancelHandler,
}: IProductoNewUx) => {
  const [images, setImages] = useState<(File | null)[]>();
  return (
    <Page pageTitle="Nuevo Producto">
      <section>
        <div className="row">
          {form.imagenes.map((e) => (
            <img key={e} src={e} />
          ))}
        </div>
        <form
          ref={formRef}
          method="post"
          encType="multipart/form-data"
          action={process.env.REACT_APP_API_BASE_URL + "/productos/new"}
        >
          <Field
            name="nombre"
            labelText="Nombre"
            value={form.nombre}
            onChange={(e) => {
              onChangeHandler(e.target.name, e.target.value);
            }}
          />
          <Field
            name="description"
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
            name="imagenes"
            labelText="Imagenes"
            type="file"
            multiple
            onChange={(e) => {
              // onChangeHandler(e.target.name, e.target.value);
            }}
          />
        </form>
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
