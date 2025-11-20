import './styles.css'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../api/users'
import { toast } from 'react-toastify'
import { AuthContext } from '../../auth/Context'

export default function Login() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const handleBackClick = () => {
    navigate('/')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    // verificar se os valores estão corretos ?
    // email e senha
    // pegar informações do input, criar uma requisição, enviar req os valores, aguardar as infos.

    try {
      const response = await loginUser(email, senha)
      login(response.data.token)// armazenar o token no storager - response.data.token
      navigate('/users')
    } catch (error) {
      toast("Email ou senha inválida!")
    }
  }

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" required value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
        <p>Não possui conta? <spam className="signup">Cadastre-se</spam></p>
        <button className="button" type="submit" onClick={handleLogin}>Entrar</button>
        <button className="button back-button" onClick={handleBackClick}>
          Voltar
        </button>
      </form>
    </div>
  )
}