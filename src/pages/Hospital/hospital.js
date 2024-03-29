import React, {component, useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native"
import {
    Container,
    Scroller,
    styles,
    HeaderArea,
    HeaderTitle,
    
} from './styles';

import {
    Thumbnail,
    Text,
    View,
} from 'native-base';

import SearchBarEquipInHosp from '../../components/SearchBarEquipInHosp';
import HospMenu from '../../components/HospMenu';
import SearchBarOpened from '../../components/SearchBarOpened';
import Charts from '../../components/Charts';
import api from '../../api';


function Hospital(hosp) {
    const [hospId, setHospId] = useState([]);
    const [show, setShow] = useState(1);
    const navigation = useNavigation()
    const hospEquip = hosp.route.params.hospital
    
    const [equipamentos, setEquipamentos] = useState([]);


    useEffect(() => {

        async function loadEquipamentos() {
            const response = await api.get(`/hospitais/${hospEquip.id}/equipamentos`);
            await preencherItens(response.data);
        }
        loadEquipamentos();

    }, []);

    async function preencherItens(equips) {
        let listEquips = [];
        equips.map(equip => {
            listEquips = [...listEquips, equip];

        });
        setEquipamentos(listEquips);

    }



    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <Thumbnail square large source={{ uri: 'https://images.squarespace-cdn.com/content/v1/546e1217e4b093626abfbae7/1511881792811-BAWT0VOSRGEQG5PGMP4Z/ke17ZwdGBToddI8pDm48kGfiFqkITS6axXxhYYUCnlRZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpxQ1ibo-zdhORxWnJtmNCajDe36aQmu-4Z4SFOss0oowgxUaachD66r8Ra2gwuBSqM/Hospital+%28icon%29.png?format=300w' }} />
                        <Text style={styles.hospName}>
                            {hospEquip.name}
                        </Text>    
                    <Text style={styles.hospEnd}>
                        {hospEquip.endereco}
                    </Text>
                </HeaderArea>

                <HospMenu
                    setShow={setShow}
                    hosp = {hospEquip}
                /> 
                        
                {show==1 &&
                    <SearchBarEquipInHosp hosp={hospEquip}/>
                }
                {show==2 &&
                    <Charts 
                    hosp={hospEquip}                    
                    />
                }

                {show==3 &&
                    <SearchBarOpened 
                    hosp={hospEquip}
                    equip={equipamentos}
                    />
                }
            </Scroller>
        </Container>


    );

}


export default Hospital;