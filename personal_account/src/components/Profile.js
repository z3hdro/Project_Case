import React, {useState, useEffect, useCallback} from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/userprofile.module.css';
import *  as url from './config';


export default function UserProfile({id}) {
	const [personInfo, setPersonInfo] = useState({})
    
	const fetchData = useCallback(() => {
        fetch(`${url.z3hdro_url}/users/special/${id}/`, {
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
					setPersonInfo(json.result)
			});
    }, [])
    
    useEffect(() => {
		fetchData();
    }, [fetchData]);

	async function sendDatatoServer() {
		const data = new FormData();
		for (const [key, value] of Object.entries(personInfo)) {
			data.append(key, value)
		}
		let response = await fetch(`${url.z3hdro_url}/users/edituser/${id}/`, {
            method: 'POST',
			headers: {
				'Authorization': `Token ${localStorage.getItem('token')}`,
			},
			body: data
		});
		let answer = await response.json();
		console.log(answer);
		fetchData()
	};

	

	const UserPageHeader = () => {
		return (
			<div className={styles.chat_header}>
				<div className={styles.backimg}
					role = 'button'
					onClick = {() => {}}
					onKeyPress = {() => {}}
					tabIndex = '0'>
					<Link to='/contactlist/'>
						<img src='http://s1.iconbird.com/ico/2014/1/598/w128h1281390846445leftround128.png' alt='back' />
					</Link>
				</div>
				<p className={styles.header_chat}>编辑会员</p>
				<div className={styles.saveBtn}
					role = 'button'
					onClick = {() => {
						sendDatatoServer();
					}
					}
					onKeyPress = {() => {}}
					tabIndex = '0'>
					<img src='http://s1.iconbird.com/ico/2013/3/637/w128h128139396832132.png' alt='Save'/>
				</div>
			</div>
		);
	};
    
	function SaveData(...input) {
		if (input[1].key === 'Enter') {
			const flag = input[0];
			const info = input[2];
			switch (flag) {
				case 1:
					setPersonInfo({
						...personInfo,
						first_name: info
					});
					break;
				case 2:
					setPersonInfo({
						...personInfo,
						last_name: info
					});
					break;
				case 3:
					setPersonInfo({
						...personInfo,
						sex: info
					});
					break;
				case 4:
					setPersonInfo({
						...personInfo,
						adress: info
					});
					break;
				default:
					console.log('nothing changed');
			}
		}
	};
	

	function UserPage() {
		console.log(personInfo);
		const [firstNameInfo, setFirstNameInfo] = useState(personInfo.first_name);
		const [lastNameInfo, setLastNameInfo] = useState(personInfo.last_name);
		const [sex, setSex] = useState(personInfo.sex);
		const [Adress, setAdress] = useState(personInfo.adress);


		return (
			<div className={styles.userpage}>
				<div className={styles.fullname}>
					<p className={styles.textholdernames}>姓</p>
					<textarea className={styles.textholder}
						rows = '1' 
						maxLength = '25'
						value = {firstNameInfo}
						onChange = {(event) => setFirstNameInfo(event.target.value)}
						onKeyPress = {(event) => SaveData(1, event, firstNameInfo.trim())}
						onBlur = {()=> {
							setPersonInfo({
								...personInfo,
								first_name: firstNameInfo.trim()
							});
						}}/>
				</div>
				<div className={styles.username}>
					<p className={styles.textholdernames}>名</p>
					<textarea className={styles.textholder}
						rows = '1'
						minLength = '5'
						maxLength = '20'
						value = {lastNameInfo}
						onChange = {(event) => setLastNameInfo(event.target.value)}
						onKeyPress = {(event) => SaveData(2, event, lastNameInfo.trim())}
						onBlur = {() => {
							setPersonInfo({
								...personInfo,
								last_name: lastNameInfo.trim()
							});
						}}/>
				</div>
				<div className={styles.sex_date_of_birth}>
					<div className={styles.sex}>
						<p className={styles.textholdernames}>性</p>
						<select
						value = {sex}
						name='sex' 
						className={styles.textholder}
						onChange = {(event) => setSex(event.target.value)}
						onBlur = {() => {
							setPersonInfo({
								...personInfo,
								sex: sex.trim()
							})
						}} >	
							<option>Male</option>
							<option>Female</option>
						</select>
					</div>
					<div className={styles.birthday}>
						<p className={styles.textholdernames}>入会日期</p>
						<textarea className={styles.textholder}
							row = '1'
							maxLength = '14'
							value = {personInfo.date_joined}
							readOnly/>
					</div>
				</div>
				<div className={styles.number}>
						<p className={styles.textholdernames}>手机号</p>
						<textarea className={styles.textholder}
							row = '1'
							maxLength = '20'
							value = {personInfo.phone}
							readOnly/>
					</div>
				<div className={styles.adress}>
					<p className={styles.textholdernames}>地址</p>
					<textarea className={styles.textholder}
						rows = '2'
						maxLength = '150'
						value = {Adress}
						onChange = {(event) => setAdress(event.target.value)}
						onKeyPress = {(event) => SaveData(4, event, Adress.trim())}
						onBlur = {() => {
							setPersonInfo({
								...personInfo,
								adress: Adress.trim()
							});
						}}/>
				</div>
				<div className={styles.sex_date_of_birth}>
					<div className={styles.sex}>
						<p className={styles.textholdernames}>积分</p>
						<textarea className={styles.textholder}
							row = '1'
							maxLength = '7'
							value = {personInfo.member_points}
							readOnly/>
					</div>
					<div className={styles.birthday}>
						<p className={styles.textholdernames}>余额</p>
						<textarea className={styles.textholder}
							row = '1'
							maxLength = '20'
							value = {personInfo.balance}
							readOnly/>
					</div>
				</div>
				<div className={styles.sex_date_of_birth}>
					<div className={styles.sex}>
						<p className={styles.textholdernames}> 会员等级</p>
						<textarea className={styles.textholder}
							row = '1'
							maxLength = '7'
							value = {personInfo.membership_level}
							readOnly/>
					</div>
					<div className={styles.birthday}>
						<p className={styles.textholdernames}>折扣</p>
						<textarea className={styles.textholder}
							row = '1'
							maxLength = '14'
							value = {personInfo.discount}
							readOnly/>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className = {styles.container}>
			<UserPageHeader/>
			<UserPage/>
		</div>
	);
}