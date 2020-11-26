import checked from '../checked.svg'
export default (equip, list, problema, solucao, user, tipo, situacao, pendencias)=>{


    function getTipo(tipo){
        if (tipo == 1) {
            return 'Manutenção Corretiva'
        } else if (tipo == 2) {
            return 'Manutenção Preventiva'
        }
    }
    function taskList(list){
        let table = ''
        list.map(task=>{
            table += `<tr>
                <td>${task.data}</td>
                <td>${task.horaInicial}</td>
                <td>${task.horaFinal}</td>
                <td>${somarHoras(task.horaInicial, task.horaFinal)}</td>
            </tr>`    
        })
        return table
    }
    function horasTotais(list){
        let horasTotais = 0
        list.map(task => {
            horasTotais = horasTotais + somarHoras(task.horaInicial, task.horaFinal)
        })
        return horasTotais.toFixed(2)
    }
    function somarHoras(horaInicial, horaFinal){
        
        let hInicial = Number(horaInicial.split(':')[0])
        let minInicial = Number(horaInicial.split(':')[1])
        let hFinal = Number(horaFinal.split(':')[0])
        let minFinal = Number(horaFinal.split(':')[1])
        
        let hTrabs = hFinal - hInicial
        
        let minTrabs = minFinal - minInicial
        
        if (minTrabs<0){
            minTrabs + 60
        }
        
        let minTrabsDeHora = minTrabs / 60.0
        
        let horasTrabs = Number(hTrabs) + Number(minTrabsDeHora.toFixed(2))
        return horasTrabs
    }

    const html = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset='utf-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1'>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;1,700&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
                *{
                    margin: 0;
                    padding: 0;
                    font-family: Roboto;
                }
                .container{
                    margin: 25px;
                }
                header{
                    text-align: center;
                    padding: auto 10px;
                    color: white;
                    background:#263165;
                    margin-bottom: 15px;
                    
                }
                header img{
                    width: 60px;
                }
                header h1{
                    font-family: Anton;
                    font-weight: bolder;
                    font-size: 60px;
                }
                section h3{
                    padding: 10px;
                    color: white;
                    background:#263165;
                    text-align: center;
                }
                .infos{
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                }
                .infos div{
                    padding: 20px;
                }
                .infos div p{
                    padding: 5px;
                }
                .assinatura{
                    padding-top: 30px;
                }
                .assinatura div p,
                .assinatura div h4{
                    padding: 10px;
                }
                .caixa{
                    padding: 10px;
                    margin-bottom: 15px;
                }
                .caixa div{
                    border: 1px solid black;
                    padding: 10px;
                    text-align: justify;
                }
                .caixa h4{
                    margin-bottom: 5px;
                }
                .horas table{
                    width: 100%;
                    text-align: center;
                    margin-bottom: 20px;
                }
                td, tr, thead{
                   border: 1px solid black; 
                }
                .horas table thead td{
                    padding: 10px;
                    
                }
                .total{
                    text-align: right;
                    border: none;
                }
                footer{
                    background:#263165;
                    padding: 20px;
                }
            </style>
        </head>
        <body>
            <div class='container'>
                <header>
                    
                    <h1><img src="../../../../app/assets/checked.svg"/> CheckApp</h1>
                </header>
                <section>
                    <h3>CLIENTE</h3>
                    <article class="infos">
                        <div>
                            <p><b>Ordem de Serviço:</b> 123456</p>
                            <p><b>Cliente:</b> Hospital Universitário Onofre Lopes</p>
                            <p><b>Contato:</b> ${user.name}</p>
                        </div>
                        <div>
                            <p><b>Data:</b> ${list[0].data}</p>
                            <p><b>Endereço:</b> Av. Nilo Peçanha, 620 - Petrópolis, Natal - RN, 59012-300 </p>
                            <p><b>Telefone:</b> 8499999999</p>
                        </div>
                    </article>
                </section>
                <section>
                    <h3>EQUIPAMENTO</h3>
                    <article class="infos">
                        <div>
                            <p><b>Equipamento:</b> ${equip.id}</p>
                            <p><b>N° de Série:</b> ${equip.sn}</p>                        
                        </div>
                        <div>
                            <p><b>Modelo:</b> ${equip.modelo}</p>
                            <p><b>Sala/Departamento</b> Centro de Imagens </p>
                        </div>
                    </article>
                </section>
                <section>
                    <h3>MANUTENÇÃO</h3>
                    <article class="infos">
                        <div>
                            <p><b>Atividade:</b> ${getTipo(tipo)}</p>
                        </div>
                        <div>
                            <p><b>Responsável:</b> ${user.name}</p>
                        </div>
                    </article>
                    <article class="caixa">
                        <h4>Problema:</h4>
                        <div>
                            <p>
                                ${problema}
                            </p>
                        </div>
                    </article>
                    <article class="caixa">
                        <h4>Descrição dos Serviços Executados:</h4>
                        <div>
                            <p>
                                ${solucao}
                            </p>
                        </div>
                    </article>
                    <article class="caixa">
                        <h4>Pendências/Observações:</h4>
                        <div>
                            <p>
                                ${pendencias}
                            </p>
                        </div>
                    </article>
                    <article class="horas">
                        <table>
                            <thead>
                                <td><b>Data</b></td>
                                <td><b>Início</b></td>
                                <td><b>Término</b></td>
                                <td><b>Horas Trabalhadas</b></td>
                            </thead>
                            ${taskList(list)}
                            <tr>
                                <td class='total' colspan='3'><b>Total de Horas Trabalhadas:</b></td>
                                <td><b>${horasTotais(list)} Horas</b></td>
                            </tr>
                        </table>

                        <p><b>Situação da Manutenção:</b> ${situacao}</p>
                    </article>
                    <article class="infos assinatura">
                        <div>
                            <h4>Dados do Engenheiro/Técnico</h4>
                            <p><b>Nome:</b> ${user.name}</p>
                            <p><b>Assinatura:</b> ____________________________________</p>
                        </div>
                        <div>
                            <h4>Dados do Cliente</h4>
                            <p><b>Nome:</b> ____________________________________</p>
                            <p><b>CPF:</b> ______________________________________</p>
                            <p><b>Assinatura:</b> _______________________________</p>
                        </div>
                    </article>
                </section>
                <footer>
                </footer>
            </div>
        </body>
    </html>
    
    
`
    return html
};