import './Card.css';

const Card = ({ image_name, className, onClick }) => {
    
    return(
    <div className={`card${className === undefined ? '' : ' ' + className}`} onClick={onClick}>
        <div className="image-container">
            { 
                image_name !== 'No Card Shown' ? (
                    <>
                    <img
                        src={require(`../../../public/game_images/${image_name}.jpg`)}
                        alt={image_name}
                        className="item-image"
                    />
                    <p className="item-label">{image_name}</p>
                    </>
                ) : (
                    <div className="no-card-shown">
                        {image_name}
                    </div>
                )
            }
        </div>
    </div>
    );  
};

export default Card;