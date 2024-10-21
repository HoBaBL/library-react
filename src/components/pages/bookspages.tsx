import { Layout } from "antd";
import FooterComponents from '../footer/footer';
import HeaderComponents from '../header/header';
import { Outlet } from "react-router-dom";

function BooksPages() {

    return (
      <Layout style={{backgroundColor:'transparent', display:'flex', flexDirection:'column', minHeight:'100vh'}}>
        <HeaderComponents/>
        <Outlet />
        <FooterComponents/>
      </Layout>
    )
  }
  
  export default BooksPages