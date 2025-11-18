import { useState } from "react"
import { createUser } from "../../api/users"
import { useNavigate } from "react-router-dom"
import './style.css'

export default function CreateUser() {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    nome: '',
    email: '',
    senha: '',
    ativo: true
  }) // estado inicial | valor fixo

  const handleChange = (e) => {
    const {id, value} = e.target
    setUser({
      ...user,
      [id]: value
    })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    // é importante validar os valores dos objetos antes de enviar
    // adicionar um 'tost?' - mensagem pop-up
    const response = await createUser(user)

    if (response.status === 201) {
      navigate('/users')
    }
    console.log(response)
  }

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
          <button type="reset">Limpar</button>
          <button type="submit" onClick={handleSave}>Enviar</button>
        </div>
      </form>
    </main>
  )
}