import "./index.css"

export default function Estadisticas({ tiempo, jugadas, victorias,win,wordSelected }) {
    return (
        <div className="row mx-0 justify-content-center estadisiticas">
            <h1 className="col-md-8 p-0 text-center">Estadísticas</h1>
            <div className="col-md-10 col-11 p-0">
                <div className="row mx-0">
                    <div className="col-md-6 p-0 text-center">
                        <b>{jugadas}</b>
                        <p className="m-0 p-2">Jugadas</p>
                    </div>
                    <div className="col-md-6 p-0 text-center">
                        <b>{victorias}</b>
                        <p className="m-0 p-2">Victorias</p>
                    </div>
                </div>

                <div className={"row mx-0 "+(win?"d-none":"d-flex")}>
                    <p className="m-0 p-2 text-center">La palabra era</p>
                    <p className="text-center "><b >{wordSelected}</b></p>
                </div>

                <p className="m-0 p-2 text-center">SIGUIENTE PALABRA</p>
                <p className="text-center "><b >{tiempo}</b></p>
            </div>
        </div>
    )
}