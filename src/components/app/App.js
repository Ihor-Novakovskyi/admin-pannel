import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';
import './app.scss';
import { useState, useMemo } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Button = (props) => { 
    const dispatch = useDispatch();
    console.log('button render')
    const [stateB, setBstate] = useState('');
   
    // useEffect(() => { 
    //     document.querySelector('.button').addEventListener('click', () => { 
    //         console.log('button click')
    //         dispatch({type: 'CHANGE-STATE', payload: 1})
    //         // props.state(1)
    //         // props.state2({name: 'Igor'})
    //         // setBstate({ name: 'Igor' });
    //     })
    // }, [])
    useEffect(() => { 
        document.querySelector('.button').addEventListener('click', () => { 
            console.log('button clickkkkk')
            dispatch({type: 'CHANGE-STATE', payload: 1})
            // props.state(2)
            
            // setBstate({ name: 'Igor' });
        })
    },[])
    return (
        <button
            className='button'
            // onClick={ () => { 
            //     setBstate({});
            //     console.log('button click');
            // dispatch({type: 'CHANGE-STATE', payload: 1})
            // } }
        >
            Click
        </button>
    )
}
const duration = 1000;
const Container1 = ({ initOpacity1, state, }) => { 
    const initOpacity = useSelector(state => state.opacity)
    const dispatch = useDispatch();
    console.log('container1')
    // useEffect(() => { 
    //     document.querySelector('.container1').addEventListener('transitionend', () => { 
    //         console.log('container 1 transitioned')
    //         dispatch({type: 'CHANGE-STATE', payload: 1})
    //         // state(1);
    //     })
    // },[])
    return (
        <div
            className='container1'
            style={
            {
                backgroundColor: 'red',
                width: '50px',
                height: '50px',
                opacity: initOpacity ? 1 : 0,
                transition: `opacity ${duration}ms ease-in-out`
            }
        }
            onTransitionEnd={ () => { 
                console.log('container 1 transitioned')
                dispatch({type: 'CHANGE-STATE', payload: 0})
                // state(1);
            } }
        ></div>
   )
}
const Container2 = ({ initOpacity1, state }) => { 
    const initOpacity = useSelector(state => state.opacity);
    const dispatch = useDispatch();
    console.log('container2')
    // useEffect(() => { 
    //     document.querySelector('.container2').addEventListener('transitionend', () => {
    //         console.log('container 2 transitioned')
    //         dispatch({ type: 'CHANGE-STATE', payload: 1 })
            
    //         // state(2);
    //     })
    // },[])
    return (
        <div
            className='container2'
            style={
            {
                backgroundColor: 'blue',
                width: '50px',
                height: '50px',
                opacity: initOpacity ? 1 : 0,
                transition: `opacity ${duration}ms ease-in-out`
            }
        }
            onTransitionEnd={ () => { 
                console.log('container 2 transitioned')
                dispatch({ type: 'CHANGE-STATE', payload: 1 })
                dispatch({ type: 'CHANGE-STATE', payload: 0 })
                // state(1);
            } }
        ></div>
   )
}
const App = () => {
    const stateStore = useSelector(state => state);
    const dispatch = useDispatch();
    console.log(stateStore)
    console.log('wrapper render')
    const [state, setState] = useState(0);
    const [opas, setOpas] = useState(true)
    const [obj, setObj] = useState({})
    // useEffect(() => { 
    //     document.querySelector('.wrapper').addEventListener('click', () => { 
    //         console.log('wrapper click')
    //         setState({ name: 'Igor' })
    //     })
    // },[])
    return (
        <main className="app">
            <div className="content">
                <HeroesList/>
                <div className="content__interactive">
                    <HeroesAddForm/>
                    <HeroesFilters/>
                </div>
            </div>
        </main>
    )
    // useMemo(() => window.addEventListener('click', () => { 
    //     console.log('listener addin i wrapper')
    //     setState({name: 1})
    // }), [])
    const d = (
        <div    
            className='wrapper'
            // onClick={ () => { 
            //     console.log('wrapper click')
            //     // setState({ name: 'Igor' })
            //     dispatch({type: 'CHANGE-STATE', payload: 1})
            // } }
        >
            {/* { obj.name ? null : <Button state={ setOpas } state2={setObj} /> } */}
            {/* <Button state={setOpas} state2={setObj}/> */}
            {/* {state === 0 ? <Container1 initOpacity={opas} state={setState} />: null}
            {state === 0 ? <Container2 initOpacity={opas} state={setState}/> : null}
            <button onClick={() => setOpas(false)}>Click</button> */}
            {/* <Button state={setOpas} state2={setObj}/>  */ }
            
            {stateStore.state === 0 ? <Container1  />: null}
            {stateStore.state === 0 ? <Container2 /> : null}
            <button onClick={ () => { dispatch({type:'CHANGE-OPACITY', payload: 0})} }>Click</button>
        </div>
    )
}

export default App;