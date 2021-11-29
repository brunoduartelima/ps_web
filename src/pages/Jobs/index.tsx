import React, { useCallback, useEffect, useState, KeyboardEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { 
    RiSearchLine,
    RiBook2Line, 
    RiBookOpenLine,
    RiFileList3Line,
    RiEdit2Line,
    RiDeleteBin7Line,
    RiArrowRightLine,
    RiAddFill
} from 'react-icons/ri';

import api from '../../services/api';
import { usePagination } from '../../hooks/pagination';
import { useToast } from '../../hooks/toast';
import { maskMoney } from '../../utils/inputMasks';

import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import CreateJobModal from './CreateJobModal';

import {
    Container,
    JobsContainer,
    ServicesContent,
    SearchContent,
    JobsContent,
    Job,
    JobOptions,
    JobOptionsContent,
    OptionButton,
    DeleteContainer,
    DeleteContent,
    JobData
} from './styles';


interface JobsData {
    id: string;
    name: string;
    description?: string;
    price: number;
    average_time: string;
}

const Jobs: React.FC = () => {
    const [jobs, setJobs] = useState<JobsData[]>([]);
    const [totalElements, setTotalElements] = useState(0);
    const [searchName, setSearchName] = useState('');
    const [paginationFlag, setPaginationFlag] = useState('');
    const [selectedShowJob, setSelectedShowJob] = useState<String[]>([]);
    const [modalRegistration, setModalRegistration] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const { currentPage, updateCurrentPage } = usePagination();
    const { addToast } = useToast();
    const history = useHistory();

    useEffect(() => {
        api.get('/jobs').then(response => {
            setJobs(response.data);
        })
    }, []);

    useEffect(() => {
        try {
            if(paginationFlag === 'ListAll') {
                api.get(`/jobs/search/list-all?page=${currentPage}`).then(
                    response => {
                        setJobs(response.data[0]);
                        setTotalElements(Number(response.data[1]));
                    }
                )
    
                history.push(`/jobs/search/list-all?page=${currentPage}`);
            }
            if(paginationFlag === 'Search' && searchName.length) {
                api.get(`/jobs/search?name=${searchName}&page=${currentPage}`).then(
                    response => {
                        setJobs(response.data[0]);
                        setTotalElements(Number(response.data[1]));
                    }
                )
    
                history.push(`/jobs/search?name=${searchName}&page=${currentPage}`);
            }
        } catch {
            addToast({
                type: 'error',
                title: 'Erro ao listar',
                description: 'Ocorreu um erro ao listar serviços, tente novamente.',
            });
        }
    }, [currentPage, totalElements, history, paginationFlag, searchName, addToast]);

    const handleListAllJobs = useCallback(async () => {
        try {
            const response = await api.get(`/jobs/search/list-all?page=1`);
            history.push(`/jobs/search/list-all?page=1`);
            setJobs(response.data[0]);
            setTotalElements(Number(response.data[1]));
            setPaginationFlag('ListAll');
            updateCurrentPage(1);
        } catch {
            addToast({
                type: 'error',
                title: 'Erro ao listar',
                description: 'Ocorreu um erro ao listar serviços, tente novamente.',
            });
        }
    }, [history, updateCurrentPage, addToast]);

    const handleShowDataJob = useCallback((id: string) => {
        const alreadySelected = selectedShowJob.findIndex(job => job === id);

        if (alreadySelected > -1) {
            const filteredJob = selectedShowJob.filter(job => job !== id);
            
            setSelectedShowJob(filteredJob);

        } else {
            setSelectedShowJob([...selectedShowJob, id]);
        }
    }, [selectedShowJob]);

    const handleSearchJob = useCallback(async (event: KeyboardEvent<HTMLInputElement> ) => {
        try {
            const key = event.key;
            if(key === 'Enter' && searchName.length) {
                const response = await api.get(`/jobs/search?name=${searchName}&page=1`);
                history.push(`/jobs/search?name=${searchName}&page=1`);
                setJobs(response.data[0]);
                setTotalElements(Number(response.data[1]));
                setPaginationFlag('Search');
                updateCurrentPage(1);
            }
        } catch {
            addToast({
                type: 'error',
                title: 'Erro ao listar',
                description: 'Ocorreu um erro ao listar serviços, tente novamente.',
            });
        }
    }, [history, searchName, updateCurrentPage, addToast]);

    const handleDelete = useCallback(async (id: string) => {
        try {
            await api.delete(`/jobs/${id}`);

            setJobs(oldJobs => oldJobs.filter(job => job.id !== id));

            addToast({
                type: 'success',
                title: 'Serviço excluido',
                description: 'O serviço foi excluido com sucesso.',
            });
        } catch {
            addToast({
                type: 'error',
                title: 'Erro ao excluir',
                description: 'Ocorreu um erro ao excluir serviço, tente novamente.',
            });
        } finally {
            setDeleteConfirmation(false);
        }
    }, [addToast]);

    return(
        <Container>
            <Header/>
            <JobsContainer>
                <ServicesContent>
                    <form onSubmit={e => e.preventDefault()}>
                        <SearchContent>
                            <div><RiSearchLine size={22} /></div>
                            <input type="text" name="name" placeholder="Procurar" onKeyPress={handleSearchJob} onChange={e => setSearchName(e.target.value)}/>
                        </SearchContent>
                    </form>
                    <div>
                        <button type="button" onClick={() => handleListAllJobs()}>
                            <RiFileList3Line size={22} />
                            Listar todos
                        </button>
                        <button type="button" onClick={() => setModalRegistration(true)}>
                            <RiAddFill size={22} />
                            Cadastrar
                        </button>
                    </div>
                </ServicesContent>
                <JobsContent>
                    { paginationFlag.length ? <h1>Resultados encontrados: { totalElements }</h1> : <h1>Cadastrados recentemente</h1> }
                    <ul>
                        { jobs.length ? jobs.map(job => (
                            <Job key={job.id}>
                                <JobOptions>
                                    <span>{job.name}</span>
                                    <JobOptionsContent>
                                        <OptionButton type="button" onClick={() => handleShowDataJob(job.id)}>
                                            <div>
                                                {selectedShowJob.includes(job.id) ?
                                                <RiBookOpenLine size={22} title="Fechar" /> : 
                                                <RiBook2Line size={22} title="Mostrar" /> }
                                            </div>    
                                        </OptionButton>
                                        <OptionButton type="button">
                                            <RiEdit2Line size={24} title="Editar" />
                                        </OptionButton>
                                        <OptionButton type="button" onClick={() => setDeleteConfirmation(true)}>
                                            <RiDeleteBin7Line size={22} title="Excluir" />
                                        </OptionButton>
                                        { deleteConfirmation  && 
                                            <DeleteContainer>
                                                <DeleteContent>
                                                    <strong>Deseja realmente excluir esse serviço ?</strong>
                                                    <div>
                                                        <button type="button" onClick={() => handleDelete(job.id)}>Confirmar</button>
                                                        <button type="button" onClick={() => setDeleteConfirmation(false)}>Cancelar</button>
                                                    </div>
                                                </DeleteContent>
                                            </DeleteContainer>
                                        }
                                    </JobOptionsContent>
                                </JobOptions>
                                <JobData isOpen={!selectedShowJob.includes(job.id)} >
                                    <ul>
                                        <li><span>Descrição: </span>{job.description}</li>
                                        <li><span>Preço: </span>R$ {maskMoney(String(job.price))}</li>
                                        <li><span>Tempo médio: </span>{job.average_time}</li>
                                    </ul>
                                    <div>
                                        <Link to={`/job/${job.id}`}>Ver histórico completo<RiArrowRightLine size={24}/></Link>
                                    </div>
                                </JobData>
                            </Job>
                        )) : <span>Nenhum resultado encontrado</span> }
                    </ul>
                </JobsContent>
                { totalElements > 0 && <Pagination totalElements={totalElements}  /> }
            </JobsContainer>
            { modalRegistration && <CreateJobModal onClose={() => setModalRegistration(false)} /> }
        </Container>
    )
}

export default Jobs;