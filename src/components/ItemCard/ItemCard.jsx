import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = Boolean(currentUser);

  // The likes array holds the ids of users who liked this item.
  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  const handleClick = () => {
    onCardClick(item);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    onCardLike({ id: item._id, isLiked });
  };

  const itemLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;

  return (
    <li className="card">
      <p className="card__name">{item.name}</p>
      {isLoggedIn && (
        <button
          type="button"
          className={itemLikeButtonClassName}
          onClick={handleLike}
          aria-label={isLiked ? "Unlike this item" : "Like this item"}
        >
          &#9829;
        </button>
      )}
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={handleClick}
      />
    </li>
  );
}

export default ItemCard;
