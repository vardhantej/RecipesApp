import React,{useState,useEffect} from 'react';
import Form from '../Form/Form.js';
import SearchBar from '../../components/SearchBar/SearchBar.js';
import './styles.css';
import * as api from '../../api/index.js';

export default function Home() {
    
    const [placeholder,setPlaceholder]=useState('Search by name or ingredient');
    const [recipes,setRecipes]=useState([]);
    const [deleteClick,setDeleteClick]=useState(false);
    const [deleteRecipeName,setDeleteRecipeName]=useState("");
    const [filteredRecipes,setFilteredRecipes]=useState([]);
    const [searchWord,setSearchWord]=useState("");

    const [editClick,setEditClick]=useState(false);
    const [editRecipe,setEditRecipe]=useState({
        name: '',
        description:'',
        ingredients:[],
        selectedFile:''
    });

    useEffect(() => {
        async function fetchData() {
            try {
                
                let response=await api.getAllRecipes();
                setRecipes(response.data);


            } catch (error) {
                console.log(error);
            }
        }
        
        fetchData();

    })

    useEffect(() => {
        try {
            
            api.deleteRecipe(deleteRecipeName);
            let response=api.getAllRecipes();
            setRecipes(response.data);
            
        } catch (error) {
            console.log(error);
        }

    },[deleteClick])
    
   
    useEffect(() => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }, [editClick])

    

    const handleOnChange=(e)=>{
        setPlaceholder(e.target.value);
    }
    
    return (
        <div className='container'>
            <Form editRecipe={editRecipe} setEditRecipe={setEditRecipe} editClick={editClick} setEditClick={setEditClick}/>
            <div className='search'>
                <SearchBar editClick={editClick} setEditClick={setEditClick} editRecipe={editRecipe} setEditRecipe={setEditRecipe} searchWord={searchWord} setSearchWord={setSearchWord} filteredRecipes={filteredRecipes} setFilteredRecipes={setFilteredRecipes} placeholder={placeholder} recipes={recipes} setRecipes={setRecipes} deleteClick={deleteClick} setDeleteClick={setDeleteClick} deleteRecipeName={deleteRecipeName} setDeleteRecipeName={setDeleteRecipeName}/>
            </div>
        </div>
    )
}
