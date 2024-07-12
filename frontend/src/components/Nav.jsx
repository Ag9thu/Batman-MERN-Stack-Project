import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/Authcontext';
import { useContext } from 'react';
import axios from '../helpers/axios'
import { useNavigate } from 'react-router-dom';


export default function Navbar() {
    let navigate = useNavigate();

    let {user,dispatch} = useContext(AuthContext)
    console.log(user)


    let logout = async () => {
        
        let res = await axios.post('/api/users/logout')
        if(res.status===200) {
            dispatch({type : 'LOGOUT'})
            navigate('/sign-in')
        }
       
    }
    return (
        <nav className='flex justify-between items-center p-5 bg-white'>
            <div>
                <h1  onClick={() => navigate('/')} className='font-bold text-3xl text-black'>BATMAN</h1>
            </div>
            <ul className=' flex space-x-10'>
                <li><Link to="/" className='hover:text-orange-400'>Home</Link></li>
                <li><Link to="/about" className='hover:text-orange-400'>About</Link></li>
                <li><Link to="/contact" className='hover:text-orange-400'>Contact</Link></li>
                <li><Link to="/recipe/create" className='hover:text-orange-400'>Create Recipe</Link></li>
                {!user && (
                    <>
                    <li><Link to="/sign-in" className='hover:text-orange-400'>Login</Link></li>
                    <li><Link to="/sign-up" className='hover:text-orange-400'>Register</Link></li>
                
                    </>)
                    }
                
                {!!user && <li><button onClick={logout} className='hover:text-orange-400'>Logout</button></li>}
            </ul>
        </nav>
    )
}