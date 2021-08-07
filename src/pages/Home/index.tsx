import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import api from '../../services/api';

import { 
    Container, 
    Header, 
    HeaderContent, 
    Main, 
    Description,
    Register,
    Form,
    FormContent 
} from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImg from '../../assets/logo.png';
import graphic from '../../assets/graphic.png';
import { FiUser } from 'react-icons/fi';


const Home: React.FC = () => {
    // const [emailLogin, setEmailLogin] = useState('');
    // const [passwordLogin, setPasswordLogin] = useState('');

    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [phone, setPhone] = useState('');
    // const [cpf, setCpf] = useState('');
    // const [companyName, setCompanyName] = useState('');
    // const [companyType, setCompanyType] = useState('');
    // const [password, setPassword] = useState('');
    // const [passwordConfirmed, setPasswordConfirmed] = useState('');

    // const [ufs, setUfs] = useState([]);
    // const [cities, setCities] = useState([]);

    // const [selectedUf, setSelectedUf] = useState('0');
    // const [selectedCity, setSelectedCity] = useState('0');

    // const history = useHistory();

    // useEffect(() => {
    //     axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    //         .then(response => {
    //         const ufInitials = response.data.map(uf => uf.sigla);

    //         setUfs(ufInitials);
    //     });
    // }, []);

    // useEffect(() => {
    //     if(selectedUf === '0')
    //         return;

    //     axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
    //         .then(response => {
    //         const cityNames = response.data.map(city => city.nome);
    
    //         setCities(cityNames);
    //     });
        
    // }, [selectedUf]);

    // function handleSelectUf (event) {
    //     const uf = event.target.value;

    //     setSelectedUf(uf);
    // }

    // function handleSelectCity (event) {
    //     const city = event.target.value;

    //     setSelectedCity(city);
    // }

    // async function handleLogin(event) {
    //     event.preventDefault();

    //     try {
    //         const response = await api.post('sessions', {emailLogin, passwordLogin});

    //         localStorage.setItem('userId', response.data.id);
    //         localStorage.setItem('nameCompany', response.data.nameCompany);

    //         history.push('/profile');
    //     } catch (err) {
    //         alert('Falha no login, tente novamente.');
    //     }
    // }

    // async function handleRegister(e) {
    //     e.preventDefault();

    //     const data = {
    //         name,
    //         email
    //     };

    //     try{
    //         await api.post('users', data);
            
    //         alert(`Seu cadastro foi efetuado com sucesso. Aproveite ${data.name}.`);
            
    //         history.push('/');
    //     } catch (err) {
    //         alert('Erro no cadastro, tente novamente.')
    //     }
    // }

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt="Personal Manager" />
                    <Button type="button">Entrar</Button>
                </HeaderContent>
            </Header>
            <Main>
                <Description>
                    <h1>Conecte-se.<br/>Organize-se.<br/>Prospere.</h1>
                    <h2>Gerencie seus clientes, produtos/serviços e despesas com um sistema<br/>
                        apropriado e <strong>muito simples de se usar</strong>. O <strong>Personal Manager</strong> vai te ajudar<br/>
                        a organizar seus lucros e gastos de uma forma muito mais inteligente e eficaz,<br/>
                        ajudando você a finalmente conseguir <strong>separar a Pessoa Física do CNPJ</strong>.
                    </h2>
                    <img src={graphic} alt="Gráfico"/>
                    <h3>E o melhor de tudo: <strong>independente do seu negócio</strong>.</h3>
                </Description>
                <Register>
                    <section>
                        <h1>Abra uma conta</h1>
                        <p>Faça seu cadastro.<br/>Entre na plataforma e gerencie sua empresa de uma maneira facíl e moderna.</p>
                    </section>
                    <Form>
                        <FormContent>
                            <legend>Dados Cadatrais</legend>
                            
                            <label htmlFor="name">Nome completo</label>
                            <Input name="name" icon={FiUser} placeholder="Ex: João Batista da Silva" />

                            <label htmlFor="cpf">CPF</label>
                            <Input name="cpf" icon={FiUser} placeholder="Ex: 123.123.123-00" />

                            <label htmlFor="phone">Telefone</label>
                            <Input name="phone" icon={FiUser} placeholder="Ex: (34) 91234 5679" />

                            <label htmlFor="email">E-mail</label>
                            <Input name="email" icon={FiUser} placeholder="Ex: joaosilva@exemplo.com" />
                        </FormContent>
                    </Form>
                </Register>
            </Main>
        </Container>
        // <div id="container-home">

        //     <main>
        //         <div className="description">

        //         </div>

        //         <div className="register">
        //             <section>

        //             </section>
        //             <form onSubmit={handleRegister}>
        //                 <fieldset>
        //                     <legend>Dados Pessoais</legend>
                            
        //                     <label htmlFor="name">Nome completo</label>
        //                     <input 
        //                         name="name"
        //                         type="text"
        //                         placeholder="Ex: João Batista da Silva" 
        //                         value={name}
        //                         onChange={e => setName(e.target.value)}
        //                     />
                            
        //                     <label htmlFor="email">E-mail</label>
        //                     <input 
        //                         name="email"
        //                         type="email"
        //                         placeholder="Ex: joaosilva@exemplo.com" 
        //                         value={email}
        //                         onChange={e => setEmail(e.target.value)}
        //                     />
                            
        //                     <label htmlFor="tel">Telefone</label>
        //                     <input 
        //                         name="phone"
        //                         type="tel"
        //                         placeholder="Ex: (34) 91234 5679" 
        //                         value={phone}
        //                         onChange={e => setPhone(e.target.value)}
        //                     />

        //                     <label htmlFor="cpf">CPF</label>
        //                     <input 
        //                         name="cpf"
        //                         type="text"
        //                         placeholder="Ex: 123.123.123-00" 
        //                         value={cpf}
        //                         onChange={e => setCpf(e.target.value)}
        //                     />
        //                 </fieldset>

        //                 <fieldset>
        //                     <legend>Dados Profissionais</legend>
        //                     <label>Nome da empresa</label>
        //                     <input 
        //                         type="text"
        //                         placeholder="Ex: Padaria do João" 
        //                         value={companyName}
        //                         onChange={e => setCompanyName(e.target.value)}
        //                     />
        //                     <label>Qual o tipo do seu comércio/serviço</label>
        //                     <input 
        //                         type="text"
        //                         placeholder="Ex: loja de roupas, confeitaria, mecânico" 
        //                         value={companyType}
        //                         onChange={e => setCompanyType(e.target.value)}
        //                     />
        //                     <div className="field-group">
        //                         <div className="field">
        //                             <label htmlFor="uf">Estado (UF)</label>
        //                             <select 
        //                                 name="uf" 
        //                                 id="uf" 
        //                                 value={selectedUf} 
        //                                 onChange={handleSelectUf}
        //                             >
        //                                 <option value="0">Selecione uma UF</option>
        //                                 {ufs.map(uf => (
        //                                     <option key={uf} value={uf}>{uf}</option>
        //                                 ))}
        //                             </select>
        //                         </div>

        //                         <div className="field">
        //                             <label htmlFor="city">Cidade</label>
        //                             <select 
        //                                 name="city" 
        //                                 id="city" 
        //                                 value={selectedCity} 
        //                                 onChange={handleSelectCity} 
        //                             >
        //                                 <option value="0">Selecione uma cidade</option>
        //                                 {cities.map(city => (
        //                                     <option key={city} value={city}>{city}</option>
        //                                 ))}
        //                             </select>
        //                         </div>
        //                     </div>
        //                 </fieldset>
        //                 <div className="field-password">
        //                     <label>Digite uma senha</label>
        //                     <input 
        //                         type="password"
        //                         placeholder="Senha"
        //                         value={password}
        //                         onChange={e => setPassword(e.target.value)} 
        //                     />
        //                     <label>Digite novamente</label>
        //                     <input 
        //                         type="password"
        //                         placeholder="Confirmar senha" 
        //                         value={passwordConfirmed}
        //                         onChange={e => setPasswordConfirmed(e.target.value)}
        //                     />
        //                 </div>

        //                 <button type="submit">Cadastre-se</button> 
        //             </form>
        //         </div>
        //     </main>
        //     <footer>
        //         <div>
        //             <span>Ícones feitos por </span>
        //             <a href="https://www.flaticon.com/br/autores/freepik" title="Freepik">
        //                 Freepik
        //             </a> 
        //                 <span> from </span>
        //             <a href="https://www.flaticon.com/br/" title="Flaticon">
        //                 www.flaticon.com
        //             </a>
        //         </div>
        //     </footer>
        // </div>
    );
}

export default Home;