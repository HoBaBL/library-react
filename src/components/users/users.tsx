import { Layout, Button, Flex, Input, Modal } from "antd";
import './users.css'
import { useState } from "react";
import { PiPlusBold, PiTrashBold } from "react-icons/pi";
import { observer } from "mobx-react-lite";
import user from '../../store/usersAdd'
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

const ContentComponents = observer( () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userInput, setUserInput] = useState('')

    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const handleOk = () => {
        const item = {
            name:userInput,
            id: Math.random(),
            books: []
        }
        user.addUser(item)
        setIsModalOpen(false);
        setUserInput('')
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleKeyPress = (event:any) => {
        if(event.key === 'Enter'){
            handleOk()
        }
    };

    return (
        <Content className='content'>
            <div className="container">
                <div className="block">
                    <Flex justify="space-between" align="center">
                        <h3 className="h3">Пользователи</h3>
                        <Button className="btnAddUser" onClick={showModal}>
                            <PiPlusBold/>
                            Добавить Пользователя
                        </Button>
                    </Flex>
                    <div className="line"></div>
                    <Flex style={{marginTop:'10px'}} vertical gap={'small'}>
                        {user.users.map((u) => 
                        <Flex key={u.id} align="center" gap={'small'}>
                            <Button onClick={() => {user.indexUser(u), navigate(`/users/${user.index}`)}} color="default" variant="text" className="userBtn" >
                                <span className="userName">{u.name}</span>
                                <span className="userBook">Книг выдано: {u.books.length}</span>
                            </Button>
                            <Button onClick={() => user.deleteUser(u.id)} style={{padding:'0'}} type="link" danger>
                                <PiTrashBold size={16}/>
                            </Button>
                        </Flex>
                        )}
                    </Flex>
                </div>
            </div>
            <Modal title="Добавить Пользователя" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input onKeyDown={handleKeyPress} value={userInput} onChange={(event) => setUserInput(event.target.value)} placeholder="Введите имя" />
            </Modal>
        </Content>
    )
})

export default ContentComponents