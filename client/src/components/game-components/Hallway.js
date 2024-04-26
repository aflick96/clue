import PlayerToken from './PlayerToken';

const PlayerMarker = ({ character, markerPosition, className, isCurrentPlayer }) => {
	// Default setup for top marer display
	let top = '0%';
	let flexDirection = 'column';
	let alignItems = 'center';
	let justifyContent = '';

	if (markerPosition === 'left') {
		top = '';
		flexDirection = 'row';
		justifyContent = 'flex-start';
	} else if (markerPosition === 'right') {
		top = '';
		flexDirection = 'row-reverse';
	} else if (markerPosition === 'bottom') {
		top = '61%';
		flexDirection = 'column-reverse';
	}

	return (
		<div className='character-marker' style={{
				top: top,
				flexDirection: flexDirection,
				alignItems: alignItems,
				justifyContent: justifyContent}}>
			<p style={{ margin: "1px", padding: "2px" }}>{character.character}</p>
			<PlayerToken {...character} className={className} isCurrentPlayer={isCurrentPlayer} out={true}/>
			{
				markerPosition === 'left' ?
				<span>&rarr;</span> :
				markerPosition === 'right' ?
				<span>&larr;</span> :
				markerPosition === 'bottom' ?
				<span>&uarr;</span> :
				<span>&darr;</span>
			}
		</div>
	);
}

const Hallway = ({ occupiedBy, aboveHallway, markerPosition, className, localPlayerName }) => {
    return (
            <div className={`hallway ${occupiedBy ? 'occupied' : ''} ${className}`}>
                {occupiedBy &&
                    <PlayerToken {...occupiedBy} className={className} isCurrentPlayer={(occupiedBy.name === localPlayerName)}/>
                }
				{aboveHallway &&
					<PlayerMarker character={aboveHallway} markerPosition={markerPosition} className={className} isCurrentPlayer={(aboveHallway.name === localPlayerName)}/>
				}
            </div>
    );
};

export default Hallway;
