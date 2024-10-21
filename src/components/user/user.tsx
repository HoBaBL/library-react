import { Layout, Button, Flex } from "antd";
import user from '../../store/usersAdd'
import { useParams } from "react-router-dom";
import { PiTrashBold } from "react-icons/pi";
import './user.css'
import { observer } from "mobx-react-lite";

const { Content } = Layout;

const User = observer( () => {
    const { id }:any = useParams()

    return (
        <Content className='content'>
            <div className="container">
                <div className="block">
                    <Flex justify="space-between" align="center">
                        <p className="nameUser">{user.users[id].name}</p>
                        <p style={{fontWeight:500}}>Всего выдано книг: {user.users[id].books.length}</p>
                    </Flex>
                    
                    <div className="line"></div>
                    {user.users[id].books.length > 0 ?
                        <Flex style={{marginTop:'10px'}} vertical gap={'middle'}>
                            {user.users[id].books.map((b) => 
                                <Flex justify="space-between" gap={'middle'} className="blockBook" key={b.id}>
                                    <Flex className="bookBlockText" gap={'small'} vertical>
                                        <h4 className="h4">{b.name}</h4>
                                        <p className="textBookAuthor">{b.author}</p>
                                        <p className="textBook">{b.description}</p>
                                    </Flex>
                                    <Flex justify='space-between' align='end' vertical>
                                        <Button onClick={() => user.deleteBook(b, id)} style={{padding:'0'}} type="link" danger>
                                            <PiTrashBold size={16}/>
                                        </Button>
                                    </Flex>
                                </Flex>
                            )}
                        </Flex>  
                        : <p className="noneBook">Выданных книг нет</p>
                    }
                </div>
            </div>
        </Content>
    )
})

export default User