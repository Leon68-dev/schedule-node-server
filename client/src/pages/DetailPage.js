import React from 'react' 

export const DetailPage = () =>{
    return (
        <div>
            <h1>Добро пожаловать!</h1>

            <div id="MeteoInformerWrapOuther">
                <div id="MeteoInformerWrap">
                    <script type="text/javascript" src="https://meteo.ua/var/informers.js"></script>
                    <script type="text/javascript">
                        makeMeteoInformer("https://meteo.ua/informer/get.php?cities=111&w=265&lang=ru&rnd=1&or=vert&clr=0&dt=today&style=classic",265,162);
                    </script>
                </div>
                <a href="https://meteo.ua/111/odessa" target="_blank">Meteo.ua</a>
            </div>

        </div>
    );
}