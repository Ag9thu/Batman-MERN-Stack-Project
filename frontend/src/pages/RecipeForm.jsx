import plus from '../assets/plus.svg'
import Ingredients from '../components/Ingredients'
import { useEffect, useState } from 'react'
import axios from '../helpers/axios'
import { useNavigate,useParams } from 'react-router-dom'


export default function Create() {
  let {id} = useParams();
  let navigate = useNavigate();
  let [ingredients, setIngredients] = useState([]);
  let [newingredient, setNewIngredient] = useState('');
  let [title, setTitle]= useState('');
  let [description, setDescription] = useState('');
  let [errors,seterrors] = useState([]);
  let [file,setFile] = useState(null);
  let [preview,setPreview] = useState(null);


  useEffect(() => {
    let fetchRecipe = async () => {
      if(id) {
        let response = await axios.get('/api/recipes/' + id);
        if (response.status===200) {
          setPreview(response.data.photo)
          setTitle(response.data.title)
          setDescription(response.data.description)
          setIngredients(response.data.ingredients)
          
        }
      }
    }
    fetchRecipe()
  }
  , [id])


  let addIngredient = () => {
    setIngredients(prev => [newingredient, ...prev])
    setNewIngredient('')
  }

  let submitRecipe = async (e) => {
    try {
      e.preventDefault();
      let recipe = {
        title,
        description,
        ingredients
      }
      let res;
      if(id) {
        res = await axios.patch('/api/recipes/' + id,recipe)
      }
      else{
        res = await axios.post('/api/recipes',recipe)
        
      }

      let formData = new FormData();
      formData.set('photo',file);
      
      let  uploadFile = await axios.post(`/api/recipes/${res.data._id}/upload`,formData,{
        headers : {
          Accept : 'multipart/form-data'
        }
      })
      console.log(uploadFile)
      if(res.status==200){
        navigate('/');
        
      }
    }
    catch(e) {
      
      seterrors(Object.keys(e.response.data.errors))
    }
    


  }


  let upload =  (e) => {
    let file = e.target.files[0];
    setFile(file)
  
    let fileReader = new FileReader;

    
    fileReader.onload = (e) => { 
      setPreview(e.target.result)
    } ;
      
    fileReader.readAsDataURL(file);
  
}

    



  return (
    <div className="mx-auto max-w-md border-2  border-orange-500 p-5 bg-slate-600">
      <h1 className="mb-6 text-3xl font-bold text-orange-500 text-center">Recipe {id?'Edit':'Create'} Form </h1>
      <form action="" className="space-y-5" onSubmit={submitRecipe}>
        <ul className='list-disc pl-4'>
          {!!errors.length && errors.map((error, i) => <li className='text-red-500 text-sm'key={i}>{error} is invalid</li>)}
        </ul>
        <input type= "file" onChange={upload}/>
        {!!preview && <img src={preview} alt="" />}
        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Recipe Title" className="w-full p-1 rounded-md" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Recipe Description" rows="5" className="w-full p-1 rounded-md" />
        <div className='flex space-x-2'>
        <input value={newingredient} onChange={(e) => setNewIngredient(e.target.value)}  type="text" placeholder="Recipe Ingredients" className="w-full p-1 rounded-md" />
        
      
        <img src={plus} alt="" className='cursor-pointer' onClick={addIngredient}  />
        
        </div>
        <div>
          <Ingredients ingredients={ingredients}/>
        </div>
        <button type= "submit" className="w-full bg-orange-500 rounded-full text-white p-1">{id?'Update':'Create'} Recipe</button>
      </form>
    </div>
  )
}

