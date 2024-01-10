interface CardProps {
  text: string;
  icon: React.ReactNode | React.ReactNode[];
  highlight?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  text,
  icon,
  highlight = false,
  onClick,
}) => {
  return (
    <div onClick={onClick} className="card-container">
      <div className="card-icon">{icon}</div>
      <span className="card-text">{text}</span>
    </div>
  );
};

export default Card;
