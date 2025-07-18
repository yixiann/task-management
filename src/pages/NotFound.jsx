// import { Result, Button } from "antd";
// import { Link, Navigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const NotFound = ({ language }) => {
  return (
    <Navigate to="/overview" />
    // Alternative not found page
    // <div style={{height:"100vh", display: "flex", alignItems: "center" }}>
    //   <Result
    //     status="404"
    //     title="404"
    //     subTitle="Sorry, the page you visited does not exist."
    //     style={{margin: 'auto'}}
    //     extra={
    //       <Button type="primary">
    //         <Link to="/overview">{language?.button?.backHome}</Link>
    //       </Button>
    //     }
    //   />
    // </div>
  );
};

export default NotFound;
