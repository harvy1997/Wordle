import "./index.css"
export default function Instrucciones(){
    return (
        <div className="row mx-0 justify-content-center instrucciones">
            <h1 className="col-md-8 p-0 text-center">Cómo jugar</h1>
            <div className="col-md-10 col-11 p-0">
                <p className="m-0 p-2">Adivina la palabra oculta en en cinco intentos</p>
                <p className="m-0 p-2">Cada intento debe ser una palabra válida de 5 letras</p>
                <p className="m-0 p-2">Después de cada intento el color de las letras cambia para mostrar qué tan cerca estás de acertar la palabra</p>

                <b>Ejemplos</b>
                <br />
                <br />
            </div>
            <div className="col-md-10 col-11 p-0">
                <div className="row mx-0 p-0 grid-wordle">
                    <div className="col-md col box p-md-2 p-1 correct">G</div>
                    <div className="col-md col box p-md-2 p-1">A</div>
                    <div className="col-md col box p-md-2 p-1">T</div>
                    <div className="col-md col box p-md-2 p-1">O</div>
                    <div className="col-md col box p-md-2 p-1">S</div>
                </div>
                <p className="m-0 p-2">La letra <b>G</b> está en la palabra y en la posición correcta</p>
                <div className="row mx-0 p-0 grid-wordle">
                    <div className="col-md col box p-md-2 p-1">V</div>
                    <div className="col-md col box p-md-2 p-1">O</div>
                    <div className="col-md col box p-md-2 p-1 close">C</div>
                    <div className="col-md col box p-md-2 p-1">A</div>
                    <div className="col-md col box p-md-2 p-1">L</div>
                </div>
                <p className="m-0 p-2">La letra <b>C</b> está en la palabra  pero en la posición incorrecta</p>
                <div className="row mx-0 p-0 grid-wordle">
                    <div className="col-md col box p-md-2 p-1">C</div>
                    <div className="col-md col box p-md-2 p-1">A</div>
                    <div className="col-md col box p-md-2 p-1">N</div>
                    <div className="col-md col box p-md-2 p-1">T</div>
                    <div className="col-md col box p-md-2 p-1 wrong">O</div>
                </div>
                <p className="m-0 p-2">La letra <b>O</b> no está en la palabra</p>
            </div>
            <div className="col-md-10 col-11 p-0">
                <p className="m-0 p-2">Puede haber letras repetida. Las pistas son independientes para cada letra</p>
                <p className="m-0 p-2 text-center">!Una palabra nueva cada 5 minutos¡</p>
            </div>
        </div>
    ) 
}