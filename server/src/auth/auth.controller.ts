import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import {Public} from "./decorators/public.decorator"

// Guard's
import {GoogleAuthGuard} from "./guards/google-guard/google-auth.guard"
import {JwtGuard} from "./guards/jwt-guard/jwt-auth.guard"








@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin(){}


  @Public()
  @UseGuards(JwtGuard)
  @Get('google/callback')
  googleCallBack(@Req() req, @Res() res){
    const access_token = this.authService.generateJwtToken(req.user)
    res.redirect(`http://localhost:5173?token=${access_token}`)
    console.log("redirected")
  }
  
}
