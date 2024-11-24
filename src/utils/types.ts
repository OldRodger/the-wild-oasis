export interface cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  description?: string;
  discount: number;
  image: string;
}

export interface booking {
  id: number;
  guestId: number;
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  numGuests: number;
  status: string;
  created_at: Date;
  cabins: {
    name: string;
    image: string;
  };
}
