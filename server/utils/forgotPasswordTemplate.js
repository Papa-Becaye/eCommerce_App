const forgotPasswordTemplate = ({name, otp}) => {
    return `
        <h1>Dear ${name}</h1>
        <p>you're requested a password reset. Please use following OTP code to reset your password.</p>
        <div style="background-color: #f8f9fa; padding: 10px; border-radius: 5px;">
            <h2 style="color: #343a40;">Your OTP is ${otp}</h2>
        </div>
        <p>this OTP will expire in 10 minutes.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
    `;
}
export default forgotPasswordTemplate;