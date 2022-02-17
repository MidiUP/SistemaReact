import { useState, useEffect, useContext } from 'react'

import { FiPlus } from 'react-icons/fi'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { showMessageSuccess, showMessageError} from '../../components/alerts'
import './new.css'

import { getCollection, addDb } from '../../services/firebaseConnection'
import { AuthContext } from '../../contexts/auth'

export default function New() {

  const [loadCustomers, setLoadCostumers] = useState(true)
  const [customers, setCustomers] = useState([])
  const [customerSelected, setCustomerSelected] = useState(0)



  const [assunto, setAsunto] = useState('Suporte')
  const [status, setStatus] = useState('Aberto')
  const [complemento, setComplemento] = useState('')

  const { user } = useContext(AuthContext)

  useEffect(() => {
    async function loadCustomers() {
      try {
        const custumersApi = await getCollection('customers')
        setLoadCostumers(false)
        if (custumersApi.length === 0) {
          console.log('Nenhuma empresa encontrada')
          setCustomers([{ id: 1, nomeFantasia: '' }])
          return
        }
        setCustomers(custumersApi)

      } catch (err) {
        console.log('Houve algum erro')
        setLoadCostumers(false)
        setCustomers([{ id: 1, nomeFantasia: '' }])
      }
    }

    loadCustomers()
  }, [])

  const handleChangeCustomers = (e) => {
    setCustomerSelected(e.target.value)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try{
      let data = {
        created: new Date(),
        cliente: customers[customerSelected].nomeFantasia,
        clienteId: customers[customerSelected].id,
        assunto,
        status,
        complemento,
        userId: user.uid
      }
      await addDb( null, data, 'chamados')
      showMessageSuccess('OK', 'Chamado registrado com sucesso!')
      setAsunto('Suporte')
      setStatus('Aberto')
      setComplemento('')

    }catch(err){
      console.log(err);
      showMessageError('Erro', 'Houve algum problema')
    }
  }

  const handleChangeSelect = (e) => {
    setAsunto(e.target.value)
  }

  const handleOptionChange = (e) => {
    setStatus(e.target.value)
  }

  return (
    <>
      <Header />
      <div className='content'>
        <Title name='Novo chamado'>
          <FiPlus size={25} />
        </Title>

        <div className='profile--container'>
          <form className='profile--form' onSubmit={handleRegister}>
            <label>Clientes</label>
            {loadCustomers ?
              <input type='text' disabled={true} value='Carregando clientes...' />
              :
              <select value={customerSelected} onChange={handleChangeCustomers}>
                {customers.map((element, index) => {
                  return (
                    <option key={element.id} value={index}>
                      {element.nomeFantasia}
                    </option>
                  )
                })}
              </select>
            }
            <label>Assunto</label>
            <select value={assunto} onChange={handleChangeSelect}>
              <option value='Suporte'>Suporte</option>
              <option value='Visita técnica'>Visita técnica</option>
              <option value='Financeiro'>Financeiro</option>
            </select>
            <label>Status</label>
            <div className='status'>
              <input type='radio' name='radio' value='Aberto' onChange={handleOptionChange} checked={status === 'Aberto'} />
              <span>Em Aberto</span>
              <input type='radio' name='radio' value='Progresso' onChange={handleOptionChange} checked={status === 'Progresso'} />
              <span>Progresso</span>
              <input type='radio' name='radio' value='Atendido' onChange={handleOptionChange} checked={status === 'Atendido'} />
              <span>Atendido</span>
            </div>
            <label>Complemento</label>
            <textarea type='text' placeholder='Descreva seu problema (opcional)' value={complemento} onChange={(e) => setComplemento(e.target.value)}></textarea>
            <button type='submit' className='profile--onSubmit'>Registrar</button>
          </form>
        </div>
      </div>
    </>
  )
}