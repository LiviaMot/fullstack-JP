import { Link } from 'react-router-dom'
import './style.css'

export default function Header() {
    return (
        <header>
            <h1>API</h1>
            <nav>
                <Link to='/'>
                    <button>
                        Inicio
                    </button>
                </Link>
                <Link to='/users'>
                    <button>
                        Usuários
                    </button>
                </Link>
                <Link to='/login'>
                    <button>
                        Login
                    </button>
                </Link>
            </nav>
        </header>
    )
}