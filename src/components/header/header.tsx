import { Layout, Button, Flex} from "antd";
import { PiBooksLight, PiUserList } from "react-icons/pi";
import './header.css'
const { Header } = Layout;
import { useNavigate } from "react-router-dom";

const HeaderComponents = () => {
    const navigate = useNavigate();

    function LinkUser() {
        navigate('/users')
    }

    function LinkBooks() {
        navigate('/book')
    }

    return (
        <Header className='header'>
            <div className='container'>
            <Flex justify="space-between" align="center">
                <h2 className='h2'>Library</h2>
                <Flex gap="middle">
                    <Button  onClick={() => LinkBooks()}>
                        <PiBooksLight size={20}/>
                        Книги
                    </Button>
                    <Button onClick={() => LinkUser()}>
                        <PiUserList size={20}/>
                        Пользователи
                    </Button>
                </Flex>
            </Flex>
            </div>
        </Header>
    )
}

export default HeaderComponents