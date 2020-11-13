import React, {component, useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native"
import {
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,
    
} from './styles';

import {
    Thumbnail,
    Text,
} from 'native-base';

import SearchBarEquipInHosp from '../../components/SearchBarEquipInHosp';

const styles = {
    hospEnd: {
        color: '#fff',
        fontSize: 15,
    },
    hospName: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
};

function Hospital(hosp) {
    const [hospId, setHospId] = useState([]);
    const navigation = useNavigation()
    const hospEquip = hosp.route.params.hospital
       
    


    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <Thumbnail square large source={{ uri: 'https://images.squarespace-cdn.com/content/v1/546e1217e4b093626abfbae7/1511881792811-BAWT0VOSRGEQG5PGMP4Z/ke17ZwdGBToddI8pDm48kGfiFqkITS6axXxhYYUCnlRZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpxQ1ibo-zdhORxWnJtmNCajDe36aQmu-4Z4SFOss0oowgxUaachD66r8Ra2gwuBSqM/Hospital+%28icon%29.png?format=300w' }} />
                    <HeaderTitle>
                        <Text style={styles.hospName}>
                            {hospEquip.name}
                        </Text>    
                    </HeaderTitle>
                    <Text style={styles.hospEnd}>
                        {hospEquip.endereco}
                    </Text>
                </HeaderArea>   
                    
                <SearchBarEquipInHosp hosp={hospEquip}/>

            </Scroller>
        </Container>


    );

}


export default Hospital;