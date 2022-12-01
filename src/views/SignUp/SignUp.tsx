
import Page from "@components/Page";
import { Field } from "@components/InputField";
import { PrimaryButton } from "@components/Buttons";
import ActionField from "@components/ActionField";
import ErrorField from "@components/ErrorField";
export interface ILoginUXProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: any;
  handleClick: () => void;
}
const LoginUX = (
  {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleClick
  } : ILoginUXProps
) => {
  return (
    <Page pageTitle="Crear Cuenta" useAbsoluteCenter>
      <section style={{minWidth:"480px", marginTop:"1rem"}}>
        <Field
          name="email"
          labelText="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          name="password"
          labelText="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <ErrorField>{error?.data?.error}</ErrorField>}
        <ActionField align="right">
          <PrimaryButton onClick={handleClick}>Crear Cuenta</PrimaryButton>
        </ActionField>
      </section>
    </Page>
  );
}

export default LoginUX;
