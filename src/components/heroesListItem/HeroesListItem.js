
import { deleteHeroe } from "../../actions";
import { useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { Transition } from 'react-transition-group';
import { useRef, useState, useEffect } from "react";
const duration = 1000;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}



const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
};;

const HeroesListItem = ({ id, name, description, element }) => {
    const { request } = useHttp();
    const dispatch = useDispatch();
    const ref = useRef(null);
    const [initStyle, setInitStyle] = useState(false);
    let elementClassName = '';
    useEffect(() => setInitStyle(true), [])
    const deleteHero = () => {
        setInitStyle(false)
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
    console.log(initStyle)
    return (
        <Transition nodeRef={ ref } in={ initStyle } timeout={ duration }>
            { state => {
                console.log('state', state)
                return (
                    <li
                        style={ {
                            ...defaultStyle,
                            ...transitionStyles[state]
                        } }
                        onTransitionEnd={ () => {
                            console.log('end transitioned', state)
                            if (state === 'exiting') {
                                dispatch(deleteHeroe(id));
                                request(`http://localhost:3000/heroes/${id}`, 'DELETE')
                            }
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
            } }
        </Transition>
    )

}

export default HeroesListItem;

