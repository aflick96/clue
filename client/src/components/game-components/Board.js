import Room from './Room';
import Hallway from './Hallway';
import './Board.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Board = ({ players, localPlayerName }) => {

    //TODO: this is unnecessary, just use the players array
    const roomPositions = {
        study: players.filter(p => p.position === 'Study'),
        hall: players.filter(p => p.position === 'Hall'),
        lounge: players.filter(p => p.position === 'Lounge'),
        library: players.filter(p => p.position === 'Library'),
        billiard: players.filter(p => p.position === 'Billiard Room'),
        dining: players.filter(p => p.position === 'Dining Room'),
        conservatory: players.filter(p => p.position === 'Conservatory'),
        ballroom: players.filter(p => p.position === 'Ballroom'),
        kitchen: players.filter(p => p.position === 'Kitchen')
    };

    const hallwayPositions = {
        'hallway-study-hall': players.find(p => p.position === 'hallway-study-hall'),
        'hallway-hall-lounge': players.find(p => p.position === 'hallway-hall-lounge'),
        'hallway-study-library': players.find(p => p.position === 'hallway-study-library'),
        'hallway-hall-billiard': players.find(p => p.position === 'hallway-hall-billiard'),
        'hallway-lounge-dining': players.find(p => p.position === 'hallway-lounge-dining'),
        'hallway-library-billiard': players.find(p => p.position === 'hallway-library-billiard'),
        'hallway-billiard-dining': players.find(p => p.position === 'hallway-billiard-dining'),
        'hallway-library-conservatory': players.find(p => p.position === 'hallway-library-conservatory'),
        'hallway-billiard-ballroom': players.find(p => p.position === 'hallway-billiard-ballroom'),
        'hallway-dining-kitchen': players.find(p => p.position === 'hallway-dining-kitchen'),
        'hallway-conservatory-ballroom': players.find(p => p.position === 'hallway-conservatory-ballroom'),
        'hallway-ballroom-kitchen': players.find(p => p.position === 'hallway-ballroom-kitchen'),
    };
    //

    const distribution = 12/5;

    return(
            <div className='board'>
                <Box>
                    <Grid container spacing={1}>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Study" players={roomPositions.study} corner={true} localPlayerName={localPlayerName}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="horizontal-hallway" occupiedBy={hallwayPositions['hallway-study-hall']} localPlayerName={localPlayerName}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Hall" players={roomPositions.hall} localPlayerName={localPlayerName}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="horizontal-hallway" occupiedBy={hallwayPositions['hallway-hall-lounge']} localPlayerName={localPlayerName}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Lounge" players={roomPositions.lounge} corner={true} localPlayerName={localPlayerName}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid className='tile'item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="vertical-hallway" occupiedBy={hallwayPositions['hallway-study-library']} localPlayerName={localPlayerName}/>
                        </Grid>
                        
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}/>
                        
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="vertical-hallway" occupiedBy={hallwayPositions['hallway-hall-billiard']} localPlayerName={localPlayerName}/>
                        </Grid>

                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}/>

                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="vertical-hallway" occupiedBy={hallwayPositions['hallway-lounge-dining']} localPlayerName={localPlayerName}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Library" players={roomPositions.library} localPlayerName={localPlayerName}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="horizontal-hallway" occupiedBy={hallwayPositions['hallway-library-billiard']} localPlayerName={localPlayerName}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Billiard Room" players={roomPositions.billiard} localPlayerName={localPlayerName}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="horizontal-hallway" occupiedBy={hallwayPositions['hallway-billiard-dining']} localPlayerName={localPlayerName}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Dining Room" players={roomPositions.dining} localPlayerName={localPlayerName}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="vertical-hallway" occupiedBy={hallwayPositions['hallway-library-conservatory']} localPlayerName={localPlayerName}/>
                        </Grid>

                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}/>
                        
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="vertical-hallway" occupiedBy={hallwayPositions['hallway-billiard-ballroom']} localPlayerName={localPlayerName}/>
                        </Grid>

                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}/>
                        
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="vertical-hallway" occupiedBy={hallwayPositions['hallway-dining-kitchen']} localPlayerName={localPlayerName}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Conservatory" players={roomPositions.conservatory} corner={true} localPlayerName={localPlayerName}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                        <Hallway className="horizontal-hallway" occupiedBy={hallwayPositions['hallway-conservatory-ballroom']} localPlayerName={localPlayerName}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Ballroom" players={roomPositions.ballroom} localPlayerName={localPlayerName}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="horizontal-hallway" occupiedBy={hallwayPositions['hallway-ballroom-kitchen']} localPlayerName={localPlayerName}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Kitchen" players={roomPositions.kitchen} corner={true} localPlayerName={localPlayerName}/>
                        </Grid>
                    </Grid>
                </Box>
            </div>
    );
};


export default Board;
