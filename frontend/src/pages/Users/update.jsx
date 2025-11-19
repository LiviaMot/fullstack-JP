// passar as informações da página para o index
import { useEffect, useState } from "react"
import { updateUser } from "../../api/users"
import { useNavigate } from "react-router-dom"
import './style.css'

export default function UpdateUser() {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    nome: '',
    email: '',
    senha: '',
    ativo: true
  })

  const location = useLocation()
  const { user: prevUser } = location.state

  const handleChange = (e) => {
    const {id, value} = e.target
    setUser({
      ...user,
      [id]: value
    })
  }

  const handleReset = (e) => {
    e.preventDefault()
    setUser({...prevUser, senha: ''})
  }

  const handleSave = async (e) => {
    e.preventDefault()
    const response = await updateUser(prevUser.id, user)

    if (response.status === 200) {
      navigate('/users')
    } else {
      console.log(response)
    }
  }

  useEffect(() => {
    setUser({ ...prevUser, senha: '' })
  }, [])

  return (
    <main>
      <form className="form">
        <div>
          <label>Nome: </label>
          <input type="text" name="nome" id="nome" value={user.nome} onChange={handleChange} />
        </div>
        <div>
          <label>Email: </label>
          <input type="email" name="email" id="email" value={user.email} onChange={handleChange} />
        </div>
        <div>
          <label>Senha: </label>
          <input type="password" name="senha" id="senha" value={user.senha} onChange={handleChange} />
        </div>

        <div className="actions">
          <button type="reset" onClick={handleReset}>Limpar</button>
          <button type="submit" onClick={handleSave}>Enviar</button>
        </div>
      </form>
    </main>
  )
}