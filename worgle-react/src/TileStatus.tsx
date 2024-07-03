export class TileData {
    letter: string;
    status: TileStatus;
  
    constructor(letter: string, status: TileStatus) {
      this.letter = letter;
      this.status = status;
    }
  
}

export enum TileStatus {
    DEFAULT,
    CORRECT,
    WRONG_PLACE,
    ERROR
  }