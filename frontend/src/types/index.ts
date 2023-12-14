export interface Seat {
  seatLetter: string;
  reserved: boolean;
}

export interface SeatRow {
  rowNumber: number;
  seats: Seat[];
}

export interface Flight {
  flightNumber: string;
  origin: string;
  destination: string;
  departureDateTime: string;
  arrivalDateTime: string;
  flightDuration: string;
  aircraft: string;
  seatCount: string;
  seats: SeatRow[];
}
