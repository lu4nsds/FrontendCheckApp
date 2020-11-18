import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #263165;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: 100%;
    height: 100%;
    padding-bottom: 5px;
    padding-top: 25px;
    
`;

export const Scroller = styled.ScrollView`
    background-color: #263165;
    width: 100%;
`;

export const HeaderArea = styled.View`
    flex-direction: row;
    padding: 10px;
    width: 100%;
    align-items: center;
    margin-top: 20px;

    
`;
export const HeaderTitle = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #FFF;
    
`;

export const SearchButtonHosp = styled.TouchableOpacity`
    height: 60px;
    width: 50%;
    color: #000000;
    flex-direction: row;
    justify-content: center;
    padding: 15px;
    borderBottomLeftRadius: 100px;
    borderBottomRightRadius: 0;
    borderTopLeftRadius: 100px;
    borderTopRightRadius: 0;
    background: #45cbf3;
    opacity: 0.6;
`;
export const SearchButtonEquip = styled.TouchableOpacity`
    height: 60px;
    width: 50%;
    background: #45cDff;
    
    flex-direction: row;
    justify-content: center;
    padding: 15px;
    borderBottomLeftRadius: 0;
    borderBottomRightRadius: 100px;
    borderTopLeftRadius: 0;
    borderTopRightRadius: 100px;
    
`;
export const CustomText = styled.Text`
    font-weight: 300;
    font-size: 18px;

`

export const SearchArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    border-radius: 100px;
    margin-top:20px;

`;
export const InputSearchArea = styled.View`
    flex-direction: row;
    padding: 0px;
    margin-top: 15px;
    justify-content: space-between;
    border-radius: 90px;
    align-items: center;
    width: 100%;
    background-color: #384C9D;
    border-radius: 100px;
`;
export const SearchInput = styled.TextInput`
    padding: 10px;
    color: #FFF;
    background-color: #384C9D;
    border-radius: 20px;
    width: 80%;
`;


export const HospList = styled.View`
    width: 100%;
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    margin-top: 30px;
`;
