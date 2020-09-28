import React, {useState, useEffect, useRef, useCallback} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/auth';
import styles from '../styles/contacts.module.css';
import CreateInput from './CreateContact';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import * as url from './config';

function ContactList({logout}) {
    const myRef = useRef(null);
    const [contacts, setContacts] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [editToggle, setEditToggle] = useState(false);
    const [edit, setEdit] = useState({});
    const [toggleBack, setToggleBack] = useState(false)
    
    const fetchData = useCallback(() => {
        fetch(`${url.z3hdro_url}/users/showusers/`, {
            method: 'GET',
			headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
                return res.json();
			})
			.then(json => {
                console.log(json.result)
				setContacts(json.result);
			});
    }, [])
    
    useEffect(() => {
		fetchData();
    }, [fetchData]);
    
    const Header = () => {
        const [user, setUser] = useState('');
        const [filter, setFilter] = useState([]);

        const FindContact = () => {
            const filtered = contacts.filter(contact => contact.phone.includes(user));
            setFilter(filtered);
        }

        return (
            <div className={styles.contact_list_header}>
                <div className={styles.logout_btn_container}>
                    <span className={styles.logout_btn}
                        role = 'button'
                        onClick = {logout}
                        onKeyPress = {() => {}}
                        tabIndex = '0'>
                            退出
                    </span>
                </div>
                <div className={styles.main_btn_container}>
                <Link to= {'/main/'} style={{textDecoration: 'none', color: 'black'}}>
                    <span className={styles.logout_btn}
                        role = 'button'
                        onClick = {() => {}}
                        onKeyPress = {() => {}}
                        tabIndex = '0'>
                            首页
                    </span>
                </Link>
                </div>
                <div className={styles.finder_contact_container}>
                    <input 
                        placeholder='查询'
                        type='text'
                        value={user}
                        onChange={(event) => {
                            setUser(event.target.value)
                            FindContact()
                        }}
                        onKeyPress={(event) => {if (event.key === 'Enter') { 
                            setToggleBack(true) 
                            setContacts(filter)
                        }}}
                        >
                    </input>
                </div>
                {toggleBack ? 
                    <div className={styles.filter}
                    role = 'button'
                        onClick = {() => {
                            setToggleBack(false)
                            fetchData()
                        }}
                        onKeyPress = {() => {}}
                        tabIndex = '0'>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Back_Arrow.svg/1024px-Back_Arrow.svg.png' alt='back'/>
                    </div> : null}
            </div>
        )
    }

    async function DeleteContact (personName, personNumber) {
        const data = new FormData();
        data.append('name', personName);
        data.append('phone', personNumber);
        let response = await fetch(`${url.z3hdro_url}/users/deleteuser/`, {
            method: 'POST',
			headers: {
				'Authorization': `Token ${localStorage.getItem('token')}`,
            },
            body: data
        });
        let answer = await response.json();
        console.log(answer)
        fetchData();
    }

    function toggleBtn(changeFunc, property, name=null, number=null) {
        changeFunc(!property);
        setEdit({name: `${name}`, number: `${number}`})
	}

    const ShowContacts = () => {
		if (contacts !== '') {
			const data = contacts.map((person) =>
                    <div className={styles.contact_box} key={`contact_${person.phone}`}>
                        <div className={styles.delete_btn}
                            role = 'button'
                            onClick={()=>DeleteContact(person.first_name, person.phone)}>
                             <img 
                                src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Breezeicons-actions-32-window-close.svg/768px-Breezeicons-actions-32-window-close.svg.png' 
                                height = '30vh'
                                width = '30vh'
                                alt = 'close_btn'
                                />
                        </div>
                        <Link to= {`/profile/:${person.phone}/`} style={{textDecoration: 'none', color: 'black'}}>
                            <div className={styles.contact_name}>
                                    {person.first_name}
                            </div>
                            <div className={styles.contact_number}> 
                                    {person.phone}
                            </div>
                        </Link>
					</div>
			);
			return (
                <div className={styles.contacts} ref = {myRef}>
                    {data} 
                 </div>
			);
		}
		return <div className={styles.contacts} ref = {myRef}/>;
    };

    const CreateButton = () => {
		return (
			<div className={styles.contact_list_button}>
				<button type='button' className={styles.btn_chat} onClick={() => toggleBtn(setToggle, toggle)}>
					<img alt='新增会员' src='http://s1.iconbird.com/ico/0512/GlyphIcons/file1337170571.png'/>
				</button>
				{toggle ? <CreateInput contacts={contacts} setToggle={setToggle} fetchData={fetchData}/> : null}
			</div>
		);
	};

    const scrollToBottom = () => {
		myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start'});
    };
    
    useEffect(scrollToBottom, [contacts]);

    return (
        <div>
            <Header />
            <ShowContacts />
            <CreateButton />
        </div>
    )
}

ContactList.propTypes = {
    logout : PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(actions.logout())
	};
};

export default connect(null, mapDispatchToProps)(ContactList);  