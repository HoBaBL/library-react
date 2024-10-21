import { Layout, Button, Flex} from "antd";
import { PiBooksLight, PiUserList } from "react-icons/pi";
const { Footer } = Layout;
import './footer.css'
import { useNavigate } from "react-router-dom";

const FooterComponents = () => {
    const navigate = useNavigate();

    function LinkUser() {
        navigate('/users')
    }

    function LinkBooks() {
        navigate('/book')
    }

    return (
        <Footer className='footer'>
            <div className='container'>
            <Flex justify="space-between" align="center">
                <p className='textFooter'>Тестовое задание МТС</p>
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
        </Footer>
    )
}

export default FooterComponents