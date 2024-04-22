import PlayerToken from './PlayerToken';

const PlayerMarker = ({ characterName, className }) => {
	let render = undefined;

    if(className === 'horizontal-hallway') {
        render = 1;
    } else if (className === 'vertical-hallway') {
        render = 2;
    }

	return (
		<>
			{render &&
			<div className='character-marker' style={{
					top: render === 1 ? "0%" : "",
					flexDirection: render === 1 ? "column" : "row",
					alignItems: render === 1 ? "center" : "",
					justifyContent: render === 1 ? "" : "left"}}>
				{characterName}
				{
					render === 1 ?
					<span>&darr;</span> :
					<span>&rarr;</span>
				}
			</div>}
		</>
	);
}

const Hallway = ({ occupiedBy, className, localPlayerName }) => {
    return (
        <>
            {occupiedBy &&
                <PlayerMarker characterName={occupiedBy.character} className={className}/>
            }
            <div className={`hallway ${occupiedBy ? 'occupied' : ''} ${className}`}>
                {occupiedBy &&
                    <PlayerToken {...occupiedBy} className={className} isCurrentPlayer={(occupiedBy.name === localPlayerName)}/>
                }
            </div>
        </>
    );
};

export default Hallway;
