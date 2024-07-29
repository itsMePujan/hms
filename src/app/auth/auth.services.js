class authService {
  registerEmailMessage(name, token) {
    return `<p> Dear ${name}<br><br>
        your account has been registered successfully , 
        click the link to activate your
        account <a href="${process.env.HOST}/activate/${token}" > 
        ${process.env.HOST}/activate/${token}</a><br><br>
        <p>
          <br>regrads<br>
          <br>donot reply this play<br>
        </p>`;
  }
}

const authSrv = new authService();
module.exports = authSrv;
