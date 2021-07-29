const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.aol.com',
    port: 465,
    secure: true,
    auth:{
        user:process.env.MAILER_USER,
        pass:process.env.MAILER_PASS
    }
})

async function verify(){
  try{
    const connection = await transporter.verify()
    if(connection){
            console.log("Server ready to take messages");
        }
    }catch(error){
        console.log(error)
    }
}
async function welcomeRoomie({email, name}){
    await transporter.sendMail({
        from: `"${process.env.MAILER_USERNAME}" <${process.env.MAILER_USER}>`,
        to: email,
        subject: "Welcome to Romatch",
        html: `
        <div>
            <h1>Hi ${name}</h1>
            <p>
            Know, you are part of a community of thousands of people who share their spaces with others to be part of a life experience. In roomatch we share good vibes and we are always trying to connect people to find their ideal space and roommate, we hope you enjoy this new travel.
            <img width="300" height= "300" src= "https://images.unsplash.com/photo-1520438901-f822f9f4be01?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=677&q=80" /><br>
            Photo by <a href="https://unsplash.com/@theplaceforthings?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Dylan Fout</a> on <a href="https://unsplash.com/s/photos/friends-house?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
            </p>
        </div>

        `,
        })
    }

async function welcomeHost({email, name}){
    await transporter.sendMail({
        from: `"${process.env.MAILER_USERNAME}" <${process.env.MAILER_USER}>`,
        to: email,
        subject: "Welcome to Romatch",
        html: `
        <div>
            <h1>Hi ${name}</h1>
            <p>
            Know, you are part of a community of thousands of people who share their spaces with others to be part of a life experience. In roomatch we share good vibes and we are always trying to connect people to find their ideal space and roommate, we hope you enjoy this new travel.
            <img width="300" height= "300" src= "https://images.unsplash.com/photo-1520438901-f822f9f4be01?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=677&q=80" /><br>
            Photo by <a href="https://unsplash.com/@theplaceforthings?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Dylan Fout</a> on <a href="https://unsplash.com/s/photos/friends-house?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
            </p>
        </div>
        `,
        })
    }

    module.exports = {
        transporter,
        verify,
        welcomeHost,
        welcomeRoomie
}