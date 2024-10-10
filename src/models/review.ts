export interface Review {
   id: string;
   depositorId: string;
   depositeeId: string;
   rating: number; // 1 to 5
   reviewText: string;
   createdAt: Date;
   updatedAt?: Date;
}
