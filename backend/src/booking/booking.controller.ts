import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { BookingService } from './booking.service';
import { checkAvailabilityDto } from './dto/check-availability.dto';
import { BookRoomDto } from './dto/book-room.dto';

@Controller('booking')
export class BookingController {
    constructor(private bookingService: BookingService) {}

    @Post("check-availability")
    checkAvailability(@Body() body: checkAvailabilityDto) {
        return this.bookingService.checkAvailability(body);
    }

    @Post("book-room")
    bookRoom(@Body() dto: BookRoomDto,  @Req() req: Request,) {
        return this.bookingService.bookRoom(dto, req["user"].id);
    }

     @Get("upcoming")
    getUpcomingBookings(@Req() req: Request) {
        return this.bookingService.getUpcomingBookings(req["user"].id);
    }

    @Get("history")
    getBookingHistory(@Req() req: Request) {
        return this.bookingService.getBookingHistory( req["user"].id);
    }

    @Put(":id")
    cancelBooking(@Param("id") id: string, @Req() req: Request) {
        return this.bookingService.cancelBooking(Number(id),  req["user"].id);
  }
}
