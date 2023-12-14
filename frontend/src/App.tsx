import { useState, useEffect } from "react";
import axios from "axios";
import { Flight } from "./types";

const API_URL = "https://tu.proti.lv/flights/";

const App = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<{
    row: number;
    seatLetter: string;
  } | null>(null);
  const [reservedMessage, setReservedMessage] = useState<string | null>(null);

  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setFlights(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSeatClick = (rowNumber: number, seatLetter: string) => {
    setSelectedSeat({ row: rowNumber, seatLetter });
    setShow(true);
  };

  const handleReserveClick = () => {
    if (selectedSeat) {
      const isSeatAlreadyReserved = flights.some((flight) =>
        flight.seats.some((row) =>
          row.seats.some(
            (seat) =>
              row.rowNumber === selectedSeat.row &&
              seat.seatLetter === selectedSeat.seatLetter &&
              seat.reserved,
          ),
        ),
      );

      if (!isSeatAlreadyReserved) {
        const reservedMessage = `Thank you for your reservation: ${selectedSeat.row} ${selectedSeat.seatLetter}`;
        setReservedMessage(reservedMessage);

        setFlights((prevFlights) =>
          prevFlights.map((flight) => ({
            ...flight,
            seats: flight.seats.map((row) => ({
              ...row,
              seats: row.seats.map((seat) =>
                row.rowNumber === selectedSeat.row &&
                seat.seatLetter === selectedSeat.seatLetter
                  ? { ...seat, reserved: true }
                  : seat,
              ),
            })),
          })),
        );

        setSelectedSeat(null);
        setShow(false);
      } else {
        setReservedMessage(
          "This seat is already reserved. Please choose another seat.",
        );
      }
    }
  };
  const handleRandomSeat = () => {
    const reservedSeats = flights.flatMap((flight) =>
      flight.seats.flatMap((row) => row.seats.filter((seat) => seat.reserved)),
    );

    for (let row = 1; row <= 10; row++) {
      for (
        let seatLetter = "A";
        seatLetter <= "F";
        seatLetter = String.fromCharCode(seatLetter.charCodeAt(0) + 1)
      ) {
        const seat = { row, seatLetter };

        if (
          !reservedSeats.some(
            (reservedSeat) =>
              reservedSeat.row === row &&
              reservedSeat.seatLetter === seatLetter,
          )
        ) {
          setSelectedSeat(seat);
          setShow(true);
          return;
        }
      }
    }
  };

  return (
    <section>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-16 h-16 animate-for">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-plane text-Green"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" />
            </svg>
          </div>
        </div>
      ) : (
        <>
          <div className="grid place-items-center h-screen w-full">
            <img
              src="/santa-airlines-logo.png"
              alt="logo"
              className="absolute top-0 left-0 w-[400px]"
            />
            {selectedFlight && (
              <>
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"></div>
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 ">
                  <div className="bg-black w-[600px] h-[1000px] border-4 border-Red p-4 rounded-md">
                    <button
                      className="text-Red text-2xl font-bold absolute top-2 right-2 m-4"
                      onClick={() => setSelectedFlight(null)}
                    >
                      X
                    </button>
                    <div className="grid place-items-center">
                      <h2 className="text-7xl text-Green mt-4">
                        Seat reservation
                      </h2>
                      <button
                        className="text-2xl border-Green border-2 p-2 w-[250px] rounded-md my-4"
                        onClick={() => handleRandomSeat()}
                      >
                        Pick a random seat
                      </button>
                      {selectedFlight.seats.map((row) => (
                        <div key={row.rowNumber}>
                          <div className="flex">
                            {row.seats.map((seat) => (
                              <>
                                <p
                                  key={seat.seatLetter}
                                  className={
                                    seat.reserved
                                      ? "text-2xl bg-Red w-[60px] h-[60px] grid place-items-center"
                                      : "text-2xl bg-Green w-[60px] h-[60px] grid place-items-center"
                                  }
                                  onClick={() =>
                                    handleSeatClick(
                                      row.rowNumber,
                                      seat.seatLetter,
                                    )
                                  }
                                >
                                  {row.rowNumber} {seat.seatLetter}
                                </p>
                              </>
                            ))}
                          </div>
                        </div>
                      ))}
                      {show && selectedSeat ? (
                        <>
                          <button
                            className="border-2 border-Red w-[250px] rounded-md p-2 m-4"
                            onClick={handleReserveClick}
                          >
                            Reserve
                          </button>
                        </>
                      ) : (
                        reservedMessage && <p>{reservedMessage}</p>
                      )}{" "}
                    </div>{" "}
                  </div>
                </div>{" "}
              </>
            )}
            <h1 className="text-7xl text-Green mt-[5rem]">Flight schedule</h1>
            <div className="mb-[10rem]">
              {flights.map((flight) => (
                <article
                  className="flex justify-between w-[1500px] border-2 border-Orange rounded-md h-[170px] items-center p-4 m-[5rem] gap-2"
                  key={flight.flightNumber}
                  onClick={() => setSelectedFlight(flight)}
                >
                  <div className="w-[150px] h-[100px] text-center m-[3rem] grid place-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-plane-departure text-Orange"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M14.639 10.258l4.83 -1.294a2 2 0 1 1 1.035 3.863l-14.489 3.883l-4.45 -5.02l2.897 -.776l2.45 1.414l2.897 -.776l-3.743 -6.244l2.898 -.777l5.675 5.727z" />
                      <path d="M3 21h18" />
                    </svg>
                    <h3 className="text-4xl">{flight.origin}</h3>
                    <p>{flight.departureDateTime}</p>
                  </div>
                  <div className="grid place-items-center gap-2">
                    <p>{flight.flightDuration}</p>
                    <div className="custom-dashed-line"></div>
                  </div>
                  <div className="w-[150px] h-[100px] text-center m-[3rem] grid place-items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-plane-arrival text-Orange"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M15.157 11.81l4.83 1.295a2 2 0 1 1 -1.036 3.863l-14.489 -3.882l-1.345 -6.572l2.898 .776l1.414 2.45l2.898 .776l-.12 -7.279l2.898 .777l2.052 7.797z" />
                      <path d="M3 21h18" />
                    </svg>
                    <h3 className="text-4xl">{flight.destination}</h3>
                    <p>{flight.arrivalDateTime}</p>
                  </div>{" "}
                </article>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default App;
