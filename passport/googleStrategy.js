const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


module.exports = () => {
   passport.use(
      new GoogleStrategy(
         {
            clientID: process.env.OAUTH_GOOGLE_CLIENT_ID, // 구글 로그인에서 발급받은 REST API 키
            clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
            callbackURL: '/account/google/callback', // 구글 로그인 Redirect URI 경로
         },
         async (accessToken, refreshToken, profile, done) => {
            console.log('?')
            console.log('google profile : ', profile);
            try {
               const exUser = await prisma.user.findFirst({
                  // 구글 플랫폼에서 로그인 했고 & snsId필드에 구글 아이디가 일치할경우
                  where: { USER_ID : profile.id, PLATFORM: 'google' },
               });
               // 이미 가입된 구글 프로필이면 성공
               if (exUser) {
                  done(null, exUser); // 로그인 인증 완료
               } else {
                  // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                //   const newUser = await User.create({
                //      email: profile?.email[0].value,
                //      nick: profile.displayName,
                //      snsId: profile.id,
                //      provider: 'google',
                //   });
                  done(null, newUser); // 회원가입하고 로그인 인증 완료
               }
            } catch (error) {
               console.error(error);
               done(error);
            }
         },
      ),
   );
};