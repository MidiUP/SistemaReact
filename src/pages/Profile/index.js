import { useState, useContext } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import './profile.css'
import avatar from '../../assets/avatar.png'
import { addDb, uploadImage, downloadImage } from '../../services/firebaseConnection'
import { showMessageError } from '../../components/alerts'

import { AuthContext } from '../../contexts/auth'

import { FiSettings, FiUpload } from 'react-icons/fi'


export default function Profile() {

  const { user, signOut, setUser, storageUser } = useContext(AuthContext)
  const [nome, setNome] = useState(user && user.nome)
  const [email, setEmail] = useState(user && user.email)
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
  const [imageAvatar, setImageAvatar] = useState(null)

  const logout = () => {
    signOut()
  }

  const handleFile = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0]
      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        setImageAvatar(image)
        setAvatarUrl(URL.createObjectURL(image))
      } else {
        showMessageError('Formato inválido', 'Envie uma imagem do tipo PNG ou JPEG')
        setImageAvatar(null)
        return null
      }
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    let avatarUrlUpload = null
    let data
    try {
      if (imageAvatar) {
        await uploadImage(user.uid, imageAvatar, `avatar-${user.uid}`)
          .then(async () => {
            await downloadImage(`images/${user.uid}/${`avatar-${user.uid}`}`)
              .then((res) => {
                avatarUrlUpload = res
              })
          })
      }
      if(avatarUrlUpload){
        await addDb(user.uid, { avatarUrl: avatarUrlUpload, nome }, 'users')
      }else{
        await addDb(user.uid, { avatarUrl: user.avatarUrl, nome }, 'users')
      }
      const data = {
        ...user,
        nome,
        avatarUrl: avatarUrlUpload ? avatarUrlUpload : user.avatarUrl
      }
      setUser(data)
      storageUser(data)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Header />
      <div className='content'>
        <Title name='Meu perfil'>
          <FiSettings size={25} />
        </Title>

        <div className='profile--container'>
          <form className='profile--form' onSubmit={handleSave}>
            <label className='profile--label--avatar'>
              <span>
                <FiUpload color='#fff' size={25} />
              </span>
              <input type='file' accept='image/*' onChange={handleFile} /><br />
              {avatarUrl === null ?
                <img src={avatar} width='250' height={250} />
                : <img src={avatarUrl} width='250' height={250} />
              }
            </label>

            <label>Nome</label>
            <input type='text' value={nome} onChange={(e) => { setNome(e.target.value) }} />

            <label>Email</label>
            <input type='text' value={email} disabled={true} />
            <button type='submit' className='profile--onSubmit'>Salvar</button>

          </form>
        </div>

        <div className='profile--container'>
          <button className='profile--logout-btn' onClick={logout}>Sair</button>
        </div>
      </div>

    </>
  )
}