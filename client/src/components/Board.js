import Room from './Room';
import Hallway from './Hallway';
import './Board.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Board = ({ players }) => {

    const roomAssignments = {
        study: players.filter(p => p.startingRoom === 'Study'),
        hall: players.filter(p => p.startingRoom === 'Hall'),
        lounge: players.filter(p => p.startingRoom === 'Lounge'),
        library: players.filter(p => p.startingRoom === 'Library'),
        billiard: players.filter(p => p.startingRoom === 'Billiard Room'),
        dining: players.filter(p => p.startingRoom === 'Dining Room'),
        conservatory: players.filter(p => p.startingRoom === 'Conservatory'),
        ballroom: players.filter(p => p.startingRoom === 'Ballroom'),
        kitchen: players.filter(p => p.startingRoom === 'Kitchen')
    };

    const startingPositions = {
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

    const distribution = 12/5;

    return(
        <div className='board-container'>
            <div className="board">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Study" players={roomAssignments.study}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="horizontal-hallway" occupiedBy={startingPositions['hallway-study-hall']}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Hall" players={roomAssignments.hall}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="horizontal-hallway" occupiedBy={startingPositions['hallway-hall-lounge']}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Lounge" players={roomAssignments.lounge}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid className='tile'item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="vertical-hallway" occupiedBy={startingPositions['hallway-study-library']}/>
                        </Grid>
                        
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}/>
                        
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="vertical-hallway" occupiedBy={startingPositions['hallway-hall-billiard']}/>
                        </Grid>

                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}/>

                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="vertical-hallway" occupiedBy={startingPositions['hallway-lounge-dining']}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Library" players={roomAssignments.library}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="horizontal-hallway" occupiedBy={startingPositions['hallway-library-billiard']}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Billiard Room" players={roomAssignments.billiard}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="horizontal-hallway" occupiedBy={startingPositions['hallway-billiard-dining']}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Dining Room" players={roomAssignments.dining}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="vertical-hallway" occupiedBy={startingPositions['hallway-library-conservatory']}/>
                        </Grid>

                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}/>
                        
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="vertical-hallway" occupiedBy={startingPositions['hallway-billiard-ballroom']}/>
                        </Grid>

                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}/>
                        
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="vertical-hallway" occupiedBy={startingPositions['hallway-dining-kitchen']}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Conservatory" players={roomAssignments.conservatory}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                        <Hallway className="horizontal-hallway" occupiedBy={startingPositions['hallway-conservatory-ballroom']}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Ballroom" players={roomAssignments.ballroom}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Hallway className="horizontal-hallway" occupiedBy={startingPositions['hallway-ballroom-kitchen']}/>
                        </Grid>
                        <Grid className='tile' item xs={distribution} style={{paddingLeft: '0px'}}>
                            <Room className='room' name="Kitchen" players={roomAssignments.kitchen}/>
                        </Grid>
                    </Grid>
                </Box>

            </div>
        </div>
    );
};


export default Board;