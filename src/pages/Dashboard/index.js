import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import './dashboard.css'
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { getCollectionOrderLimit } from '../../services/firebaseConnection'
import { format } from 'date-fns'
import { showMessageError } from '../../components/alerts'

export default function Dashboard() {

  const navigate = useNavigate()
  const [chamados, setChamados] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [lastDoc, setLastDoc] = useState()

  useEffect(() => {


    loadChamados()
    return () => {

    }
  }, [])

  async function loadChamados() {
    try {
      let { docs, snapshot } = await getCollectionOrderLimit('chamados', 'desc', 5)
      if (docs.length === 0) {
        setIsEmpty(true)
        setLoading(false)
        return
      }
      docs = docs.map((item) => { return Object.assign({}, item, { createdFormated: format(item.created.toDate(), 'dd/MM/yyyy') }) })
      setChamados(chamados => [...chamados, ...docs])
      setLastDoc(snapshot.docs[snapshot.docs.length - 1])
      setLoading(false)
      setLoadingMore(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const handleMore = async () => {
    setLoadingMore(true)
    try {
      if (lastDoc) {
        let { docs, snapshot } = await getCollectionOrderLimit('chamados', 'desc', 5, lastDoc)
        if (docs.length === 0) {
          setIsEmpty(true)
          setLoadingMore(false)
          return
        }
        docs = docs.map((item) => { return Object.assign({}, item, { createdFormated: format(item.created.toDate(), 'dd/MM/yyyy') }) })
        setChamados(chamados => [...chamados, ...docs])
        setLastDoc(snapshot.docs[snapshot.docs.length - 1])
        setLoadingMore(false)
      }
    } catch (err) {
      showMessageError('Erro', 'Houve algum erro.')
      setLoadingMore(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className='content'>
          <Title name='Atendimentos'>
            <FiMessageSquare size={25} />
          </Title>
          <div className='profile--container dashboard'>
            <span>Buscando chamados...</span>
          </div>

        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className='content'>
        <Title name='Atendimentos'>
          <FiMessageSquare size={25} />
        </Title>
        {chamados.length > 0 ?
          <>
            <a onClick={() => navigate('/new')} className='new'>
              <FiPlus size={25} color='#FFF' />
              Novo chamado
            </a>
            <table>
              <thead>
                <tr>
                  <th scope='col'>Cliente</th>
                  <th scope='col'>Assunto</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Cadastrado em</th>
                  <th scope='col'>#</th>
                </tr>
              </thead>
              <tbody>
                {chamados.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td data-label='Cliente'>{item.cliente}</td>
                      <td data-label='Assunto'>{item.assunto}</td>
                      <td data-label='Status'>
                        <span className='badge' style={{ backgroundColor: item.status === 'Aberto' ? '#5cb85c' : '#999' }}>{item.status}</span>
                      </td>
                      <td data-label='Cadastrado'>{item.createdFormated}</td>
                      <td data-label='#'>
                        <button className='action' style={{ backgroundColor: '#3586f6' }}>
                          <FiSearch color='#FFF' size={17} />
                        </button>
                        <button className='action' style={{ backgroundColor: '#F6a935' }}>
                          <FiEdit2 color='#FFF' size={17} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {loadingMore && <h3 style={{ textAlign: 'center', marginTop: 15 }}>Buscando...</h3>}
            {!loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar mais</button>}
          </>
          :
          <div className='profile--container dashboard'>
            <span>Nenhum chamado registrado...</span>
            <a onClick={() => navigate('/new')} className='new'>
              <FiPlus size={25} color='#FFF' />
              Novo chamado
            </a>
          </div>
        }
      </div>
    </>
  )
}