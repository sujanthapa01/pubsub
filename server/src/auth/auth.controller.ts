import { Controller, Get, UseGuards, Req, Res, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from "./decorators/public.decorator"
import express from 'express';

// Guard's
import { GoogleAuthGuard } from "./guards/google-guard/google-auth.guard"
import { JwtGuard } from "./guards/jwt-guard/jwt-auth.guard"









@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}


  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallBack(@Req() req, @Res() res) {

    console.log(req.user)
    const access_token = await this.authService.generateJwtToken(req.user)

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })

    res.redirect(`http://localhost:3001/`)
  }


  @UseGuards(JwtGuard)
  @Get("me")
  me(@Req() req) {
    console.log("route /me ",req.user)
    const user =  req.user

    return {
      id:user.id,
      display_name: user.display_name,
      email:user.email,
      picture:user.picture
    }
  }


  @Post("logout")
  logout(@Res({ passthrough: true }) res: express.Response,) {
    res.clearCookie("access_token")
    return {
      message: "sucess"
    }
  }


}
