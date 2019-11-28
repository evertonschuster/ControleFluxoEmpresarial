import React, { useState } from 'react';
import FormLayout from '../layouts/FormBasicLayout/FormBasicLayout';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import ListForm from '../components/ListForm/ListForm';

const TesteForm: React.FC<RouteComponentProps> = () => {

    const [, setVisible] = useState<boolean>(false);
    const [state] = useState<any[]>([])


    console.log("Render")

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: any) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        }
    ];

    return (
        <FormLayout breadcrumbList={[{ displayName: "Nome", URL: "" }, { displayName: "Nome", URL: "" }]} >


            <ListForm dataSource={data} columns={columns} />

            <Link to="/teste">Voltar 2</Link>
            <br></br>

            FORM 1

            <br></br>
            <button onClick={() => setVisible(true)}>Modal</button>

            {/* <ModelForm visible={visible} setVisible={setVisible} setState={setstate} state={state} path="teste" /> */}


            {state.map(e => e.name)}
        </FormLayout>
    );

}

export default withRouter(TesteForm);
