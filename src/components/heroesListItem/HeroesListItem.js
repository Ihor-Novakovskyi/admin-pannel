
import { deleteHeroe, filterHeroes } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { Transition } from 'react-transition-group';
import { useRef, useState, useEffect } from "react";
const duration = 1000;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}



const transitionStyles = {
    noTransparent: { opacity: 1 },
    transparent: { opacity: 0 },
};

const HeroesListItem = ({ id, name, description, element }) => {
    const { request } = useHttp();
    const filter = useSelector(state => state.filter);
    const dispatch = useDispatch();
    const [initDelete, setInitDelete] = useState(false)
    const ref = useRef(null);
    const [transparent, setTransparent] = useState('transparent');
    console.log(filter)
    console.log(name,id)
    let elementClassName = '';
    useEffect(() => {
        if (element === filter || filter === 'all') {
            setTransparent('noTransparent');
            return;
        }
        setTransparent('transparent');

    }, [filter])
    const deleteHero = () => {
        setTransparent('transparent');
        setInitDelete(true);
    }
    switch (element) {
        case 'fire':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'water':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'wind':
            elementClassName = 'bg-success bg-gradient';
            break;
        case 'earth':
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }
    // console.log(initStyle)
    return (
        <li
            style={ {
                ...defaultStyle,
                ...transitionStyles[transparent]
            } }
            onTransitionEnd={ () => {
                console.log('end transitioned')
                if (transparent === 'transparent' && initDelete) {
                    dispatch(deleteHeroe(id));
                    request(`http://localhost:3000/heroes/${id}`, 'DELETE')
                    console.log('delete')
                    return;
                }
                if (transparent === 'transparent') {
                    console.log(1)
                    console.log('id', id)
                    console.log(1)
                    dispatch(filterHeroes(filter))
                    console.log('filter', filter)
                    console.log(2)
                };
            } }
            ref={ ref }
            className={ `card flex-row mb-4 shadow-lg text-white ${elementClassName}` }>
            <img src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg"
                className="img-fluid w-25 d-inline"
                alt="unknown hero"
                style={ { 'objectFit': 'cover' } } />
            <div className="card-body">

                <h3 className="card-title">{ name }</h3>
                <p className="card-text">{ description }</p>
            </div>
            <span onClick={ deleteHero } className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button type="button" className="btn-close btn-close" aria-label="Close"></button>
            </span>
        </li>
    )

}

export default HeroesListItem;

