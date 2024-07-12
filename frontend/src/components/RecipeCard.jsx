
import { Link } from 'react-router-dom';
import Ingredients from '../components/Ingredients';
import axios from '../helpers/axios'



export default function RecipeCard({ recipe , ondeleted }) {
  let deleterecipe = async () => {
    
    let res = await axios.delete('/api/recipes/' + recipe._id )
    if(res.status==200){
      ondeleted(recipe._id)
    
  }}
  return (
      <div className="bg-white p-5 rounded-2xl space-y-3" >
          <img className= "mx-auto h-64 object-contain" src={import .meta.env.VITE_BACKEND_URL+recipe.photo} alt=""  />
          <div className='flex justify-between'><h3 className="text-xl font-bold text-orange-400">{recipe.title}</h3>
          <div className='flex space-x-3'>
          <Link to={`/recipe/edit/${recipe._id}`} className="bg-yellow-400  px-2 py-1 rounded-lg text-sm">Edit</Link>
          <button onClick={deleterecipe} className="bg-red-500 text-white px-2 py-1 rounded-lg text-sm">Delete</button>
          </div>
          </div>
          
          <p>Description</p>
          <p>{recipe.description}</p>
          <Ingredients ingredients = {recipe.ingredients}/>
          
          <p className="text-gray-500">Published at - {recipe.createdAt}</p>
      </div>
  )
}