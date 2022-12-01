import Page from "@components/Page";
import { BiBlock } from "react-icons/bi";

import './NotFound.css';

const NotFound = () => {
  return (
    <Page pageTitle="Not Found" useAbsoluteCenter>
      <section className="notfound">
        <BiBlock size="10rem" color={"#F52220"}/>
        <br/>
        <h1>404 Not Found</h1>
      </section>
    </Page>
  );
};

export default NotFound;
