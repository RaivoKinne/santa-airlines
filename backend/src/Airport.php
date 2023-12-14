<?php

class Airport
{
  private $iataCode;
  private $latitude;
  private $longitude;

  public function __construct($iataCode, $latitude, $longitude)
  {
    $this->iataCode = $iataCode;
    $this->latitude = $latitude;
    $this->longitude = $longitude;
  }

  public function getIataCode()
  {
    return $this->iataCode;
  }

  public function getLatitude()
  {
    return $this->latitude;
  }

  public function getLongitude()
  {
    return $this->longitude;
  }
}
