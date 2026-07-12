import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <p className="card__name">{item.name}</p>
      <img
        src={item.link}
        alt={item.name}
        className="card__image"
        onClick={handleClick}
      />
    </li>
  );
}

export default ItemCard;
