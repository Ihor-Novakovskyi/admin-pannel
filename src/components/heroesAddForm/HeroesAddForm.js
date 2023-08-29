
import uniqid from 'uniqid';
import { useEffect, useState } from "react";
import { HttpRequest } from "../../hooks/http.hook";
import { useDispatch } from 'react-redux';
import { putDataHeroe } from '../../reducers';
const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState([]);
    const { request } = HttpRequest();
    const [creatingHeroe, setHeroe] = useState({ name: '', description: '', element: '' });
    const propertyOfHeroe = (e) => { 
        const nameElement = e.target.name;
        const value = e.target.value;
        setHeroe((creatingHeroe) => ({ ...creatingHeroe, [nameElement]: value}))
    }
    useEffect(() => {
        request("http://localhost:3000/filters").then((resFilter) => { 
            setFilter(resFilter)
        })
        
    }, []); 
    
    const addHeroeToList = (e) => { 
        e.preventDefault();
        const heroe = { id: uniqid(), ...creatingHeroe }
        dispatch(putDataHeroe(heroe))
    }
    return (
        <form onSubmit={addHeroeToList} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">New hero name</label>
                <input 
                    required
                    onChange={propertyOfHeroe}
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="What is my name?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    required
                    onChange={propertyOfHeroe}
                    name="description" 
                    className="form-control" 
                    id="text" 
                    placeholder="What can i do?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Select herо element</label>
                <select 
                    required
                    onChange={propertyOfHeroe}
                    className="form-select" 
                    id="element"    
                    name="element"
                >
                    <option value="">I use element...</option>
                    <option value={filter[1]}>Fire</option>
                    <option value={filter[2]}>Water</option>
                    <option value={filter[3]}>Wind</option>
                    <option value={filter[4]}>Earth</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}

export default HeroesAddForm;