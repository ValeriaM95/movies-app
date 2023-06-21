import { Link } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/UI/Card";
import classes from "./Error.module.css";

function Error() {
  return (
    <>
      <Header />
      <Card>
        <h1 className={classes.error_header}>An error occurred.</h1>
        <p className={classes.error_return}>
          Go back to the <Link to="/">home page</Link>.
        </p>
      </Card>
    </>
  );
}

export default Error;
