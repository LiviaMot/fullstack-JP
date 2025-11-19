import User from '../model/users.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const JWT_SEGREDO = "M3uS3gr3d0"
const SALT = 10 // 12

class ServiceUser {

  FindAll() {
    return User.findAll()
  }

  async FindOne(id) {
    if (!id) {
      throw new Error("Favor informar o ID")
    }

    // preciso procurar um usuario no banco
    const user = await User.findByPk(id)

    if (!user) {
      throw new Error(`Usuário ${id} não encontrado`)
    }

    return user
  }

  async Create(nome, email, senha, ativo, permissao) {
    if (!nome || !email || !senha) {
      throw new Error("favor preencher todos os campos")
    }

    const senhaCriptografada = await bcrypt.hash(String(senha), SALT)

    await User.create({
      nome, email, senha: senhaCriptografada, ativo, permissao
    })
  }

  async Update(id, nome, senha) {
    const oldUser = await User.findByPk(id)

    if (!oldUser) {
      throw new Error('Usuário não encontrado!')      
    }
    
    oldUser.nome = nome || oldUser.nome
    oldUser.senha = senha
      ? await bcrypt.hash(String(senha), SALT)
      : oldUser.senha

    
      oldUser.save()
  }

  async Delete(id) {
    const oldUser = await User.findByPk(id)

    if (!oldUser) {
      throw new Error(`Usuário ${id} não encontrado`)
    }
    
    oldUser.destroy(id)
  }

  async Login(email, senha) {
    if(!email || !senha) {
      throw new Error("Email ou senha inválidos.")
    }

    const user = await User.findOne({ where: { email } })

    if (
      !user 
      || !(await bcrypt.compare(String(senha), user.senha))
    ) {
      throw new Error("Email ou senha inválidos.")
    }

    return jwt.sign(
      { id: user.id, nome: user.nome, permissao: user.permissao },
      JWT_SEGREDO,
      { expiresIn: 60 * 60 }
    )
  }
}

export default new ServiceUser()