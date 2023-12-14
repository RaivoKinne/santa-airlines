<?php

include "Airport.php";
include "Aircraft.php";
include "Flight.php";

$origin = new Airport("RIX", 56.924, 23.971);
$destination = new Airport("SFO", 37.7749, -122.4194);

$departureTime = new DateTime('2023-12-14 12:00:00', new DateTimeZone('UTC'));

$aircraft = new Aircraft("Airbus", "A220-300", 120, 850);

$flight = new Flight("SA503", $origin, $destination, $departureTime, $aircraft);

echo "Flight Code: " . $flight->getFlightCode() . "\n";
echo "Aircraft: " . $flight->getAircraft()->getManufacturer() . " " . $flight->getAircraft()->getModel() . "\n";
echo "Seating Capacity: " . $flight->getAircraft()->getSeatingCapacity() . "\n";
echo "Distance: " . $flight->getDistance() . " km\n";
echo "Duration: " . $flight->getDuration() . " minutes\n";
echo "Landing Time: " . $flight->getLandingTime()->format('Y-m-d H:i:s') . "\n";
