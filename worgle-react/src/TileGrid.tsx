import TileRow from "./TileRow";

let numberOfRows: number = 6;

export default function TileGrid() {
    return (
        <div className="tile-grid">
            {Array.from({ length: numberOfRows }).map((_, index) => (
                <TileRow key={index} />
            ))}
        </div>
    );
}