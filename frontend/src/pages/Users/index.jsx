import { useEffect, useState } from 'react'
import { deleteUser, getUsers } from '../../api/users'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import './style.css'

function Users() {
    const [ users, setUsers ] = useState([])

    const handleDelete = async (id) => {
        const response = await deleteUser(id)

        if (response.status !== 204) {
            toast("Erro ao deletar, tentar novamente, mais tarde.")
            return
        }

        setUsers(prev => prev.filter(user => user.id === id))
    }

    const handleUpdate = async (id) => {
        navigate('/update/user', { state })
    }

    useEffect(() => {
        async function carregar() {
            const allUsers = await getUsers()
            setUsers(allUsers)
        }
        carregar()
    }, [])

    return (
        <main>
            <div className='user-list'>
                <Link to={'/create/user'}>
                    <button>Criar</button>
                </Link>
                <div className='user header' key='header'>
                    <label>Nome</label>
                    <label>Email</label>
                    <label>Ações</label>
                </div>
                {
                    users.length == 0
                        ? <>Não tem ninguém</>
                        : users.map(user =>
                            <div className='user' key={user.id}>
                                <label>{ user.nome }</label>
                                <label>{ user.email }</label>
                                <div className='actions'>
                                    <button type='button' onClick={() => handleUpdate(user)}>Alterar</button>
                                    <button type='button' onClick={() => handleDelete(user.id)}>Deletar</button>
                                </div>
                            </div>)
                }
            </div>
        </main>
    )
}

export default Users