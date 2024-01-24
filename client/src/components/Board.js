import Room from './Room';
import Hallway from './Hallway';
import './Board.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Board = ({ players }) => {

    //TODO: this is unnecessary, just use the players array
    const roomPositions = {
        study: players.filter(p => p.position === 'study'),
        hall: players.filter(p => p.position === 'hall'),
        lounge: players.filter(p => p.position === 'lounge'),
        library: players.filter(p => p.position === 'library'),
        billiard: players.filter(p => p.position === 'billiard Room'),
        dining: players.filter(p => p.position === 'dining'),
        conservatory: players.filter(p => p.position === 'conservatory'),
        ballroom: players.filter(p => p.position === 'ballroom'),
        kitchen: players.filter(p => p.position === 'kitchen')
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
        <div className='board-container'>
            <div className="board">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Study" players={roomPositions.study}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="horizontal-hallway" occupiedBy={hallwayPositions['hallway-study-hall']}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Hall" players={roomPositions.hall}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="horizontal-hallway" occupiedBy={hallwayPositions['hallway-hall-lounge']}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Lounge" players={roomPositions.lounge}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid className='tile'item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="vertical-hallway" occupiedBy={hallwayPositions['hallway-study-library']}/>
                        </Grid>
                        
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}/>
                        
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="vertical-hallway" occupiedBy={hallwayPositions['hallway-hall-billiard']}/>
                        </Grid>

                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}/>

                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="vertical-hallway" occupiedBy={hallwayPositions['hallway-lounge-dining']}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Library" players={roomPositions.library}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="horizontal-hallway" occupiedBy={hallwayPositions['hallway-library-billiard']}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Billiard Room" players={roomPositions.billiard}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="horizontal-hallway" occupiedBy={hallwayPositions['hallway-billiard-dining']}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Dining Room" players={roomPositions.dining}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="vertical-hallway" occupiedBy={hallwayPositions['hallway-library-conservatory']}/>
                        </Grid>

                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}/>
                        
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="vertical-hallway" occupiedBy={hallwayPositions['hallway-billiard-ballroom']}/>
                        </Grid>

                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}/>
                        
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="vertical-hallway" occupiedBy={hallwayPositions['hallway-dining-kitchen']}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Conservatory" players={roomPositions.conservatory}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                        <Hallway className="horizontal-hallway" occupiedBy={hallwayPositions['hallway-conservatory-ballroom']}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Ballroom" players={roomPositions.ballroom}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="horizontal-hallway" occupiedBy={hallwayPositions['hallway-ballroom-kitchen']}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Kitchen" players={roomPositions.kitchen}/>
                        </Grid>
                    </Grid>
                </Box>

            </div>
        </div>
    );
};


export default Board;