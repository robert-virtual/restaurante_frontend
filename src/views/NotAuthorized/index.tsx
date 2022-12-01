import Page from "@components/Page";
import { BiBlock } from "react-icons/bi";

import './NotFound.css';

const NotAuthorized = () => {
  return (
    <Page pageTitle="Not Authorized" useAbsoluteCenter>
      <section className="notauthorized">
        <BiBlock size="10rem" color={"#F2F21B"}/>
        <br/>
        <h1>401 Not Authorized</h1>
      </section>
    </Page>
  );
};

export default NotAuthorized;
