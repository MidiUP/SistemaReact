import { useState } from 'react'

import './customers.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiUser } from 'react-icons/fi'
import { showMessageError, showMessageSuccess } from '../../components/alerts'

import { addDb } from '../../services/firebaseConnection'
import { collection } from 'firebase/firestore'

export default function Customers() {

  const [nomeFantasia, setNomeFantasia] = useState('')
  const [cnpj, setNCnpj] = useState('')
  const [endereco, setEndereco] = useState('')

  const handleAdd = async (e) => {
    e.preventDefault()

    try{
      const data = {
        nomeFantasia,
        cnpj,
        endereco
      }
      await addDb(null, data, 'customers')
      showMessageSuccess('Cadastrado', 'Cliente cadastrado com sucesso.')
      setNomeFantasia('')
      setEndereco('')
      setNCnpj('')
    }catch(err){
      console.log(err);
      showMessageError('Ops!', 'Houve algum problema!')
    }
  }

  return (
    <>
      <Header />
      <div className='content'>
        <Title name='Clientes'>
          <FiUser size={25} />
        </Title>

        <div className='profile--container'>
          <form className='profile--form customers' onSubmit={handleAdd}>
            <label>Nome fantasia</label>
            <input type='text' value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} placeholder='Nome da sua empresa' />

            <label>CNPJ</label>
            <input type='text' value={cnpj} onChange={(e) => setNCnpj(e.target.value)} placeholder='Seu CNPJ'/>

            <label>Endereço</label>
            <input type='text' value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder='Endereço da empresa' />

            <button type='submit' className='profile--onSubmit'>Cadastrar</button>
          </form>
        </div>
      </div>
    </>
  )
}