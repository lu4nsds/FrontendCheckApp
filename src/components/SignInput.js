import React from 'react';
import styled from 'styled-components/native';

const InputArea = styled.View`
    width: 100%;
    height: 60px;
    background-color: #45CBF3;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;

`;

const Input = styled.TextInput`
    flex:1 ;
    font-size: 14px;
    color: #FFF;
    margin-left: 10px;
`;


export default ( {IconSVG, placeholder, value, password, onChangeText} ) => {
    return (
        <InputArea>
            <IconSVG width="24" height="24" fill= "#FFF"/>
            <Input
                placeholder = {placeholder}
                placeholderTextColor = "#384C9D"
                value = {value}
                onChangeText = {onChangeText}
                secureTextEntry = {password}
            />
        </InputArea>

    );

}