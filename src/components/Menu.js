import { useEffect, useState } from "react";
import Gelato from "./Gelato";
import axios from "axios";


const url = "https://react--course-api.herokuapp.com/api/v1/data/gelateria";

const Menu = () => {
  //load state
  const [isLoading, setIsLoading] = useState(true);
  // error state
  const [isError, setIsError] = useState(false);
  // All prodotti
  const [prodotti,setProdotti] = useState();
  //Selector
  const [selected,setSelected] = useState(0);
  //filtraggio
  const [filterProd, setFilterProd] = useState()
  //Cat di Prod
  const[categorie, setCategorie] = useState([]);


  const filtraProdotti = (categoria, index) =>{
    setSelected(index)
    
    if(categoria === 'all'){
      setFilterProd(prodotti)
    } else{
      const prodFiltered= prodotti.filter( (el) => el.categoria === categoria ? el : '');
      setFilterProd(prodFiltered);
    }
  }

  useEffect(() => {
    (async() =>{
      setIsLoading(true);
      setIsError(false);
      try {
        const res = await axios.get(url)
        setProdotti(res.data.data);
        setFilterProd(res.data.data);

        const nuoveCategorie = Array.from(new Set(res.data.data.map( (el) => el.categoria)));

         nuoveCategorie.unshift('all');
         setCategorie(nuoveCategorie);

         setIsLoading(false);
        
      } catch (error) {
        console.log (error)
        setIsLoading(false);
        setIsError(true);
      }
    })()
  },[])

  return(
    <div className="container">
      <h4 style={{textAlign: 'center', textTransform:'uppercase'}}>
        I nostri Gelati
      </h4>
      {
        !isLoading && !isError ? (
      
        <>
        <div className='lista-categoria'>
        {
        categorie.map((categoria, index) => (
          <button 
            onClick={( ) => filtraProdotti(categoria, index)}
            key={index} 
            className={`btn btn-selector ${(index === selected && 'active')}`}>
              {categoria}
            </button>
          )
        )
      }
      </div>
      <hr/>
      <div className='vetrina'>
        {
          filterProd.map((el) => (<Gelato key={el.id} {...el}/>
        ))}
        </div>
      </>
        ) : !isLoading && isError ?( <h4 
        style={{
          position: "absolute", 
          top: '50%', 
          left: '50%', 
          trasform: 'traslate(-50%,-50%)'
        }}> 
        Errore 
        </h4>) : (
         <h4 style={{
          position: "absolute", 
          top: '50%', 
          left: '50%', 
          trasform: 'traslate(-50%,-50%'
        }}> 
        loading 
        </h4> 
      )
    }  
    </div>
  )
};

export default Menu;