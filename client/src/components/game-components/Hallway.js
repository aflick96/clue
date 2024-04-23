import PlayerToken from './PlayerToken';

const PlayerMarker = ({ characterName, markerPosition }) => {
	// Default setup for top marer display
	let top = '0%';
	let flexDirection = 'column';
	let alignItems = 'center';
	let justifyContent = '';

	if (markerPosition === 'left') {
		top = '';
		flexDirection = 'row';
		alignItems = '';
		justifyContent = 'flex-start';
	} else if (markerPosition === 'right') {
		top = '';
		flexDirection = 'row-reverse';
		alignItems = '';
	} else if (markerPosition === 'bottom') {
		top = '75%';
		flexDirection = 'column-reverse';
	}

	return (
		<div className='character-marker' style={{
				top: top,
				flexDirection: flexDirection,
				alignItems: alignItems,
				justifyContent: justifyContent}}>
			{characterName}
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
					<PlayerMarker characterName={aboveHallway.character} markerPosition={markerPosition} />
				}
            </div>
    );
};

export default Hallway;
