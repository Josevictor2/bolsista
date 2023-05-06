import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config";
import { useEffect, useState } from "react";


const PontoBolsista = () => {

    // create type to ponto in which you can add the date and time of the punch
    type ponto = {
        date: string;
        time: string;

    }

    // create a state to store the punch
    const [ponto, setPonto] = useState<ponto[]>([]);
    // create a function to add the punch to the state
    
    const addPonto = () => {
        const newPonto = [...ponto];
        const date = new Date();
        const time = date.toLocaleTimeString();
        const day = date.toLocaleDateString();
        newPonto.push({ date: day, time: time });
        setPonto(newPonto);
        console.log(ponto)
    }


    // create a function to remove the punch from the state
    const removePonto = (index: number) => {
        const newPonto = [...ponto];
        newPonto.splice(index, 1);
        setPonto(newPonto);
    }

    // create a function to punch
    const punch = () => {
        addPonto();
    }

    const [token,setToken] = useState<string>("");
    

    const getTokenFromLocalStorage = () => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
        }
        console.log(token)
    }
    useEffect(() => {
        getTokenFromLocalStorage();
    }, []);

    // add it to firebase 
    const addPontoToFirebase = () => {
        const userDocRef = doc(db, 'ponto', token);
        setDoc(userDocRef, {
            ponto: ponto,

        }, { merge: true });        
    }


    const batePonto = () => {
        addPonto();
        addPontoToFirebase();
    }
    return (
        <>
            <div className="bg-gray-800 w-screen h-screen grid place-content-center">
                <button onClick={batePonto} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Bate ponto</button>
            </div>
        </>
    )
}

export default PontoBolsista;