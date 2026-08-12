import { Controller, Get, UseGuards, Req, Res, Post, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from "./decorators/public.decorator"
import express from 'express';
import { CURRENT_GUIDELINES_VERSION } from "../guideline/constants/quote-guidelines"

// Guard's
import { GoogleAuthGuard } from "./guards/google-guard/google-auth.guard"
import { JwtGuard } from "./guards/jwt-guard/jwt-auth.guard"









@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() { }


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
  async me(@Req() req) {
    const user = await this.authService.findById(req.user.id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return {
      id: user.id,
      display_name: user.display_name,
      email: user.email,
      picture: user.picture,
      hasAcceptedCurrentGuidelines:
        user.hasAcceptedQuoteGuidelines &&
        user.quoteGuidelinesVersion === CURRENT_GUIDELINES_VERSION,
    };
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: express.Response,) {
    res.clearCookie("access_token")
    return {
      message: "sucess"
    }
  }


}
