
export interface TravelState {
    id: string,
    startDate: string,
    endDate: string,
    country: string,
    city: string,
    activities: string,
    comment: string,
    rating: {
        rating: string | null;
    };
}
