import React, {useState} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/auth';
import PropTypes from 'prop-types'
import styles from '../styles/loginpage.module.css';



function LoginPage({ onAuth}) {
	const [values, setValues] = useState({username: '',password: ''});
    
	const sendData = event => {
		event.preventDefault();
		onAuth(values.username, values.password);
		setValues({username: '',password: ''});
	};

	const sendLogin = event => {
		if (event.key === 'Enter') {
			sendData(event)
		}
	};

	return (
		<div className={styles.loginPageContainer}>
			<form method='post'>
				<div className={styles.container}>
					<label htmlFor='uname'><p>用户</p></label>
					<input 
						type='text' 
						placeholder='输入用户名'
						value = {values.username}
						onChange={(event) => setValues({
							...values,
							username: event.target.value})}
						name='uname' 
						required/>

					<label htmlFor='psw'><p>密码</p></label>
					<input 
						type='password' 
						placeholder='输入密码'
						value = {values.password}
						onChange={(event) => setValues({
							...values,
							password: event.target.value
						})
						}
						onKeyPress = {(event) => sendLogin(event)}
						name='psw' 
						required/>
                        
					<span className={styles.Login}
						role = 'button'
						onClick = {(event) => sendData(event)}
						onKeyPress = {() => {}}
						tabIndex = '0'>
                            登录
					</span>
				</div>
			</form>
		</div>
	);
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (username, password) => dispatch(actions.authLogin(username, password))
	};
};

export default connect(null, mapDispatchToProps)(LoginPage);

LoginPage.propTypes = {
	onAuth : PropTypes.func.isRequired 
};