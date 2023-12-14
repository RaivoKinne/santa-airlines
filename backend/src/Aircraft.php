<?php

class Aircraft
{
  private $manufacturer;
  private $model;
  private $seatingCapacity;
  private $averageSpeed;

  public function __construct($manufacturer, $model, $seatingCapacity, $averageSpeed)
  {
    $this->manufacturer = $manufacturer;
    $this->model = $model;
    $this->seatingCapacity = $seatingCapacity;
    $this->averageSpeed = $averageSpeed;
  }

  public function getManufacturer()
  {
    return $this->manufacturer;
  }

  public function getModel()
  {
    return $this->model;
  }

  public function getSeatingCapacity()
  {
    return $this->seatingCapacity;
  }

  public function getAverageSpeed()
  {
    return $this->averageSpeed;
  }
}
