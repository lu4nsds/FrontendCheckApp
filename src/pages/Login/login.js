import React, { useState } from 'react';
import { CommonActions, useNavigation } from "@react-navigation/native"
import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText
} from './styles';

import api from '../../api.js'

import SignInput from '../../components/SignInput';
import EmailIcon from '../../../assets/email.svg';
import LockIcon from '../../../assets/lock.svg';
import Check from '../../../assets/checked.svg';

function Login() {
    const [emailField, setEmailField] = useState('luan.s9d7s@gmail.com');
    const [passwordField, setPasswordField] = useState('');
    const navigation = useNavigation();

    async function getUser(email, password) {
        const response = await api.post('/login', {
            email: email,
            password: password

        })
        return response
    }
    const handleSignClick = async () => {

        if (emailField && passwordField) {
            let check = await getUser(emailField, passwordField)
            if (check.data) {
                navigation.reset({
                    routes: [{ name: 'SearchHosp' }]
                });
            } else {
                alert("Email e/ou Senha incorreto(s)")
            }
        } else {
            alert("Preencha os campos!");
        }

    }
    return (
        <Container>
            <Check width="100%" height="160" />
            <InputArea>
                <SignInput
                    IconSVG={EmailIcon}
                    placeholder="Digite seu e-mail"
                    value={`${emailField}`}
                    onChangeText={t => setEmailField(t)}
                />
                <SignInput
                    IconSVG={LockIcon}
                    placeholder="Digite sua senha"
                    value={`${passwordField}`}
                    onChangeText={t => setPasswordField(t)}
                    password={true}
                />
                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>

            </InputArea>

        </Container>


    );

}

export default Login;