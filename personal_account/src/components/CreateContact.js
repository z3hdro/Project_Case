import React, {useState} from 'react';
import styles from '../styles/creating.module.css';
import PropTypes from 'prop-types'
import * as url from './config';

export default function CreateInput({contacts, setToggle, fetchData}) {
    const [user, setUser] = useState('');
    const [number, setNumber] = useState('');

    console.log(user)
    console.log(number)

    async function addContact(event) {
        if (event.key === 'Enter') {
            if (user !== '' && number!== '') {
                const data = new FormData();
                data.append('name', user);
                data.append('phone', number)
                console.log(data)
                let response = await fetch(`${url.z3hdro_url}/users/createuser/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`,
                    },
                    body: data
                });
                let answer = await response.json();
                console.log(answer);
                fetchData();
                setToggle(false);
            }
        }
    };

    return (
        <div className={styles.userlist}>
            <input
                className = {styles.create_contact}
                type='text'
                placeholder='输入用户名'
                value={user}
                onChange={(event) => setUser(event.target.value)}
                onKeyPress={(event) => {addContact(event);}}/>
            <input
                className = {styles.create_number}
                type='text'
                placeholder='手机号:'
                value={number}
                onChange={(event) => setNumber(event.target.value)}
                onKeyPress={(event) => {addContact(event);}}/>
        </div>
    ); 
};

CreateInput.propTypes = {
    contacts : PropTypes.array.isRequired,
    setToggle : PropTypes.func.isRequired,
    fetchData :  PropTypes.func.isRequired
};