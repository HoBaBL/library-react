import { Layout, Button, Flex, Input, Modal, Form, Space } from "antd";
import './books.css'
import {  useState } from "react";
import { PiPlusBold, PiTrashBold } from "react-icons/pi";
import type { FormProps } from 'antd';
import { observer } from "mobx-react-lite";
import book from '../../store/booksAdd'
import user from '../../store/usersAdd'

type FieldType = {
    name?: string;
    description?: string;
    author?: string;
    id?: number
};

const { TextArea } = Input;
const { Content } = Layout;

const Books = observer( () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addBookModal, setAddBookModal] = useState(false)
    const [bookActive, setBookActive] = useState<FieldType>()

    const showModalAddBook = (name?:string, id?:number, author?:string, description?:string) => {
        setAddBookModal(true);
        const giveBook = {
            name: name,
            id: id,
            author: author,
            description: description
        }
        setBookActive(giveBook)
    };
    
    const handleCancelAddBook = () => {
        setAddBookModal(false);
    };

    //////
    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const handleOk = (values:FieldType) => {
        const item = {
            name:values.name,
            id: Math.random(),
            description: values.description,
            author: values.author
        }
        book.addBook(item)
        setIsModalOpen(false);
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        handleOk(values)
    };

    return (
        <Content className='content'>
            <div className="container">
                <div className="block">
                    <Flex justify="space-between" align="center">
                        <h3 className="h3">Книги</h3>
                        <Button className="btnAddUser" onClick={showModal}>
                            <PiPlusBold/>
                            Добавить Книгу
                        </Button>
                    </Flex>
                    <div className="line"></div>
                    <Flex style={{marginTop:'10px'}} vertical gap={'middle'}>
                        {book.books.map((b) => 
                            <Flex justify="space-between" gap={'middle'} className="blockBook" key={b.id}>
                                <Flex className="bookBlockText" gap={'small'} vertical>
                                    <h4 className="h4">{b.name}</h4>
                                    <p className="textBookAuthor">{b.author}</p>
                                    <p className="textBook">{b.description}</p>
                                </Flex>
                                <Flex justify='space-between' align='end' vertical>
                                    <Button onClick={() => book.deleteBook(b.id)} style={{padding:'0'}} type="link" danger>
                                        <PiTrashBold size={16}/>
                                    </Button>
                                    <Button onClick={() => showModalAddBook(b.name, b.id, b.author, b.description)}>
                                        Выдать книгу
                                    </Button>
                                </Flex>
                            </Flex>
                        )}
                    </Flex>
                    
                </div>
            </div>
            <Modal footer={null} title="Добавить Книгу" open={isModalOpen} onCancel={handleCancel} >
                <Flex vertical gap='middle'>    
                    <Form name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish}>
                        <Form.Item name="name" label="Название" >
                            <Input placeholder="Название"/>
                        </Form.Item>
                        <Form.Item name="description" label="Автор" >
                            <Input placeholder="Автор"/>
                        </Form.Item>
                        <Form.Item name="author" label="Описание" >
                            <TextArea placeholder="Описание" rows={4} />
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Добавить
                                </Button>
                                <Button htmlType="reset">Очистить</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Flex>
                
            </Modal>
            <Modal footer={null} title="Выдать книгу" open={addBookModal} onCancel={handleCancelAddBook}>
                <Flex style={{marginTop:'10px'}} vertical gap={'small'}>
                    <p className="giveBook">{bookActive?.name}</p>
                    {user.users.map((u) => 
                        <Flex key={u.id} align="center" gap={'small'}>
                            <Button onClick={() => {user.GiveBook(bookActive, u)}} color="default" variant="text" className="userBtn" >
                                <span className="userNameGive">{u.name}</span>
                                <span className="userBook">Книг выдано: {u.books.length}</span>
                            </Button>
                        </Flex>
                    )}
                </Flex>
            </Modal>
        </Content>
    )
})

export default Books