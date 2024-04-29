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

	let characterName = character.character;
	if (markerPosition === 'left' || markerPosition === 'right') {
		if (characterName.length > 5) {
			characterName = characterName.substring(0, 5) + '...';
		} 
	}

	return (
		<div className='character-marker' style={{
				top: top,
				flexDirection: flexDirection,
				alignItems: alignItems,
				justifyContent: justifyContent}}>
			{/*<p style={{ margin: "1px", padding: "2px" }}>{characterName}</p>*/}
			<PlayerToken {...character} className={className} isCurrentPlayer={isCurrentPlayer} out={true}/>
			{
				markerPosition === 'left' ?
				<span>&#10230;</span> :
				markerPosition === 'right' ?
				<span>&#10229;</span> :
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
