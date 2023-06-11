import './App.css';
import Instrucciones from '../instrucciones';
import Palabra from '../palabra';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css'
import { useEffect, useRef, useState } from 'react';
import {
  QuestionCircleOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { Switch } from 'antd';
import localService from "../../services/localServices";
import { useTimer } from 'react-timer-hook';

import { Button, Modal } from 'antd';
import Estadisticas from '../estadisiticas';

function App() {

  const [totalAttempts, setTotalAttemps] = useState(5)
  const [attempts, setAttemps] = useState(0)
  const [wordPressed, setWordPressed] = useState([])
  const [wordSelected, setWordSelected] = useState("")
  const [letterPressed, setLetterPressed] = useState("")
  const [loading, setLoading] = useState(true);

  const [isfinish, setIsFinish] = useState(false)
  const [localStore, setLocalStore] = useState({ isFirst: true, victory: 0, played: 0 })

  const [openInstruction, setOpenInstruction] = useState(false);
  const [openEstadisticas, setOpenEstadisticas] = useState(false);


  const {
    seconds,
    minutes, start, restart
  } = useTimer({
    expiryTimestamp: "", onExpire: () => {
      isWin(false)
    }
  })

  const keyboard = useRef();

  useEffect(() => {
    localService.getWords().then((res) => res.text())
      .then((text) => {
        localService.setWords(text);
        setLoading(false);
        init()
      })
      .catch((e) => console.error(e));
  }, [])

  function init() {
    setWordPressed(Array(totalAttempts).fill(""));
    changeMode(true)
    restart(setTimeTimer())
    let s = localService.getLocal("wordle");
    if (s) {
      setLocalStore(s);
      setOpenInstruction(false)
      setWordSelected(localService.getRandomWord())
    } else {
      setWordSelected(localService.getFirstWord())
      localService.setLocal("wordle", { isFirst: false, victory: 0, played: 1 })
      setOpenInstruction(true)
    }
  }
  function setTimeTimer() {
    let time = new Date();
    time.setSeconds(time.getSeconds() + 300);
    return time;
  }
  function restartAll() {
    if (isfinish) {
      setAttemps(0)
      restart(setTimeTimer())
      let a=localService.getRandomWord()
      setWordSelected(a)
      setWordPressed(Array(totalAttempts).fill(""));
    }
    setIsFinish(false)

  }
  function isWin(isWins) {

    setLocalStore(prevState => {
      let newObject = Object.assign({}, prevState)
      //la sumo con lo que acabaron de poner
      newObject.played += 1;
      if (isWins) {
        newObject.victory += 1;
      }
      setIsFinish(true)
      setOpenEstadisticas(true)
      localService.setLocal("wordle", newObject)
      return newObject;
    })
    //volver a iniciar

  }
  function keyboardKeyPress(input) {
    if (input) {
      setLetterPressed(input)
      //luego vuelvo a setear el wordPressed
      setWordPressed(prevState => {
        let newObject = Object.assign([], prevState)
        //la sumo con lo que acabaron de poner
        newObject[attempts] += input;
        //verifico si ya se cumplió el tamaño y si es igual
        if (newObject[attempts] == wordSelected) {
          isWin(true);
        }
        //ahora miro si es el mismo tamaño :D
        if (newObject[attempts].length == wordSelected.length) {
          if (attempts + 1 > totalAttempts) {
            isWin(false)
          } else {
            setAttemps(attempts + 1)
          }
          keyboard.current.clearInput()
        }
        //luego vuelvo a setear el wordPressed
        return newObject;
      })
    }

  }

  function changeMode(checked) {
    if (checked) {
      document.querySelector("body").classList.add("black")
      document.querySelector("body").classList.remove("white")
    } else {
      document.querySelector("body").classList.remove("black")
      document.querySelector("body").classList.add("white")
    }
  }

  return (
    <>
      <main className={"row align-items-center justify-content-center m-0 " + (loading ? "d-none" : "")} >
        <div className="col-md-12">
          <div className="row mx-0 justify-content-center mt-md-3">
            <h1 className='text-center d-flex col-md-7 col-11 mx-0 justify-content-center align-items-center title-wordle rounded'>
              <QuestionCircleOutlined onClick={() => { setOpenInstruction(true) }} className='col-1 p-0' />
              <b className='px-2 col-6'>WORDLE</b>
              <Switch defaultChecked onChange={changeMode} className='col-1 p-0' />
              <BarChartOutlined className='col-1 p-0' onClick={() => { setOpenEstadisticas(true) }} />
            </h1>
          </div>
        </div>
        <div className='col-md-6 col-11 p-md-3 p-1'>
          <div className="row mx-0 justify-content-center">
            {wordPressed.map((value, i) => {
              return (
                <div className='col-12 p-md-2 p-1' key={i + "p"}>
                  <Palabra wordSelected={wordSelected} keyPressed={letterPressed} wordBuilder={value}></Palabra>
                </div>
              )
            })}
          </div>
        </div>
        <div className='col-md-6 col-12 p-md-3 p-1'>
          <div className="row mx-0 justify-content-center">
            <Keyboard onKeyPress={keyboardKeyPress} keyboardRef={r => (keyboard.current = r)}></Keyboard>
          </div>
        </div>
        <Modal
          open={openInstruction}
          title=""
          footer={[<div className="row mx-0 justify-content-center">
            <button
              className="col-md-6 p-md-2 text-center btn-wordle" onClick={() => { setOpenInstruction(false) }}>! JUGAR ¡</button>
          </div>]}>
          <Instrucciones></Instrucciones>
        </Modal>
        <Modal
          open={openEstadisticas}
          title=""
          footer={[<div className="row mx-0 justify-content-center">
            <button
              className="col-md-6 p-md-2 text-center btn-wordle" onClick={() => { setOpenEstadisticas(false); restartAll() }}>Aceptar</button>
          </div>]}>
          <Estadisticas tiempo={minutes + ":" + seconds}
            jugadas={localStore.played}
            victorias={localStore.victory}
            win={isfinish}
            wordSelected={wordSelected}
          ></Estadisticas>
        </Modal>
      </main>
      <main className={"row align-items-center justify-content-center m-0 " + (!loading ? "d-none" : "")} >
        <div className="col-md-4 col-6 p-0">
          <img src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif" className='w-100 img-fluid' />
        </div>
      </main>
    </>
  );
}

export default App;
