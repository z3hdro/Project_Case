import React, {useState, useEffect} from 'react';
import styles from '../styles/balance.module.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import * as url from './config';

export default function Balance() {
    const [data, setData] = useState({phone: '', balance: ''})

    console.log(data)

    async function sendDatatoServer() {
		const dataToSend = new FormData();
		for (const [key, value] of Object.entries(data)) {
			dataToSend.append(key, value)
		}
		let response = await fetch(`${url.z3hdro_url}/users/addbalance/`, {
            method: 'POST',
			headers: {
				'Authorization': `Token ${localStorage.getItem('token')}`,
			},
			body: dataToSend
		});
		let answer = await response.json();
		console.log(answer);
	};

    const Header = () => {
        return (
            <div className={styles.header}>
                <div className={styles.main}>
                    <Link to= {'/main/'} style={{textDecoration: 'none', color: 'black'}}>
                        <span className={styles.menu_btn}
                            role = 'button'
                            onClick = {() => {}}
                            onKeyPress = {() => {}}
                            tabIndex = '0'>
                                首页
                        </span>
                    </Link>
                </div>
            </div>
        );
    }

    function SaveData(...input) {
		if (input[1].key === 'Enter') {
			const flag = input[0];
			const info = input[2];
			switch (flag) {
				case 1:
					setData({
						...data,
						phone: info
					});
					break;
				case 2:
					setData({
						...data,
						balance: info
					});
					break;
				default:
					console.log('nothing changed');
			}
		}
	};

    const BalancePage = () => {
        const [number, setNumber] = useState(data.phone)
        const [userbalance, setUserBalance] = useState(data.balance)

        return (
            <div className={styles.accounting}>
                <div className={styles.containerNum}>
                    <input 
                        className={styles.number}
                        type='text'
                        placeholder='手机号:'
                        value={number}
                        onChange={(event) => setNumber(event.target.value)}
                        onKeyPress={(event) => SaveData(1, event, number.trim())} 
                        onBlur = {()=> {
							setData({
								...data,
								phone: number.trim()
							});
						}}/>
                </div>
                <div className={styles.containerBal}>
                    <input 
                        className={styles.balance}
                        type='text'
                        placeholder='充值金额'
                        value={userbalance}
                        onChange={(event) => setUserBalance(event.target.value)}
                        onKeyPress={(event) => SaveData(2, event, userbalance.trim())}
                        onBlur = {()=> {
							setData({
								...data,
								balance: userbalance.trim()
							});
						}}/>
                </div>
                <div className={styles.saveBtn}
					role = 'button'
					onClick = {() => {
						sendDatatoServer();
					}
					}
					onKeyPress = {() => {}}
					tabIndex = '0'>
					<span>
                        充值 
                    </span>
				</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Header />
            <BalancePage />
        </div>
    );
}