import { useEffect } from 'react';
import './index.css';
import { useState } from 'react';


function Palabra({ wordSelected, keyPressed, wordBuilder }) {

    const [word, setWord] = useState([])
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (keyPressed && index < wordSelected.length && wordBuilder) {//por los espacios
            let w = word;
            //Si la letra existe en la palabra
            if (wordSelected.includes(keyPressed)) {
                //miro si la letra corresponde al lugar de donde tiene que estar
                if (keyPressed == w[index].letter) {
                    w[index].type = " correct";
                } else {
                    w[index].type = " close"
                }
            } else {
                w[index].type = " wrong"
            }
            w[index].input = keyPressed;
            setWord(w)
            setIndex(index + 1)
        }

    }, [wordBuilder])

    //para actualizar cada vez que la palabra cambie
    useEffect(() => {
        init()
    }, [wordSelected])
    //voy a utilizar un objeto para evaluar las acciones del usuario
    function init() {
        if (wordSelected) {
            let w = [];
            //spliteo la palabra para poder realizar un objeto
            wordSelected.split("").forEach(letter => {
                w.push({ letter: letter, input: "", type: "" });
            });
            setWord(w);
            setIndex(0)
        }
    }

    return (
        <div className="row mx-0 palabras grid-wordle">
            {word.map((value, i) => {
                return <div type="text" className={"col box " + value.type} key={i + "d"} >{value.input}</div>
            })}
        </div>
    );
}

export default Palabra;
