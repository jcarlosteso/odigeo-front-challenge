import { FilterValues } from "../pages/Home/Filters";
import { isoDate } from "../utils";

interface DateRecord {
  year: number;
  month: number;
  dayOfMonth: number;
  hourOfDay: number;
  minute: number;
  second: number;
}

interface ItineraryRecord {
  arrivalDate: DateRecord;
  departureDate: DateRecord;
  arrivalLocation: string;
  departureLocation: string;
  carrier: string;
  price: number;
}

export interface ItineraryData {
  origin: string;
  destination: string;
  departure: Date;
  arrival: Date;
  carrier: string;
  price: number;
}

const toDate = (date: DateRecord): Date => {
  const { year, month, dayOfMonth, hourOfDay, minute, second } = date
  return new Date(year, month, dayOfMonth, hourOfDay, minute, second)
}

const selected = (filters: FilterValues, itinerary: ItineraryData): boolean => {
  const { origin, destination, departure } = filters

  return (!origin || origin === itinerary.origin)
      && (!destination || destination === itinerary.destination)
      && (!departure || isoDate(departure) === isoDate(itinerary.departure) )
}

export const getItineraries = async (filters: FilterValues): Promise<ItineraryData[]> => {
  const response = await fetch('/itineraries')
  const data = await response.json()

  return data.map((itinerary: ItineraryRecord) => ({
    origin: itinerary.departureLocation,
    destination: itinerary.arrivalLocation,
    departure: toDate(itinerary.departureDate),
    arrival: toDate(itinerary.arrivalDate),
    carrier: itinerary.carrier,
    price: itinerary.price
  })).filter((itinerary: ItineraryData) => selected(filters, itinerary))
}