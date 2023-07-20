

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров
import uniqid from 'uniqid';
import { addHeroe } from '../../actions';
import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch } from 'react-redux';
const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState([]);
    const { request } = useHttp();
    const [creatingHeroe, setHeroe] = useState({ name: '', description: '', element: '' });
    const { name, description } = creatingHeroe;
    const propertyOfHeroe = (e) => { 
        const nameElement = e.target.name;
        const value = e.target.value;
        setHeroe((creatingHeroe) => ({ ...creatingHeroe, [nameElement]: value}))
    }
    useEffect(() => {
        request("http://localhost:3000/filters").then((resFilter) => { 
            setFilter(resFilter)
        })
        
    }, []); [1 , 2 , 3]
    
    const addHeroeToList = (e) => { 
        e.preventDefault();
        const c = { id: uniqid(), ...creatingHeroe }
        console.log(c)
        dispatch(addHeroe(c))
        request("http://localhost:3000/heroes", 'POST', JSON.stringify(c))
        
    }
    return (
        <form onSubmit={addHeroeToList} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    onChange={propertyOfHeroe}
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    onChange={propertyOfHeroe}
                    name="description" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    onChange={propertyOfHeroe}
                    className="form-select" 
                    id="element" 
                    name="element"
                >
                    <option value="">Я владею элементом...</option>
                    <option value={filter[1]}>Огонь</option>
                    <option value={filter[2]}>Вода</option>
                    <option value={filter[3]}>Ветер</option>
                    <option value={filter[4]}>Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;