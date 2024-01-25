import './GameSheet.css';

const GameSheet = () => {
    return(
        <div className="gamesheet">
            <p className='label'>Game Sheet</p>
            <div className="suspects">
                <p className='label-lvl-1'>Suspects</p>
                <div className='checklist'>
                    <label className="list-items" for="scarlet">Miss Scarlet</label>
                    <input type="checkbox" id="scarlet" name="scarlet"></input>
                </div>
                <div className='checklist'>
                    <label className="list-items" for="mustard">Colonel Mustard</label>
                    <input type="checkbox" id="mustard" name="mustard"></input>
                </div>
                <div className='checklist'>
                    <label className="list-items" for="green">Mr. Green</label>
                    <input type="checkbox" id="green" name="green"></input>
                </div>
                <div className='checklist'>
                    <label className="list-items" for="white">Mrs. White</label>
                    <input type="checkbox" id="white" name="white"></input>
                </div>
                <div className='checklist'>
                    <label className="list-items" for="peacock">Mrs. Peacock</label>
                    <input type="checkbox" id="peacock" name="peacock"></input>
                </div>
                <div className='checklist'>
                    <label className="list-items" for="plum">Professor Plum</label>
                    <input type="checkbox" id="plum" name="plum"></input>
                </div>                
            </div>
            <div className="weapons">
                <p className='label-lvl-1'>Weapons</p>
                <div className='checklist'>
                    <label className="list-items" for="candlestick">Candlestick</label>
                    <input type="checkbox" id="candlestick" name="candlestick"></input>
                </div>
                    
                <div className='checklist'>
                    <label className="list-items" for="dagger">Dagger</label>
                    <input type="checkbox" id="dagger" name="dagger"></input>
                </div>

                <div className='checklist'>
                    <label className="list-items" for="leadpipe">Lead Pipe</label>
                    <input type="checkbox" id="leadpipe" name="leadpipe"></input>
                </div>

                <div className='checklist'>
                    <label className="list-items" for="revolver">Revolver</label>
                    <input type="checkbox" id="revolver" name="revolver"></input>
                </div>

                <div className='checklist'>
                    <label className="list-items" for="rope">Rope</label>
                    <input type="checkbox" id="rope" name="rope"></input>
                </div>

                <div className='checklist'>
                    <label className="list-items" for="wrench">Wrench</label>
                    <input type="checkbox" id="wrench" name="wrench"></input>
                </div>
            </div>
            <div className="rooms">
                <p className='label-lvl-1'>Rooms</p>
                <div className='checklist'>
                    <label className="list-items" for="ballroom">Ballroom</label>
                    <input type="checkbox" id="ballroom" name="ballroom"></input>
                </div>

                <div className='checklist'>
                    <label className="list-items" for="billiardroom">Billiard Room</label>
                    <input type="checkbox" id="billiardroom" name="billiardroom"></input>
                </div>

                <div className='checklist'>
                    <label className="list-items" for="conservatory">Conservatory</label>
                    <input type="checkbox" id="conservatory" name="conservatory"></input>
                </div>
                
                <div className='checklist'>
                    <label className="list-items" for="diningroom">Dining Room</label>
                    <input type="checkbox" id="diningroom" name="diningroom"></input>
                </div>

                <div className='checklist'>
                    <label className="list-items" for="hall">Hall</label>
                    <input type="checkbox" id="hall" name="hall"></input>
                </div>

                <div className='checklist'>
                    <label className="list-items" for="kitchen">Kitchen</label>
                    <input type="checkbox" id="kitchen" name="kitchen"></input>
                </div>

                <div className='checklist'>
                    <label className="list-items" for="library">Library</label>
                    <input type="checkbox" id="library" name="library"></input>
                </div>

                <div className='checklist'>
                    <label className="list-items" for="lounge">Lounge</label>
                    <input type="checkbox" id="lounge" name="lounge"></input>
                </div>

                <div className='checklist'>
                    <label className="list-items" for="study">Study</label>
                    <input type="checkbox" id="study" name="study"></input>
                </div>
            </div>
        </div>
    );
};

export default GameSheet;