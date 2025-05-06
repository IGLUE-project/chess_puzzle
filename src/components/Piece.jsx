import "../assets/scss/Piece.scss";

export default function Piece({ piece, handleDragStart, handleDragEnd, theme }) {
  const img = piece.blanca ? piece.name : `${piece.name}_negro`;

  return (
    <div className={`Piece ${piece.class}`}>
      <img
        draggable
        onDragStart={(e) => handleDragStart(e, piece)}
        onDragEnd={(e) => handleDragEnd(e, piece)}
        src={`/src/assets/images/${img}_${theme.name}.png`}
        alt={piece.name}
      />
    </div>
  );
}
