<?php

class Flight
{
  private $flightCode;
  private $originAirport;
  private $destinationAirport;
  private $departureTime;
  private $aircraft;

  public function __construct($flightCode, $originAirport, $destinationAirport, $departureTime, $aircraft)
  {
    $this->flightCode = $flightCode;
    $this->originAirport = $originAirport;
    $this->destinationAirport = $destinationAirport;
    $this->departureTime = $departureTime;
    $this->aircraft = $aircraft;
  }

  public function getFlightCode()
  {
    return $this->flightCode;
  }

  public function getOriginAirport()
  {
    return $this->originAirport;
  }

  public function getDestinationAirport()
  {
    return $this->destinationAirport;
  }

  public function getDepartureTime()
  {
    return $this->departureTime;
  }

  public function getAircraft()
  {
    return $this->aircraft;
  }

  public function getDistance()
  {
    $originLat = deg2rad($this->originAirport->getLatitude());
    $originLon = deg2rad($this->originAirport->getLongitude());
    $destLat = deg2rad($this->destinationAirport->getLatitude());
    $destLon = deg2rad($this->destinationAirport->getLongitude());

    $deltaLat = $destLat - $originLat;
    $deltaLon = $destLon - $originLon;

    $a = sin($deltaLat / 2) ** 2 + cos($originLat) * cos($destLat) * sin($deltaLon / 2) ** 2;
    $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

    $earthRadius = 6371;
    $distance = $earthRadius * $c;

    return $distance;
  }

  public function getDuration()
  {
    $averageSpeed = $this->aircraft->getAverageSpeed();
    $distance = $this->getDistance();
    $flightTime = $distance / $averageSpeed * 60;


    $totalDuration = $flightTime + 30 + 30;

    return $totalDuration;
  }

  public function getLandingTime()
  {
    $destinationTimeZone = new DateTimeZone('Europe/Riga');

    $arrivalTime = clone $this->departureTime;
    $arrivalTime->add(new DateInterval('PT' . intval($this->getDuration()) . 'M'));
    $arrivalTime->setTimezone($destinationTimeZone);

    return $arrivalTime;
  }
}
