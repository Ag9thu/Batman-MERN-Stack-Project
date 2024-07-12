import { useEffect, useState } from "react"
import RecipeCard from '../components/RecipeCard';
import Pagination from '../components/Pagination';
import { useLocation,useNavigate} from "react-router-dom";
import axios from '../helpers/axios';





export default function Home() {
    let navigate = useNavigate();

    let [recipes, setRecipes] = useState([]);
    let [links, setLinks] = useState(null);
    let location = useLocation();
    let searchquery = new URLSearchParams(location.search)
    let page = searchquery.get('page') 
    page =parseInt(page) ? parseInt(page) : 1

    useEffect(() => {
        let fetchRecipes = async () => {
            let response = await axios('/api/recipes?page=' + page);
            console.log(response)
            if (response.status === 200) {
                let data = response.data;
                setLinks(data.links)
                setRecipes(data.data);
                window.scrollTo({top : 0, behavior : 'smooth'});
            }
        }

        fetchRecipes();
    }, [page])
    let ondeleted = (_id) => {
        if(recipes.length === 1 && page > 1) {
            navigate('/?page=' + (page - 1))
        }
        else{
            setRecipes(prev => prev.filter(recipe => recipe._id !== _id))
        }
        
    }
    

    return (
        <>
        <div className="grid grid-cols-3 space-x-2 space-y-3 mb-5">
            {!!recipes.length && (recipes.map(recipe => (
                <RecipeCard recipe={recipe} key={recipe._id} ondeleted={ondeleted} />
            ))
            )}
           

        </div>
        
        {!! links && <Pagination links={links} page={page || 1 }/>}
        </>
    )
}