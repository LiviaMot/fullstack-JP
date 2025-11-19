// passar as informações da página para o index
import { useState } from "react"
import { updateUser } from "../../api/users"
import { useNavigate } from "react-router-dom"

export default function UpdateUser() {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    nome: '',
    email: '',
    senha: '',
    ativo: true
  })

  const handleChange = (e) => {
    const {id, value} = e.target
    setUser({
      ...user,
      [id]: value
    })
  }

  const handleReset = (e) => {
    e.preventDefault()
    setUser(INITIAL_STATE)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    const response = await updateUser(user)

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
          <button type="reset" onClick={handleReset}>Limpar</button>
          <button type="submit" onClick={handleSave}>Enviar</button>
        </div>
      </form>
    </main>
  )
}