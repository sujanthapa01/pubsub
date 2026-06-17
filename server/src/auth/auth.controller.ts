import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {Public} from "./decorators/public.decorator"
import {GoogleAuthGuard} from "./guards/google-guard/google-auth.guard"

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin(){}


  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  googleCallBack(){}
  
}
